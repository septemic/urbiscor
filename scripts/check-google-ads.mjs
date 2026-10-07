/** Offline consent/conversion checks. No emails or Google events are sent. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync(new URL('../src/lib/googleAds.ts', import.meta.url), 'utf8')
const code = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText
const target = 'AW-18497720244/LOCAL_TEST_ONLY'
const key = 'urbiscor.ads-consent.v1'

function harness({ saved, blockedStorage = false, sendTo = target } = {}) {
  const storage = new Map(saved ? [[key, saved]] : [])
  const scripts = []
  const idle = []
  const win = { requestIdleCallback: (callback) => idle.push(callback) }
  let cookies = '_gcl_aw=ad-click; theme=dark'
  let submission = 0
  const document = {
    createElement: () => ({ remove() { this.removed = true } }),
    head: { appendChild: (script) => scripts.push(script) },
    get cookie() { return cookies },
    set cookie(value) {
      const name = value.split('=')[0]
      cookies = cookies.split(';').filter((cookie) => cookie.trim().split('=')[0] !== name).join(';')
    },
  }
  const api = {}
  const sandbox = {
    exports: api,
    require: () => ({ googleAds: { tagId: 'AW-18497720244', quoteSendTo: sendTo } }),
    window: win, document, location: { hostname: 'urbiscor.ro' },
    localStorage: {
      getItem: (name) => { if (blockedStorage) throw Error('blocked'); return storage.get(name) ?? null },
      setItem: (name, value) => { if (blockedStorage) throw Error('blocked'); storage.set(name, value) },
    },
    crypto: { randomUUID: () => `submission-${++submission}` },
    setTimeout: (callback) => idle.push(callback),
  }
  vm.runInNewContext(code, sandbox)
  const commands = () => JSON.parse(JSON.stringify((win.dataLayer ?? []).map((args) => Array.from(args))))
  const events = () => commands().filter(([type]) => type === 'event')
  return { api, win, scripts, idle, storage, document, commands, events }
}

test('an undecided or rejected visitor never loads Google or records a lead', () => {
  const h = harness()
  assert.equal(h.api.initializeAdsConsent(), null)
  assert.equal(h.api.trackQuoteSubmission(), false)
  h.api.setAdsConsent('rejected')
  assert.equal(h.api.trackQuoteSubmission(), false)
  assert.equal(h.scripts.length, 0)
  assert.equal(h.commands().length, 0)
  assert.equal(h.document.cookie.trim(), 'theme=dark')
})

test('opt-in loads once, sets default denial first, and enables measurement without personalization', () => {
  const h = harness()
  h.api.setAdsConsent('accepted')
  h.api.setAdsConsent('accepted')
  assert.equal(h.scripts.length, 1)
  assert.equal(h.commands()[0][0], 'consent')
  assert.equal(h.commands()[0][1], 'default')
  assert.equal(h.commands()[0][2].ad_storage, 'denied')
  assert.equal(h.commands().some(([type]) => type === 'config'), false)
  h.scripts[0].onload()
  const update = h.commands().find(([type, action]) => type === 'consent' && action === 'update')
  assert.equal(update[2].ad_storage, 'granted')
  assert.equal(update[2].ad_user_data, 'granted')
  assert.equal(update[2].ad_personalization, 'denied')
  assert.equal(update[2].analytics_storage, 'denied')
  assert.equal(h.commands().find(([type]) => type === 'config')[2].allow_ad_personalization_signals, false)
})

test('a lead during tag download is emitted once after load with only target and a unique ID', () => {
  const h = harness()
  h.api.setAdsConsent('accepted')
  assert.equal(h.api.trackQuoteSubmission(), true)
  assert.equal(h.events().length, 0)
  h.scripts[0].onload()
  assert.deepEqual(h.events(), [['event', 'conversion', { send_to: target, transaction_id: 'submission-1' }]])
  h.api.setAdsConsent('accepted')
  assert.equal(h.events().length, 1)
  assert.equal(h.api.trackQuoteSubmission(), true)
  assert.equal(h.events()[1][2].transaction_id, 'submission-2')
  assert.equal(h.scripts.length, 1)
})

test('withdrawal during download discards the queued lead and prevents configuration', () => {
  const h = harness()
  h.api.setAdsConsent('accepted')
  h.api.trackQuoteSubmission()
  h.api.setAdsConsent('rejected')
  h.scripts[0].onload()
  assert.equal(h.events().length, 0)
  assert.equal(h.commands().some(([type]) => type === 'config'), false)
  assert.equal(h.api.trackQuoteSubmission(), false)
})

test('withdrawal after load denies storage, removes first-party ad cookies and stops events', () => {
  const h = harness()
  h.api.setAdsConsent('accepted')
  h.scripts[0].onload()
  h.api.setAdsConsent('rejected')
  assert.equal(h.commands().at(-1)[2].ad_storage, 'denied')
  assert.equal(h.document.cookie.trim(), 'theme=dark')
  assert.equal(h.api.trackQuoteSubmission(), false)
  assert.equal(h.events().length, 0)
})

test('later acceptance never replays a lead submitted without consent', () => {
  const h = harness()
  assert.equal(h.api.trackQuoteSubmission(), false)
  h.api.setAdsConsent('accepted')
  h.scripts[0].onload()
  assert.equal(h.events().length, 0)
})

test('saved opt-in waits until idle and a withdrawal cancels the scheduled load', () => {
  const saved = JSON.stringify({ choice: 'accepted', expiresAt: Date.now() + 10000 })
  const h = harness({ saved })
  assert.equal(h.api.initializeAdsConsent(), 'accepted')
  assert.equal(h.scripts.length, 0)
  assert.equal(h.idle.length, 1)
  h.api.setAdsConsent('rejected')
  h.idle[0]()
  assert.equal(h.scripts.length, 0)
})

test('expired, malformed and unrecognized preferences default to no consent', () => {
  for (const saved of ['bad JSON', JSON.stringify({ choice: 'accepted', expiresAt: 1 }), JSON.stringify({ choice: true, expiresAt: Date.now() + 10000 })]) {
    const h = harness({ saved })
    assert.equal(h.api.initializeAdsConsent(), null)
    assert.equal(h.scripts.length, 0)
  }
})

test('blocked storage still honors an explicit choice during this visit', () => {
  const h = harness({ blockedStorage: true })
  assert.equal(h.api.initializeAdsConsent(), null)
  h.api.setAdsConsent('accepted')
  assert.equal(h.api.getAdsConsent(), 'accepted')
  assert.equal(h.scripts.length, 1)
  h.api.setAdsConsent('rejected')
  assert.equal(h.api.getAdsConsent(), 'rejected')
  assert.equal(h.api.trackQuoteSubmission(), false)
})

test('a tag error never throws through the form hook and does not replay a dropped lead', () => {
  const h = harness()
  h.api.setAdsConsent('accepted')
  h.api.trackQuoteSubmission()
  assert.doesNotThrow(() => h.scripts[0].onerror())
  h.api.setAdsConsent('accepted')
  h.scripts[1].onload()
  assert.equal(h.events().length, 0)
})

test('an absent label or account-only target never produces a conversion', () => {
  for (const sendTo of ['', 'AW-18497720244', 'AW-999/different-account']) {
    const h = harness({ sendTo })
    h.api.setAdsConsent('accepted')
    h.scripts[0].onload()
    assert.equal(h.api.trackQuoteSubmission(), false)
    assert.equal(h.events().length, 0)
  }
})

test('a preference change from another tab immediately stops conversions', () => {
  const h = harness()
  h.api.setAdsConsent('accepted')
  h.scripts[0].onload()
  h.storage.set(key, JSON.stringify({ choice: 'rejected', expiresAt: Date.now() + 10000 }))
  assert.equal(h.api.refreshAdsConsent(), 'rejected')
  assert.equal(h.api.trackQuoteSubmission(), false)
})

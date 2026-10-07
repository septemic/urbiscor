import { googleAds } from '@/config/googleAds'

export type AdsConsent = 'accepted' | 'rejected'
export const adsConsentKey = 'urbiscor.ads-consent.v1'
export const adsPreferencesEvent = 'urbiscor:ads-preferences'
const preferenceLifetime = 180 * 24 * 60 * 60 * 1000

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

let choice: AdsConsent | null | undefined
let tagState: 'idle' | 'loading' | 'ready' = 'idle'
let configured = false
const pendingSubmissions = new Set<string>()
const denied = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
} as const

function readPreference(): AdsConsent | null {
  try {
    const saved = JSON.parse(localStorage.getItem(adsConsentKey) ?? 'null')
    if (saved && (saved.choice === 'accepted' || saved.choice === 'rejected') &&
      typeof saved.expiresAt === 'number' && saved.expiresAt > Date.now()) return saved.choice
  } catch { /* Unavailable or malformed storage means no consent. */ }
  return null
}

export function getAdsConsent(): AdsConsent | null {
  if (typeof window === 'undefined') return null
  if (choice === undefined) choice = readPreference()
  return choice
}

function clearAdsCookies() {
  const domains = location.hostname.split('.')
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0]
    if (!name.startsWith('_gcl_')) continue
    const expired = `${name}=; Max-Age=0; Path=/; SameSite=Lax`
    document.cookie = expired
    for (let i = 0; i < domains.length - 1; i++) {
      document.cookie = `${expired}; Domain=${domains.slice(i).join('.')}`
    }
  }
}

function enableMeasurement() {
  if (getAdsConsent() !== 'accepted') return
  window.gtag?.('consent', 'update', { ...denied, ad_storage: 'granted', ad_user_data: 'granted' })
  if (!configured) {
    window.gtag?.('config', googleAds.tagId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
    })
    configured = true
  }
  for (const id of pendingSubmissions) {
    window.gtag?.('event', 'conversion', { send_to: googleAds.quoteSendTo, transaction_id: id })
  }
  pendingSubmissions.clear()
}

function loadGoogleTag() {
  if (getAdsConsent() !== 'accepted') return
  if (tagState === 'ready') {
    enableMeasurement()
    return
  }
  if (tagState === 'loading') return
  window.dataLayer ??= []
  window.gtag ??= function () { window.dataLayer!.push(arguments) }
  window.gtag('consent', 'default', denied)
  window.gtag('set', 'ads_data_redaction', true)
  window.gtag('js', new Date())
  const script = document.createElement('script')
  script.id = 'urbiscor-google-ads'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAds.tagId}`
  script.onload = () => {
    tagState = 'ready'
    // A visitor may withdraw consent while the script is downloading.
    enableMeasurement()
  }
  script.onerror = () => {
    tagState = 'idle'
    pendingSubmissions.clear()
    script.remove()
  }
  tagState = 'loading'
  document.head.appendChild(script)
}

function applyPreference(next: AdsConsent | null) {
  choice = next
  if (next === 'accepted') loadGoogleTag()
  else {
    pendingSubmissions.clear()
    if (tagState !== 'idle') window.gtag?.('consent', 'update', denied)
    clearAdsCookies()
  }
}

/** Called after hydration; a saved opt-in never competes with initial paint. */
export function initializeAdsConsent(): AdsConsent | null {
  const saved = getAdsConsent()
  if (saved === 'accepted') {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => loadGoogleTag(), { timeout: 2000 })
    else setTimeout(loadGoogleTag, 0)
  } else applyPreference(saved)
  return saved
}

export function refreshAdsConsent(): AdsConsent | null {
  const saved = readPreference()
  applyPreference(saved)
  return saved
}

export function setAdsConsent(next: AdsConsent) {
  try {
    localStorage.setItem(adsConsentKey, JSON.stringify({ choice: next, expiresAt: Date.now() + preferenceLifetime }))
  } catch { /* Honor this visit's choice even when persistence is blocked. */ }
  applyPreference(next)
}

/** Best effort only: an ad blocker or tag failure must never affect a quote. */
export function trackQuoteSubmission(): boolean {
  try {
    if (typeof window === 'undefined' || getAdsConsent() !== 'accepted' ||
      !new RegExp(`^${googleAds.tagId}/[A-Za-z0-9_-]+$`).test(googleAds.quoteSendTo)) return false
    const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
    pendingSubmissions.add(id)
    loadGoogleTag()
    return true
  } catch {
    return false
  }
}

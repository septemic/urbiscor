#!/usr/bin/env node
/**
 * Publishes an already-built Netlify deploy preview to production.
 *
 * Why this exists: on the free plan, once the monthly credits run out Netlify
 * skips every production build ("Skipped due to account credit usage
 * exceeded"), while deploy previews still build. This script takes such a
 * preview — built by Netlify itself, so build plugins (e.g. the Netlify Emails
 * handler) are included — and publishes it, without running another build.
 *
 * Usage (needs a Netlify personal access token in NETLIFY_AUTH_TOKEN):
 *   pnpm promote                 # newest ready preview of the current branch
 *   pnpm promote -- --branch x   # newest ready preview of branch x
 *   pnpm promote -- --wait       # wait for a fresh preview first
 *   pnpm promote -- --deploy <id>  # publish a specific deploy
 *   pnpm promote -- --dry-run    # only show what would be published
 */
import { execFileSync } from 'node:child_process'

import process from 'node:process'

const SITE_ID = 'a35f5175-21be-43f9-8b32-90935cfd0f86'
const SITE_URL = 'https://urbiscor.ro'
const API = `https://api.netlify.com/api/v1/sites/${SITE_ID}`
const WAIT_POLL_SECONDS = 10
const WAIT_TIMEOUT_SECONDS = 300
const IN_FLIGHT_STATES = ['building', 'uploading', 'preparing', 'enqueued', 'new']

const has = (name) => process.argv.includes(`--${name}`)

function argValue(name) {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? undefined : process.argv[i + 1]
}

function currentBranch() {
  return execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf8' }).trim()
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function api(path, init, token) {
  const res = await fetch(`${API}${path}`, { ...init, headers: { Authorization: `Bearer ${token}`, ...(init?.headers ?? {}) } })
  if (!res.ok) throw new Error(`${init?.method ?? 'GET'} ${path} → ${res.status} ${await res.text()}`)
  return res.json()
}

async function checkLive() {
  for (const path of ['/', '/servicii', '/contact']) {
    const res = await fetch(`${SITE_URL}${path}`, { headers: { 'Cache-Control': 'no-cache' } })
    console.log(`  ${res.status} ${SITE_URL}${path}`)
    if (!res.ok) console.warn(`  warning: ${path} returned ${res.status}`)
  }
}

async function main() {
  const token = process.env.NETLIFY_AUTH_TOKEN
  if (!token) {
    throw new Error(
      'Missing NETLIFY_AUTH_TOKEN. Create one at https://app.netlify.com/user/applications#personal-access-tokens and set it, e.g. $env:NETLIFY_AUTH_TOKEN = "nfp_..." in PowerShell.',
    )
  }

  const explicitDeployId = argValue('deploy')
  const branch = argValue('branch') ?? (explicitDeployId ? undefined : currentBranch())

  console.log(`site:   ${SITE_URL} (${SITE_ID})`)

  const listDeploys = () => api('/deploys?per_page=50', undefined, token)
  const findPreview = async (name) =>
    (await listDeploys()).find((d) => d.context === 'deploy-preview' && d.branch === name && d.state === 'ready')

  let deploy
  if (explicitDeployId) {
    deploy = (await listDeploys()).find((d) => d.id === explicitDeployId)
    if (!deploy) throw new Error(`Deploy ${explicitDeployId} not found on this site.`)
  } else {
    console.log(`branch: ${branch}`)
    if (has('wait')) {
      const deadline = Date.now() + WAIT_TIMEOUT_SECONDS * 1000
      while (!deploy && Date.now() < deadline) {
        deploy = await findPreview(branch)
        if (deploy) break
        const inFlight = (await listDeploys()).find((d) => d.branch === branch && IN_FLIGHT_STATES.includes(d.state))
        process.stdout.write(inFlight ? `\r  preview ${inFlight.state} (${inFlight.commit_ref?.slice(0, 7) ?? '?'})…   ` : '\r  waiting for a preview build…   ')
        await sleep(WAIT_POLL_SECONDS * 1000)
      }
      process.stdout.write('\n')
    } else {
      deploy = await findPreview(branch)
    }
    if (!deploy) {
      throw new Error(
        `No ready deploy preview for "${branch}". Push the branch and open a pull request so Netlify builds it, then retry (or pass --wait to poll).`,
      )
    }
  }

  const info = await api(`/deploys/${deploy.id}`, undefined, token)
  console.log(`deploy: ${deploy.id}`)
  console.log(`  branch:  ${info.branch ?? deploy.branch}`)
  console.log(`  commit:  ${(info.commit_ref ?? deploy.commit_ref ?? '').slice(0, 7) || '(manual deploy)'}`)
  console.log(`  state:   ${info.state}`)
  console.log(`  built:   ${info.created_at ?? deploy.created_at}`)

  const site = await api('', undefined, token)
  if (site.published_deploy?.id === deploy.id) {
    console.log('\nAlready the published deploy — nothing to do.')
    await checkLive()
    return
  }

  if (has('dry-run')) {
    console.log('\n--dry-run: not publishing.')
    return
  }

  console.log('\nPublishing to production…')
  const published = await api(`/deploys/${deploy.id}/restore`, { method: 'POST' }, token)
  console.log(`  published at: ${published.published_at ?? '(pending)'}`)

  await sleep(5000)
  console.log('\nLive check:')
  await checkLive()
  console.log('\nDone. Production now serves that deploy (no build credits used).')
}

main().catch((error) => {
  console.error(`\n✗ ${error.message}`)
  process.exit(1)
})

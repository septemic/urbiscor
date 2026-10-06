#!/usr/bin/env node
/** Notify participating search engines after publishing; never runs in the browser. */
import { readFile } from 'node:fs/promises'
import { site } from '../src/config/site.ts'

const endpoint = 'https://api.indexnow.org/indexnow'

async function main() {
  const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const origin = new URL(site.url).origin
  if (!urlList.length || urlList.some((url) => new URL(url).origin !== origin)) {
    throw new Error('The sitemap must contain only URLs on the configured public site.')
  }
  // IndexNow's ownership key is intentionally public, not an account credential.
  const key = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim()
  if (!/^[a-f0-9]{32}$/.test(key)) throw new Error('Invalid public IndexNow ownership key.')
  const keyLocation = `${origin}/indexnow-key.txt`
  console.log(`Site: ${origin}\nURLs: ${urlList.length}\nOwnership file: ${keyLocation}`)
  if (process.argv.includes('--dry-run')) {
    console.log('Dry run: no URLs submitted.')
    return
  }
  const verification = await fetch(keyLocation, { signal: AbortSignal.timeout(20000) })
  if (!verification.ok || (await verification.text()).trim() !== key) {
    throw new Error('Publish the matching ownership file before submitting URLs.')
  }
  const response = await fetch(endpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({ host: new URL(origin).hostname, key, keyLocation, urlList }),
  })
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow returned HTTP ${response.status}: ${(await response.text()).slice(0, 500)}`)
  }
  console.log(`IndexNow received ${urlList.length} URLs (HTTP ${response.status}${response.status === 202 ? '; ownership validation pending' : ''}). Indexing and rankings are not guaranteed.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})

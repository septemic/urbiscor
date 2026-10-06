# Performance check — 6 October 2026

The performance changes reduce font and image downloads, remove idle animation
work, and serve all seven marketing pages as prerendered HTML through Netlify's
CDN. The existing design, dark-mode transition, header scroll timeline and
contact-form submission path remain in place.

## Measurements

PageSpeed Insights was attempted through both its website and public API. The
API returned its shared daily-quota error; the website rejected automated
queries from this environment. Lighthouse 13.5.0 supplied the lab measurements
instead, using Chromium with the default mobile throttling and desktop preset.
Production responses passed through a local bridge that used verified HTTPS;
the optimized production build used the same bridge for CDN image requests.

These representative runs used warmed bridge resources and a fresh browser
cache for each audit. They describe this lab setup; hosted PageSpeed results
will vary with the test location and runtime conditions.

| Metric | Before | After |
| --- | ---: | ---: |
| Mobile performance | 83 | 95 |
| Mobile first contentful paint | 3.1 s | 2.0 s |
| Mobile largest contentful paint | 3.7 s | 2.7 s |
| Mobile layout shift | 0 | 0 |
| Desktop performance | 99 | 100 |
| Desktop largest contentful paint | 0.7 s | 0.6 s |
| Font files | 173,280 bytes | 78,996 bytes |
| 960px hero image | 83,478 bytes (WebP, q72) | 56,264 bytes (AVIF, q55) |

The first optimized mobile run scored 91 (FCP 2.1 s, LCP 2.9 s); the follow-up
scored 96. The final shared-preload implementation scored 95 (FCP 2.0 s,
LCP 2.7 s) and 100 on desktop. Scores and main-thread timing fluctuate, while the resource-size
reductions are deterministic: 54% fewer font bytes and 33% fewer hero bytes.

## Verification

- TypeScript and the production build pass. Seven clean-URL HTML pages are
  generated, with all referenced assets present.
- Romanian glyphs retain their original advance widths and variable weight
  axes. Both fonts keep Latin and Romanian coverage and their licenses.
- Mobile and reduced-motion visitors do not fetch Lenis. Desktop wheel input
  still glides, resumes correctly after idle time, and stops requesting frames
  when settled. Menu and gallery locks remain effective.
- Native and fallback header progress match the page's scroll fraction. Dark
  mode, mobile navigation, gallery filtering and lightbox controls pass browser
  checks. The hero downloads once using the matching AVIF preload.
- The prerendered contact form submits the expected fields to `/__forms.html`
  in a locally intercepted browser test. No additional real emails were sent.

Font regeneration and deployment details are in the README. For an independent
hosted audit, open [PageSpeed Insights for URBISCOR](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Furbiscor.ro%2F&form_factor=mobile).

## Follow-up: remaining mobile points

The 95-point result was chiefly limited by FCP (2.0 s) and LCP (2.7 s),
with zero layout shift and little JavaScript blocking. A fresh warmed baseline
of that production build scored 94 (FCP 2.0 s, LCP 2.9 s), illustrating the
normal variation between runs. PageSpeed's website and API again rejected
queries from this environment, so the figures below are Lighthouse lab tests,
not a confirmed hosted PageSpeed result.

Changes:

- TanStack Start inlines the small shared stylesheet in the generated HTML,
  eliminating a render-blocking request. HTML plus CSS still transfers roughly
  the same compressed bytes. This uses the framework's inline-CSS support,
  including its hydration handling, rather than editing generated HTML.
- `PageHead` uses the router's public head-tag API and gives module preloads
  low fetch priority. Critical fonts and the hero retain their priority;
  JavaScript starts downloading immediately, without a timeout or idle gate.
- The client entry gives the prerendered page one paint opportunity before
  hydration using two animation frames. Hidden tabs hydrate immediately.
  Route content and interactive features remain in place.
- Variable fonts keep all existing Latin/Romanian glyphs and the site's used
  400–800 weights. Their four downloads total **63,520 bytes**, down from
  78,996 (20%). Shaping features remain present. Weight instancing introduces
  less than one font-unit of advance-width rounding, below 0.01px at 20px.
- Hero AVIF quality 40 reduces the 960px image from **56,264 to 32,176 bytes**
  (43%). Mobile and desktop screenshots were reviewed under the original
  overlays; image framing and layout are preserved.

| Test | Earlier build | Updated build |
| --- | ---: | ---: |
| Default simulated mobile score | 94–95 | 97 |
| Simulated mobile FCP | 2.0 s | 0.9–1.1 s |
| Simulated mobile LCP | 2.7–2.9 s | 2.6 s |
| Applied network/CPU throttling score | 98 | 99 |
| Applied throttling FCP / LCP | 1.8 / 1.8 s | 1.0 / 1.0 s |
| Applied throttling blocking time | 80 ms | 130 ms |
| Layout shift, both methods | 0 | 0 |
| Desktop score | 100 | 100 |

Different throttling methods give different scores and should not be mixed
into a single before/after comparison. Earlier first paint also starts the
blocking-time measurement window earlier; the applied-throttling run remains
within Lighthouse's good threshold. A perfect 100 is not guaranteed across
test locations, browser versions or CPU conditions.

TypeScript, the production build and browser checks cover mobile navigation,
dark mode, native/fallback header progress, smooth scrolling and idle-frame
behavior, gallery filters/lightbox controls, and an intercepted form POST.
No additional real email was sent.

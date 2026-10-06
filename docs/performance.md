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
| Mobile performance | 83 | 96 |
| Mobile first contentful paint | 3.1 s | 2.0 s |
| Mobile largest contentful paint | 3.7 s | 2.4 s |
| Mobile layout shift | 0 | 0 |
| Desktop performance | 99 | 100 |
| Desktop largest contentful paint | 0.7 s | 0.6 s |
| Font files | 173,280 bytes | 78,996 bytes |
| 960px hero image | 83,478 bytes (WebP, q72) | 56,264 bytes (AVIF, q55) |

The first optimized mobile run scored 91 (FCP 2.1 s, LCP 2.9 s); the follow-up
scored 96. Scores and main-thread timing fluctuate, while the resource-size
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

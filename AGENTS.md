# AGENTS.md

Romanian-language marketing site for URBISCOR CONSTRUCT (houses "la roșu" in Oltenia). TanStack Start (React 19, SSR) + Vite 7 + Tailwind CSS 4, deployed on Vercel (Nitro / Build Output API v3).

## Structure

```
src/
  config/site.ts          # Single source of truth: name, phone, WhatsApp, site URL, social links
  data/services.ts        # Homepage service cards + detailed /servicii sections
  data/projects.ts        # Portfolio entries (placeholder flag for illustrative images)
  lib/seo.ts              # pageHead(): title, description, canonical, OG tags per route
  lib/image.ts            # image source helper (photos served directly from /public)
  lib/structuredData.ts   # schema.org GeneralContractor JSON-LD (injected in __root)
  components/             # Header (sticky + mobile menu), Footer, FloatingContact, QuoteForm,
                          # Gallery + Lightbox, Picture, Icons (custom SVG line icons), Logo
  components/sections/    # Homepage sections reused across pages
  routes/                 # File-based routes; __root.tsx holds the layout and default SEO
  routes/api.quote.ts     # Quote-form endpoint (POST) — replaces Netlify Forms
public/
  img/                    # Source photos (served directly)
```

## Conventions & decisions

- All visible copy is Romanian with correct diacritics (ș, ț, ă, â, î). Do not add invented facts: no years of experience, project counts, reviews, ratings, addresses, certifications or opening hours. Avoid superlatives ("cei mai buni", "nr. 1").
- Colors: anthracite `ink` #16191D, `night` #111820, white, `gold` #D8A64B (accent only). Use `gold-deep` for gold text on light backgrounds (contrast).
- Buttons: `.btn` + `.btn-gold` / `.btn-outline-light` / `.btn-dark` / `.btn-outline-dark` / `.btn-whatsapp` (see `styles.css`).
- Scroll reveal: add `data-reveal` to an element; `RevealObserver` in the root animates it. Respects reduced motion and falls back to visible if JS never hydrates.
- Quote CTAs use `QuoteLink`, which scrolls to `#oferta` on pages that contain the form and otherwise goes to `/contact#oferta`.
- Form submissions POST url-encoded to `/api/quote` (the server route in `src/routes/api.quote.ts`), which emails the enquiry through Resend. Keep the form fields in sync with `REQUIRED_FIELDS` there.
- Images are AI-generated illustrative placeholders, flagged `placeholder: true` and labelled on-site. Replace with real photos when available.
- Google Ads quote conversions are consent-gated (`src/lib/googleAds.ts`). Never load the Google tag before an advertising opt-in or send form fields to it. Fire only after a successful `/api/quote` response. Keep the consent controls and privacy/cookie disclosures in sync; there is no Google Analytics or Facebook Pixel.
- Social links: empty strings in `site.social` render as non-link "în curând" chips, never broken links.

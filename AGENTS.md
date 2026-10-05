# AGENTS.md

Romanian-language marketing site for URBISCOR CONSTRUCT (houses "la roșu" in Oltenia). TanStack Start (React 19, SSR) + Vite 7 + Tailwind CSS 4, deployed on Netlify.

## Structure

```
src/
  config/site.ts          # Single source of truth: name, phone, WhatsApp, site URL, social links
  data/services.ts        # Homepage service cards + detailed /servicii sections
  data/projects.ts        # Portfolio entries (placeholder flag for illustrative images)
  lib/seo.ts              # pageHead(): title, description, canonical, OG tags per route
  lib/image.ts            # Netlify Image CDN URL + srcset helpers
  lib/structuredData.ts   # schema.org GeneralContractor JSON-LD (injected in __root)
  components/             # Header (sticky + mobile menu), Footer, FloatingContact, QuoteForm,
                          # Gallery + Lightbox, Picture, Icons (custom SVG line icons), Logo
  components/sections/    # Homepage sections reused across pages
  routes/                 # File-based routes; __root.tsx holds the layout and default SEO
public/
  __forms.html            # Netlify Forms skeleton for the "oferta" form — keep in sync with QuoteForm
  img/                    # Source photos (always served via /.netlify/images, never directly)
```

## Conventions & decisions

- All visible copy is Romanian with correct diacritics (ș, ț, ă, â, î). Do not add invented facts: no years of experience, project counts, reviews, ratings, addresses, certifications or opening hours. Avoid superlatives ("cei mai buni", "nr. 1").
- Colors: anthracite `ink` #16191D, `night` #111820, white, `gold` #D8A64B (accent only). Use `gold-deep` for gold text on light backgrounds (contrast).
- Buttons: `.btn` + `.btn-gold` / `.btn-outline-light` / `.btn-dark` / `.btn-outline-dark` / `.btn-whatsapp` (see `styles.css`).
- Scroll reveal: add `data-reveal` to an element; `RevealObserver` in the root animates it. Respects reduced motion and falls back to visible if JS never hydrates.
- Quote CTAs use `QuoteLink`, which scrolls to `#oferta` on pages that contain the form and otherwise goes to `/contact#oferta`.
- Form submissions POST url-encoded to `/__forms.html` (not `/`), because the SSR function would intercept `/`.
- Images are AI-generated illustrative placeholders, flagged `placeholder: true` and labelled on-site. Replace with real photos when available.
- No tracking/analytics. If any are added, a consent banner must gate them (see `/politica-cookies`).
- Social links: empty strings in `site.social` render as non-link "în curând" chips, never broken links.

# URBISCOR CONSTRUCT — site de prezentare 

Website for **URBISCOR CONSTRUCT**, a residential construction company building houses "la roșu" (structural shell) in Oltenia, Romania. The public site is entirely in Romanian.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, trust bar, services, owned-equipment section, process timeline, gallery with lightbox, why us, service area, CTA, quote form |
| `/servicii` | Detailed sections: construcții la roșu, fundații, structuri din beton armat, cofrare, turnare beton, zidărie, sistem Doka |
| `/proiecte` | Filterable portfolio grid with lightbox |
| `/despre-noi` | Company description, principles, equipment, process |
| `/contact` | Phone, WhatsApp, service area and quote form |
| `/politica-de-confidentialitate`, `/politica-cookies` | GDPR / cookie information |

## Tech

- React 19 + TypeScript, TanStack Start on Vite 7, with prerendered marketing pages and an SSR fallback
- Tailwind CSS 4 with a small custom design system in `src/styles.css`
- Quote form posts to a Vercel server route (`/api/quote`) that emails enquiries through Resend; no Netlify Forms
- Images are served directly from `public/img`
- Self-hosted Manrope + Inter variable fonts (no Google Fonts requests)
- Google Ads loads only after an explicit advertising opt-in; visitors can refuse or revisit preferences from the footer. No Google Analytics or Facebook Pixel. Form conversion events require the action-specific label; see [docs/google-ads.md](docs/google-ads.md).
- Light/dark mode toggle in the header; defaults to the system theme and remembers explicit choices in browser local storage. Coordinated palette and icon transitions follow the site's easing and respect reduced motion; saved themes apply immediately on first paint.
- The fixed header's full-height background tracks page progress with a CSS root scroll timeline. A passive, frame-coalesced fallback runs only when scroll timelines are unsupported; IntersectionObserver updates section links and their brief gold pulse without per-scroll React renders or backdrop blur.
- WhatsApp leads a unified contact rail with Facebook and Instagram in the outer margin on wide desktop screens (1280px+, with a mouse/trackpad and at least 400px of height). Matching 44px anthracite controls reuse existing SVGs and configured links, with gold hover/focus accents and reduced-motion support. Labels stay open under the pointer and dismiss with Escape; smaller/touch screens retain a WhatsApp corner control or the mobile contact bar, plus footer social links. It adds no startup requests, scroll observers or animation loop.

## Run locally

```bash
pnpm install
pnpm dev            # Vite/Nitro dev server. Set RESEND_API_KEY + QUOTE_FROM_EMAIL to test form email.
```

## Editing content

- **Contact details, site URL, social links:** `src/config/site.ts`. Facebook/Instagram show "în curând" until a URL is set; both are filled in now.
- **Portfolio photos:** `src/data/projects.ts`. Current images are illustrative placeholders (`placeholder: true`, labelled "Imagine ilustrativă" on the site). Add real photos to `public/img/proiecte/` and new entries with `placeholder: false`.
- **Services:** `src/data/services.ts`; detailed page guidance is in `src/data/servicePages.ts`, with titles/descriptions in `src/config/serviceMetadata.ts` and stable URLs in `src/config/servicePaths.ts`.
- **Custom domain:** update `site.url` in `src/config/site.ts`, plus `public/sitemap.xml` and `public/robots.txt`.
- **Quote form fields:** if you change them in `src/components/QuoteForm.tsx`, update `REQUIRED_FIELDS` and the email rows in `src/routes/api.quote.ts` to match.
- **Theme colors:** semantic surface/text colors live in `src/styles.css`; `src/lib/theme.ts` initializes the theme before rendering, and `src/components/ThemeToggle.tsx` handles saved, system, and cross-tab changes. Keep fixed `ink`/white colors for gold buttons and dark image overlays; use `surface`/`foreground` for theme-aware content.
- **Header progress and sections:** `src/hooks/useHeaderScroll.ts` owns observer lifecycle and the older-browser progress fallback. `sectionId` in `src/components/nav.ts` maps page sections to nav links; unnamed sections inherit the preceding link. Fill and pulse styles live in `src/styles.css`; reduced motion retains progress but disables pulses.

## Performance

- All 13 content routes are prerendered during `pnpm build`. Vercel serves
  their HTML from the CDN; Nitro retains SSR for unmatched routes. Flat
  HTML output preserves clean URLs such as `/contact`. The small shared
  stylesheet is inlined through TanStack Start so it can paint with the HTML
  without another blocking request. `PageHead` lowers module-preload priority
  so fonts and the hero can load first; the client entry gives the static HTML
  a paint opportunity before hydration, with immediate hydration in hidden tabs.
- `Picture` serves each photo directly from `public/img` and preloads the
  priority hero image so the largest above-the-fold image starts first.
- Fonts keep Latin and Romanian coverage, including legacy cedillas, with
  variable weights restricted to the site's used 400–800 range. To regenerate them
  after updating Fontsource: install `fonttools[woff]==4.61.1` in a Python
  environment, then run `python scripts/subset-fonts.py`. The generated fonts
  and licenses are committed, so production builds do not need Python. Update
  the subsets and CSS unicode ranges if another language is added; regenerate
  and widen the weight range if a lighter or heavier text style is introduced.
- Lenis loads only for visitors with a mouse or trackpad who permit motion.
  Animation frames run during smooth wheel scrolling and stop when it settles.
  Touch scrolling stays native; menu and lightbox locks also stop the frames.

The quote form posts to the `/api/quote` server route (`src/routes/api.quote.ts`),
which validates the fields, checks the honeypot and emails the enquiry through
Resend.

## Search visibility

Service pages have independent crawlable URLs, unique metadata and linked
Service/BreadcrumbList entities. Keep the sitemap and the explicit `.html`
redirects in `vercel.json` in sync when adding routes. Search Console setup,
local visibility priorities and IndexNow notification instructions are in
[docs/search-visibility.md](docs/search-visibility.md).

## Contact form email notifications

The `oferta` form posts to `/api/quote`, which sends the enquiry by email through
[Resend](https://resend.com) by calling `https://api.resend.com/emails`. ImprovMX
forwards mail for `contact@urbiscor.ro` to the existing business Gmail inbox.

Set these environment variables in Vercel (**Project → Settings → Environment
Variables**):

- `RESEND_API_KEY` — Resend API key (required)
- `QUOTE_FROM_EMAIL` — verified sender, e.g. `URBISCOR CONSTRUCT <oferte@urbiscor.ro>` (required)
- `QUOTE_TO_EMAIL` — recipient; defaults to `contact@urbiscor.ro`

Without `RESEND_API_KEY` and `QUOTE_FROM_EMAIL` the endpoint returns HTTP 500 and
the form shows its error state, so configure both before relying on the form.
Resend domain verification and the ImprovMX alias/forwarding are account settings
that persist across deployments.

## Deploying on Vercel

Push to `main` and Vercel builds and publishes it; every branch push and pull
request gets a preview deployment. The build runs `vite build` through Nitro's
Vercel preset, so Vercel auto-detects the framework and needs no build-command or
output-directory settings. Redirects and headers live in `vercel.json`. Roll back
or republish from the Vercel dashboard (**Deployments → Promote to Production**).

## Still to do (owner input needed)

- Replace the illustrative photos with real URBISCOR CONSTRUCT site photos.
- Add the company's legal details (CUI, registered office, email) to the privacy policy, and have it reviewed.
- Confirm the privacy policy's hosting/email processors (now Vercel and Resend) with the owner and have the DPA/transfer wording reviewed.

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

- React 19 + TypeScript, TanStack Start (SSR) on Vite 7
- Tailwind CSS 4 with a small custom design system in `src/styles.css`
- Netlify Forms for the quote form (`oferta`), Netlify Image CDN for responsive AVIF/WebP images
- Self-hosted Manrope + Inter variable fonts (no Google Fonts requests)
- No analytics or tracking scripts, so no cookie banner is needed

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev (Netlify Forms / Image CDN are only emulated via netlify dev)
```

## Editing content

- **Contact details, site URL, social links:** `src/config/site.ts`. Facebook/Instagram show "în curând" until a URL is set.
- **Portfolio photos:** `src/data/projects.ts`. Current images are illustrative placeholders (`placeholder: true`, labelled "Imagine ilustrativă" on the site). Add real photos to `public/img/proiecte/` and new entries with `placeholder: false`.
- **Services:** `src/data/services.ts`.
- **Custom domain:** update `site.url` in `src/config/site.ts`, plus `public/sitemap.xml` and `public/robots.txt`.
- **Quote form fields:** if you change them in `src/components/QuoteForm.tsx`, update `public/__forms.html` to match.

## Still to do (owner input needed)

- Replace the illustrative photos with real URBISCOR CONSTRUCT site photos.
- Add Facebook / Instagram URLs when the pages exist.
- Add the company's legal details (CUI, registered office, email) to the privacy policy, and have it reviewed.
- Turn on email notifications for form submissions in Netlify (Project configuration → Notifications → Form submission notifications).

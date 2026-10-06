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
- Light/dark mode toggle in the header; defaults to the system theme and remembers explicit choices in browser local storage. Coordinated palette and icon transitions follow the site's easing and respect reduced motion; saved themes apply immediately on first paint.
- The fixed header's full-height background tracks page progress with a CSS root scroll timeline. A passive, frame-coalesced fallback runs only when scroll timelines are unsupported; IntersectionObserver updates section links and their brief gold pulse without per-scroll React renders or backdrop blur.

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev (Netlify Forms / Image CDN are only emulated via netlify dev)
```

## Editing content

- **Contact details, site URL, social links:** `src/config/site.ts`. Facebook/Instagram show "în curând" until a URL is set; both are filled in now.
- **Portfolio photos:** `src/data/projects.ts`. Current images are illustrative placeholders (`placeholder: true`, labelled "Imagine ilustrativă" on the site). Add real photos to `public/img/proiecte/` and new entries with `placeholder: false`.
- **Services:** `src/data/services.ts`.
- **Custom domain:** update `site.url` in `src/config/site.ts`, plus `public/sitemap.xml` and `public/robots.txt`.
- **Quote form fields:** if you change them in `src/components/QuoteForm.tsx`, update `public/__forms.html` to match.
- **Theme colors:** semantic surface/text colors live in `src/styles.css`; `src/lib/theme.ts` initializes the theme before rendering, and `src/components/ThemeToggle.tsx` handles saved, system, and cross-tab changes. Keep fixed `ink`/white colors for gold buttons and dark image overlays; use `surface`/`foreground` for theme-aware content.
- **Header progress and sections:** `src/hooks/useHeaderScroll.ts` owns observer lifecycle and the older-browser progress fallback. `sectionId` in `src/components/nav.ts` maps page sections to nav links; unnamed sections inherit the preceding link. Fill and pulse styles live in `src/styles.css`; reduced motion retains progress but disables pulses.

## Contact form email notifications

The `oferta` form submits to `/__forms.html` and is stored by Netlify Forms. An
active Netlify email notification for `submission_created` sends new enquiries
to `contact@urbiscor.ro` with the subject
`Solicitare de ofertă · URBISCOR CONSTRUCT`. ImprovMX forwards mail for that alias
to the existing business Gmail inbox.

Manage notifications in Netlify under **Forms → Submission notifications**.
Manage the alias and forwarding destination in
ImprovMX. The notification is a site setting that persists across deployments;
email delivery uses Netlify's notification service and the existing ImprovMX MX
records. The frontend uses Netlify Forms rather than SMTP credentials.

Notifications apply to verified submissions. If an expected enquiry does not
arrive, check the form's **Spam submissions** list in Netlify as well as Gmail's
spam folder, and mark legitimate enquiries as verified.

## Publishing when the free-plan build credits are used up

The free plan is credit-based. When a month's credits are gone, Netlify skips
production builds with `Skipped due to account credit usage exceeded` — but
**deploy previews still build**. `scripts/promote-preview.mjs` uses that: it
publishes the preview Netlify just built, without starting another build, so no
build credits are spent.

```bash
# one-time: create a personal access token with access to this site, then
# https://app.netlify.com/user/applications#personal-access-tokens
setx NETLIFY_AUTH_TOKEN "nfp_..."     # Windows; new shells only

git switch -c update/ceva
git commit -am "…"
git push -u origin update/ceva
gh pr create --fill                   # Netlify builds the deploy preview
pnpm promote -- --wait                # publish that preview to production
gh pr merge --squash
git switch main && git pull
```

Once the credits reset (or on a paid plan) the normal flow works again: push to
`main` and Netlify builds and publishes it as usual.

Notes:

- `pnpm promote` publishes the newest ready preview of the **current branch**.
  Use `--branch <name>` for another branch, `--deploy <id>` to republish a
  specific deploy (also the way to roll production back), `--dry-run` to look
  first.
- The published deploy keeps its `deploy-preview` context label, so
  context-scoped environment variables would come from the preview values. The
  site uses no environment variables today.
- A build that runs entirely on your machine is possible too (`vite build`,
  bundle `.netlify/v1/functions/server.mjs` with esbuild, then
  `netlify deploy --prod --no-build --dir dist/client --functions …`), but
  `--no-build` skips Netlify's build plugins — including the email handler added
  by the **Emails** integration. Prefer the preview route above.

## Still to do (owner input needed)

- Replace the illustrative photos with real URBISCOR CONSTRUCT site photos.
- Add the company's legal details (CUI, registered office, email) to the privacy policy, and have it reviewed.

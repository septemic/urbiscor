import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { site } from '@/config/site'
import { businessSchema } from '@/lib/structuredData'
import { pageHead } from '@/lib/seo'
import { themeBoot } from '@/lib/theme'
import { FloatingContact } from '@/components/FloatingContact'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Icon } from '@/components/Icons'
import { RevealObserver } from '@/components/Reveal'
import { SmoothScroll } from '@/components/SmoothScroll'

import '../styles.css'

const defaults = pageHead({
  title: 'URBISCOR CONSTRUCT | Construcții Case la Roșu în Oltenia',
  description:
    'URBISCOR CONSTRUCT execută case la roșu, fundații, structuri din beton armat, cofrare și zidărie în Oltenia. Sistem Doka propriu. Solicită ofertă.',
  path: '/',
})

// Enables scroll-reveal only when JS runs; falls back to fully visible content if the app never hydrates.
const revealBoot = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__reveal)document.documentElement.classList.remove('js')},2500)`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#111820' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ro_RO' },
      { property: 'og:site_name', content: site.name },
      { name: 'twitter:card', content: 'summary_large_image' },
      ...defaults.meta,
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  shellComponent: RootDocument,
  component: Layout,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema()) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function Layout() {
  return (
    <>
      <a href="#continut" className="fixed left-4 top-4 z-[60] -translate-y-24 rounded bg-gold px-4 py-3 font-semibold text-ink focus:translate-y-0">
        Sari la conținut
      </a>
      <Header />
      <main id="continut">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
      {/* Space for the mobile contact bar so it never covers the footer */}
      <div className="h-16 md:hidden" aria-hidden="true" />
      <RevealObserver />
      <SmoothScroll />
    </>
  )
}

function NotFound() {
  return (
    <section className="grid-dark relative flex min-h-[80vh] items-center bg-night pb-20 pt-40 text-white">
      <div className="container-x">
        <p className="eyebrow on-dark">Eroare 404</p>
        <h1 className="mt-5 text-4xl font-extrabold sm:text-6xl">Pagina nu a fost găsită.</h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">Adresa accesată nu există sau a fost mutată. Te poți întoarce la pagina principală sau ne poți contacta direct.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-gold">
            Înapoi la pagina principală <Icon name="arrow" size={18} className="arrow" />
          </Link>
          <a href={site.phoneHref} className="btn btn-outline-light">
            <Icon name="phone" size={18} /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}

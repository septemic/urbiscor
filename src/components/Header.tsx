import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { site } from '@/config/site'
import { Icon } from './Icons'
import { Logo } from './Logo'
import { QuoteLink } from './QuoteLink'
import { ThemeToggle } from './ThemeToggle'
import { navItems } from './nav'
import { setSmoothScrollLock } from '@/lib/smoothScroll'
import { useHeaderScroll } from '@/hooks/useHeaderScroll'
import { HeaderNavLink } from './HeaderNavLink'

export function Header() {
  const [open, setOpen] = useState(false)
  // Section observers must scan the committed page, after route content mounts.
  const location = useRouterState({ select: (s) => s.resolvedLocation ?? s.location })
  const menuButton = useRef<HTMLButtonElement>(null)
  const { sentinelRef, progressRef, scrolled, activeSection } = useHeaderScroll(location.pathname)

  // Close the menu whenever the route (or hash) changes
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    setSmoothScrollLock(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      setSmoothScrollLock(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = (item: (typeof navItems)[number]) => {
    if (activeSection !== item.sectionId) return undefined
    return item.to === location.pathname && !item.hash ? 'page' : 'location'
  }

  return (
    <>
      <span ref={sentinelRef} className="header-scroll-sentinel" aria-hidden="true" />
      <header className="site-header fixed inset-x-0 top-0 z-50 text-white" data-scrolled={scrolled || undefined} data-menu-open={open || undefined}>
        <div className="header-surface">
          <div ref={progressRef} className="header-progress" aria-hidden="true" />
          <div className={`container-x flex items-center justify-between gap-3 transition-[height] duration-300 ${scrolled ? 'h-[68px]' : 'h-[76px] lg:h-[88px]'}`}>
            <Link to="/" className="shrink-0" aria-label={`${site.name} — pagina principală`}>
              <Logo />
            </Link>

            <nav aria-label="Navigație principală" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <HeaderNavLink
                      to={item.to}
                      hash={item.hash}
                      sectionCurrent={current(item)}
                      data-section-active={activeSection === item.sectionId || undefined}
                      className="header-nav-link block px-2.5 py-2 text-[0.92rem] font-medium text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </HeaderNavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2 xl:gap-3">
              <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-semibold text-white/90 hover:text-gold xl:inline-flex">
                <Icon name="phone" size={18} className="text-gold" />
                {site.phoneDisplay}
              </a>
              <QuoteLink className="btn btn-gold hidden !min-h-11 !px-5 text-sm sm:inline-flex">Solicită ofertă</QuoteLink>
              <ThemeToggle />
              <button
                ref={menuButton}
                type="button"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded text-white lg:hidden"
                aria-expanded={open}
                aria-controls="meniu-mobil"
                aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
                onClick={() => setOpen((v) => !v)}
              >
                <Icon name={open ? 'close' : 'menu'} size={26} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="meniu-mobil"
          data-lenis-prevent
          className={`fixed inset-x-0 bottom-0 overflow-y-auto bg-night grid-dark transition-[opacity,visibility] duration-300 lg:hidden ${
            scrolled ? 'top-[68px]' : 'top-[76px]'
          } ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
          aria-hidden={!open}
          inert={!open}
        >
          <nav aria-label="Navigație mobilă" className="container-x flex min-h-full flex-col pb-10 pt-6">
            <ul className="border-t border-white/10">
              {navItems.map((item, i) => (
                <li key={item.label} className="border-b border-white/10">
                  <HeaderNavLink
                    to={item.to}
                    hash={item.hash}
                    onClick={() => setOpen(false)}
                    sectionCurrent={current(item)}
                    className="flex items-center justify-between py-4 font-display text-2xl font-bold text-white"
                  >
                    <span>
                      <span className="mr-4 align-middle font-sans text-xs font-semibold text-white/40">0{i + 1}</span>
                      {item.label}
                    </span>
                    <Icon name="arrow" size={20} className="text-white/40" />
                  </HeaderNavLink>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <QuoteLink className="btn btn-gold w-full" onClick={() => setOpen(false)}>
                Solicită ofertă gratuită
              </QuoteLink>
              <a href={site.phoneHref} className="btn btn-outline-light w-full">
                <Icon name="phone" size={18} /> {site.phoneDisplay}
              </a>
            </div>
            <p className="mt-auto pt-10 text-sm text-white/50">
              {site.contactPerson} · {site.area}
            </p>
          </nav>
        </div>
      </header>
    </>
  )
}

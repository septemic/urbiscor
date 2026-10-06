import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { site } from '@/config/site'
import { Icon } from './Icons'
import { Logo } from './Logo'
import { QuoteLink } from './QuoteLink'
import { ThemeToggle } from './ThemeToggle'
import { navItems } from './nav'
import { setSmoothScrollLock } from '@/lib/smoothScroll'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useRouterState({ select: (s) => s.location })
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const isActive = (to: string, hash?: string) =>
    hash ? location.pathname === to && location.hash === hash : location.pathname === to && (to !== '/' || !location.hash)

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      {/*
        The blur sits on this wrapper, never on <header> itself: an element with
        backdrop-filter (like one with a transform) becomes the containing block
        for fixed-position descendants, which collapsed the mobile menu below —
        a child of <header> — to zero height while it was open.
      */}
      <div
        className={`transition-[background-color,box-shadow] duration-300 ${
          solid ? 'bg-night/95 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between gap-3 transition-[height] duration-300 ${scrolled ? 'h-[68px]' : 'h-[76px] lg:h-[88px]'}`}>
          <Link to="/" className="shrink-0" aria-label={`${site.name} — pagina principală`}>
            <Logo />
          </Link>

          <nav aria-label="Navigație principală" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={item.hash}
                    aria-current={isActive(item.to, item.hash) ? 'page' : undefined}
                    className="relative block px-2.5 py-2 text-[0.92rem] font-medium text-white/80 transition-colors hover:text-white aria-[current=page]:text-white after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
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
                <Link
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.to, item.hash) ? 'page' : undefined}
                  className="flex items-center justify-between py-4 font-display text-2xl font-bold text-white aria-[current=page]:text-gold"
                >
                  <span>
                    <span className="mr-4 align-middle font-sans text-xs font-semibold text-white/40">0{i + 1}</span>
                    {item.label}
                  </span>
                  <Icon name="arrow" size={20} className="text-white/40" />
                </Link>
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
  )
}

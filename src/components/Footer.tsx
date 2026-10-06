import { Link } from '@tanstack/react-router'
import { site, whatsappMessage } from '@/config/site'
import { Icon, WhatsAppIcon } from './Icons'
import { socialProfiles } from '@/config/social'
import { Logo } from './Logo'

const footerNav = [
  { label: 'Acasă', to: '/' },
  { label: 'Servicii', to: '/servicii' },
  { label: 'Proiecte', to: '/proiecte' },
  { label: 'Despre noi', to: '/despre-noi' },
  { label: 'Contact', to: '/contact' },
] as const

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night-2 text-white">
      <div className="grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative">
        <div className="grid gap-12 border-b border-white/10 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Link to="/" aria-label={`${site.name} — pagina principală`}>
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm font-display text-xl font-semibold leading-snug text-white/90">
              Construcții case la roșu în Oltenia.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
              Execuție organizată a structurii, cu sistem Doka, popi metalici și schelă proprii.
            </p>
          </div>

          <nav aria-label="Navigație subsol" className="md:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-gold">Navigație</h2>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[0.95rem] text-white/75 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-gold">Contact</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="text-white/75">{site.contactPerson}</li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 font-display text-lg font-bold hover:text-gold">
                  <Icon name="phone" size={20} className="text-gold" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white/80 hover:text-white">
                  <WhatsAppIcon size={20} className="text-[#25d366]" />
                  Scrie-ne pe WhatsApp
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-white/75">
                <Icon name="pin" size={20} className="text-gold" />
                {site.area}
              </li>
            </ul>
            <ul className="mt-7 flex gap-3" aria-label="Rețele sociale">
              {socialProfiles.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} pe ${s.label}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon name={s.icon} size={20} />
                    </a>
                  ) : (
                    <span
                      className="inline-flex h-11 items-center gap-2 rounded border border-dashed border-white/15 px-3 text-xs text-white/45"
                      title={`Pagina de ${s.label} va fi disponibilă în curând`}
                    >
                      <Icon name={s.icon} size={18} />
                      {s.label} · în curând
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Toate drepturile rezervate.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/politica-de-confidentialitate" className="hover:text-white">
                Politica de confidențialitate
              </Link>
            </li>
            <li>
              <Link to="/politica-cookies" className="hover:text-white">
                Politica cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

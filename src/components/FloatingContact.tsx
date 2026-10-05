import { site, whatsappMessage } from '@/config/site'
import { Icon, WhatsAppIcon } from './Icons'
import { QuoteLink } from './QuoteLink'

/** Desktop: discreet WhatsApp button. Mobile: sticky bottom contact bar. */
export function FloatingContact() {
  return (
    <>
      <a
        href={whatsappMessage()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scrie-ne pe WhatsApp"
        className="group fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-0 overflow-hidden rounded-full bg-[#1f9d55] pl-4 pr-4 text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)] transition-all duration-300 hover:bg-[#18874a] hover:pr-5 md:inline-flex"
      >
        <WhatsAppIcon size={24} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width,margin] duration-300 group-hover:ml-2.5 group-hover:max-w-40 group-focus-visible:ml-2.5 group-focus-visible:max-w-40">
          WhatsApp
        </span>
      </a>

      <nav
        aria-label="Contact rapid"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night/97 pb-[env(safe-area-inset-bottom)] text-white backdrop-blur md:hidden"
      >
        <ul className="grid h-16 grid-cols-3">
          <li>
            <a href={site.phoneHref} className="flex h-full flex-col items-center justify-center gap-1 text-xs font-semibold">
              <Icon name="phone" size={20} className="text-gold" />
              Sună
            </a>
          </li>
          <li className="border-x border-white/10">
            <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col items-center justify-center gap-1 text-xs font-semibold">
              <WhatsAppIcon size={20} className="text-[#25d366]" />
              WhatsApp
            </a>
          </li>
          <li>
            <QuoteLink className="flex h-full flex-col items-center justify-center gap-1 bg-gold text-xs font-bold text-ink">
              <Icon name="offer" size={20} />
              Ofertă
            </QuoteLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

import { site, whatsappMessage } from '@/config/site'
import { Icon, WhatsAppIcon } from './Icons'
import { QuoteLink } from './QuoteLink'
import { ContactRail } from './ContactRail'

/** Desktop: unified contact rail. Mobile: enquiry actions stay within reach. */
export function FloatingContact() {
  return (
    <>
      <ContactRail />

      <nav
        aria-label="Contact rapid"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night pb-[env(safe-area-inset-bottom)] text-white md:hidden"
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
              <WhatsAppIcon size={20} className="text-gold" />
              WhatsApp
            </a>
          </li>
          <li>
            <QuoteLink className="flex h-full flex-col items-center justify-center gap-1 bg-gold text-xs font-bold text-ink">
              <Icon name="offer" size={20} />
              Ofertă gratuită
            </QuoteLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

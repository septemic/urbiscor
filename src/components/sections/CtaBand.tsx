import { site, whatsappMessage } from '@/config/site'
import { Icon, WhatsAppIcon } from '../Icons'
import { Picture } from '../Picture'
import { QuoteLink } from '../QuoteLink'

export function CtaBand() {
  return (
    <section aria-labelledby="cta-titlu" className="relative overflow-hidden bg-night text-white">
      <Picture src="/img/santier.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" widths={[768, 1440, 1920]} sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/90 to-night/60" aria-hidden="true" />
      <div className="grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 id="cta-titlu" className="text-[2.1rem] font-extrabold leading-[1.06] sm:text-5xl lg:text-[3.5rem]" data-reveal>
            Ai proiectul casei?
            <span className="block text-gold">Hai să discutăm construcția.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75" data-reveal>
            Trimite-ne proiectul sau detaliile construcției și solicită o ofertă.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" data-reveal>
            <QuoteLink className="btn btn-gold">
              Solicită ofertă <Icon name="arrow" size={18} className="arrow" />
            </QuoteLink>
            <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
              <WhatsAppIcon size={20} /> WhatsApp
            </a>
            <a href={site.phoneHref} className="inline-flex items-center gap-3 px-2 py-3 font-display text-xl font-bold hover:text-gold sm:ml-4">
              <Icon name="phone" size={22} className="text-gold" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

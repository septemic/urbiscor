import { site, whatsappMessage } from '@/config/site'
import { Icon, WhatsAppIcon } from '../Icons'
import { QuoteForm } from '../QuoteForm'

export function ContactDetails() {
  return (
    <div className="on-dark rounded bg-night p-8 text-white md:p-10">
      <p className="font-display text-sm font-extrabold tracking-[0.18em]">{site.name}</p>
      <dl className="mt-8 space-y-7">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">Persoană de contact</dt>
          <dd className="mt-2 flex items-center gap-3 text-lg font-semibold">
            <Icon name="user" size={22} className="text-gold" />
            {site.contactPerson}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">Telefon / WhatsApp</dt>
          <dd className="mt-2">
            <a href={site.phoneHref} className="flex items-center gap-3 font-display text-2xl font-extrabold hover:text-gold">
              <Icon name="phone" size={22} className="text-gold" />
              {site.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">Zona</dt>
          <dd className="mt-2 flex items-center gap-3 text-lg font-semibold">
            <Icon name="pin" size={22} className="text-gold" />
            Oltenia
          </dd>
        </div>
      </dl>
      <div className="mt-10 grid gap-3">
        <a href={site.phoneHref} className="btn btn-gold w-full">
          <Icon name="phone" size={18} /> Sună acum
        </a>
        <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
          <WhatsAppIcon size={20} /> Scrie pe WhatsApp
        </a>
      </div>
      <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-mist">
        Poți trimite proiectul tehnic sau schițe și fotografii ale terenului direct pe WhatsApp, pentru o ofertă mai exactă.
      </p>
    </div>
  )
}

export function ContactSection({ source, headingLevel = 'h2' }: { source: string; headingLevel?: 'h1' | 'h2' }) {
  const H = headingLevel
  return (
    <section id="oferta" aria-labelledby="oferta-titlu" className="grid-light bg-concrete py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl" data-reveal>
          <p className="eyebrow">Contact</p>
          <H id="oferta-titlu" className="mt-4 text-[2rem] font-extrabold leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]">
            Solicită o ofertă
          </H>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Completează formularul cu detaliile construcției. Ofertarea este gratuită și se face în funcție de proiect și de lucrările solicitate.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8" data-reveal>
            <QuoteForm source={source} />
          </div>
          <aside className="lg:col-span-4" aria-label="Date de contact" data-reveal>
            <ContactDetails />
          </aside>
        </div>
      </div>
    </section>
  )
}

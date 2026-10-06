import { createFileRoute } from '@tanstack/react-router'
import { site, whatsappMessage } from '@/config/site'
import { Icon, WhatsAppIcon } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { ContactSection } from '@/components/sections/ContactSection'
import { ServiceArea } from '@/components/sections/ServiceArea'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead({
      title: 'Contact și ofertă gratuită | URBISCOR CONSTRUCT Oltenia',
      description:
        'Solicită o ofertă gratuită pentru construcția casei la roșu în Oltenia. Telefon și WhatsApp: 0745 013 023 — Tudor Nicolae, URBISCOR CONSTRUCT.',
      path: '/contact',
    }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Hai să discutăm <span className="text-gold">construcția casei tale</span>.
          </>
        }
        intro="Sună, scrie pe WhatsApp sau completează formularul. Ofertarea este gratuită."
      />

      <section aria-label="Contact rapid" className="border-b border-line bg-surface">
        <ul className="container-x grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          <li>
            <a href={site.phoneHref} className="group flex items-center gap-5 py-8 md:px-8 md:first:pl-0">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gold text-ink transition-transform group-hover:-translate-y-0.5">
                <Icon name="phone" size={26} />
              </span>
              <span>
                <span className="block text-sm text-steel">Telefon · {site.contactPerson}</span>
                <span className="block font-display text-xl font-extrabold group-hover:text-gold-deep">{site.phoneDisplay}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-8 md:px-8">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded bg-[#1f9d55] text-white transition-transform group-hover:-translate-y-0.5">
                <WhatsAppIcon size={26} />
              </span>
              <span>
                <span className="block text-sm text-steel">WhatsApp</span>
                <span className="block font-display text-xl font-extrabold group-hover:text-gold-deep">{site.phoneDisplay}</span>
              </span>
            </a>
          </li>
          <li className="flex items-center gap-5 py-8 md:px-8">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded bg-night text-gold">
              <Icon name="pin" size={26} />
            </span>
            <span>
              <span className="block text-sm text-steel">Zona de lucru</span>
              <span className="block font-display text-xl font-extrabold">Oltenia, România</span>
            </span>
          </li>
        </ul>
      </section>

      <ContactSection source="pagina-contact" />
      <ServiceArea />
    </>
  )
}

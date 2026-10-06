import { Link, createFileRoute } from '@tanstack/react-router'
import { site, whatsappMessage } from '@/config/site'
import { Gallery } from '@/components/Gallery'
import { Icon, WhatsAppIcon } from '@/components/Icons'
import { Picture } from '@/components/Picture'
import { QuoteLink } from '@/components/QuoteLink'
import { SectionHeading } from '@/components/SectionHeading'
import { ContactSection } from '@/components/sections/ContactSection'
import { CtaBand } from '@/components/sections/CtaBand'
import { Equipment } from '@/components/sections/Equipment'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { ServiceArea } from '@/components/sections/ServiceArea'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { TrustBar } from '@/components/sections/TrustBar'
import { WhyUs } from '@/components/sections/WhyUs'
import { pageHead } from '@/lib/seo'

const HERO = '/img/hero.jpg'
const HERO_WIDTHS = [640, 960, 1376]
const HERO_QUALITY = 55

export const Route = createFileRoute('/')({
  head: () => pageHead({
    title: 'URBISCOR CONSTRUCT | Construcții Case la Roșu în Oltenia',
    description:
      'URBISCOR CONSTRUCT execută case la roșu, fundații, structuri din beton armat, cofrare și zidărie în Oltenia. Sistem Doka propriu. Solicită ofertă.',
    path: '/',
  }),
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <Equipment />
      <ProcessTimeline />
      <section id="proiecte" aria-labelledby="proiecte-titlu" className="bg-surface pb-20 md:pb-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 border-t border-line pt-20 md:flex-row md:items-end md:pt-28">
            <SectionHeading
              id="proiecte-titlu"
              eyebrow="Portofoliu"
              title="Lucrări URBISCOR CONSTRUCT"
              subtitle="Etape de execuție: fundații, structuri din beton armat, cofraje și zidărie."
            />
            <Link to="/proiecte" className="btn btn-outline-dark shrink-0 self-start md:self-auto" data-reveal>
              Vezi toate proiectele <Icon name="arrow" size={18} className="arrow" />
            </Link>
          </div>
          <div className="mt-10">
            <Gallery layout="feature" limit={7} />
          </div>
        </div>
      </section>
      <WhyUs />
      <ServiceArea />
      <CtaBand />
      <ContactSection source="pagina-principala" />
    </>
  )
}

function Hero() {
  return (
    <section id="acasa" aria-labelledby="hero-titlu" className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-night text-white h-[100svh] max-h-[980px]">
      <Picture
        src={HERO}
        alt="Casă în construcție în stadiul la roșu, cu structură din beton armat, cofraj Doka, popi metalici și schelă"
        widths={HERO_WIDTHS}
        quality={HERO_QUALITY}
        priority
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/30" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/85 via-night/40 to-transparent" aria-hidden="true" />
      <div className="grid-dark pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <div className="container-x pb-12 pt-32 md:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow on-dark">{site.name}</p>
            <h1 id="hero-titlu" className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.6rem]">
              Construim case <span className="text-gold">la roșu</span>.
              <span className="mt-3 block text-[1.35rem] font-bold leading-snug text-white/85 sm:text-3xl lg:text-[2.1rem]">
                Corect. Organizat. De la fundație la structură.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/80 sm:text-lg">
              Executăm construcții rezidențiale în Oltenia, cu echipamente proprii, sistem profesional Doka și atenție la fiecare etapă a structurii.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteLink className="btn btn-gold">
                Solicită ofertă gratuită <Icon name="arrow" size={18} className="arrow" />
              </QuoteLink>
              <Link to="/servicii" className="btn btn-outline-light">
                Vezi serviciile
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.95rem] text-white/85">
              <li className="inline-flex items-center gap-2">
                <Icon name="pin" size={20} className="text-gold" /> Oltenia
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 font-semibold hover:text-gold">
                  <Icon name="phone" size={20} className="text-gold" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:text-gold">
                  <WhatsAppIcon size={20} className="text-[#25d366]" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <aside aria-label="Dotări proprii" className="hidden lg:col-span-4 lg:block">
            <div className="ticks border border-white/15 bg-night/55 p-7 backdrop-blur-sm">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-gold">Pe șantier, cu echipamente proprii</p>
              <ul className="mt-5 divide-y divide-white/10">
                {['Sistem profesional Doka', 'Popi metalici proprii', 'Schelă proprie', 'Ofertare gratuită'].map((t) => (
                  <li key={t} className="flex items-center gap-3 py-3 text-[0.95rem] font-medium">
                    <Icon name="check" size={18} className="text-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { serviceDetails } from '@/data/services'
import { Icon } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { Picture } from '@/components/Picture'
import { QuoteLink } from '@/components/QuoteLink'
import { CtaBand } from '@/components/sections/CtaBand'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/servicii')({
  head: () =>
    pageHead({
      title: 'Servicii construcții case la roșu, fundații și structuri | URBISCOR CONSTRUCT',
      description:
        'Construcții la roșu, fundații, structuri din beton armat, cofrare cu sistem Doka, turnare beton și zidărie BCA sau cărămidă. Execuție organizată în Oltenia.',
      path: '/servicii',
    }),
  component: ServicesPage,
})

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicii"
        title={
          <>
            Servicii de construcții, <span className="text-gold">de la fundație</span> până la structură.
          </>
        }
        intro="Executăm etapele de structură ale caselor din Oltenia, conform proiectului tehnic, cu sistem de cofrare Doka, popi metalici și schelă proprii."
        image="/img/structuri.jpg"
      />

      {/* Quick index */}
      <nav aria-label="Cuprins servicii" className="sticky top-[68px] z-30 border-b border-line bg-surface/95 backdrop-blur">
        <ul className="container-x flex gap-1 overflow-x-auto py-3">
          {serviceDetails.map((s) => (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} className="block rounded px-3 py-2 text-sm font-semibold text-steel transition-colors hover:bg-concrete hover:text-foreground">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-surface">
        {serviceDetails.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-titlu`} className={`scroll-mt-36 py-16 md:py-24 ${i % 2 === 1 ? 'bg-concrete' : ''}`}>
            <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''} data-reveal>
                <div className="img-zoom ticks overflow-hidden rounded">
                  <Picture src={s.image} alt={s.imageAlt} ratio={4 / 3} widths={[480, 768, 1080, 1440]} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                </div>
              </div>
              <div data-reveal>
                <div className="flex items-center gap-4">
                  <Icon name={s.icon} size={40} className="text-gold-deep" />
                  <span className="font-display text-sm font-bold tracking-widest text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h2 id={`${s.id}-titlu`} className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-steel">{s.intro}</p>
                <h3 className="mt-8 font-display text-xs font-bold uppercase tracking-[0.22em] text-foreground">Ce include lucrarea</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {s.includes.map((x) => (
                    <li key={x} className="flex items-start gap-3 text-[0.95rem] leading-snug">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                      {x}
                    </li>
                  ))}
                </ul>
                <QuoteLink className="btn btn-dark mt-9 !whitespace-normal text-left">
                  Solicită ofertă pentru {s.title.toLowerCase().replace('sistem doka propriu', 'cofrare Doka')}
                  <Icon name="arrow" size={18} className="arrow" />
                </QuoteLink>
              </div>
            </div>
          </section>
        ))}
      </div>

      <ProcessTimeline />
      <CtaBand />
    </>
  )
}

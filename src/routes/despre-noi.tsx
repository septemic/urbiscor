import { createFileRoute } from '@tanstack/react-router'
import { Icon, type IconName } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { Picture } from '@/components/Picture'
import { CtaBand } from '@/components/sections/CtaBand'
import { Equipment } from '@/components/sections/Equipment'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/despre-noi')({
  head: () =>
    pageHead({
      title: 'Despre noi | URBISCOR CONSTRUCT — firmă de construcții în Oltenia',
      description:
        'URBISCOR CONSTRUCT este o firmă de construcții din Oltenia orientată către execuția caselor la roșu, cu sistem de cofrare Doka, popi metalici și schelă proprii.',
      path: '/despre-noi',
    }),
  component: AboutPage,
})

const principles: { icon: IconName; title: string; text: string }[] = [
  { icon: 'plan', title: 'Organizarea șantierului', text: 'Materialele, echipamentele și etapele de lucru sunt stabilite înainte de începerea execuției.' },
  { icon: 'ruler', title: 'Execuția corectă a etapelor', text: 'Lucrăm conform proiectului tehnic, în ordinea corectă: fundație, structură, zidărie.' },
  { icon: 'chat', title: 'Comunicare directă', text: 'Discuți direct cu persoana care coordonează lucrarea, fără intermediari.' },
  { icon: 'shield', title: 'Seriozitate și transparență', text: 'Oferta pornește de la proiect și de la lucrările solicitate, explicate clar.' },
]

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Despre noi"
        title={
          <>
            Construcții rezidențiale, <span className="text-gold">executate organizat</span>.
          </>
        }
        image="/img/santier.jpg"
      />

      <section aria-labelledby="despre-titlu" className="bg-surface py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow">URBISCOR CONSTRUCT</p>
            <h2 id="despre-titlu" className="mt-4 text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
              O companie orientată către execuția structurilor la roșu.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-steel">
              <p>
                URBISCOR CONSTRUCT este o companie orientată către execuția construcțiilor rezidențiale și a structurilor la roșu.
              </p>
              <p>Punem accent pe organizarea șantierului, execuția corectă a etapelor și comunicarea directă cu beneficiarul.</p>
              <p>Dispunem de echipamente proprii, inclusiv sistem profesional de cofrare Doka, popi metalici și schelă.</p>
            </div>
          </div>
          <div className="lg:col-span-5" data-reveal>
            <div className="ticks overflow-hidden rounded">
              <Picture src="/img/zidarie.jpg" alt="Execuție zidărie din BCA între stâlpi din beton armat" ratio={4 / 5} widths={[480, 768, 1080]} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="principii-titlu" className="grid-light bg-concrete py-20 md:py-28">
        <div className="container-x">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Cum gândim lucrarea</p>
            <h2 id="principii-titlu" className="mt-4 text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
              Ce urmărim pe fiecare șantier
            </h2>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.title} className="rounded border border-line bg-surface p-7 transition-transform duration-300 hover:-translate-y-1" data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
                <Icon name={p.icon} size={40} className="text-gold-deep" />
                <h3 className="mt-6 text-lg font-extrabold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-steel">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Equipment />
      <ProcessTimeline />
      <CtaBand />
    </>
  )
}

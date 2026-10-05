import { Icon, type IconName } from '../Icons'
import { Picture } from '../Picture'
import { QuoteLink } from '../QuoteLink'

const equipment: { icon: IconName; title: string; text: string }[] = [
  { icon: 'formwork', title: 'Sistem Doka propriu', text: 'Cofraj profesional pentru plăci, cu grinzi și accesorii de sistem.' },
  { icon: 'props', title: 'Popi metalici', text: 'Susținere telescopică pentru cofrajele plăcilor și grinzilor.' },
  { icon: 'scaffold', title: 'Schelă proprie', text: 'Lucru sigur la înălțime pentru zidărie și elementele structurale.' },
  { icon: 'crane', title: 'Echipamente de șantier', text: 'Utilaje și scule necesare etapelor de structură.' },
]

export function Equipment() {
  return (
    <section aria-labelledby="echipamente-titlu" className="on-dark relative overflow-hidden bg-night py-20 text-white md:py-28">
      <div className="grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>
            Echipamente proprii
          </p>
          <h2 id="echipamente-titlu" className="mt-5 text-[2rem] font-extrabold leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]" data-reveal>
            Nu venim doar cu manopera.
            <span className="block text-white/55">Venim pregătiți pentru șantier.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist" data-reveal>
            URBISCOR CONSTRUCT deține echipamentele esențiale folosite la execuția structurii. Echipamentele proprii ne permit să organizăm mai
            eficient lucrările și să reducem dependența de închirieri pentru echipamentele principale.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-2">
            {equipment.map((e, i) => (
              <li key={e.title} className="bg-night p-6 transition-colors hover:bg-[#151e28]" data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
                <Icon name={e.icon} size={36} className="text-gold" />
                <h3 className="mt-4 text-lg font-bold">{e.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{e.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10" data-reveal>
            <QuoteLink className="btn btn-gold">
              Solicită ofertă gratuită <Icon name="arrow" size={18} className="arrow" />
            </QuoteLink>
          </div>
        </div>

        <div className="relative" data-reveal>
          <div className="ticks relative overflow-hidden rounded">
            <Picture
              src="/img/cofraje.jpg"
              alt="Sistem de cofrare Doka pentru placă, susținut de popi metalici telescopici"
              ratio={4 / 5}
              widths={[480, 768, 1080]}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-56 overflow-hidden rounded border-4 border-night shadow-2xl sm:block md:-left-10 md:w-64">
            <Picture src="/img/schela.jpg" alt="Popi metalici, panouri de cofraj și schelă depozitate ordonat" ratio={4 / 3} widths={[320, 640]} sizes="256px" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

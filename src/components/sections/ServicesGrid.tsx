import { Link } from '@tanstack/react-router'
import { serviceCards } from '@/data/services'
import { Icon } from '../Icons'
import { SectionHeading } from '../SectionHeading'

export function ServicesGrid() {
  return (
    <section id="servicii" aria-labelledby="servicii-titlu" className="grid-light bg-concrete py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading id="servicii-titlu" eyebrow="Servicii" title="Servicii de construcții" subtitle="De la fundație până la finalizarea structurii." />
          <Link to="/servicii" className="btn btn-outline-dark shrink-0 self-start md:self-auto" data-reveal>
            Toate serviciile <Icon name="arrow" size={18} className="arrow" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {serviceCards.map((s, i) => (
            <li key={s.n} className="group relative bg-white p-7 transition-colors duration-300 hover:bg-night md:p-9" data-reveal style={{ ['--reveal-delay' as string]: `${(i % 3) * 80}ms` }}>
              <div className="flex items-start justify-between">
                <Icon name={s.icon} size={44} className="text-ink transition-colors duration-300 group-hover:text-gold" />
                <span className="font-display text-sm font-bold tracking-widest text-gold-deep transition-colors group-hover:text-gold">{s.n}</span>
              </div>
              <h3 className="mt-8 text-xl font-extrabold leading-snug transition-colors group-hover:text-white">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-steel transition-colors group-hover:text-mist">{s.text}</p>
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gold transition-[width] duration-500 group-hover:w-full" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

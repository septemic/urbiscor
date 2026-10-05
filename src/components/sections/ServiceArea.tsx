import { site } from '@/config/site'
import { Icon } from '../Icons'
import { OlteniaMap } from './OlteniaMap'

export function ServiceArea() {
  return (
    <section id="zona" aria-labelledby="zona-titlu" className="on-dark relative overflow-hidden bg-ink py-20 text-white md:py-28">
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>
            Zona de lucru
          </p>
          <h2 id="zona-titlu" className="mt-5 text-[2rem] font-extrabold leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]" data-reveal>
            Construim în Oltenia
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist" data-reveal>
            URBISCOR CONSTRUCT execută lucrări de construcții rezidențiale în Oltenia. Pentru proiecte din alte zone, contactează-ne pentru a verifica
            disponibilitatea.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
            <a href={site.phoneHref} className="btn btn-outline-light">
              <Icon name="phone" size={18} /> Verifică disponibilitatea
            </a>
          </div>
        </div>
        <div className="ticks rounded border border-white/10 bg-night p-4 md:p-8" data-reveal>
          <OlteniaMap className="h-auto w-full" />
        </div>
      </div>
    </section>
  )
}

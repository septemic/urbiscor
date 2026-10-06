import { Link } from '@tanstack/react-router'
import { servicePaths, type ServiceId } from '@/config/servicePaths'
import { serviceDetails } from '@/data/services'
import { servicePages } from '@/data/servicePages'
import { serviceMetadata } from '@/config/serviceMetadata'
import { site } from '@/config/site'
import { Icon } from './Icons'
import { PageHero } from './PageHero'
import { Picture } from './Picture'
import { QuoteLink } from './QuoteLink'
import { CtaBand } from './sections/CtaBand'

/** Prerendered guidance and native disclosures; no extra interaction runtime. */
export function ServicePage({ id }: { id: ServiceId }) {
  const page = { ...serviceMetadata[id], ...servicePages[id] }
  const detail = serviceDetails.find((service) => service.id === id)!
  return (
    <>
      <PageHero eyebrow="Servicii de construcții" title={`${page.title} în Oltenia`} intro={detail.intro}>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <QuoteLink className="btn btn-gold">Solicită ofertă gratuită <Icon name="arrow" size={18} /></QuoteLink>
          <a href={site.phoneHref} className="inline-flex items-center gap-2 py-2 font-semibold hover:text-gold">
            <Icon name="phone" size={20} /> {site.phoneDisplay}
          </a>
        </div>
      </PageHero>
      <section className="bg-surface py-12 md:py-20" aria-labelledby="lucrare-titlu">
        <div className="container-x">
          <nav aria-label="Fir de navigare" className="mb-10 text-sm text-steel">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="underline underline-offset-4 hover:text-foreground">Acasă</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/servicii" className="underline underline-offset-4 hover:text-foreground">Servicii</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{page.title}</li>
            </ol>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="lucrare-titlu" className="text-3xl font-extrabold">Ce include lucrarea</h2>
              <ul className="mt-6 space-y-4">
                {detail.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg text-steel">
                    <Icon name="check" size={20} className="mt-1 shrink-0 text-gold-deep" /> {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-steel">Lucrările incluse în ofertă se stabilesc în funcție de proiectul tehnic și de stadiul construcției.</p>
            </div>
            <figure className="ticks overflow-hidden rounded border border-line">
              <Picture src={detail.image} alt={`Imagine ilustrativă: ${detail.imageAlt}`} widths={[480, 768, 1080]} sizes="(min-width: 1024px) 50vw, 100vw" ratio={4 / 3} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="bg-concrete px-4 py-3 text-xs text-steel">Imagine ilustrativă. Pentru fotografii din lucrări, contactează-ne.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="grid-light bg-concrete py-16 md:py-24" aria-labelledby="pregatire-titlu">
        <div className="container-x">
          <h2 id="pregatire-titlu" className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Ce este util să știi înainte de execuție</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {page.guidance.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-extrabold">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-steel">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface py-16 md:py-24" aria-labelledby="intrebari-titlu">
        <div className="container-x">
          <h2 id="intrebari-titlu" className="text-3xl font-extrabold sm:text-4xl">Întrebări despre {page.title.toLocaleLowerCase('ro')}</h2>
          <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
            {page.questions.map((item) => (
              <details key={item.question} className="py-5">
                <summary className="cursor-pointer font-display text-lg font-bold marker:text-gold-deep">{item.question}</summary>
                <p className="mt-4 leading-relaxed text-steel">{item.answer}</p>
              </details>
            ))}
          </div>
          <nav aria-label="Alte servicii" className="mt-12">
            <h2 className="text-xl font-extrabold">Alte etape ale construcției</h2>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {(Object.keys(servicePages) as ServiceId[]).filter((other) => other !== id).map((other) => (
                <li key={other}><Link to={servicePaths[other]} className="font-semibold text-gold-deep underline underline-offset-4">{serviceMetadata[other].title}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

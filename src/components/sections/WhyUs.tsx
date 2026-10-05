import { Icon, type IconName } from '../Icons'
import { Picture } from '../Picture'
import { SectionHeading } from '../SectionHeading'

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: 'props', title: 'Echipamente proprii', text: 'Mai mult control asupra organizării șantierului.' },
  { icon: 'steps', title: 'Execuție organizată', text: 'Fiecare etapă este abordată în ordinea corectă.' },
  { icon: 'chat', title: 'Comunicare directă', text: 'Beneficiarul știe ce etapă se execută și ce urmează.' },
  { icon: 'offer', title: 'Ofertare transparentă', text: 'Oferta este stabilită în funcție de proiect și lucrările solicitate.' },
]

export function WhyUs() {
  return (
    <section aria-labelledby="de-ce-titlu" className="bg-concrete py-20 md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="de-ce-titlu" eyebrow="Seriozitate" title="De ce URBISCOR CONSTRUCT?" subtitle="O casă se construiește o singură dată. Structura trebuie executată corect, etapă cu etapă." />
          <div className="img-zoom mt-10 hidden overflow-hidden rounded lg:block" data-reveal>
            <Picture src="/img/structuri.jpg" alt="Stâlpi din beton armat și armătură pregătită pentru etapa următoare" ratio={4 / 3} widths={[480, 768, 1080]} sizes="40vw" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:self-center">
          {reasons.map((r, i) => (
            <li key={r.title} className="ticks rounded border border-line bg-white p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8" data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
              <Icon name={r.icon} size={40} className="text-gold-deep" />
              <h3 className="mt-6 text-xl font-extrabold">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-steel">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

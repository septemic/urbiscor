import { Icon, type IconName } from '../Icons'

const items: { icon: IconName; label: string; text: string }[] = [
  { icon: 'formwork', label: 'Sistem Doka propriu', text: 'Cofraje profesionale pentru plăci' },
  { icon: 'props', label: 'Echipamente proprii', text: 'Popi metalici și schelă' },
  { icon: 'offer', label: 'Ofertare gratuită', text: 'În funcție de proiect' },
  { icon: 'pin', label: 'Lucrări în Oltenia', text: 'Construcții rezidențiale' },
]

export function TrustBar() {
  return (
    <section aria-label="Avantaje principale" className="relative z-10 border-b border-line bg-white">
      <div className="container-x">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <li
              key={it.label}
              className={`flex items-center gap-4 py-6 md:py-8 ${i % 2 === 1 ? 'pl-4 sm:pl-6' : 'pr-4'} ${i < 2 ? 'border-b border-line lg:border-b-0' : ''} ${
                i % 2 === 0 ? 'border-r border-line' : ''
              } lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0`}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
            >
              <Icon name={it.icon} size={36} className="hidden shrink-0 text-gold-deep sm:block" />
              <div>
                <Icon name={it.icon} size={28} className="mb-2 text-gold-deep sm:hidden" />
                <p className="font-display text-[0.95rem] font-bold leading-tight md:text-base">{it.label}</p>
                <p className="mt-1 text-xs text-steel md:text-sm">{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

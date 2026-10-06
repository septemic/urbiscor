import { SectionHeading } from '../SectionHeading'

export const processSteps = [
  { title: 'Discuție și analiză', text: 'Analizăm proiectul și cerințele construcției.' },
  { title: 'Ofertare', text: 'Pregătim oferta în funcție de proiect și etapele care trebuie executate.' },
  { title: 'Organizarea șantierului', text: 'Stabilim necesarul de materiale, echipamente și etapele de lucru.' },
  { title: 'Execuția structurii', text: 'Realizăm lucrările conform proiectului tehnic.' },
  { title: 'Verificarea etapelor', text: 'Urmărim execuția și menținem comunicarea cu beneficiarul.' },
  { title: 'Predarea lucrării', text: 'Finalizăm etapa contractată și verificăm lucrarea împreună cu beneficiarul.' },
]

export function ProcessTimeline() {
  return (
    <section id="proces" aria-labelledby="proces-titlu" className="bg-surface py-20 md:py-28">
      <div className="container-x">
        <SectionHeading id="proces-titlu" eyebrow="Proces" title="Cum lucrăm" subtitle="Fiecare proiect trece prin aceleași etape clare, de la prima discuție până la predarea lucrării." />

        <ol className="relative mt-14 grid gap-0 md:mt-20 md:grid-cols-3 lg:grid-cols-6">
          {/* Horizontal rail on large screens */}
          <span className="absolute left-0 right-0 top-[22px] hidden h-px bg-line lg:block" aria-hidden="true" />
          {processSteps.map((s, i) => (
            <li
              key={s.title}
              className="relative border-l border-line pb-10 pl-8 last:pb-0 md:border-l-0 md:pb-12 md:pl-0 md:pr-8 lg:pb-0 lg:pr-6"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
            >
              <span className="absolute -left-[23px] top-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface font-display text-sm font-extrabold text-foreground md:relative md:left-0 md:mb-6">
                <span className="absolute inset-1 rounded-full border border-gold/60" aria-hidden="true" />
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="pt-2 text-lg font-extrabold leading-snug md:pt-0">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-steel">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { site, whatsappMessage } from '@/config/site'
import { Gallery } from '@/components/Gallery'
import { WhatsAppIcon } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/proiecte')({
  head: () =>
    pageHead({
      title: 'Proiecte: case la roșu, fundații și structuri | URBISCOR CONSTRUCT',
      description:
        'Etape de execuție URBISCOR CONSTRUCT: fundații, structuri din beton armat, cofraje Doka, zidărie și case la roșu în Oltenia.',
      path: '/proiecte',
    }),
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Proiecte"
        title="Lucrări URBISCOR CONSTRUCT"
        intro="Fundații, structuri din beton armat, cofraje și zidărie — etapele prin care trece o casă la roșu. Apasă pe orice imagine pentru a o vedea mărită."
        image="/img/casa-rosu.jpg"
      />
      <section aria-label="Galerie lucrări" className="bg-white py-16 md:py-24">
        <div className="container-x">
          <Gallery layout="grid" />
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded border border-line bg-concrete p-7 md:flex-row md:items-center md:p-9" data-reveal>
            <div>
              <h2 className="text-xl font-extrabold">Vrei să vezi lucrări similare proiectului tău?</h2>
              <p className="mt-2 text-steel">Scrie-ne pe WhatsApp și îți trimitem fotografii din etapele de execuție relevante.</p>
            </div>
            <a href={whatsappMessage('Bună ziua! Aș dori să văd lucrări similare proiectului meu.')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp shrink-0">
              <WhatsAppIcon size={20} /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

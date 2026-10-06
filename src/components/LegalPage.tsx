import type { ReactNode } from 'react'
import { PageHero } from './PageHero'

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Informații legale" title={title} intro={`Ultima actualizare: ${updated}`} />
      <section className="bg-surface py-16 md:py-24">
        <div className="container-x">
          <article className="prose-legal max-w-3xl">{children}</article>
        </div>
      </section>
    </>
  )
}

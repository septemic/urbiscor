import type { ReactNode } from 'react'
import { Picture } from './Picture'

/** Dark header band for inner pages. */
export function PageHero({ eyebrow, title, intro, image, imageAlt = '', children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; image?: string; imageAlt?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-night pb-16 pt-36 text-white md:pb-24 md:pt-48">
      {image && (
        <>
          <Picture src={image} alt={imageAlt} priority className="absolute inset-0 h-full w-full object-cover opacity-30" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/40" aria-hidden="true" />
        </>
      )}
      <div className="grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <p className="eyebrow on-dark">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-[2.4rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.75rem]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0" aria-hidden="true" />
    </section>
  )
}

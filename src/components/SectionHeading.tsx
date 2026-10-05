import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark,
  align = 'left',
  as: H = 'h2',
  id,
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  dark?: boolean
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`} data-reveal>
      {eyebrow && <p className={`eyebrow ${dark ? 'on-dark' : ''}`}>{eyebrow}</p>}
      <H id={id} className={`mt-4 text-[2rem] font-extrabold leading-[1.08] sm:text-[2.6rem] lg:text-[3rem] ${dark ? 'text-white' : 'text-ink'}`}>{title}</H>
      {subtitle && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-mist' : 'text-steel'}`}>{subtitle}</p>}
    </div>
  )
}

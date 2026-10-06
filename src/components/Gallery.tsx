import { useMemo, useState } from 'react'
import { projectCategories, projects, type ProjectCategory } from '@/data/projects'
import { Lightbox } from './Lightbox'
import { Picture } from './Picture'
import { Icon } from './Icons'

const gridSizes = '(min-width: 1240px) 382px, (min-width: 1024px) calc((100vw - 96px) / 3), (min-width: 768px) calc((100vw - 80px) / 2), (min-width: 640px) calc((100vw - 52px) / 2), calc(100vw - 40px)'
const featureSizes = '(min-width: 1240px) 282px, (min-width: 1024px) calc((100vw - 112px) / 4), (min-width: 768px) calc((100vw - 80px) / 2), (min-width: 640px) calc((100vw - 52px) / 2), calc(100vw - 40px)'
const wideFeatureSizes = '(min-width: 1240px) 580px, (min-width: 1024px) calc((100vw - 80px) / 2), (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)'

/**
 * Filterable portfolio grid with lightbox.
 * `layout="feature"` = large editorial tiles (homepage); `"grid"` = even grid (/proiecte).
 */
export function Gallery({ layout = 'grid', limit, dark }: { layout?: 'feature' | 'grid'; limit?: number; dark?: boolean }) {
  const [filter, setFilter] = useState<ProjectCategory | 'Toate'>('Toate')
  const [open, setOpen] = useState<number | null>(null)

  const items = useMemo(() => {
    const list = filter === 'Toate' ? projects : projects.filter((p) => p.category === filter)
    return limit ? list.slice(0, limit) : list
  }, [filter, limit])

  const filters: (ProjectCategory | 'Toate')[] = ['Toate', ...projectCategories]

  // Feature layout (7 tiles on 4 columns): one large 2×2 tile, four singles, then two wide tiles
  const tileClass = (i: number) =>
    layout === 'feature' ? (i === 0 ? 'sm:col-span-2 sm:row-span-2' : i >= 5 ? 'sm:col-span-2' : '') : ''

  return (
    <div>
      <div role="group" aria-label="Filtrează lucrările după categorie" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2" data-reveal>
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`h-10 shrink-0 rounded border px-4 text-sm font-semibold transition-colors ${
              dark
                ? 'border-white/15 text-white/75 hover:border-white/40 hover:text-white aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-ink'
                : 'border-line text-steel hover:border-foreground hover:text-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-surface'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className={`mt-8 rounded border border-dashed p-10 text-center ${dark ? 'border-white/15 text-mist' : 'border-line text-steel'}`}>
          Fotografiile din această categorie vor fi adăugate în curând.
        </p>
      ) : (
        <ul className={`mt-6 grid auto-rows-[260px] gap-3 sm:grid-cols-2 md:gap-4 ${layout === 'feature' ? 'md:auto-rows-[280px] lg:grid-cols-4' : 'md:auto-rows-[320px] lg:grid-cols-3'}`}>
          {items.map((p, i) => (
            <li key={p.id} className={tileClass(i)}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="img-zoom group relative block h-full w-full overflow-hidden rounded bg-night text-left"
                aria-label={`Deschide imaginea: ${p.alt}`}
              >
                <Picture
                  src={p.src}
                  alt={p.alt}
                  widths={[320, 480, 640, 768, 1080, 1440]}
                  sizes={layout === 'feature'
                    ? i === 0 || i >= 5 ? wideFeatureSizes : featureSizes
                    : gridSizes}
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/0 to-night/0 opacity-90 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white md:p-5">
                  <span>
                    <span className="block font-display text-sm font-bold tracking-wide">{p.category}</span>
                    {p.placeholder && <span className="mt-0.5 block text-xs text-white/60">Imagine ilustrativă</span>}
                  </span>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-white/30 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink" aria-hidden="true">
                    <Icon name="arrow" size={16} className="-rotate-45" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  )
}

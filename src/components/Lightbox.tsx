import { useEffect, useRef } from 'react'
import type { Project } from '@/data/projects'
import { cdn } from '@/lib/image'
import { Icon } from './Icons'
import { setSmoothScrollLock } from '@/lib/smoothScroll'

export function Lightbox({ items, index, onClose, onIndex }: { items: Project[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const item = items[index]

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'
    setSmoothScrollLock(true)
    return () => {
      document.body.style.overflow = ''
      setSmoothScrollLock(false)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, onIndex])

  if (!item) return null

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label={`Imagine ${index + 1} din ${items.length}: ${item.alt}`}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-night-2/96 p-0 text-white backdrop:bg-night-2/90"
    >
      <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-5">
          <p className="text-sm text-white/70">
            <span className="font-display font-bold text-gold">{String(index + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')} · {item.category}
          </p>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-white/10" aria-label="Închide galeria" autoFocus>
            <Icon name="close" size={26} />
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <img
            key={item.id}
            src={cdn(item.src, 1920, { q: 80 })}
            srcSet={`${cdn(item.src, 1080, { q: 78 })} 1080w, ${cdn(item.src, 1920, { q: 80 })} 1920w`}
            sizes="100vw"
            alt={item.alt}
            className="max-h-full max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => onIndex((index - 1 + items.length) % items.length)}
            className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-night/70 hover:bg-gold hover:text-ink md:left-6"
            aria-label="Imaginea anterioară"
          >
            <Icon name="chevronLeft" size={24} />
          </button>
          <button
            type="button"
            onClick={() => onIndex((index + 1) % items.length)}
            className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-night/70 hover:bg-gold hover:text-ink md:right-6"
            aria-label="Imaginea următoare"
          >
            <Icon name="chevronRight" size={24} />
          </button>
        </div>
        <p className="px-4 py-4 text-center text-sm text-white/70 md:py-6">
          {item.alt}
          {item.placeholder && <span className="ml-2 text-white/40">· Imagine ilustrativă</span>}
        </p>
      </div>
    </dialog>
  )
}

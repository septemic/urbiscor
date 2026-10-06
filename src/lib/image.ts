/** Builds a Netlify Image CDN URL so pages never ship full-resolution originals. */
type ImageOptions = { h?: number; q?: number; format?: 'avif' | 'webp' }

export function cdn(src: string, width: number, opts: ImageOptions = {}) {
  const params = new URLSearchParams({ url: src, w: String(width) })
  if (opts.h) {
    params.set('h', String(opts.h))
    params.set('fit', 'cover')
  }
  params.set('q', String(opts.q ?? 72))
  if (opts.format) params.set('fm', opts.format)
  return `/.netlify/images?${params.toString()}`
}

export function srcSet(src: string, widths: number[], ratio?: number, opts: Omit<ImageOptions, 'h'> = {}) {
  return widths
    .map((w) => `${cdn(src, w, { ...opts, ...(ratio ? { h: Math.round(w / ratio) } : {}) })} ${w}w`)
    .join(', ')
}

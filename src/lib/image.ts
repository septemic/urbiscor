/** Builds a Netlify Image CDN URL so pages never ship full-resolution originals. */
export function cdn(src: string, width: number, opts: { h?: number; q?: number } = {}) {
  const params = new URLSearchParams({ url: src, w: String(width) })
  if (opts.h) {
    params.set('h', String(opts.h))
    params.set('fit', 'cover')
  }
  params.set('q', String(opts.q ?? 72))
  // No `fm` — the CDN negotiates AVIF/WebP from the browser's Accept header.
  return `/.netlify/images?${params.toString()}`
}

export function srcSet(src: string, widths: number[], ratio?: number) {
  return widths
    .map((w) => `${cdn(src, w, ratio ? { h: Math.round(w / ratio) } : {})} ${w}w`)
    .join(', ')
}

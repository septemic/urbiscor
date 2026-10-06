import type { ImgHTMLAttributes } from 'react'
import { preload } from 'react-dom'
import { cdn, srcSet } from '@/lib/image'

type Props = {
  src: string
  alt: string
  /** Rendered aspect ratio (width / height) — the CDN crops to it. Omit to keep the original ratio. */
  ratio?: number
  sizes?: string
  widths?: number[]
  priority?: boolean
  quality?: number
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'>

/** Responsive AVIF with a CDN-negotiated fallback for older browsers. */
export function Picture({ src, alt, ratio, sizes = '100vw', widths = [480, 768, 1080, 1440, 1920], priority, quality = 65, ...rest }: Props) {
  const fallbackW = widths[Math.min(2, widths.length - 1)]
  const options = { q: quality, ...(ratio ? { h: Math.round(fallbackW / ratio) } : {}) }
  const avifSrcSet = srcSet(src, widths, ratio, { q: quality, format: 'avif' })
  if (priority) {
    preload(cdn(src, fallbackW, { ...options, format: 'avif' }), {
      as: 'image', type: 'image/avif', imageSrcSet: avifSrcSet, imageSizes: sizes, fetchPriority: 'high',
    })
  }
  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <img
        src={cdn(src, fallbackW, options)}
        srcSet={srcSet(src, widths, ratio, { q: quality })}
        sizes={sizes}
        alt={alt}
        width={ratio ? fallbackW : undefined}
        height={ratio ? Math.round(fallbackW / ratio) : undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        {...rest}
      />
    </picture>
  )
}

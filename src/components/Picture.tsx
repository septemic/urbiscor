import type { ImgHTMLAttributes } from 'react'
import { cdn, srcSet } from '@/lib/image'

type Props = {
  src: string
  alt: string
  /** Rendered aspect ratio (width / height) — the CDN crops to it. Omit to keep the original ratio. */
  ratio?: number
  sizes?: string
  widths?: number[]
  priority?: boolean
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'>

/** Responsive image served through Netlify Image CDN (AVIF/WebP negotiated). */
export function Picture({ src, alt, ratio, sizes = '100vw', widths = [480, 768, 1080, 1440, 1920], priority, ...rest }: Props) {
  const fallbackW = widths[Math.min(2, widths.length - 1)]
  return (
    <img
      src={cdn(src, fallbackW, ratio ? { h: Math.round(fallbackW / ratio) } : {})}
      srcSet={srcSet(src, widths, ratio)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  )
}

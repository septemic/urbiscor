import type { ImgHTMLAttributes } from 'react'
import { preload } from 'react-dom'
import { imageSrc } from '@/lib/image'

type Props = {
  src: string
  alt: string
  /** Retained for call-site compatibility; layout is handled by the surrounding CSS (aspect-* classes). */
  ratio?: number
  sizes?: string
  widths?: number[]
  priority?: boolean
  quality?: number
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'>

/** Image served directly from /public (no platform image CDN). */
export function Picture({ src, alt, priority, ratio, sizes, widths, quality, ...rest }: Props) {
  // Kept in the signature so existing call sites keep working; unused here.
  void ratio
  void sizes
  void widths
  void quality
  const url = imageSrc(src)
  if (priority) preload(url, { as: 'image', fetchPriority: 'high' })
  return (
    <img
      src={url}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  )
}

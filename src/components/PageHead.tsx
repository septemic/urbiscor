import { Asset, useRouter, useTags } from '@tanstack/react-router'

/** Keep hydration downloads behind the fonts and image needed for first paint. */
export function PageHead() {
  const tags = useTags()
  const nonce = useRouter().options.ssr?.nonce

  return tags.map((tag) => (
    <Asset
      {...tag}
      attrs={tag.tag === 'link' && tag.attrs?.rel === 'modulepreload'
        ? { ...tag.attrs, fetchPriority: 'low' }
        : tag.attrs}
      key={`tsr-meta-${JSON.stringify(tag)}`}
      nonce={nonce}
    />
  ))
}

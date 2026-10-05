import { site } from '@/config/site'

/** Per-page head tags: title, description, canonical and Open Graph. */
export function pageHead({ title, description, path }: { title: string; description: string; path: string }) {
  const url = `${site.url}${path}`
  const image = `${site.url}/.netlify/images?url=/img/hero.jpg&w=1200&h=630&fit=cover&fm=jpg`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

import { site } from '@/config/site'

type Breadcrumb = { name: string; path: string }
const pageNames: Record<string, string> = {
  '/servicii': 'Servicii', '/proiecte': 'Proiecte', '/despre-noi': 'Despre noi',
  '/contact': 'Contact', '/politica-cookies': 'Politica cookies',
  '/politica-de-confidentialitate': 'Politica de confidențialitate',
}

/** Page-specific metadata and linked entities; JSON-LD executes no JavaScript. */
export function pageHead({ title, description, path, breadcrumbs, service }: {
  title: string; description: string; path: string
  breadcrumbs?: Breadcrumb[]
  service?: { name: string; description: string }
}) {
  const url = `${site.url}${path}`
  const image = `${site.url}/.netlify/images?url=/img/hero.jpg&w=1200&h=630&fit=cover&fm=jpg`
  const trail = path === '/' ? [] : [{ name: 'Acasă', path: '/' }, ...(breadcrumbs ?? [{ name: pageNames[path] ?? title, path }])]
  const graph: Record<string, unknown>[] = [{
    '@type': path === '/contact' ? 'ContactPage' : path === '/despre-noi' ? 'AboutPage' : 'WebPage',
    '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'ro-RO',
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#business` },
    ...(trail.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(service ? { mainEntity: { '@id': `${url}#service` } } : {}),
  }]
  if (trail.length) graph.push({
    '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: `${site.url}${item.path}`,
    })),
  })
  if (service) graph.push({
    '@type': 'Service', '@id': `${url}#service`, url, name: service.name,
    description: service.description, serviceType: service.name,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'AdministrativeArea', name: 'Oltenia' },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  })
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
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }],
  }
}

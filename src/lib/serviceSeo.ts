import { servicePaths, type ServiceId } from '@/config/servicePaths'
import { serviceMetadata } from '@/config/serviceMetadata'
import { pageHead } from './seo'

export function servicePageHead(id: ServiceId) {
  const page = serviceMetadata[id]
  return pageHead({
    title: `${page.title} în Oltenia | URBISCOR CONSTRUCT`,
    description: page.description,
    path: servicePaths[id],
    breadcrumbs: [{ name: 'Servicii', path: '/servicii' }, { name: page.title, path: servicePaths[id] }],
    service: { name: page.title, description: page.description },
  })
}

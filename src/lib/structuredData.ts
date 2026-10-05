import { site } from '@/config/site'
import { serviceDetails } from '@/data/services'

/**
 * schema.org GeneralContractor (a LocalBusiness subtype).
 * Only verified business facts — no street address, reviews, ratings or opening hours.
 */
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${site.url}/#business`,
    name: site.name,
    description:
      'Construcții case la roșu, fundații, structuri din beton armat, cofrare și zidărie în Oltenia. Sistem Doka, popi metalici și schelă proprii.',
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    image: `${site.url}/.netlify/images?url=/img/hero.jpg&w=1200&fm=jpg`,
    telephone: site.phoneE164,
    areaServed: { '@type': 'AdministrativeArea', name: 'Oltenia', containedInPlace: { '@type': 'Country', name: 'România' } },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      name: site.contactPerson,
      telephone: site.phoneE164,
      areaServed: 'RO',
      availableLanguage: ['ro'],
    },
    knowsAbout: ['Construcții case la roșu', 'Fundații', 'Structuri din beton armat', 'Cofrare Doka', 'Turnare beton', 'Zidărie BCA', 'Zidărie cărămidă'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicii de construcții',
      itemListElement: serviceDetails.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, areaServed: 'Oltenia', url: `${site.url}/servicii#${s.id}` },
      })),
    },
    sameAs: Object.values(site.social).filter(Boolean),
  }
}

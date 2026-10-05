/**
 * Central business configuration. Edit values here — every page, link,
 * SEO tag and the structured data read from this file.
 */
export const site = {
  name: 'URBISCOR CONSTRUCT',
  tagline: 'Construcții case la roșu în Oltenia',
  contactPerson: 'Tudor Nicolae',
  phoneDisplay: '0745 013 023',
  phoneHref: 'tel:+40745013023',
  phoneE164: '+40745013023',
  whatsappHref: 'https://wa.me/40745013023',
  area: 'Oltenia, România',
  /** Public site URL, used for canonical links, sitemap, Open Graph and structured data. */
  url: 'https://urbiscor.ro',
  /**
   * Social profiles. An empty entry is rendered as a non-link "în curând" chip
   * in the footer and left out of the schema.org `sameAs` list, so a profile can
   * be removed again without leaving a broken link behind.
   */
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61595110501446',
    instagram: 'https://www.instagram.com/urbiscor',
  },
} as const

export const whatsappMessage = (text = 'Bună ziua! Aș dori o ofertă pentru construcția unei case.') =>
  `${site.whatsappHref}?text=${encodeURIComponent(text)}`

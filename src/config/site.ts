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
  /** Public site URL, used for canonical links, sitemap and Open Graph. Update when a custom domain is connected. */
  url: 'https://heartfelt-sunflower-f08e0b.netlify.app',
  /**
   * Social profiles. Leave empty until the real URLs exist — empty entries
   * are shown as "în curând" in the footer instead of a broken link.
   */
  social: {
    facebook: '',
    instagram: '',
  },
} as const

export const whatsappMessage = (text = 'Bună ziua! Aș dori o ofertă pentru construcția unei case.') =>
  `${site.whatsappHref}?text=${encodeURIComponent(text)}`

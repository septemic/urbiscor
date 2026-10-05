/**
 * Portfolio data for the homepage gallery and /proiecte.
 *
 * ⚠️ Every entry below with `placeholder: true` is an ILLUSTRATIVE image,
 * not a real URBISCOR CONSTRUCT project. To add real work:
 *   1. Put the photo in /public/img/proiecte/ (JPG, ~2000px wide is enough).
 *   2. Add an entry with `placeholder: false`.
 *   3. Remove the placeholder entries once real photos are available.
 * Only add a `location` or `note` if it is accurate.
 */
export type ProjectCategory = 'Fundații' | 'Structuri' | 'Cofraje' | 'Zidărie' | 'Case la roșu'

export const projectCategories: ProjectCategory[] = ['Fundații', 'Structuri', 'Cofraje', 'Zidărie', 'Case la roșu']

export type Project = {
  id: string
  src: string
  alt: string
  category: ProjectCategory
  placeholder: boolean
  location?: string
  note?: string
}

export const projects: Project[] = [
  { id: 'ph-casa-rosu', src: '/img/casa-rosu.jpg', category: 'Case la roșu', placeholder: true, alt: 'Casă la roșu cu structură din beton armat și zidărie din cărămidă, înconjurată de schelă' },
  { id: 'ph-cofraje', src: '/img/cofraje.jpg', category: 'Cofraje', placeholder: true, alt: 'Cofraj Doka pentru placă, susținut de popi metalici' },
  { id: 'ph-fundatii', src: '/img/fundatii.jpg', category: 'Fundații', placeholder: true, alt: 'Fundație cu armătură montată și cofraj' },
  { id: 'ph-structuri', src: '/img/structuri.jpg', category: 'Structuri', placeholder: true, alt: 'Stâlpi din beton armat cu armătură în așteptare' },
  { id: 'ph-zidarie', src: '/img/zidarie.jpg', category: 'Zidărie', placeholder: true, alt: 'Zidărie din BCA și cărămidă între stâlpi din beton armat' },
  { id: 'ph-turnare', src: '/img/turnare.jpg', category: 'Structuri', placeholder: true, alt: 'Turnarea betonului pe placa unei case' },
  { id: 'ph-santier', src: '/img/santier.jpg', category: 'Case la roșu', placeholder: true, alt: 'Șantier rezidențial organizat, cu structură în lucru și materiale depozitate' },
  { id: 'ph-echipamente', src: '/img/schela.jpg', category: 'Cofraje', placeholder: true, alt: 'Panouri de cofraj, popi metalici și schelă depozitate ordonat' },
]

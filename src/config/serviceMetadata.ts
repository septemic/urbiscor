import type { ServiceId } from './servicePaths'

/** Small route-head data; detailed page content stays in its lazy route chunk. */
export const serviceMetadata: Record<ServiceId, { title: string; description: string }> = {
  'constructii-la-rosu': { title: 'Construcții case la roșu', description: 'Construcții case la roșu în Oltenia: fundații, structură din beton armat și zidărie, conform proiectului tehnic. Solicită ofertă gratuită URBISCOR.' },
  fundatii: { title: 'Fundații pentru case', description: 'Execuție fundații pentru case în Oltenia: trasare, săpături, armare, cofrare și turnare conform proiectului tehnic. Ofertă gratuită URBISCOR CONSTRUCT.' },
  'structuri-beton-armat': { title: 'Structuri din beton armat', description: 'Structuri din beton armat pentru case în Oltenia: stâlpi, grinzi, centuri și plăci, cu cofrare Doka și popi proprii. Solicită ofertă gratuită URBISCOR.' },
  cofrare: { title: 'Cofrare cu sistem Doka', description: 'Cofrare pentru fundații, stâlpi, grinzi și plăci în Oltenia. Sistem Doka și popi metalici proprii. Solicită ofertă gratuită URBISCOR CONSTRUCT.' },
  'turnare-beton': { title: 'Turnare beton', description: 'Turnare beton pentru fundații și structuri de case în Oltenia: pregătirea turnării, coordonare, vibrare și finisarea plăcilor. Ofertă gratuită URBISCOR.' },
  zidarie: { title: 'Zidărie BCA și cărămidă', description: 'Execuție zidărie BCA și cărămidă pentru case în Oltenia: pereți exteriori, compartimentări și goluri conform proiectului. Ofertă gratuită URBISCOR.' },
}

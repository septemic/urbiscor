/** Stable, crawlable URLs shared by cards, the service index and schema. */
export const servicePaths = {
  'constructii-la-rosu': '/servicii/constructii-case-la-rosu',
  fundatii: '/servicii/fundatii',
  'structuri-beton-armat': '/servicii/structuri-beton-armat',
  cofrare: '/servicii/cofrare-doka',
  'turnare-beton': '/servicii/turnare-beton',
  zidarie: '/servicii/zidarie',
  doka: '/servicii/cofrare-doka',
} as const

export type ServiceId = Exclude<keyof typeof servicePaths, 'doka'>

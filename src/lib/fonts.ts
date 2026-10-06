import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import manropeLatin from '@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url'
import interRomanian from '@/assets/fonts/inter-romanian-wght-normal.woff2?url&no-inline'
import manropeRomanian from '@/assets/fonts/manrope-romanian-wght-normal.woff2?url&no-inline'

/** Start the fonts used above the fold alongside CSS, rather than after it. */
export const fontPreloads = [manropeLatin, manropeRomanian, interLatin, interRomanian].map((href) => ({
  rel: 'preload',
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous' as const,
  href,
}))

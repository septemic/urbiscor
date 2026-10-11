/**
 * Images are served directly from /public.
 *
 * The previous build routed every image through Netlify's Image CDN
 * (`/.netlify/images`), which does not exist on Vercel. The source photos are
 * already reasonable sizes, so they are served as-is; this helper is the single
 * seam to reintroduce a CDN (e.g. Vercel Image Optimization) later.
 */
export function imageSrc(src: string) {
  return src
}

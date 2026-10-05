import { useEffect } from 'react'
import 'lenis/dist/lenis.css'
import { startSmoothScroll, stopSmoothScroll } from '@/lib/smoothScroll'

/** Enables smooth wheel scrolling. Client-only, and only for pointer devices. */
export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => (reducedMotion.matches ? stopSmoothScroll() : startSmoothScroll())
    sync()
    reducedMotion.addEventListener('change', sync)
    return () => {
      reducedMotion.removeEventListener('change', sync)
      stopSmoothScroll()
    }
  }, [])
  return null
}

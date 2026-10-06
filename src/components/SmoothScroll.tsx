import { useEffect } from 'react'
import 'lenis/dist/lenis.css'
import { startSmoothScroll, stopSmoothScroll } from '@/lib/smoothScroll'

/** Enables smooth wheel scrolling. Client-only, and only for pointer devices. */
export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = window.matchMedia('(any-pointer: fine)')
    const sync = () => {
      if (reducedMotion.matches || !pointer.matches) stopSmoothScroll()
      else void startSmoothScroll()
    }
    sync()
    reducedMotion.addEventListener('change', sync)
    pointer.addEventListener('change', sync)
    return () => {
      reducedMotion.removeEventListener('change', sync)
      pointer.removeEventListener('change', sync)
      stopSmoothScroll()
    }
  }, [])
  return null
}

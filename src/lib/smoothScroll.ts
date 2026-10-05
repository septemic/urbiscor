import Lenis from 'lenis'

/**
 * Smooth wheel scrolling for mouse users.
 *
 * Deliberately conservative: nothing runs on touch devices, where the native
 * momentum is better, or when the visitor asked for reduced motion. Lenis has a
 * `respectReducedMotion` option, but it still smooths the wheel (measured), so
 * the check is done here. CSS `scroll-behavior: smooth` only covers programmatic
 * scrolls, so the wheel needs this.
 */
let lenis: Lenis | null = null

export function startSmoothScroll() {
  if (lenis || typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  lenis = new Lenis({
    autoRaf: true,
    smoothWheel: true,
    syncTouch: false,
    /**
     * Tuning: the share of the remaining distance covered each frame.
     * Higher is snappier, lower is floatier — keep it subtle.
     */
    lerp: 0.1,
  })
}

export function stopSmoothScroll() {
  lenis?.destroy()
  lenis = null
}

/** Freeze or resume smoothing while a menu or lightbox locks the page. */
export function setSmoothScrollLock(locked: boolean) {
  if (!lenis) return
  if (locked) lenis.stop()
  else lenis.start()
}

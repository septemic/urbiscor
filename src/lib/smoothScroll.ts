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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.info('[smooth-scroll] off: the system asks for reduced motion')
    return
  }
  /**
   * `any-pointer: fine` — not `pointer: fine`. On a desktop or laptop with a
   * touchscreen, Windows reports the touch digitizer as the *primary* pointer
   * (`pointer: coarse`), so the strict check silently disabled smoothing on
   * machines where the visitor scrolls with a mouse. `any-pointer` asks whether
   * a mouse is available at all; touch scrolling stays native either way
   * (`syncTouch: false`), so this only decides whether the wheel is smoothed.
   */
  if (!window.matchMedia('(any-pointer: fine)').matches) {
    console.info('[smooth-scroll] off: no mouse or trackpad available (touch-only device)')
    return
  }

  lenis = new Lenis({
    autoRaf: true,
    smoothWheel: true,
    syncTouch: false,
    /**
     * Tuning. With `duration` every wheel notch starts a timed animation, so a
     * burst of notches glides instead of stepping. Use Lenis's `lerp` (share of
     * the remaining distance per frame) instead for a snappier, more direct
     * feel; `duration` wins when both are set.
     */
    duration: 1.15,
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

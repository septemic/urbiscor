import type Lenis from 'lenis'

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
let enabled = false
let generation = 0
let locked = false
let frame: number | null = null

function cancelFrame() {
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null
}

function animate(time: number) {
  frame = null
  if (!lenis || lenis.isScrolling !== 'smooth' || lenis.isStopped) return
  lenis.raf(time)
  if (lenis.isScrolling === 'smooth') frame = requestAnimationFrame(animate)
}

function scheduleAnimation() {
  if (frame !== null || !lenis || lenis.isStopped) return
  // Reset the clock after idle time so the first wheel event still glides.
  lenis.time = performance.now()
  frame = requestAnimationFrame(animate)
}

export async function startSmoothScroll() {
  if (enabled || typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  /**
   * `any-pointer: fine` — not `pointer: fine`. On a desktop or laptop with a
   * touchscreen, Windows reports the touch digitizer as the *primary* pointer
   * (`pointer: coarse`), so the strict check silently disabled smoothing on
   * machines where the visitor scrolls with a mouse. `any-pointer` asks whether
   * a mouse is available at all; touch scrolling stays native either way
   * (`syncTouch: false`), so this only decides whether the wheel is smoothed.
   */
  if (!window.matchMedia('(any-pointer: fine)').matches) return

  enabled = true
  const currentGeneration = ++generation
  try {
    // Touch-only and reduced-motion visitors never download the wheel library.
    const { default: Lenis } = await import('lenis')
    if (!enabled || currentGeneration !== generation) return
    lenis = new Lenis({ autoRaf: false, smoothWheel: true, syncTouch: false, duration: 1.15 })
    lenis.on('virtual-scroll', scheduleAnimation)
    if (locked) lenis.stop()
  } catch {
    // Native scrolling remains usable if this optional enhancement cannot load.
    if (currentGeneration === generation) enabled = false
  }
}

export function stopSmoothScroll() {
  enabled = false
  generation++
  cancelFrame()
  lenis?.destroy()
  lenis = null
}

/** Freeze or resume smoothing while a menu or lightbox locks the page. */
export function setSmoothScrollLock(value: boolean) {
  // Store the lock even while the optional library is still downloading.
  locked = value
  if (!lenis) return
  if (locked) {
    cancelFrame()
    lenis.stop()
  } else lenis.start()
}

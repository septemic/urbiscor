import { useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'

/** Adds `.is-visible` to [data-reveal] elements as they scroll into view. Re-scans on navigation. */
export function RevealObserver() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => {
    ;(window as unknown as { __reveal?: boolean }).__reveal = true
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const scan = () => document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el))
    scan()
    // Re-scan shortly after navigation in case the new route committed after this effect
    const t = window.setTimeout(scan, 200)
    return () => {
      window.clearTimeout(t)
      io.disconnect()
    }
  }, [pathname])
  return null
}

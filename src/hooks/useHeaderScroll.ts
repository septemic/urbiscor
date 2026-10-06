import { useEffect, useRef, useState } from 'react'
import { navItems } from '@/components/nav'

type SectionId = (typeof navItems)[number]['sectionId']

/** CSS owns progress where supported; observers only update discrete header state. */
export function useHeaderScroll(pathname: string) {
  const sentinelRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const pageSection = navItems.find((item) => !item.hash && (
    item.to === pathname || (item.to !== '/' && pathname.startsWith(`${item.to}/`))
  ))?.sectionId ?? null
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId | null>(pageSection)

  useEffect(() => {
    setScrolled(window.scrollY > 24)
    const sentinel = sentinelRef.current
    if (!sentinel || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(() => setScrolled(window.scrollY > 24))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const progress = progressRef.current
    if (!progress || CSS.supports('animation-timeline', 'scroll(root)')) return

    progress.dataset.scrollFallback = ''
    let frame = 0
    let maxScroll = 0
    const update = () => {
      frame = 0
      const fraction = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0
      progress.style.transform = `scaleX(${fraction})`
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const measure = () => {
      // Cache the extent after layout changes; scrolling only reads scrollY.
      const root = document.documentElement
      maxScroll = Math.max(0, root.scrollHeight - root.clientHeight)
      schedule()
    }
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    observer?.observe(document.body)
    observer?.observe(document.documentElement)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    if (!observer) document.addEventListener('load', measure, true)
    measure()

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      document.removeEventListener('load', measure, true)
      delete progress.dataset.scrollFallback
      progress.style.removeProperty('transform')
    }
  }, [])

  useEffect(() => {
    setActiveSection(pageSection)
    if (!('IntersectionObserver' in window)) return

    const sectionIds = new Set<string>(navItems.map((item) => item.sectionId))
    let section = pageSection
    // Unnamed sections inherit the preceding nav item. Observing them and the
    // footer also handles large scroll jumps and keeps the last section active.
    const targets = Array.from(document.querySelectorAll<HTMLElement>('main > section, footer')).map((element) => {
      if (sectionIds.has(element.id)) section = element.id as SectionId
      return { element, section }
    })
    const visible = new Set<Element>()
    let observer: IntersectionObserver
    let frame = 0
    const observe = () => {
      frame = 0
      observer?.disconnect()
      visible.clear()
      const bottom = Math.max(89, Math.round(window.innerHeight * 0.35))
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        for (let i = targets.length - 1; i >= 0; i--) {
          if (visible.has(targets[i].element)) {
            setActiveSection(targets[i].section)
            break
          }
        }
      }, { rootMargin: `-88px 0px -${Math.max(0, window.innerHeight - bottom)}px 0px` })
      for (const { element } of targets) observer.observe(element)
    }
    const onResize = () => {
      if (!frame) frame = window.requestAnimationFrame(observe)
    }
    observe()
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [pathname, pageSection])

  return { sentinelRef, progressRef, scrolled, activeSection }
}

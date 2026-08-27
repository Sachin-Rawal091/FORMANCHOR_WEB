import { useEffect, useRef } from 'react'

/**
 * Custom hook that adds smooth entrance animations to sections
 * with the class "fade-in-section" or "reveal-on-scroll".
 *
 * Fail-safe: elements in viewport are visible immediately without blank flashes.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const elements = container.querySelectorAll<HTMLElement>('.fade-in-section, .reveal-on-scroll, .section, .hero, .pricing-card, .pipeline-card, .feature-card')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { root: null, rootMargin: '60px 0px 60px 0px', threshold: 0.05 }
    )

    elements.forEach((el) => {
      el.classList.add('reveal-item')
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add('is-visible')
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return containerRef
}

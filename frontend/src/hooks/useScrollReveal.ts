import { useEffect, useRef } from 'react'

/**
 * Custom hook that adds a scroll-reveal fade-in animation to elements
 * with the class "fade-in-section". Uses IntersectionObserver to trigger
 * the "is-visible" class when elements enter the viewport.
 *
 * Respects prefers-reduced-motion: if reduced motion is preferred,
 * all sections start visible immediately.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      container.querySelectorAll('.fade-in-section').forEach((el) => {
        el.classList.add('is-visible')
      })
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
      { root: null, rootMargin: '0px', threshold: 0.1 }
    )

    container.querySelectorAll('.fade-in-section').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return containerRef
}

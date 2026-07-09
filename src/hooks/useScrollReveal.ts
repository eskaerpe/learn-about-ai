import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = el.querySelectorAll<HTMLElement>('[data-reveal]')

    if (prefersReducedMotion) {
      items.forEach(item => { item.dataset.visible = 'true' })
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '-40px 0px 0px 0px' },
    )

    items.forEach(item => {
      const rect = item.getBoundingClientRect()
      if (rect.top < window.innerHeight + 40) {
        item.dataset.visible = 'true'
      } else {
        observer.observe(item)
      }
    })

    return () => observer.disconnect()
  }, [])

  return ref
}

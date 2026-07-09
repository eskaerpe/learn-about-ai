import { useEffect } from 'react'
import Lenis from 'lenis'

let globalLenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return globalLenis
}

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 0.5,
      infinite: false,
    })

    globalLenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      globalLenis = null
      lenis.destroy()
    }
  }, [])
}

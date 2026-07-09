import { useEffect, useState } from 'react'
import { getLenis } from './useSmoothScroll'

export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const lenis = getLenis()
      if (lenis) {
        setProgress(lenis.progress * 100)
      } else {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        if (docHeight > 0) {
          setProgress(Math.min(scrollTop / docHeight * 100, 100))
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

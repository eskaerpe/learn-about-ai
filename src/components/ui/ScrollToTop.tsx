import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { getLenis } from '../../hooks/useSmoothScroll'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const lenis = getLenis()
      const scrollY = lenis ? lenis.scroll : window.scrollY
      setVisible(scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`scroll-to-top${visible ? ' scroll-to-top--visible' : ''}`}
      onClick={() => {
        const lenis = getLenis()
        if (lenis) {
          lenis.scrollTo(0, { duration: 0.5 })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}

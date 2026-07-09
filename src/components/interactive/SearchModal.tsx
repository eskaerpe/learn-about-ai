import { useState, useEffect, useRef, useCallback } from 'react'
import { Search } from 'lucide-react'
import { getLenis } from '../../hooks/useSmoothScroll'
import type { Section } from '../../utils'

interface SearchModalProps {
  sections: Section[]
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ sections, isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const [closing, setClosing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 150)
  }, [onClose])

  const results = query
    ? sections
        .filter(s => s.text.toLowerCase().includes(query.toLowerCase()))
        .map(s => ({
          sectionId: s.id,
          sectionTitle: s.title,
          text: s.text.slice(0, 120),
        }))
    : []

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx(prev => Math.min(prev + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx(prev => Math.max(prev - 1, 0))
      }
      if (e.key === 'Enter' && results[activeIdx]) {
        const lenis = getLenis()
        const id = results[activeIdx].sectionId
        if (lenis) {
          lenis.scrollTo(`#${id}`, { duration: 0.6 })
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
        handleClose()
      }
    },
    [results, activeIdx, handleClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen && !closing) return null

  return (
    <div className={`search-overlay${closing ? ' search-overlay--closing' : ''}`} onClick={handleClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal__input-wrap">
          <Search size={18} className="search-modal__input-icon" />
          <input
            ref={inputRef}
            className="search-modal__input"
            placeholder="Cari topik..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="search-modal__results">
          {query && results.length === 0 && (
            <div className="search-modal__empty">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;
            </div>
          )}
          {results.map((r, i) => (
            <div
              key={r.sectionId}
              className={`search-modal__result${i === activeIdx ? ' search-modal__result--active' : ''}`}
              onClick={() => {
                const lenis = getLenis()
                const id = r.sectionId
                if (lenis) {
                  lenis.scrollTo(`#${id}`, { duration: 0.6 })
                } else {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }
                handleClose()
              }}
            >
              <div className="search-modal__result-heading">{r.sectionTitle}</div>
              <div>{r.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

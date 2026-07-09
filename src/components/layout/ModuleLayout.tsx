import { useState, useEffect, type ReactNode } from 'react'
import { BookOpen, GraduationCap, BrainCircuit, List } from 'lucide-react'
import Sidebar from './Sidebar'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useProgress } from '../../hooks/useProgress'
import { useReadingProgress } from '../../hooks/useReadingProgress'
import { getLenis } from '../../hooks/useSmoothScroll'
import type { Section, PhaseGroup } from '../../utils'

interface ModuleLayoutProps {
  slug: string
  title: string
  sections: Section[]
  phases: PhaseGroup[]
  flashcardsCount: number
  quizCount: number
  children: ReactNode
}

export default function ModuleLayout({ slug, title, sections, phases, flashcardsCount, quizCount, children }: ModuleLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sectionIds = sections.map(s => s.id)
  const activeSection = useScrollSpy(sectionIds)
  const { completed } = useProgress(slug)
  const readingProgress = useReadingProgress()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="module-layout">
      <div className="reading-progress">
        <div className="reading-progress__fill" style={{ width: `${readingProgress}%` }} />
      </div>

      <Sidebar
        title={title}
        phases={phases}
        activeSection={activeSection}
        completedSections={completed}
        completedCount={completed.size}
        totalSections={sections.length}
        onSectionClick={id => {
          const lenis = getLenis()
          if (lenis) {
            lenis.scrollTo(`#${id}`, { duration: 0.6 })
          } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="module-layout__content">
        <div className="module-hero">
          <div className="module-hero__badge">
            <GraduationCap size={12} />
            <span>Modul Belajar</span>
          </div>
          <h1>{title}</h1>
          <p>Kamus interaktif AI & Software Engineering — 54 istilah dari 7 fase</p>
          <div className="module-hero__meta">
            <span><List size={12} /> {sections.length} Topik</span>
            <span><BrainCircuit size={12} /> {phases.length} Fase</span>
            {flashcardsCount > 0 && <span><BookOpen size={12} /> {flashcardsCount} Flashcards</span>}
            {quizCount > 0 && <span><GraduationCap size={12} /> {quizCount} Quiz</span>}
          </div>
        </div>

        {children}
      </main>

      <button
        className="sidebar__mobile-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sections"
      >
        <BookOpen size={20} />
      </button>
    </div>
  )
}

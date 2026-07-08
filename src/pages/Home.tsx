import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, GraduationCap, List, BrainCircuit, Layers } from 'lucide-react'
import { useMemo } from 'react'

interface ModuleCardData {
  slug: string
  title: string
  description: string
  tags: string[]
  features?: { quiz: boolean; flashcards: boolean }
}

const moduleConfigs = import.meta.glob('../modules/*/config.ts', { eager: true, import: 'config' }) as Record<string, ModuleCardData>
const moduleMarkdowns = import.meta.glob('../modules/*/module.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

export default function Home() {
  const modules = useMemo(() => {
    return Object.values(moduleConfigs).sort((a, b) => a.slug.localeCompare(b.slug))
  }, [])

  const stats = useMemo(() => {
    let totalTerms = 0, totalFlashcards = 0, totalQuiz = 0
    for (const content of Object.values(moduleMarkdowns)) {
      const fc = content.match(/<Flashcard /g)
      if (fc) totalFlashcards += fc.length
      const qz = content.match(/<Quiz /g)
      if (qz) totalQuiz += qz.length
      const terms = content.match(/^### /gm)
      if (terms) totalTerms += terms.length
    }
    const phaseCount = Object.keys(moduleMarkdowns).filter(p => p.includes('phase-')).length
    return { totalIstilah: totalTerms, totalFase: phaseCount, totalModules: modules.length, totalFlashcards, totalQuiz }
  }, [modules])

  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__hero-badge">
          <GraduationCap size={14} />
          <span>Modul Belajar Interaktif</span>
        </div>
        <h1>AI & Software Engineering<br />Dictionary 2026</h1>
        <p>Kamus interaktif untuk memahami {stats.totalIstilah} istilah AI dan Software Engineering — dari Mental Model hingga Daily Productivity.</p>
        <div className="home__hero-meta">
          <span><List size={14} /> {stats.totalIstilah} Istilah</span>
          <span><Layers size={14} /> {stats.totalModules} Modul</span>
          <span><BrainCircuit size={14} /> {stats.totalFase} Fase</span>
          <span><GraduationCap size={14} /> {stats.totalFlashcards} Flashcards</span>
          <span><GraduationCap size={14} /> {stats.totalQuiz} Quiz</span>
        </div>
      </div>

      <h2 className="home__section-title">Modul Tersedia</h2>
      <div className="module-grid">
        {modules.map(mod => (
          <Link to={`/${mod.slug}`} key={mod.slug} className="module-card">
            <div className="module-card__badge">
              <BookOpen size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              {mod.slug.startsWith('phase-') ? `Phase ${mod.slug.split('-')[1]}` : 'Overview'}
            </div>
            <h3 className="module-card__title">{mod.title}</h3>
            <p className="module-card__desc">{mod.description}</p>
            <div className="module-card__tags">
              {mod.tags.map(tag => (
                <span key={tag} className="module-card__tag">{tag}</span>
              ))}
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
              Buka Modul <ChevronRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

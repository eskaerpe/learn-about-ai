import 'prismjs/themes/prism-tomorrow.css'
import { useParams } from 'react-router-dom'
import { useMemo, useState, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'
import ModuleLayout from '../components/layout/ModuleLayout'
import TheoryBlock from '../components/content/TheoryBlock'
import IntuitionBlock from '../components/content/IntuitionBlock'
import WorkedExample from '../components/content/WorkedExample'
import ConclusionBox from '../components/content/ConclusionBox'
import FlashcardGrid from '../components/interactive/FlashcardGrid'
import QuizCard from '../components/interactive/QuizCard'
import SearchModal from '../components/interactive/SearchModal'
import ScrollToTop from '../components/ui/ScrollToTop'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { extractSections, extractPhases, preprocessMarkdown, splitTermBlocks, slugify } from '../utils'
import type { QuizQuestion } from '../components/interactive/QuizCard'

interface FlashcardData {
  front: string
  back: string
}

const modules = import.meta.glob('../modules/*/config.ts', { eager: true, import: 'config' }) as Record<string, { slug: string; title: string; description: string; tags: string[]; features: { quiz: boolean; flashcards: boolean } }>

const markdownModules = import.meta.glob('../modules/*/module.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: React.ReactNode } }).props.children)
  }
  return ''
}

export default function ModuleView() {
  const params = useParams()
  const slug = params.slug
  const [searchOpen, setSearchOpen] = useState(false)

  const moduleConfig = useMemo(() => {
    const entries = Object.entries(modules)
    for (const [, config] of entries) {
      if (config.slug === slug) return config
    }
    return null
  }, [slug])

  const rawMarkdown = useMemo(() => {
    const entries = Object.entries(markdownModules)
    for (const [path, content] of entries) {
      const match = path.match(/\.\.\/modules\/([^\/]+)\/module\.md$/)
      if (match && match[1] === slug) return content
    }
    return ''
  }, [slug])

  const sections = useMemo(() => extractSections(rawMarkdown), [rawMarkdown])
  const phases = useMemo(() => extractPhases(rawMarkdown), [rawMarkdown])

  const processedMd = useMemo(() => preprocessMarkdown(rawMarkdown), [rawMarkdown])
  const termBlocks = useMemo(() => splitTermBlocks(processedMd), [processedMd])
  const revealRef = useScrollReveal<HTMLDivElement>()

  const flashcards = useMemo(() => {
    const result: FlashcardData[] = []
    const flashcardRegex = /<Flashcard\s+front="([^"]*)"\s+back="([^"]*)"\s*\/>/g
    let match
    while ((match = flashcardRegex.exec(rawMarkdown)) !== null) {
      result.push({ front: match[1], back: match[2] })
    }
    return result
  }, [rawMarkdown])

  const quizQuestions = useMemo(() => {
    const result: QuizQuestion[] = []
    const quizRegex = /<Quiz\s+question="([^"]*)"\s+options='([^']*)'\s+correctIndex="([^"]*)"\s*(explanation="([^"]*)")?\s*\/>/g
    let match
    while ((match = quizRegex.exec(rawMarkdown)) !== null) {
      try {
        const options = JSON.parse(match[2].replace(/&quot;/g, '"'))
        result.push({
          question: match[1],
          options,
          correctIndex: parseInt(match[3]),
          explanation: match[5] || '',
        })
      } catch {
        // skip malformed quiz
      }
    }
    return result
  }, [rawMarkdown])

  const allTermIds = useMemo(() => {
    return phases.flatMap(p => p.terms.map(t => t.id))
  }, [phases])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setSearchOpen(prev => !prev)
      return
    }
    if (e.key === 'Escape') {
      setSearchOpen(false)
      return
    }
    if (e.key === 'j' || e.key === 'J') {
      const currentIdx = allTermIds.findIndex(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top >= 0 && rect.top < window.innerHeight / 2
      })
      const nextIdx = Math.min(currentIdx + 1, allTermIds.length - 1)
      const target = document.getElementById(allTermIds[nextIdx])
      target?.scrollIntoView({ behavior: 'instant' })
    }
    if (e.key === 'k' || e.key === 'K') {
      const currentIdx = allTermIds.findIndex(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top >= 0 && rect.top < window.innerHeight / 2
      })
      const prevIdx = Math.max(currentIdx - 1, 0)
      const target = document.getElementById(allTermIds[prevIdx])
      target?.scrollIntoView({ behavior: 'instant' })
    }
  }, [allTermIds])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  let exampleCounter = 0

  if (!moduleConfig) {
    return (
      <div className="home">
        <h1>Module not found</h1>
        <p>Slug: {slug}</p>
      </div>
    )
  }

  return (
    <>
      <ModuleLayout
        slug={moduleConfig.slug}
        title={moduleConfig.title}
        sections={sections}
        phases={phases}
        flashcardsCount={flashcards.length}
        quizCount={quizQuestions.length}
      >
        <div ref={revealRef}>
          {termBlocks.map((block, i) => {
            if (block.type === 'phase-heading') {
              const text = block.raw.replace(/^## /, '')
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return <h2 key={i} id={id} className="section-heading">{text}</h2>
            }

            if (block.type === 'hr') {
              return <hr key={i} className="term-separator" />
            }

            if (block.type === 'term') {
              const headingMatch = block.raw.match(/^### (.+)$/m)
              const headingText = headingMatch ? headingMatch[1] : ''
              const termId = slugify(headingText)
              const content = block.raw.replace(/^### .+\n/, '')
              const termPhase = phases.find(p => p.terms.some(t => t.id === termId))

              return (
                <div key={i} className="term-card" data-reveal>
                  <div className="term-card__header">
                    {termPhase && <span className="term-card__badge">Phase {termPhase.phaseIndex}</span>}
                    <h3 id={termId} className="term-card__title">{headingText}</h3>
                  </div>
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeKatex, rehypePrism]}
                    components={{
                      h3: () => null,
                      theory: ({ children }) => <TheoryBlock>{children}</TheoryBlock>,
                      Theory: ({ children }) => <TheoryBlock>{children}</TheoryBlock>,
                      intuition: ({ children }) => <IntuitionBlock>{children}</IntuitionBlock>,
                      Intuition: ({ children }) => <IntuitionBlock>{children}</IntuitionBlock>,
                      example: ({ children }) => {
                        exampleCounter++
                        return <WorkedExample number={exampleCounter}>{children}</WorkedExample>
                      },
                      Example: ({ children }) => {
                        exampleCounter++
                        return <WorkedExample number={exampleCounter}>{children}</WorkedExample>
                      },
                      conclusion: ({ children }) => <ConclusionBox>{children}</ConclusionBox>,
                      Conclusion: ({ children }) => <ConclusionBox>{children}</ConclusionBox>,
                      flashcard: () => null,
                      Flashcard: () => null,
                      quiz: () => null,
                      Quiz: () => null,
                      strong: (props) => {
                        const text = extractText(props.children)
                        if (text?.includes('🦊') || text?.includes('Opportunist')) {
                          return <>{props.children}</>
                        }
                        return <strong>{props.children}</strong>
                      },
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              )
            }

            return null
          })}
        </div>

        {flashcards.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h2 className="section-heading">Flashcards</h2>
            <FlashcardGrid flashcards={flashcards} />
          </div>
        )}

        {quizQuestions.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h2 className="section-heading">Latihan Soal</h2>
            {quizQuestions.map((q, i) => (
              <QuizCard key={i} question={q} index={i + 1} />
            ))}
          </div>
        )}
      </ModuleLayout>

      <SearchModal
        sections={sections}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <ScrollToTop />
    </>
  )
}

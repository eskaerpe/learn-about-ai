import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, BrainCircuit, Code, Bot, Cpu, Shield, Rocket, Zap } from 'lucide-react'
import type { PhaseGroup } from '../../utils'

const PHASE_ICONS = [
  BrainCircuit, Code, Bot, Cpu, Shield, Rocket, Zap,
]

interface SidebarProps {
  title: string
  phases: PhaseGroup[]
  activeSection: string
  completedSections: Set<string>
  completedCount: number
  totalSections: number
  onSectionClick: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({
  title,
  phases,
  activeSection,
  completedSections,
  completedCount,
  totalSections,
  onSectionClick,
  isOpen,
  onClose,
}: SidebarProps) {
  const progress = totalSections > 0 ? (completedCount / totalSections) * 100 : 0

  return (
    <>
      <aside className={`module-layout__sidebar${isOpen ? ' module-layout__sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <Link to="/" className="sidebar__back" onClick={onClose}>
            <ArrowLeft size={14} />
            Kembali
          </Link>
          <div className="sidebar__title">{title}</div>
        </div>

        <div className="sidebar__progress">
          <span>{completedCount}/{totalSections} selesai</span>
          <div className="sidebar__progress-bar">
            <div className="sidebar__progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {phases.map((phase, pi) => {
          const PhaseIcon = PHASE_ICONS[pi] || Bot
          return (
            <div key={phase.phaseId} className="sidebar__nav-group sidebar__nav-group--open">
              <div className="sidebar__nav-group-header">
                <PhaseIcon size={14} />
                <span>Phase {phase.phaseIndex}</span>
                <span style={{ fontWeight: 400, color: 'var(--text-tertiary)', fontSize: '0.75rem', marginLeft: '-0.2rem' }}>
                  — {phase.phaseName}
                </span>
                <span className="group-arrow">▶</span>
              </div>
              <div className="sidebar__nav-group-children">
                {phase.terms.map(term => {
                  const isActive = activeSection === term.id
                  const isCompleted = completedSections.has(term.id)

                  return (
                    <div
                      key={term.id}
                      className={`sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}
                      onClick={() => {
                        onSectionClick(term.id)
                        onClose()
                      }}
                    >
                      <span className={`sidebar__ring${isCompleted ? ' sidebar__ring--done' : ''}`}>
                        {isCompleted && <CheckCircle2 size={10} color="white" />}
                      </span>
                      <span>{term.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </aside>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 55,
            background: 'var(--overlay)',
          }}
          onClick={onClose}
        />
      )}
    </>
  )
}

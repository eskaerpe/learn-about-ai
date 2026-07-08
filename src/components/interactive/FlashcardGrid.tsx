import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

interface FlashcardData {
  front: string
  back: string
}

interface FlashcardGridProps {
  flashcards: FlashcardData[]
}

function Flashcard({ card, index }: { card: FlashcardData; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="flashcard"
      onClick={() => setFlipped(prev => !prev)}
      role="button"
      aria-pressed={flipped}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped(prev => !prev)
        }
      }}
    >
      <div className={`flashcard__inner${flipped ? ' flashcard__inner--flipped' : ''}`}>
        <div className="flashcard__front">
          <div className="fc-term">{card.front}</div>
          <div className="fc-phase">Flashcard {index + 1}</div>
        </div>
        <div className="flashcard__back">
          <p>{card.back}</p>
          <div className="fc-hint">Tap untuk balik</div>
        </div>
      </div>
    </div>
  )
}

export default function FlashcardGrid({ flashcards }: FlashcardGridProps) {
  if (!flashcards.length) return null

  return (
    <div>
      <div className="example-block__label" style={{ marginBottom: '0.75rem' }}>
        <RotateCcw size={14} strokeWidth={2.5} />
        <span>Flashcards</span>
      </div>
      <div className="flashcard-grid">
        {flashcards.map((card, i) => (
          <Flashcard key={i} card={card} index={i} />
        ))}
      </div>
    </div>
  )
}

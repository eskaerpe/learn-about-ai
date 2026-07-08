import type { ReactNode } from 'react'
import { BookOpen } from 'lucide-react'

interface TheoryBlockProps {
  children: ReactNode
}

export default function TheoryBlock({ children }: TheoryBlockProps) {
  return (
    <div className="theory-block">
      <div className="theory-block__label">
        <BookOpen size={14} strokeWidth={2.5} />
        <span>Teori</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

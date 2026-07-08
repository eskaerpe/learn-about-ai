import type { ReactNode } from 'react'
import { Lightbulb } from 'lucide-react'

interface IntuitionBlockProps {
  children: ReactNode
}

export default function IntuitionBlock({ children }: IntuitionBlockProps) {
  return (
    <div className="intuition-block">
      <div className="intuition-block__label">
        <Lightbulb size={14} strokeWidth={2.5} />
        <span>Intuisi</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

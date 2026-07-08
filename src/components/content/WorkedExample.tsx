import type { ReactNode } from 'react'
import { Terminal } from 'lucide-react'

interface WorkedExampleProps {
  children: ReactNode
  number?: number
}

export default function WorkedExample({ children, number }: WorkedExampleProps) {
  return (
    <div className="example-block">
      <div className="example-block__label">
        <Terminal size={14} strokeWidth={2.5} />
        <span>{number ? `Contoh ${number}` : 'Contoh'}</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

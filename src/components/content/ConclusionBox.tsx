import type { ReactNode } from 'react'
import { Flag } from 'lucide-react'

interface ConclusionBoxProps {
  children: ReactNode
}

export default function ConclusionBox({ children }: ConclusionBoxProps) {
  return (
    <div className="conclusion-block">
      <div className="conclusion-block__label">
        <Flag size={14} strokeWidth={2.5} />
        <span>Kesimpulan</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

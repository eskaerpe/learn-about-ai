interface ProgressBarProps {
  completed: number
  total: number
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="sidebar__progress">
      <span>{completed}/{total} selesai ({pct}%)</span>
      <div className="sidebar__progress-bar">
        <div className="sidebar__progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

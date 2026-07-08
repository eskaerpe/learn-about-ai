import { useState, useCallback } from 'react'

export function useProgress(slug: string) {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(`progress:${slug}`)
      return new Set<string>(stored ? JSON.parse(stored) : [])
    } catch {
      return new Set<string>()
    }
  })

  const toggle = useCallback((id: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      localStorage.setItem(`progress:${slug}`, JSON.stringify([...next]))
      return next
    })
  }, [slug])

  const reset = useCallback(() => {
    setCompleted(new Set())
    localStorage.removeItem(`progress:${slug}`)
  }, [slug])

  return { completed, toggle, reset, total: completed.size }
}

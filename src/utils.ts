export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export interface Section {
  id: string
  title: string
  text: string
}

export interface PhaseGroup {
  phaseIndex: number
  phaseName: string
  phaseId: string
  terms: TermInfo[]
}

export interface TermInfo {
  id: string
  title: string
  related: string[]
}

export function extractSections(markdown: string): Section[] {
  const headingRegex = /^##\s+(.+)$/gm
  const sections: Section[] = []
  const plainText = markdown.replace(/<[^>]*>/g, '')
  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const title = match[1]
    const id = slugify(title)
    const startIdx = match.index
    const nextMatch = headingRegex.exec(markdown)
    const endIdx = nextMatch ? nextMatch.index : markdown.length
    const sectionText = plainText.slice(startIdx, endIdx).trim()
    sections.push({ id, title, text: sectionText })
    headingRegex.lastIndex = nextMatch ? nextMatch.index : markdown.length
    if (!nextMatch) break
  }
  return sections
}

export function extractPhases(markdown: string): PhaseGroup[] {
  const phases: PhaseGroup[] = []
  const lines = markdown.split('\n')
  let currentPhase: PhaseGroup | null = null
  let currentTerm: TermInfo | null = null
  let inTerm = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const phaseMatch = line.match(/^## Phase (\d+) — (.+)$/)
    const termMatch = line.match(/^### (.+)$/)

    if (phaseMatch) {
      if (currentPhase && currentPhase.terms.length > 0) {
        phases.push(currentPhase)
      }
      currentPhase = {
        phaseIndex: parseInt(phaseMatch[1]),
        phaseName: phaseMatch[2],
        phaseId: slugify(`phase-${phaseMatch[1]}-${phaseMatch[2]}`),
        terms: [],
      }
      inTerm = false
      currentTerm = null
    } else if (termMatch && currentPhase) {
      if (currentTerm && currentTerm.title) {
        inTerm = false
        currentPhase.terms.push(currentTerm)
      }
      currentTerm = {
        id: slugify(termMatch[1]),
        title: termMatch[1],
        related: [],
      }
      inTerm = true
    } else if (inTerm && currentTerm) {
      const relatedMatch = line.match(/🔗 Related to: (.+)$/)
      if (relatedMatch) {
        currentTerm.related = relatedMatch[1].split(',').map(t => t.trim())
      }
    }
  }

  if (currentTerm && currentTerm.title && currentPhase) {
    currentPhase.terms.push(currentTerm)
  }
  if (currentPhase && currentPhase.terms.length > 0) {
    phases.push(currentPhase)
  }

  return phases
}

export function preprocessMarkdown(md: string): string {
  let processed = md

  processed = processed.replace(
    /\*\*🦊 Opportunist Lens:\*\*(.*?)(?=\n\n(?:🔗|---|###|##)|\n\n$)/gs,
    '<div class="opportunist-box"><strong>🦊 Opportunist Lens:</strong>$1</div>'
  )

  processed = processed.replace(
    /🔗 Related to: (.+)$/gm,
    (_, tags: string) => {
      const tagHtml = tags.split(',').map((t: string) =>
        `<span class="term-tag">${t.trim()}</span>`
      ).join('')
      return `<div class="term-related"><strong>🔗 Related:</strong> ${tagHtml}</div>`
    }
  )

  return processed
}

export interface MarkdownBlock {
  type: 'phase-heading' | 'term' | 'hr'
  raw: string
  id: string
}

export function splitTermBlocks(md: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = []
  const lines = md.split('\n')
  let currentTerm: string[] = []
  let inTerm = false

  function flushTerm() {
    if (currentTerm.length > 0) {
      const termHeading = currentTerm[0]
      const id = slugify(termHeading.replace(/^### /, ''))
      blocks.push({ type: 'term', raw: currentTerm.join('\n'), id })
      currentTerm = []
    }
  }

  for (const line of lines) {
    const phaseMatch = line.match(/^## Phase/)
    const termMatch = line.match(/^### /)
    const hrMatch = line.match(/^---$/)

    if (phaseMatch) {
      flushTerm()
      inTerm = false
      blocks.push({ type: 'phase-heading', raw: line, id: '' })
    } else if (termMatch) {
      flushTerm()
      inTerm = true
      currentTerm.push(line)
    } else if (hrMatch && inTerm) {
      currentTerm.push(line)
      flushTerm()
      inTerm = false
      blocks.push({ type: 'hr', raw: line, id: '' })
    } else if (inTerm) {
      currentTerm.push(line)
    }
  }

  flushTerm()
  return blocks
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/\n/g, ' ')
    .trim()
}

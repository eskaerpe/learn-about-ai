import type { LucideIcon } from 'lucide-react'
import {
  MessageSquare, Search, MessageSquareText, Workflow, GitBranch, Cpu, Bot,
  Send, ArrowLeftRight, Hammer, DollarSign, Server, BrainCircuit,
  GitPullRequest, Building2, FlaskConical, Wrench, TrendingUp, Music,
  RefreshCw, FileText, ClipboardList, Code, GitFork, MessageCircle, Globe,
  Plug, FolderOpen, Monitor, Link, Hash, Sparkles, MessageCircleMore, Brain,
  Zap, Award, Image, Bug, Ban, ShieldAlert, Crosshair, Shield, Key, Gem,
  Target, Rocket, Trophy, ChartLine,
} from 'lucide-react'

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

const TERM_ICONS: Record<string, LucideIcon> = {
  'ai-echo-chamber': MessageSquare,
  'deep-research': Search,
  'prompt-engineering': MessageSquareText,
  'ai-workflow': Workflow,
  'ai-pipeline': GitBranch,
  'ai-native': Cpu,
  'personal-assistant-ai': Bot,
  'handover-workflow': Send,
  'technology-push-vs-market-pull': ArrowLeftRight,
  'why-people-say-ai-is-leverage': Hammer,
  'technical-debt': DollarSign,
  'service': Server,
  'business-logic': BrainCircuit,
  'workflow-in-engineering': GitPullRequest,
  'architecture': Building2,
  'prototype': FlaskConical,
  'maintainability': Wrench,
  'scalability': TrendingUp,
  'vibe-coding': Music,
  'refactoring': RefreshCw,
  'documentation': FileText,
  'mom-minutes-of-meeting': ClipboardList,
  'claude-code': Code,
  'opencode': GitFork,
  'hermes': MessageCircle,
  'openrouter': Globe,
  'mcp-model-context-protocol': Plug,
  'agent-ai-agent': Bot,
  'context-engineering': FolderOpen,
  'model-3b-model-7b': Cpu,
  'local-model': Monitor,
  'api': Link,
  'token': Hash,
  'gemini': Sparkles,
  'deepseek': Search,
  'claude': MessageCircleMore,
  'gpt': Brain,
  'flash': Zap,
  'pro': Award,
  'reasoning-model': BrainCircuit,
  'coding-model': Code,
  'vision-model': Image,
  'injection': Bug,
  'dos-denial-of-service': Ban,
  'prompt-injection': ShieldAlert,
  'attack-surface': Crosshair,
  'sandbox': Shield,
  'authentication': Key,
  'value': Gem,
  'product-market-fit-pmf': Target,
  'mvp-minimum-viable-product': Rocket,
  'competitive-advantage': Trophy,
  'tracking-investment': ChartLine,
  'personal-assistant-workflow-deeper-look': Bot,
}

export function getTermIcon(termId: string): LucideIcon {
  return TERM_ICONS[termId] || FileText
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

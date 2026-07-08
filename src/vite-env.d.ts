/// <reference types="vite/client" />

declare module '*.md' {
  const content: string
  export default content
}

declare module 'react-markdown' {
  import { type ComponentType, type ReactNode } from 'react'
  interface ReactMarkdownOptions {
    children: string
    remarkPlugins?: unknown[]
    rehypePlugins?: unknown[]
    components?: Record<string, ComponentType<{ children?: ReactNode; [key: string]: unknown }>>
  }
  const ReactMarkdown: ComponentType<ReactMarkdownOptions>
  export default ReactMarkdown
}

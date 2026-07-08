# AI & Software Engineering Dictionary 2026

Kamus interaktif AI & Software Engineering dengan 54 istilah, 7 fase pembelajaran, flashcards, dan quiz.

## Stack

- **Framework:** React 19 + TypeScript 6
- **Bundler:** Vite 8
- **Routing:** react-router v7
- **Markdown:** react-markdown + rehype-raw + remark-math + rehype-katex
- **Syntax highlighting:** rehype-prism-plus + PrismJS
- **Icons:** lucide-react
- **Math:** KaTeX

## Struktur Modul

```
src/modules/
├── ai-dictionary-2026/       # Overview / landing
├── phase-1-mental-model/     # 10 terms — Mental Model of AI
├── phase-2-engineering/      # 12 terms — Modern Software Engineering
├── phase-3-ecosystem/        # 11 terms — AI Coding Ecosystem
├── phase-4-models/           # 9 terms — AI Models
├── phase-5-security/         # 6 terms — Security
├── phase-6-startup/          # 4 terms — Startup & Product
└── phase-7-productivity/     # 2 terms — How Top People Use AI
```

Setiap modul punya `config.ts` (metadata) dan `module.md` (konten markdown dengan `<Intuition>`, `<Theory>`, `<Example>`, `<Conclusion>` custom tags).

## Commands

```sh
npm run dev       # Dev server (localhost:5173)
npm run build     # tsc -b && vite build
npm run preview   # Preview production build
```

## Design

- **Warna:** Ungu (#7C3AED) + Hijau (#059669) — semantic tokens di CSS custom properties
- **Font:** Crimson Pro (heading) + Atkinson Hyperlegible (body)
- **Animasi:** CSS transitions dengan custom easing (`--ease-out: cubic-bezier(0.23,1,0.32,1)`)
- **Aksesibilitas:** `prefers-reduced-motion`, `:focus-visible` outlines, keyboard navigasi (J/K/Ctrl+K)
- **Mode gelap:** `[data-theme="dark"]` dengan localStorage persistence
- **Print styles:** Comprehensive print CSS yang menyembunyikan UI chrome

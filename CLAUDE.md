# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NoteFlow is a Next.js 15 + React 19 + TypeScript application that transforms raw notes into polished, professional formats using Google's Gemini AI. The app supports multiple note types (interview notes, meeting summaries) with internationalization (English/Thai) and multiple output formats. Built with shadcn/ui components for a modern, accessible interface.

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Code formatting
pnpm format:check
pnpm format
```

## Architecture

### Next.js App Structure

1. **Entry**: `src/app/layout.tsx` → Root layout with ThemeProvider
2. **Main Page**: `src/app/page.tsx` → Home page containing NoteTransformer
3. **Main Component**: `src/components/note-transformer.tsx` orchestrates the entire workflow
4. **Data Flow**: User input → Context + Raw notes → AI transformation → Formatted output

### Component Structure

```
NoteTransformer (Main orchestrator)
├── Header (Logo, Settings, Theme, Language)
├── NoteTypeSelector (Interview/Meeting)
├── ContextForm (Dynamic fields per note type)
├── NotesInput (Raw text + sample data)
├── OutputFormatSelector (Format-specific options)
└── OutputDisplay (Streaming results with markdown)
```

### Key Directories

- **src/app/**: Next.js App Router structure
- **src/components/ui/**: shadcn/ui components with Tailwind styling
- **src/components/**: Application-specific components
- **src/lib/**: Core business logic
  - `ai.ts`: Google Gemini integration with streaming
  - `data.ts`: Type definitions and sample data
  - `i18n.ts`: Internationalization setup
  - `utils.ts`: Utility functions (cn helper for class merging)

### Data Model

```typescript
type NoteType = "interview" | "meeting"

// Interview context: position, candidate, interviewType, duration
// Meeting context: title, attendees, date, duration

// Output formats: evaluation, slack, email, discord, google_doc
```

### AI Implementation

- **Models**: gemini-1.5-pro, gemini-1.5-flash, gemini-pro
- **Configuration**: Stored in localStorage (`gemini-settings`)
- **Features**:
  - Bilingual system prompts (English/Thai)
  - Format-specific prompting for each output type
  - Streaming support with real-time display
  - Context-aware prompt generation

### State Management

- Uses React 19's built-in state (no external state library)
- localStorage for AI settings persistence
- React transitions for smooth UI updates during streaming

### UI Framework

- **Next.js 15**: App Router with React Server Components
- **shadcn/ui**: High-quality, accessible components built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **next-themes**: Dark/light mode support with system preference detection
- **Framer Motion**: Smooth animations and transitions

### Build Configuration

- **Next.js**: Modern React framework with SWC compiler
- **TypeScript**: Strict mode with path aliases (`@/*` → `./src/*`)
- **Tailwind CSS**: Custom configuration with shadcn/ui design tokens
- **PostCSS**: Autoprefixer for cross-browser compatibility

### Key Libraries

- **Framework**: Next.js 15, React 19
- **AI**: `@ai-sdk/google`, `ai` SDK
- **UI**: shadcn/ui (Radix UI), Lucide React icons, Framer Motion
- **Theming**: next-themes for dark/light mode
- **Markdown**: `react-markdown`, `marked`
- **I18n**: `i18next`, `react-i18next`
- **Styling**: Tailwind CSS, class-variance-authority, clsx, tailwind-merge

## Development Notes

- **Package Manager**: pnpm (required)
- **TypeScript**: Strict mode enabled with path aliases (`@/*` → `./src/*`)
- **ESLint**: Next.js ESLint configuration
- **No Test Framework**: Currently only type checking available
- **Environment Variables**: `NEXT_PUBLIC_GOOGLE_API_KEY` for default API key
- **Component Library**: shadcn/ui components configured in `components.json`
- **Deployment**: Vercel-ready with Next.js optimization
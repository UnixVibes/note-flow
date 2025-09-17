# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript application that transforms raw notes into polished, professional formats using Google's Gemini AI. The app supports multiple note types (interview notes, meeting summaries) with internationalization (English/Thai) and multiple output formats.

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm test:types

# Linting
pnpm lint
pnpm lint:fix

# Code formatting
pnpm format:check
pnpm format

# Release
pnpm release
```

## Architecture

### Core Structure
- **src/App.tsx**: Main application entry point with ThemeProvider wrapper
- **src/components/note-transformer.tsx**: Main UI component (likely ~400+ lines)
- **src/lib/ai.ts**: Google AI integration with streaming support
- **src/lib/data.ts**: Type definitions and sample data for note types
- **src/lib/i18n.ts**: Internationalization setup

### Key Components
- **UI Components**: Located in `src/components/ui/` using Radix UI primitives
- **Language Support**: Bilingual (English/Thai) with react-i18next
- **Theme System**: Dark/light mode support with theme provider
- **AI Integration**: Google Gemini AI with streaming text generation

### Data Model
- **Note Types**: `interview` | `meeting`
- **Context Fields**: Different for each note type (position, candidate, duration for interviews; title, attendees, date for meetings)
- **Use Cases**: Multiple output formats (evaluation, slack, email, google doc)

### AI Implementation
- Uses Google AI SDK (`@ai-sdk/google`)
- Supports both streaming and non-streaming responses
- Configurable models: gemini-1.5-pro, gemini-1.5-flash, gemini-pro
- Settings stored in localStorage
- Bilingual system prompts for English and Thai

### Build Configuration
- **Vite**: Modern build tool with SWC for React
- **Tailwind CSS v4**: For styling
- **PWA Support**: Via vite-plugin-pwa with caching strategies
- **Performance**: Million.js for React optimization, manual chunk splitting
- **Bundle Optimization**: Separate chunks for React, AI libraries, Radix UI, and utilities

### Key Libraries
- **UI**: Radix UI components, Lucide React icons, Framer Motion animations
- **AI**: ai SDK, Google AI SDK
- **Markdown**: react-markdown, marked for text processing
- **State**: React 19 with built-in state management
- **Styling**: Tailwind CSS, class-variance-authority, clsx

## Development Notes

- No test framework configured - add tests using preferred framework
- Uses pnpm as package manager
- ESLint configuration uses @antfu/eslint-config
- TypeScript strict mode enabled
- Vercel deployment configuration included
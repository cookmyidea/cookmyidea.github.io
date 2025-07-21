# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server with Turbopack for faster builds
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn lint` - Run ESLint with auto-fix

## Architecture Overview

This is a Next.js 15 application built with React 19 for an AI startup mentor platform. The app follows the App Router pattern and uses shadcn/ui components with Tailwind CSS for styling.

### Key Application Flow

The application follows a multi-step routing pattern:
1. **Home Page** (`/`) - Form for users to submit business ideas
2. **Evaluation Page** (`/[idea_id]/evaluation`) - Displays analysis results with scoring for different categories
3. **Pain Points Page** (`/[idea_id]/pain-points`) - Shows pain point analysis with sidebar navigation

The flow uses dynamic routing with `idea_id` parameter:
- User submits idea on `/` → redirects to `/{idea_id}/evaluation`
- From evaluation page → "Give it a try" button navigates to `/{idea_id}/pain-points`
- All pages communicate with backend webhook at `http://localhost:5678/webhook-test/9f79471d-b9ba-48c3-97f2-cccaa3df9655`

### Component System

Uses shadcn/ui components located in `src/components/ui/` with:
- Custom Button variants using class-variance-authority
- Progress components for scoring displays
- Form components (Textarea, Label) for user input
- Utility function `cn()` in `src/lib/utils.ts` for className merging

### Styling

- Tailwind CSS 4 with custom configuration
- Component-based styling with variant patterns
- Progress bars with color coding based on scores (red/yellow/green)
- Responsive grid layouts for desktop/mobile

### Key Dependencies

- Radix UI primitives for accessible components
- Lucide React for icons
- TypeScript for type safety
- class-variance-authority for component variants
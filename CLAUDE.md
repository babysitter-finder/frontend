# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Babysitter Finder (Hi Sitter) - A Next.js marketplace connecting babysitters with clients.

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router + Turbopack
- **Language**: TypeScript
- **State**: Zustand
- **Styling**: Tailwind CSS v4 (CSS-based config)
- **HTTP**: Axios
- **Maps**: Leaflet + react-leaflet
- **Auth**: localStorage-based token storage

## Commands

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Route Groups (App Router)
- `src/app/(auth)/` - Public auth pages (login, register)
- `src/app/(protected)/` - Auth-required pages with Header layout

### Key Directories
```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # Atoms: Button, Logo, Stars
│   ├── forms/              # Input, Select, TextArea
│   ├── organisms/          # Header
│   └── providers/          # AuthProvider
├── stores/                 # Zustand stores (user, babysitter, service, review)
├── lib/
│   ├── api/                # Axios client + API functions
│   └── utils/              # cn helper, storage utilities
└── types/                  # TypeScript interfaces
```

### State Management (Zustand)
- `useUserStore` - Auth, user profile
- `useBabysitterStore` - Babysitter list, selection
- `useServiceStore` - Service CRUD, form state
- `useReviewStore` - Review submission

### API Integration
- Base URL: `https://hisitter.xyz` (env: `NEXT_PUBLIC_API_URL`)
- Auth: `Authorization: Token {token}` header
- Token stored in localStorage

## Styling (Tailwind v4)

Design tokens defined in `src/app/globals.css` using `@theme inline`:
- Colors: `--color-illustration-primary`, `--color-illustration-secondary`, etc.
- Spacing: `--spacing-nano` (8px) to `--spacing-extra-large` (160px)
- Fonts: Overlock (headings), Roboto (body)

## Key Patterns

**Adding a new page:**
1. Create in `src/app/(auth)/` or `src/app/(protected)/`
2. Use `'use client'` directive if client-side interactivity needed
3. Import stores/components as needed

**Adding API calls:**
1. Add function to `src/lib/api/`
2. Create/update Zustand store action
3. Handle loading/error states in store

## External Resources

- Design: [Figma](https://www.figma.com/file/SJbT26D4huBkATw97d8heG/finder)
- Backend: https://github.com/babysitter-finder/backend

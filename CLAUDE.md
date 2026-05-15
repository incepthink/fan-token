# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint
npm run test         # Run tests once (vitest)
npm run test:watch   # Run tests in watch mode
npm run preview      # Preview production build
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.tsx
```

## Architecture

This is a React + TypeScript + Vite frontend-only app called **FanDrop** — a fan token rewards platform where artists create fan pages with tasks that fans complete to earn ERC-20 tokens.

**Two user roles:**
- **Artist** — logs in (mock auth), manages fan pages, creates tasks, approves manual submissions
- **Fan** — connects a wallet (RainbowKit/Wagmi on Base Sepolia), views artist fan pages, completes tasks to earn tokens

**Routing** (`src/App.tsx`) — all routes are under `basename="/examples/fan-tokens"`:
- `/` → `ExplorePage` — browse all artist fan pages
- `/artist/login`, `/artist/signup` — mock artist auth
- `/artist/dashboard/*` — nested artist dashboard (fan page list, create fan page, add tasks, approvals)
- `/:fanPageSlug` → `FanPageView` — public fan-facing page

**State management** (`src/context/AppContext.tsx`) — single React context holding:
- `isArtistLoggedIn` — mock login state
- `tasks: Task[]` — initialized from `src/data/mock.ts`, mutated locally (no backend)
- `approvals: Approval[]` — initialized from `src/data/mock.ts`, mutated locally

**Data** (`src/data/mock.ts`) — all data is mock/static. Core types: `Artist`, `Task` (with `TaskType`: `instant` | `manual`, and `TaskStatus`: `available` | `completed` | `in_review` | `rejected` | `paused`), `Approval`. Tasks are generated per-artist via `generateTasks()`.

**Web3** (`src/lib/wagmi.ts`) — Wagmi v2 + RainbowKit configured for **Base Sepolia** only. App name is "FanDrop". Wallet connection is purely for UX gating (tasks require a connected wallet); no actual on-chain transactions are made.

**UI** — shadcn/ui components in `src/components/ui/`, custom components (`Header`, `TaskCard`, `FanPageCard`, `NavLink`) in `src/components/`. Styling is Tailwind CSS with `@` path alias pointing to `src/`.

**Tests** — Vitest + jsdom + Testing Library. Setup file at `src/test/setup.ts`. Test files follow `src/**/*.{test,spec}.{ts,tsx}`.

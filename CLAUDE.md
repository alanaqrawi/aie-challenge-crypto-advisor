# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An IDE-challenge exercise for the **Aspire AI Titanium Engineer Program** (Accenture × AI Makerspace, May 2026): a Cryptocurrency Advisor chat app. Backend = FastAPI wrapping OpenAI `gpt-5`. Frontend = Next.js 16 (Turbopack) + React 19 + Tailwind v4 + shadcn/Radix UI primitives. Two separate Vercel deployments. See `README.md` for live URLs and the architecture diagram.

## Common commands

### Backend (`cd backend`)

```bash
uv sync                                              # install / lock Python deps
echo OPENAI_API_KEY=sk-... > .env                    # local-only secret
uv run uvicorn api.index:app --reload --port 8000    # dev server on :8000, /docs for Swagger
vercel --prod                                        # deploy (project: alanaqrawi-aie-backend)
```

### Frontend (`cd frontend`)

```bash
pnpm install                                         # respects .npmrc (must be hoisted)
pnpm run dev                                         # dev server on :3000
pnpm run build                                       # production build (Turbopack)
pnpm run lint                                        # eslint .
vercel --prod                                        # deploy (project: alanaqrawi-aie-frontend)
```

There is no test suite.

## Architecture (the non-obvious parts)

- **Single endpoint** `POST /api/chat` in `backend/api/index.py`. Request `{message}` → OpenAI chat completion with a hardcoded crypto-advisor system prompt → response `{reply}`. Pure stateless wrapper, no DB, no sessions, no history persistence.
- **CORS is wide open** (`allow_origins=["*"]`) — fine for the demo; would need tightening for prod.
- **Frontend → backend wiring** lives in `frontend/lib/api.ts`. The backend URL is **hardcoded as a fallback default** (`https://alanaqrawi-aie-backend.vercel.app`) so the deployed frontend works even without `NEXT_PUBLIC_API_URL` set. Override via env var for local dev or to point at a different backend.
- **`backend/data/PolkaDotPaper.pdf`** is the sample whitepaper for the **optional advanced assignment** (multi-persona chat + PDF-grounded answers). The current backend doesn't use it; it's there for when that feature is built.

## Build / deploy gotchas

- **`frontend/.npmrc` pins `shamefully-hoist=true`.** This is REQUIRED — Next.js 16 Turbopack cannot resolve pnpm's symlinked dep tree otherwise, and `pnpm run build` fails with `Module not found: Can't resolve '@radix-ui/...'`. Do not remove this file.
- **`frontend/next.config.mjs` has `typescript.ignoreBuildErrors: true`.** Means TS errors don't block production builds. Be aware that "build passed" doesn't mean "TypeScript clean" — run `pnpm run lint` or `tsc --noEmit` to catch real type issues.
- **`OPENAI_API_KEY` lives in Vercel project env vars** (Settings → Environment Variables) for production. The CLI flow `vercel env add` is brittle with pasted secrets on Windows CMD — paste via the dashboard.
- **Backend and frontend are separate Vercel projects.** Each has its own `.vercel/` folder locally (gitignored). Never deploy one from the other's directory.

## Vercel project links

- Backend: `alanaqrawi-aie-backend` → https://alanaqrawi-aie-backend.vercel.app
- Frontend: `alanaqrawi-aie-frontend` → https://alanaqrawi-aie-frontend.vercel.app

## Repo conventions

- Files under `frontend/lib/` (`api.ts`, `utils.ts`) were hand-written for this exercise — the upstream AI Makerspace starter omits them; `cn` and `postChat` are required by the shadcn components and chat container respectively.
- Backend uses `uv` (not pip directly). The `uv.lock` is authoritative; modify deps via `uv add <pkg>` rather than editing `pyproject.toml` by hand.

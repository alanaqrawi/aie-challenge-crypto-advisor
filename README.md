# AIE Challenge — Cryptocurrency Advisor

End-to-end LLM application built for the **Aspire AI Titanium Engineer Program** (Accenture × AI Makerspace, Cohort 1 Americas, May 2026).

A FastAPI backend wraps OpenAI for crypto-investing guidance; a Next.js + Tailwind frontend provides the chat UI. Both services are deployed independently to Vercel.

## Live demo

- **Frontend (chat UI):** https://alanaqrawi-aie-frontend.vercel.app
- **Backend (FastAPI docs):** https://alanaqrawi-aie-backend.vercel.app/docs

## Stack

| Layer | Tech |
|---|---|
| Backend | FastAPI · Python 3.12 · OpenAI (`gpt-5`) |
| Frontend | Next.js 16 · React 19 · TypeScript · Tailwind · Radix UI / shadcn |
| Deployment | Vercel (two separate projects) |
| Local tooling | `uv` (Python) · `pnpm` (Node) |

## Architecture

```
┌────────────────────┐   POST /api/chat   ┌────────────────────┐
│  Next.js frontend  │ ─────────────────▶ │  FastAPI backend   │
│  (Vercel)          │ ◀───────────────── │  (Vercel)          │
└────────────────────┘     { reply }      └─────────┬──────────┘
                                                    │
                                          ┌─────────▼──────────┐
                                          │  OpenAI gpt-5      │
                                          └────────────────────┘
```

CORS is open (`allow_origins=["*"]`) on the backend for the demo; tighten before any production use.

## Local development

### Backend

```cmd
cd backend
uv sync
echo OPENAI_API_KEY=sk-...your-key... > .env
uv run uvicorn api.index:app --reload --port 8000
```

Then visit http://localhost:8000/docs to try `/api/chat`.

### Frontend

```cmd
cd frontend
pnpm install
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
pnpm run dev
```

Then visit http://localhost:3000.

> `frontend/lib/api.ts` falls back to the deployed backend URL if `NEXT_PUBLIC_API_URL` is unset, so the chat works out-of-the-box without local backend.

## Deployment notes

Each service is a standalone Vercel project deployed via the CLI:

```cmd
cd backend  && vercel --prod
cd frontend && vercel --prod
```

- **Backend** requires `OPENAI_API_KEY` set in the Vercel project's environment variables (Settings → Environment Variables → add for Production / Preview / Development).
- **Frontend** uses pnpm with `shamefully-hoist=true` (see `frontend/.npmrc`) — required for Next.js Turbopack to resolve hoisted Radix UI packages.

## Project layout

```
.
├── backend/
│   ├── api/index.py       # FastAPI app: GET / and POST /api/chat
│   ├── data/              # Sample whitepaper for the advanced assignment
│   ├── pyproject.toml     # uv-managed deps
│   ├── uv.lock
│   └── vercel.json        # Vercel routing config
└── frontend/
    ├── app/               # Next.js app router
    ├── components/        # Chat UI components
    ├── components/ui/     # shadcn/Radix primitives
    ├── lib/
    │   ├── api.ts         # postChat() — wraps fetch to /api/chat
    │   └── utils.ts       # cn() — tailwind-merge helper
    ├── .npmrc             # shamefully-hoist=true for Turbopack
    └── package.json
```

## Acknowledgments

- [AI Makerspace](https://aimakerspace.io/) — IDE challenge framework + starter components
- Accenture Aspire AI team — Titanium Engineer program

## Status

🟢 Both services deployed and live. See live-demo links above.

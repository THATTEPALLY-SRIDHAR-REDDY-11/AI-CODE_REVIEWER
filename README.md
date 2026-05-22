# AI Code Reviewer

AI-powered automated code review using React, Express, Groq (Llama 3.3 70B), MongoDB Atlas, and LangSmith tracing.

## Folder structure

```
codereviewerAI/
├── client/
│   ├── src/
│   │   ├── components/   # Layout, Card, ReviewResult, CodeBlock, etc.
│   │   ├── pages/        # Home, Review, History
│   │   └── services/     # Axios API + language helpers
│   └── package.json
├── server/
│   ├── config/           # db, groq, langsmith
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/         # Groq review + LangSmith traceable
│   └── package.json
└── README.md
```

## Dependencies

### Server (`server/package.json`)

- `express`, `cors`, `dotenv` — API server
- `mongoose` — MongoDB Atlas
- `groq-sdk` — Llama 3.3 70B reviews
- `langsmith` — observability tracing

### Client (`client/package.json`)

- `react`, `react-dom`, `react-router-dom` — UI
- `tailwindcss`, `vite` — styling & build
- `axios` — API calls
- `framer-motion` — animations
- `react-syntax-highlighter` — code display

## Environment variables

Copy examples and fill in secrets:

```bash
# server/.env  (copy from .env.example — do NOT put real keys in .env.example)
PORT=5000
GROQ_API_KEY=your_groq_key
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
MONGODB_DB_NAME=codereviewer
LANGCHAIN_API_KEY=your_langsmith_key
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=AI-Code-Reviewer

# client/.env
VITE_API_URL=http://localhost:5000/api
```

Get keys:

- [Groq Console](https://console.groq.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [LangSmith](https://smith.langchain.com/) — create API key under Settings

## Run instructions

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure environment

```bash
cd server
copy .env.example .env   # Windows — put secrets only in .env (gitignored)
# Edit .env with your keys; never commit real API keys to .env.example

cd ../client
copy .env.example .env
```

### 3. Start backend

```bash
cd server
npm run dev
```

Server: `http://localhost:5000`

### 4. Start frontend

```bash
cd client
npm run dev
```

App: `http://localhost:5173`

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/review` | Submit code + language, run Groq review, save to DB |
| GET | `/api/history` | List all past reviews |
| DELETE | `/api/history/:id` | Delete a review |

## Flow

```
User Input → React → POST /api/review → reviewService (Groq + LangSmith trace)
  → MongoDB → JSON response → ReviewResult UI
```

## LangSmith

Traces appear in the [LangSmith dashboard](https://smith.langchain.com/) under project `AI-Code-Reviewer` when `LANGCHAIN_TRACING_V2=true` and `LANGCHAIN_API_KEY` are set. The `generateReview` function is wrapped with `traceable()` from the LangSmith SDK.

## Deploy on Vercel

This repo is configured for a single Vercel project:

- Frontend: built from `client/` and served as static output
- Backend: serverless function at `api/index.js` reusing the Express app in `server/app.js`

### 1. Push repository to GitHub

Commit and push this project, then import it in Vercel.

### 2. Add environment variables in Vercel project settings

Set these variables for Production (and Preview if needed):

```bash
GROQ_API_KEY=your_groq_key
MONGODB_URI=your_mongodb_uri
MONGODB_DB_NAME=codereviewer
LANGCHAIN_API_KEY=your_langsmith_key
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=AI-Code-Reviewer
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

`VITE_API_URL` is not required on Vercel because the client uses relative `/api` by default.

### 3. Deploy

Vercel automatically uses `vercel.json`:

- install: `npm install --prefix server && npm install --prefix client`
- build: `npm run build --prefix client`
- API rewrites: `/api/*` -> `api/index.js`

### 4. Verify after deploy

- Open `/api/health` and confirm `{"status":"ok"}`
- Submit a code review from the UI
- Confirm traces in LangSmith and records in MongoDB

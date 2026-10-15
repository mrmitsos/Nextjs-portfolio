# Dimitris Maleas: Portfolio

Personal portfolio built with Next.js (App Router), React 19, TypeScript and Tailwind CSS. Projects, skills and experience are managed in Sanity and rendered on the server; the contact form sends email through a Server Action using Resend and React Email.

## Stack

- Next.js 16 (App Router, Server Components, Server Actions)
- React 19, TypeScript, Tailwind CSS 3
- Framer Motion (respects `prefers-reduced-motion`)
- Sanity CMS with an embedded Studio at `/studio`
- Resend + React Email
- Hosted on Vercel

## Getting started

```bash
npm install
npm run dev
```

Create `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name |
| `RESEND_API_KEY` | Resend API key (server only) |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL, used for metadata and the sitemap |

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run lint`: ESLint (flat config)
- `npm run typecheck`: TypeScript check

CI (`.github/workflows/ci.yml`) runs the type check and lint on every push and pull request.

## Structure

- `app/`: routes, metadata, sitemap and robots; `app/projects/[slug]` is statically generated from Sanity
- `components/`: page sections and UI
- `actions/sendEmail.ts`: contact form Server Action (validation, honeypot, rate limit)
- `lib/sanity.ts`: GROQ queries and types
- `sanity/`: Studio config and schemas

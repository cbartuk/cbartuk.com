# cbartuk.com

Personal portfolio website built with Next.js + TypeScript + Tailwind, content-managed via Sanity.

## Stack

- Next.js (Pages Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Sanity CMS (`sanity/`)

## Project Structure

- `pages/` - Next.js routes and API routes
- `components/` - UI sections and reusable components
- `utils/` - server-side data fetch helpers
- `sanity/` - Sanity Studio project and schemas
- `sanity.ts` - Sanity client config for frontend
- `typings.d.ts` - app domain types

## Local Setup

1. Install dependencies

```bash
yarn install
```

2. Create env file

Use `.env.example` as reference and create your own `.env.local`.

Required variables:

```env
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
```

Optional (legacy in some workflows):

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Run dev server

```bash
yarn dev
```

Open `http://localhost:3000`.

## Sanity Studio

Sanity Studio lives under `sanity/`.

```bash
cd sanity
yarn install
yarn dev
```

Studio opens locally and manages portfolio content.

## Scripts

```bash
yarn dev      # run next dev
yarn lint     # run lint
yarn build    # production build
yarn start    # run production server
```

## Content Models

- `pageInfo`
- `experience`
- `project`
- `skill`
- `social`

## Notes

- Keep secrets out of git; use `.env.local`.
- `docs/` is local and ignored by git.

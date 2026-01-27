# Cricket Panel Dashboard

A modern Next.js dashboard for tracking live cricket matches from multiple sources.

## Features

- 🏏 Real-time match data from Cricbuzz, ESPN, NW18, and Sportskeeda
- 🎨 Modern UI with shadcn/ui components and Tailwind CSS
- 📱 Fully responsive design with mobile sidebar
- 🔄 Auto-refresh every 30 minutes
- ⚡ Server-side rendering with Next.js 16
- 🎯 TypeScript for type safety

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_BASE_URL=https://us-central1-micro-service-52cc5.cloudfunctions.net/cricketStats
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: lucide-react

## Project Structure

```
app/
├── page.tsx              # Main dashboard page
├── layout.tsx            # Root layout with sidebar
└── globals.css           # Global styles

components/
├── ui/                   # shadcn/ui components
└── dashboard/            # Dashboard-specific components
    ├── sidebar.tsx
    ├── match-card.tsx
    ├── match-table.tsx
    ├── status-badge.tsx
    └── instructions-card.tsx

lib/
├── api.ts                # API client functions
├── types.ts              # TypeScript interfaces
└── utils.ts              # Utility functions
```

## API Endpoints

The dashboard fetches data from:
- Cricbuzz: `/cbz`
- ESPN: `/espn`
- NW18: `/nw18`
- Sportskeeda: `/sk`

## Build

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Created With 🧡 By Lucifer

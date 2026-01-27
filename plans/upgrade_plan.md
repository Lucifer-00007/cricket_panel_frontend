# Upgrade Plan: Cricket Panel to Next.js & shadcn/ui

## 1. Executive Summary
This document outlines the strategy to upgrade the existing **Express.js + Handlebars (HBS)** application to a modern **Next.js 14+ (App Router)** architecture. The goal is to improve performance, maintainability, and user experience by leveraging React Server Components, Tailwind CSS, and the shadcn/ui component library.

## 2. Technology Stack Selection
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (for type safety and better DX)
- **UI Library:** shadcn/ui (Radix UI based, accessible, customizable)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data Fetching:** Native `fetch` with caching, or Server Actions for scraping logic.
- **Backend Logic:** Next.js Route Handlers (`app/api/`) replacing the Express server.

## 3. Analysis of Current State
- **Backend:** `src/app.js` runs an Express server. `src/api.js` likely contains data fetching/scraping logic using `cheerio` and `node-fetch`.
- **Frontend:** Server-side rendered HBS templates in `templates/views/` and `templates/partials/`.
- **Styling:** Custom CSS in `public/panel.css`.
- **Assets:** Static images in `public/images/`.

## 4. Migration Strategy
We will adopt a **"Parallel" or "Big Bang"** approach depending on codebase size. Given the project structure, a fresh Next.js initialization is recommended, migrating logic piece by piece.

### Phase 1: Initialization & Configuration
1.  **Initialize Next.js App**:
    ```bash
    npx create-next-app@latest . --typescript --tailwind --eslint
    ```
2.  **Install Dependencies**:
    ```bash
    npm install cheerio lucide-react
    npx shadcn-ui@latest init
    ```
3.  **Configure shadcn/ui**: Set up `components.json`, `utils.ts`, and base styles in `globals.css`.

### Phase 2: Backend Logic Migration
The existing `src/app.js` and `src/api.js` logic needs to be moved.
-   **API Routes**: Convert Express routes to Next.js Route Handlers (`app/api/route.ts`).
-   **Scraping Logic**: Move `cheerio` based scraping functions from `src/api.js` to a utility service `lib/scraper.ts` or directly into Server Actions if they are triggered by UI interactions.
-   **Data Fetching**: Replace `node-fetch` with native `fetch` (Next.js extends it).

### Phase 3: Component Migration
Refactor HBS partials into reusable React components using shadcn/ui.
-   **Navigation**: `templates/partials/dashboardNav.hbs` -> `components/layout/Navbar.tsx`. Use shadcn `NavigationMenu` or simple flexbox headers.
-   **Sidebar**: `templates/partials/sidebar.hbs` -> `components/layout/Sidebar.tsx`. Use shadcn `Sheet` for mobile responsiveness.
-   **Footer**: `templates/partials/footer.hbs` -> `components/layout/Footer.tsx`.
-   **Loader**: `templates/partials/loader.hbs` -> `loading.tsx` (Next.js Suspense boundary).

### Phase 4: Page Migration
Convert HBS views to Next.js Pages.
-   **Home**: `templates/views/index.hbs` -> `app/page.tsx`.
    -   Fetch initial data (cricket scores/news) server-side inside the component.
-   **About**: `templates/views/about.hbs` -> `app/about/page.tsx`.
-   **404**: `templates/views/404.hbs` -> `app/not-found.tsx`.
-   **Layout**: Create `app/layout.tsx` to hold the `Navbar`, `Sidebar`, and global styles.

### Phase 5: Styling & Assets
-   **CSS Migration**: Analyze `public/panel.css`. Convert custom styles to Tailwind utility classes within components.
-   **Images**: Move `public/images` to the new `public/images` folder. Use `next/image` for optimized image loading.

### Phase 6: Features & Modernization
-   **Real-time Updates**: If the panel requires live scores, implement polling with `SWR` or `React Query`, or use Server Actions with `revalidatePath` for manual refreshes.
-   **SEO**: Use Next.js Metadata API in `layout.tsx` and `page.tsx` to replace `headlinks.hbs`.

## 5. Directory Structure Target
```
/
├── app/
│   ├── api/            # Replaces Express routes
│   ├── globals.css     # Tailwind imports
│   ├── layout.tsx      # Root layout (Html, Body, Providers)
│   ├── page.tsx        # Homepage
│   └── not-found.tsx   # 404 Page
├── components/
│   ├── ui/             # shadcn components (Button, Card, etc.)
│   ├── layout/         # Sidebar, Navbar, Footer
│   └── dashboard/      # Specific dashboard widgets
├── lib/
│   ├── utils.ts        # shadcn utils
│   └── scraper.ts      # Migrated scraping logic
├── public/             # Static assets
└── package.json
```

## 6. Implementation Checklist
- [ ] Initialize Next.js project.
- [ ] Port `scraper` logic to TypeScript functions.
- [ ] Create UI components (Navbar, Sidebar) with shadcn.
- [ ] Implement Home page with server-side data fetching.
- [ ] Implement About and 404 pages.
- [ ] Verify scraping functionality works in Vercel/Node environment.
- [ ] Optimize images and fonts.
- [ ] Final Testing & Deployment (Vercel/Firebase).

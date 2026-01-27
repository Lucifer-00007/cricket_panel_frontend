# Upgrade Plan: Cricket Panel to Next.js & shadcn/ui

## 1. Executive Summary
This document outlines the strategy to upgrade the existing application to a modern **Next.js 15+ (App Router)** architecture. The goal is to build a high-performance frontend using **shadcn/ui** and **Tailwind CSS**, integrating with an **already developed backend** and migrating legacy assets from `public-old`.

## 2. Technology Stack Selection
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **UI Library:** shadcn/ui (Radix UI based)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Package Manager:** Bun
- **Backend:** Existing Backend (Integration only)

## 3. Asset & Legacy Analysis (`public-old/`)
We have preserved the legacy assets in `public-old/` to serve as the reference for the migration:
-   **Styles (`panel.css`):** Contains the original visual identity. **Action:** Analyze and recreate these styles using Tailwind CSS utility classes in `app/globals.css` or component-specific styles.
-   **Scripts (`myscript.js`):** Contains legacy DOM manipulation logic. **Action:** Refactor into React `useEffect` hooks, Event Handlers, or custom hooks. Avoid direct DOM manipulation.
-   **Images (`images/`, `PGL.png`):** Static assets. **Action:** Move essential images to the new `public/` directory and optimize usage with `next/image`.
-   **HTML (`index.html`, `404.html`):** Structural reference. **Action:** Use these to guide the layout structure of `page.tsx` and `not-found.tsx`.

## 4. Migration Strategy

### Phase 1: Foundation (Completed)
-   [x] Initialize Next.js 15+ project.
-   [x] Configure Tailwind CSS & shadcn/ui.
-   [x] Remove legacy Express/HBS code.
-   [x] Create `public-old` backup.

### Phase 2: Backend Integration
Since the backend is **already created**, we will focus on integration:
-   **API Integration:** Connect the frontend to the backend data sources.
    -   If the backend is a separate service: Set up environment variables (`.env.local`) for API endpoints.
    -   If the backend code is to be hosted within Next.js: Place the logic in `app/api/` Route Handlers or Server Actions.
-   **Data Fetching:** Use Server Components for initial data load (replacing `handlebars` context injection) and Client Components for interactive updates.

### Phase 3: Component Implementation
Rebuild the UI using shadcn/ui, referring to `public-old` for design cues.
-   **Layout**: Create a persistent `Sidebar` and `Navbar` in `app/layout.tsx`.
-   **Dashboard Widgets**: Create components for Scorecards, News Feed, etc.
-   **Navigation**: Implement responsive navigation (Sidebar for desktop, Drawer/Sheet for mobile).

### Phase 4: Asset & Style Migration
-   **Images**: Copy `public-old/PGL.png` and `public-old/images/*` to `public/`.
-   **Styling**: Open `public-old/panel.css`. For every custom class, find the equivalent Tailwind utility.
    -   *Example:* `.card { background: white; shadow: ... }` -> `<Card className="bg-white shadow-md" />`
-   **404 Page**: Recreate `public-old/404.html` as `app/not-found.tsx` using the `404.jpg` image.

## 5. Directory Structure Target
```
/
├── app/
│   ├── api/            # (Optional) Internal API routes if backend is here
│   ├── components/     # React Components
│   │   ├── ui/         # shadcn primitives
│   │   ├── layout/     # Sidebar, Header
│   │   └── dashboard/  # Panel widgets
│   ├── lib/            # Utilities & Types
│   ├── globals.css     # Global styles (Tailwind)
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Dashboard Home
│   └── not-found.tsx   # Custom 404
├── public/             # Optimized assets (migrated from public-old)
├── public-old/         # Legacy reference (do not import from here)
└── package.json
```

## 6. Implementation Checklist
- [ ] **Assets**: Move images from `public-old` to `public`.
- [ ] **Styles**: Port `panel.css` visual rules to Tailwind in `globals.css` or components.
- [ ] **Backend**: Connect `page.tsx` to the existing backend data sources.
- [ ] **Components**: Build `Sidebar`, `Navbar`, and `Dashboard` shell.
- [ ] **Interactivity**: Port `myscript.js` logic to React components.
- [ ] **Pages**: Finalize Home and 404 pages.
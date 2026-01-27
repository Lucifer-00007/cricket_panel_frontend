# Cricket Panel Migration Plan: Static to Next.js + shadcn/ui

## Overview
Migrate the static HTML/CSS/JS cricket panel application to a modern Next.js 16 application with TypeScript, shadcn/ui components, and Tailwind CSS v4.

## Current Stack Analysis

### Existing Static Application
- **HTML**: Single-page application with sidebar navigation
- **CSS**: Custom styles with Bootstrap 5.1.3, Boxicons, Font Awesome
- **JavaScript**: Vanilla JS with jQuery for DOM manipulation
- **External APIs**: Firebase Functions (Cricbuzz, ESPN, NW18, Sportskeeda)
- **Features**: 
  - Dynamic match data fetching
  - Sidebar navigation
  - Match status indicators (Live, Completed, Upcoming)
  - Auto-refresh every 30 minutes
  - Responsive design

### Target Stack
- **Framework**: Next.js 16.1.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **UI Components**: Radix UI primitives via shadcn/ui
- **Icons**: lucide-react (replacing Font Awesome + Boxicons)

---

## Phase 1: Project Setup & Configuration

### 1.1 Environment Setup
- [x] Next.js project initialized
- [x] TypeScript configured
- [x] Tailwind CSS v4 installed
- [x] shadcn/ui configured
- [ ] Create `.env.local` for API endpoints

### 1.2 Directory Structure
```
app/
├── (dashboard)/
│   ├── layout.tsx          # Dashboard layout with sidebar
│   └── page.tsx            # Main dashboard page
├── api/
│   └── matches/
│       └── route.ts        # API route for match data
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── match-card.tsx
│   │   ├── match-table.tsx
│   │   └── status-badge.tsx
│   └── providers/
│       └── match-provider.tsx
├── lib/
│   ├── utils.ts
│   ├── api.ts              # API client functions
│   └── types.ts            # TypeScript interfaces
└── hooks/
    └── use-matches.ts      # Custom hook for match data
```

---

## Phase 2: Core Component Migration

### 2.1 Layout Components

#### Sidebar Component (`components/dashboard/sidebar.tsx`)
**Migration from**: `.sidebar` class in `panel.css` + HTML structure
**Features**:
- Logo and branding
- Dynamic navigation links
- Mobile toggle functionality
- Active state management

**shadcn/ui components to use**:
- `Sheet` (for mobile sidebar)
- `Button` (for navigation items)
- `ScrollArea` (for scrollable nav)

**Implementation**:
```typescript
interface SidebarProps {
  sites: string[]
  onNavigate: (siteId: string) => void
}
```

#### Dashboard Layout (`app/(dashboard)/layout.tsx`)
**Migration from**: Main HTML structure
**Features**:
- Responsive layout
- Sidebar integration
- Header with title
- Footer

### 2.2 Data Display Components

#### Match Card Component (`components/dashboard/match-card.tsx`)
**Migration from**: `.sales-boxes` and `.recent-sales` classes
**Features**:
- Site name header with link
- Match table
- Responsive design

**shadcn/ui components**:
- `Card`, `CardHeader`, `CardTitle`, `CardContent`
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`

#### Match Table Row (`components/dashboard/match-table.tsx`)
**Migration from**: Dynamic HTML generation in `generate_html()`
**Features**:
- Date/time display
- Match key
- Team names with link
- Innings scores
- Status-based styling

#### Status Badge (`components/dashboard/status-badge.tsx`)
**Migration from**: `.running-match`, `.text-secondary` classes
**Features**:
- Live (red badge)
- Completed (gray badge)
- Upcoming (blue badge)

**shadcn/ui components**:
- `Badge` with variants

### 2.3 Input Components

#### API Key Inputs (`components/dashboard/api-inputs.tsx`)
**Migration from**: `.overview-boxes` with input fields
**Features**:
- Four input fields (Cricbuzz, ESPN, NW18, Sportskeeda)
- Icons for each service
- Form validation

**shadcn/ui components**:
- `Input`
- `Label`
- `Card`

---

## Phase 3: State Management & Data Fetching

### 3.1 API Integration

#### API Client (`lib/api.ts`)
**Migration from**: `fetchMatchData()` and `all_match_sites()` functions
**Features**:
- Fetch match data from multiple sources
- Error handling
- Type-safe responses

```typescript
interface MatchData {
  t1: { n: string }
  t2: { n: string }
  i1: { sc: string; wk: string; ov: string }
  i2: { sc: string; wk: string; ov: string }
  match_status: 'Live' | 'Post' | 'Pre'
  start_date_time: string
  match_url: string
}

interface SiteData {
  [matchId: string]: MatchData
}
```

#### Custom Hook (`hooks/use-matches.ts`)
**Migration from**: Direct API calls in script
**Features**:
- React Query or SWR for data fetching
- Auto-refresh every 30 minutes
- Loading and error states
- Optimistic updates

### 3.2 Utility Functions

#### Date Formatter (`lib/utils.ts`)
**Migration from**: `format_date_time()` function
**Features**:
- Convert ISO to DD/MM/YYYY HH:mm format
- Handle various date formats
- IST timezone support

**Use**: `date-fns` or native `Intl.DateTimeFormat`

---

## Phase 4: Styling Migration

### 4.1 Tailwind CSS Configuration

#### Color Scheme
**Migration from**: Custom CSS colors
```typescript
// tailwind.config.ts
colors: {
  sidebar: '#0A2558',
  'match-live': 'hsl(var(--destructive))',
  'match-completed': 'hsl(var(--muted))',
  'match-upcoming': 'hsl(var(--primary))',
}
```

#### Custom Animations
**Migration from**: CSS transitions
- Sidebar toggle animation
- Loading spinner
- Smooth scroll

### 4.2 Component Styling

#### Replace Bootstrap Classes
- `btn` → shadcn `Button`
- `badge` → shadcn `Badge`
- `form-control` → shadcn `Input`
- `table` → shadcn `Table`

#### Custom CSS to Tailwind
- `.sidebar` → Tailwind utility classes
- `.home-section` → Tailwind layout
- `.overview-boxes` → Tailwind grid
- `.sales-boxes` → Tailwind flex/grid

---

## Phase 5: Feature Implementation

### 5.1 Core Features

#### Auto-refresh
**Migration from**: `setTimeout(location.reload, 1000*30)`
**Implementation**: 
- Use React Query's `refetchInterval`
- Or custom `useEffect` with cleanup

#### Smooth Scroll
**Migration from**: jQuery `animate()`
**Implementation**:
- `scrollIntoView({ behavior: 'smooth' })`
- Or `framer-motion` for advanced animations

#### Loading State
**Migration from**: Custom loader HTML
**Implementation**:
- shadcn `Skeleton` components
- Custom loading spinner with Tailwind

### 5.2 Enhanced Features

#### Search/Filter
- Add search bar for matches
- Filter by status (Live/Completed/Upcoming)
- Filter by site

#### Dark Mode
- Use `next-themes`
- Toggle in header
- Persist preference

#### Responsive Improvements
- Mobile-first design
- Touch-friendly interactions
- Optimized table for mobile

---

## Phase 6: Performance Optimization

### 6.1 Next.js Optimizations
- Server Components for static content
- Client Components only where needed
- Image optimization for logos/icons
- Route prefetching

### 6.2 Data Optimization
- Implement caching strategy
- Debounce API calls
- Lazy load match cards
- Virtual scrolling for large lists

### 6.3 Bundle Optimization
- Remove jQuery dependency
- Tree-shake unused components
- Code splitting by route
- Optimize font loading

---

## Phase 7: Testing & Quality Assurance

### 7.1 Testing Strategy
- Unit tests for utility functions
- Component tests with React Testing Library
- E2E tests with Playwright
- API integration tests

### 7.2 Accessibility
- ARIA labels for interactive elements
- Keyboard navigation
- Screen reader support
- Color contrast compliance

### 7.3 Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive breakpoints

---

## Phase 8: Deployment & Migration

### 8.1 Deployment Setup
- Configure Vercel/Firebase hosting
- Set up environment variables
- Configure custom domain
- Set up CI/CD pipeline

### 8.2 Migration Strategy
- Deploy new version to staging
- Run parallel with old version
- Gradual traffic migration
- Monitor for issues

### 8.3 Rollback Plan
- Keep old version accessible
- Database/state backup
- Quick rollback procedure

---

## Implementation Checklist

### Week 1: Foundation
- [ ] Set up shadcn/ui components (Button, Card, Badge, Table, Input)
- [ ] Create TypeScript interfaces for match data
- [ ] Implement API client with error handling
- [ ] Create utility functions (date formatter, etc.)

### Week 2: Core Components
- [ ] Build Sidebar component with mobile support
- [ ] Create Match Card component
- [ ] Implement Match Table with status badges
- [ ] Build API input section

### Week 3: Data & State
- [ ] Implement custom hook for match data
- [ ] Add auto-refresh functionality
- [ ] Handle loading and error states
- [ ] Add smooth scroll navigation

### Week 4: Polish & Features
- [ ] Migrate all CSS to Tailwind
- [ ] Add dark mode support
- [ ] Implement search/filter
- [ ] Add animations and transitions

### Week 5: Testing & Optimization
- [ ] Write tests for components
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing

### Week 6: Deployment
- [ ] Deploy to staging
- [ ] User acceptance testing
- [ ] Production deployment
- [ ] Monitor and fix issues

---

## Dependencies to Add

```json
{
  "dependencies": {
    "date-fns": "^3.0.0",
    "@tanstack/react-query": "^5.0.0",
    "next-themes": "^0.4.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@playwright/test": "^1.40.0",
    "vitest": "^1.0.0"
  }
}
```

---

## Dependencies to Remove

- jQuery (replaced by React)
- Bootstrap CSS (replaced by Tailwind + shadcn/ui)
- Font Awesome (replaced by lucide-react)
- Boxicons (replaced by lucide-react)

---

## API Endpoints Reference

### Current Firebase Functions
```
Cricbuzz: https://us-central1-micro-service-52cc5.cloudfunctions.net/cricketStats/cbz
ESPN: https://us-central1-micro-service-52cc5.cloudfunctions.net/cricketStats/espn
NW18: https://us-central1-micro-service-52cc5.cloudfunctions.net/cricketStats/nw18
Sportskeeda: https://us-central1-micro-service-52cc5.cloudfunctions.net/cricketStats/sk
```

### Proposed Next.js API Routes
```
GET /api/matches?site=all
GET /api/matches?site=cricbuzz
GET /api/matches?site=espn
GET /api/matches?site=nw18
GET /api/matches?site=sportskeeda
```

---

## Risk Mitigation

### Technical Risks
- **API compatibility**: Test all endpoints thoroughly
- **Data format changes**: Add validation and fallbacks
- **Performance regression**: Benchmark before/after
- **Browser compatibility**: Test on target browsers

### Business Risks
- **User disruption**: Gradual rollout with feature flags
- **Data loss**: Implement proper error boundaries
- **Downtime**: Zero-downtime deployment strategy

---

## Success Metrics

- [ ] Page load time < 2s
- [ ] Lighthouse score > 90
- [ ] Zero accessibility violations
- [ ] 100% feature parity with old version
- [ ] Mobile responsive on all devices
- [ ] Auto-refresh working correctly
- [ ] All API integrations functional

---

## Notes

- Keep `public-old/` directory until migration is complete and verified
- Document any API changes or issues discovered
- Maintain backward compatibility where possible
- Consider adding analytics to track usage patterns
- Plan for future enhancements (notifications, favorites, etc.)

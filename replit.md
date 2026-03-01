# Eden Bets - Sports Betting Analysis Landing Page

## Overview

Eden Bets is a premium sports betting analysis landing page built as a static marketing site. The application serves as a lead generation funnel directing users to a Telegram channel. It features a modern, dark-themed UI with gold accents and smooth animations. The site is intentionally lightweight with no backend API integration required - it's purely a frontend presentation layer.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth transitions and entrance effects
- **State Management**: TanStack Query (React Query) - configured but minimal usage since site is static
- **Build Tool**: Vite with React plugin

### Design System
- Dark theme with gold (#FFD700) as the primary accent color
- Typography: Inter for body text, Playfair Display for headings
- Custom button variants including a "gold" variant with glow effects
- Glass-card styling with backdrop blur effects
- Responsive design with mobile breakpoint at 768px

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **Purpose**: Serves static files in production, provides Vite dev server middleware in development
- **Database**: PostgreSQL with Drizzle ORM configured (minimal schema, not actively used)
- **Storage**: MemStorage class for in-memory data (placeholder implementation)

### Build Process
- Development: `tsx` for TypeScript execution with Vite HMR
- Production: esbuild bundles server code, Vite builds client to `dist/public`
- Allowlisted dependencies are bundled to reduce cold start times

### Directory Structure
```
client/           # Frontend React application
  src/
    components/   # UI components (Button, shadcn/ui components)
    pages/        # Route pages (Home, Services, not-found)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
shared/           # Shared types and schemas
```

## Meta Pixel Implementation

### Tracking Setup (Pixel ID: 1626916708298868)
- **PageView Event**: Fires on every page load via base pixel code in `<head>` of all HTML files
- **Lead Event**: Fires on `/success.html` at the top of `<body>` BEFORE any redirect logic
- **Success Page**: Standalone HTML file (`client/public/success.html`) - NOT a React component
- **Navigation**: "Join Free Group" button uses regular `<a href="/success.html">` for full page load (not SPA navigation)

### Why Standalone HTML?
Meta Pixel requires full page loads to properly track events. SPA navigation doesn't trigger the pixel code reliably. The success page is a standalone HTML file to ensure the Lead event fires before any redirect.

## External Dependencies

### Third-Party Services
- **Telegram**: External link to `https://t.me/+QidebStIHb1hOGM0` for user engagement
- **Google Fonts**: Inter and Playfair Display font families loaded via CDN
- **Meta Pixel**: Facebook/Meta tracking pixel for PageView and Lead events

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and migrations (minimal `users` table defined)
- **connect-pg-simple**: Session storage capability (not actively used)

### Key NPM Packages
- **UI/Animation**: framer-motion, lucide-react, class-variance-authority
- **Data/Forms**: @tanstack/react-query, react-hook-form, zod
- **Radix UI**: Full suite of accessible primitives (dialog, popover, dropdown, etc.)
- **Replit Plugins**: vite-plugin-runtime-error-modal, cartographer, dev-banner
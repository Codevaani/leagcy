# Next.js Conversion Guide

This document explains how to convert your React/Vite TiffinDelight project to Next.js while preserving the exact UI and functionality.

## Conversion Overview

The conversion maintains:
- ✅ Exact same UI components and styling
- ✅ All Tailwind CSS configurations
- ✅ All shadcn/ui components
- ✅ Framer Motion animations
- ✅ React Query functionality
- ✅ Theme switching with next-themes
- ✅ All existing features and pages

## Quick Conversion

Run the automated conversion script:

```bash
./convert-to-nextjs.sh
```

Then install dependencies and start:

```bash
npm install
npm run dev
```

## Manual Conversion Steps

If you prefer to convert manually:

### 1. Update Package.json
Replace your current `package.json` with the Next.js version that includes:
- Next.js 15.0.3
- Removed Vite dependencies
- Updated scripts for Next.js

### 2. Update TypeScript Configuration
Replace `tsconfig.json` with Next.js compatible configuration.

### 3. Create App Directory Structure
```
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page (/)
├── providers.tsx      # Client-side providers
├── menu/
│   └── page.tsx      # Menu page (/menu)
├── admin/
│   └── page.tsx      # Admin page (/admin)
├── tiffin/
│   └── [id]/
│       └── page.tsx  # Dynamic tiffin detail (/tiffin/[id])
└── not-found.tsx     # 404 page
```

### 4. Update Page Components
All page components have been updated to use:
- `'use client'` directive for client components
- `Link` from `next/link` instead of `react-router-dom`
- `useParams` from `next/navigation` for dynamic routes
- `href` instead of `to` for Link components

### 5. Move Styles
Move `src/index.css` to `styles/globals.css` and import in layout.

## Key Changes Made

### Routing
- **Before**: React Router with `BrowserRouter`, `Routes`, `Route`
- **After**: Next.js App Router with file-based routing

### Navigation
- **Before**: `import { Link } from "react-router-dom"`
- **After**: `import Link from "next/link"`

### Dynamic Routes
- **Before**: `useParams()` from `react-router-dom`
- **After**: `useParams()` from `next/navigation`

### Client Components
All interactive components now use `'use client'` directive at the top.

## File Structure Comparison

### Before (Vite/React)
```
src/
├── main.tsx           # Entry point
├── App.tsx            # App component with routing
├── index.css          # Global styles
├── pages/
│   ├── Index.tsx
│   ├── TiffinCatalog.tsx
│   ├── TiffinDetail.tsx
│   ├── AdminPanel.tsx
│   └── NotFound.tsx
├── components/
└── assets/
```

### After (Next.js)
```
app/
├── layout.tsx         # Root layout
├── page.tsx          # Home page
├── providers.tsx     # Client providers
├── menu/page.tsx     # Menu page
├── admin/page.tsx    # Admin page
├── tiffin/[id]/page.tsx  # Dynamic route
└── not-found.tsx     # 404 page
src/
├── pages/            # Page components (reused)
├── components/       # UI components (unchanged)
└── assets/           # Static assets (unchanged)
styles/
└── globals.css       # Global styles
```

## Configuration Files

### Next.js Config (`next.config.js`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
}

module.exports = nextConfig
```

### Tailwind Config (`tailwind.config.js`)
Updated to work with Next.js file structure while maintaining all custom configurations.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Deployment

The converted Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## Backup

All original files are backed up in the `backup/` directory:
- `backup/src/` - Original source files
- `backup/package.json` - Original package.json
- `backup/tsconfig.json` - Original TypeScript config
- `backup/tailwind.config.ts` - Original Tailwind config

## Verification

After conversion, verify that:
1. All pages load correctly
2. Navigation works between pages
3. Dynamic routes work (tiffin detail pages)
4. Theme switching works
5. All animations and interactions work
6. Responsive design is maintained

## Troubleshooting

### Common Issues

1. **Hydration Errors**: Ensure client-only components use `'use client'`
2. **Import Errors**: Update import paths if needed
3. **Styling Issues**: Verify Tailwind config is correct

### Getting Help

If you encounter issues:
1. Check the Next.js documentation
2. Verify all dependencies are installed
3. Check browser console for errors
4. Compare with backup files if needed

## Performance Benefits

Next.js provides several performance improvements:
- Server-side rendering (SSR)
- Static site generation (SSG)
- Automatic code splitting
- Image optimization
- Built-in performance monitoring

Your TiffinDelight app is now ready to take advantage of these Next.js features while maintaining the exact same user experience!

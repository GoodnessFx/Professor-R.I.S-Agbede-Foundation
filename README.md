
# Professor R.I.S Agbede Foundation — Official Website

## Overview
- Responsive React website for the Professor R.I.S Agbede Foundation.
- Highlights programs, impact, news, gallery, donations, and contact.
- Built for performance, accessibility, and easy content iteration.

## Features
- Home hero slider with image/video, impact counters, and calls to action.
- Rich program pages, gallery with lightbox, news listings with filters.
- Contact page with offices, validated contact form, and embedded Nigeria map.
- Smooth page transitions, back-to-top, and WhatsApp CTA.
- Mobile-first design using Tailwind CSS.

## Tech Stack
- React 18 + Vite
- React Router 7
- Tailwind CSS v4
- Motion (Framer Motion runtime) for animations
- React Hook Form + Zod
- Recharts (impact visualizations)
- Lucide Icons

## Getting Started
### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
# Local: http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Environment Variables
- None required. The contact map uses a public Google Maps embed.

## Project Structure

```
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── styles/              # Tailwind + theme
    ├── app/
    │   ├── App.tsx
    │   ├── routes.tsx
    │   ├── layouts/
    │   ├── components/
    │   └── pages/           # about, programs, impact, news, gallery, donate, contact
    └── lib/
        └── constants.ts     # nav, data, hero slides, etc.
```

## Pages
- Home: Hero slider, impact, programs preview, news, donate CTA, partners.
- About: Foundation story and team.
- Programs: Program listings with stats and expandable sub-programs.
- Impact: Metrics, charts, testimonials, and locations summary.
- News: Articles with categories and excerpts.
- Gallery: Filterable grid with lightbox.
- Donate: Donation UI and bank details section.
- Contact: Offices, Google Map embed, and validated form.

## Accessibility & Performance
- Targets WCAG 2.1 AA contrast and keyboard navigation.
- Lazy-loaded images and optimized animations.
- No blocking assets; SPA served by Vite.

## Deployment
- Recommended: Vercel or any static host that supports SPA routing.
- For static hosting, configure a single-page-app fallback to index.html.

## Contributing
- Open issues for bugs or content updates.
- Use conventional, descriptive commit messages.

## License
MIT © Professor R.I.S Agbede Foundation

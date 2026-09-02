# nthw-dev-web

Personal site for **Natthawat Narin** — Senior Software Engineer. A single
responsive page presenting the résumé content as a portfolio: summary,
experience timeline, technical skills, education, and contact.

## Stack

Next.js 15 (App Router, static export-friendly), React 19, Tailwind CSS v4,
lucide-react icons. No database, no API — the page is fully static.

## Content

All résumé content lives in [`src/data/resume.ts`](src/data/resume.ts). To
update the site, edit that file; the components render whatever it contains.

The downloadable résumé is `public/Natthawat_Narin_Resume.pdf`.

## Structure

```
src/
  data/resume.ts           all page content (profile, experience, skills, …)
  app/layout.tsx           fonts, metadata, Open Graph
  app/page.tsx             page composition + Person JSON-LD
  app/_components/
    Nav.tsx                sticky nav, scroll-spy, mobile sheet
    Hero.tsx               name, tagline, contact CTAs, stats
    About.tsx              professional summary
    Experience.tsx         timeline of roles
    Skills.tsx             grouped technical skills
    Background.tsx         education + languages
    Contact.tsx            contact channels
    Section.tsx            shared section heading
    Reveal.tsx             scroll-reveal wrapper
    icons.tsx              LinkedIn mark (not in lucide v1)
  styles/globals.css       theme tokens, reveal + grid utilities
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck
npm run build
```

## Notes

- The design is dark-only and deliberate about it; colors are defined as
  `@theme` tokens in `globals.css`.
- Scroll reveals are opt-in via a `js` class set before first paint, so the
  page stays readable with JavaScript disabled.

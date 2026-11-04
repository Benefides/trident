# Trident Exim LLC — website

React 18 + Vite + React Router. No UI library — all styling is in `src/styles/global.css`.

## Run it

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

## Pages (routes)

| Route | Page |
| --- | --- |
| `/` | Home — hero carousel, value points, about summary, brochure band, featured products, stats, brand marquee, CTA |
| `/about` | About Us — story, mission/vision/values, what sets us apart, brand marquee |
| `/categories` | Categories — filterable Tasty Eats range, more categories, brochure band |
| `/vendor-partners` | Vendor Partners — brand marquee, brand grid, "for brands" panel |
| `/become-a-customer` | Trade account application form |
| `/contact` | Contact cards, contact form, Google Map |

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp number, address, email, hours, brochure link | `src/data/site.js` |
| Brand list and logos (add the KPN Ayurvedics logo here) | `src/data/brands.js` + `src/assets/brands/` |
| Products, filters, "more categories" | `src/data/products.js` + `src/assets/products/` |
| Hero carousel slides and timing | `src/components/HeroCarousel.jsx` |
| Chat assistant answers and quick replies | `src/lib/chatbot.js` |
| Colours, fonts, spacing | `:root` variables at the top of `src/styles/global.css` |

Placeholders still to fill are written as `[XX]`, `[YEAR]`, `[NUMBER]`, `[REGION]`, `[X]`, `[ADD BRANDS]`, `[DAYS · HOURS]` — search the `src` folder for `[`.

## Features

- **Hero carousel** — auto-advances every 6 s, pauses on hover/focus, arrows, dots, swipe on touch screens.
- **Brand marquee** — two rows scrolling in opposite directions without stopping; pauses on hover.
- **Parallax** — banner and band images stay fixed while the page scrolls (`<Parallax>` in `components/ui.jsx`). Falls back to normal scrolling on touch devices, where fixed backgrounds aren't supported.
- **Fade-in on scroll** — wrap anything in `<Reveal>` (`dir="up" | "left" | "right"`, `delay` in ms). Uses IntersectionObserver.
- **Hover effects** — `.lift` on cards, image zoom inside product cards, brand tiles lift with a red border.
- **WhatsApp button** (bottom left) and **chat assistant** (bottom right) on every page.
- Mobile menu, skip link, per-page titles, reduced-motion support.

## Before going live

1. **Forms** — copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` to a service that accepts a JSON POST (Formspree, Getform, Web3Forms or your own API). Without it, submissions are only logged to the browser console. Logic is in `src/lib/forms.js`.
2. **Chat** — the assistant is rule-based (`src/lib/chatbot.js`). To use a live chat or AI service, make `getReply()` call it and return `{ text, link? }`; the widget already awaits it.
3. **WhatsApp icon** — replace the generic chat icon in `WhatsAppButton.jsx` with WhatsApp's official logo from their brand resources, and confirm the number is on WhatsApp.
4. **Email, hours, brochure** — fill the empty fields in `src/data/site.js`. Email shows automatically once set.
5. **Hosting** — the site uses normal URLs (`/about`), so the host must send unknown paths to `index.html`. `public/_redirects` (Netlify) and `vercel.json` (Vercel) are included. For a host without rewrites, build with `VITE_HASH_ROUTER=true` to use `/#/about` style URLs.

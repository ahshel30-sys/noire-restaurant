# NOIRÉ — Contemporary Dining

A premium, fully responsive restaurant website concept built as a portfolio case study. NOIRÉ is a fictional contemporary dining room on the Nile in Zamalek, Cairo: seasonal cooking, quiet service and long evenings.

The visual direction is adapted from **Design Four — Atelier Solenne** in the supplied `web-design-5` collection. That concept's quiet-luxury editorial language — arched imagery, hairline rules, a light old-style serif, generous whitespace and asymmetric spreads — was translated into NOIRÉ's own warm-black, candlelit palette with ivory type and muted champagne accents.

---

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS v4** (utility layer) plus a hand-written design-system stylesheet for the art direction
- **Lucide React** icons
- **next/font** — Cormorant Garamond + Jost, self-optimised at build time
- **next/image** with locally hosted, colour-graded WebP photography
- No database, auth, payment provider, map API key or paid service required

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The npm scripts call the Next.js CLI directly through Node and use the Webpack build, so the project also runs on environments where npm cannot create `node_modules/.bin` symlinks and on ARM machines where Turbopack's native bindings are unavailable. On other platforms, standard `next dev` / `next build` flags can be used instead.

Production check:

```bash
npm run lint
npm run build
npm start
```

---

## What is implemented

### Navigation
- Fixed header that becomes opaque and gains a hairline on scroll.
- Scroll-spy active states driven by `IntersectionObserver`.
- Smooth section navigation with `scroll-margin` offsets.
- Full-screen mobile menu with staggered editorial links, focus return, Escape-to-close and body-scroll lock.
- A prominent “Reserve a Table” CTA in the header and mobile menu.

### Hero
- Full-viewport, cinematic dining-room photograph with layered wash, vignette and subtle zoom.
- Editorial headline “An experience beyond dining.”
- Primary and secondary CTAs that scroll to the menu and reservation sections.
- Location, opening hours, coordinates and scroll cue.

### Our Story
- Asymmetric magazine spread: arched chef portrait, offset dining-room inset and a seal.
- Philosophy, culinary inspiration, chef biography, signature, pull quote and restaurant facts.
- Followed by a full-width manifesto interlude with a hairline ornament.

### Signature Menu
- 13 realistic dishes across Starters, Main Courses, Desserts and Beverages.
- Functional category filtering with counts and an `aria-live` result announcement.
- Refined hairline rows with food photography, descriptions, EGP prices and dietary labels.
- Deliberately not a product-card grid.

### Signature Experience
- Interactive four-item accordion: Chef's Special, Seasonal Ingredients, Private Dining, Exclusive Dining.
- The large editorial image crossfades and its caption updates with the active experience.
- Accessible `aria-expanded` / `aria-controls`, smooth panel reveal, mobile-specific layout.

### Gallery
- Eight-image asymmetric mosaic with captions and hover treatments.
- Functional native `<dialog>` lightbox: previous/next, keyboard arrows, Escape, backdrop click, counter and focus return.
- Body scroll is locked while the lightbox is open.

### Reservations
- Full form: name, phone, email, date, time, guests and special requests.
- Inline validation with clear messages, `aria-invalid`, `aria-describedby` and focus management to the first invalid field.
- Minimum date is today; seating times are restricted to the published slots.
- Loading state, success state and a browser-storage error state.
- Demo bookings are stored in `localStorage` under `noire:reservations`.
- Success screen includes a reference code, summary, “Add to calendar” (generates a real `.ics` download) and reset flow.
- Clearly labelled as a portfolio demo; no data is sent anywhere.

### Testimonials
- Editorial quote selector with three clearly fictional guest impressions.
- Name selector, previous/next controls, counter and live-region updates.
- No autoplay.

### Contact & Location
- Contact details, hours, social links and a functional contact form.
- Inline validation, loading, success and error states; messages stored in `localStorage` under `noire:messages`.
- Hand-drawn SVG map of the fictional Zamalek location with a pulsing marker, coordinates and an external OpenStreetMap link.
- The address, phone number, email and map are explicitly marked as demonstration data.

### Footer
- Newsletter demo with validation, loading, success and error states (`noire:newsletter`).
- Full navigation, contact details, opening hours, social links and back-to-top.
- Clear statement that the restaurant is fictional and photography is from Unsplash.

### Quality details
- Semantic landmarks, skip link, visible focus styles and keyboard-operable controls.
- `prefers-reduced-motion` respected in CSS and in the reveal observer.
- Custom 404 page.
- SEO metadata, Open Graph/Twitter cards, JSON-LD `Restaurant` schema, `robots.txt` and `sitemap.xml`.
- No horizontal overflow; layouts are designed separately for desktop, tablet and mobile.
- All images are local, compressed WebP files; only the hero is prioritised, everything else lazy-loads.
- No secrets, API keys or external runtime services.

---

## Project structure

```
app/
  layout.tsx            fonts, metadata, viewport, skip link
  page.tsx              page composition + Restaurant JSON-LD
  globals.css           design system, all section styles, responsive + motion
  icon.svg              favicon
  not-found.tsx         404
  robots.ts             robots metadata route
  sitemap.ts            sitemap metadata route
components/
  SiteHeader.tsx        sticky nav, scroll spy, mobile menu
  Hero.tsx
  Marquee.tsx
  Story.tsx
  Manifesto.tsx
  MenuSection.tsx       client-side category filter
  Experience.tsx        client-side accordion
  Gallery.tsx           client-side dialog lightbox
  Reservation.tsx       client-side form + success flow
  Testimonials.tsx      client-side quote selector
  Contact.tsx           client-side contact form
  MapPanel.tsx          illustrative SVG map
  SiteFooter.tsx        client-side newsletter
  RevealRoot.tsx        scroll-reveal observer
  ui/                   shared section heading + ornament
lib/
  content.ts            all copy, menu, experiences, gallery, testimonials
  forms.ts              validation, demo persistence, ICS generation
public/images/          locally hosted, colour-graded WebP photography
```

---

## Demo-only features and production path

This is a front-end portfolio concept. Nothing is sent to a real restaurant.

| Demo feature | Current behaviour | To make production-ready |
| --- | --- | --- |
| Reservation form | Validates, simulates latency, stores in `localStorage`, shows a reference and generates an `.ics` | Add a server action/API route, database, real availability calendar, email/SMS confirmation, spam protection and an admin view |
| Contact form | Validates, simulates latency, stores in `localStorage` | Send to a transactional email provider (Resend, Postmark, etc.) and add rate limiting/spam protection |
| Newsletter | Validates and stores the address locally | Integrate a newsletter provider and double opt-in |
| Address, phone, email | Fictional and marked “demo/sample” | Replace with the restaurant's real details |
| Map | Illustrative SVG, not a live map | Embed Google Maps/Mapbox or link to a verified business listing |
| Testimonials | Fictional demonstration quotes | Replace with consented real guest reviews |
| Photography | Unsplash imagery, colour-graded for consistency | Commission or license the restaurant's own photography and update alt text |
| Social links | Point to the platform home pages | Link to the restaurant's real profiles |
| SEO URL | `https://noire-demo.vercel.app` placeholder | Set the production domain in metadata, sitemap and robots |

To connect a real backend, replace `persistDemoRecord` calls in `components/Reservation.tsx`, `components/Contact.tsx` and `components/SiteFooter.tsx` with `fetch`/server actions. The validation functions in `lib/forms.ts` can be reused on the server.

---

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Framework preset: **Next.js**; build command: `npm run build`; output: `.next`.
4. Add the production domain and update `siteUrl` in `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts`.
5. Deploy.

### Any Node host

```bash
npm ci
npm run build
npm start
```

The app needs a Node runtime for Next.js image optimisation. For a fully static export, set `images.unoptimized = true` in `next.config.ts`, use `output: "export"`, and serve the `out/` directory.

---

## Verification performed

- `npm run lint` and `npm run build` pass
- Layouts verified in a headless browser at 1440×900, 1024×768, 768×1024 and 390×844 — no horizontal overflow at any width
- All 26 local images verified to load; no remote runtime image dependencies
- Navigation links, mobile menu (open/Escape/link/focus), menu filters, experience accordion, gallery lightbox (buttons + arrow keys + Escape + focus return), reservation validation/success/`.ics` download, contact form, newsletter and all contact/social/map links exercised in a browser
- Reduced-motion support is implemented in both CSS and the reveal observer and reviewed in source; the local Firefox harness could not toggle the OS media preference at runtime

---

## Photography credits

All photographs are from [Unsplash](https://unsplash.com) and are used under the Unsplash License for this demonstration. They are colour-graded and cropped for the NOIRÉ art direction.

| File | Source |
| --- | --- |
| `hero-room.webp` | https://unsplash.com/photos/1414235077428-338989a2e8c0 |
| `chef-portrait.webp` | https://unsplash.com/photos/1577219491135-ce391730fb2c |
| `story-room.webp` | https://unsplash.com/photos/1552566626-52f8b828add9 |
| `experience-chef.webp` | https://unsplash.com/photos/1600565193348-f74bd3c7ccdf |
| `experience-seasonal.webp` | https://unsplash.com/photos/1551218808-94e220e084d2 |
| `experience-private.webp` | https://unsplash.com/photos/1517248135467-4c7edcad34c4 |
| `experience-exclusive.webp` | https://unsplash.com/photos/1514933651103-005eec06c04b |
| `reservation-bar.webp` | https://unsplash.com/photos/1470337458703-46ad1756a187 |
| `gallery-room.webp` | https://unsplash.com/photos/1550966871-3ed3cdb5ed0c |
| `gallery-table.webp` | https://unsplash.com/photos/1559329007-40df8a9345d8 |
| `gallery-plate.webp` | https://unsplash.com/photos/1559847844-5315695dadae |
| `gallery-market.webp` | https://unsplash.com/photos/1498837167922-ddd27525d352 |
| `gallery-soup.webp` | https://unsplash.com/photos/1481931098730-318b6f776db0 |
| `gallery-guests.webp` | https://unsplash.com/photos/1528605248644-14dd04022da1 |
| `gallery-garden.webp` | https://unsplash.com/photos/1547592180-85f173990554 |
| `gallery-tasting.webp` | https://unsplash.com/photos/1467003909585-2f8a72700288 |
| Menu images | Unsplash photo IDs listed in the project's image manifest below |

Menu source IDs: `1504674900247-0877df9cc836`, `1512621776951-a57141f2eefd`, `1476224203421-9ac39bcb3327`, `1519708227418-c8fd9a32b7a2`, `1555939594-58d7cb561ad1`, `1544025162-d76694265947`, `1563379926898-05f4575a45d8`, `1551024506-0bccd828d307`, `1565958011703-44f9829ba187`, `1488477181946-6428a0291777`, `1514362545857-3bc16c4c7d1b`, `1551024709-8f23befc6f87`, `1510812431401-41d2bd2722f3`.

---

## Licence

The code is provided as a portfolio demonstration. Replace the fictional brand, copy and photography before using it commercially. Unsplash photographs retain their own licence terms.

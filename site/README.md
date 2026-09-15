# Shree Bajaj Motors — website

A React implementation of the Claude Design export in `../project/` (the
`*.dc.html` prototype for the Shree Bajaj Motors, Umerkote showroom site).
See `../README.md` and `../chats/` for the design history and decisions.

## Structure

- `client/` — React 18 + Vite + React Router single-page app. All 11 pages
  from the prototype (Home, Models, Offers, Booking, Contact, and 6 model
  detail pages) plus the working EMI calculator and booking form.
- `server/` — small Express API that backs the photo-upload feature
  (`site/server/index.js`), storing uploaded images on disk and a
  slot-id → filename map in `server/data/images.json`.

## Running locally

Two processes, in two terminals:

```bash
# Terminal 1 — API server (uploads), http://localhost:4000
cd site/server
npm install
npm start

# Terminal 2 — frontend dev server, http://localhost:5173
cd site/client
npm install
npm run dev
```

The Vite dev server proxies `/api/*` and `/uploads/*` to the Express server
(see `client/vite.config.js`), so just open http://localhost:5173.

### Production build

```bash
cd site/client && npm run build   # outputs client/dist
cd site/server && npm start       # serve client/dist from a static host or
                                   # add express.static('../client/dist') to
                                   # index.js and reverse-proxy /api + /uploads
                                   # to it from the same origin
```

## What changed vs. the Claude Design prototype

The `.dc.html` files only run inside Claude Design's preview (a custom
`x-dc`/`sc-for` template runtime, `image-slot.js`'s browser-only sidecar
persistence). This is a from-scratch React port that reproduces the same
visual design (Modernist design system: Archivo type, red/black/white,
0-radius, warm `#fff2ef`/`#ffe0d9` tint) and the same content, with two
deliberate changes:

1. **Real photo uploads.** The prototype's `<image-slot>` persisted dropped
   images to a local JSON sidecar file readable only inside the Claude
   Design preview. Here, `ImageSlot` (`client/src/components/ImageSlot.jsx`)
   uploads to the Express API, which stores the file under
   `server/uploads/` and serves it back to every visitor — a real,
   multi-user upload feature. It keeps the drag-and-drop / click-to-browse
   UX and PNG/JPEG/WebP/AVIF validation, but drops the prototype's
   in-browser pan/zoom/reframe crop tool (out of scope) and its automatic
   canvas downscaling — swap in a library like `sharp` server-side if you
   want that back.
2. **Two "hidden" variant photo slots got ids.** In `Freedom125.dc.html` and
   `Chetak.dc.html`, the third listed variant (NG04 Disc LED / Chetak 3501)
   had no `slot` id in the source data, so no photo could ever be attached
   to it. `client/src/data/models.js` gives both a proper slot id
   (`variant-freedom-discled`, `variant-chetak-3501`) so every variant can
   take a photo.

Everything else — copy, prices, specs, the EMI formula, the booking form's
validation, the footer, nav — is carried over as-is, including the
placeholder content that was never confirmed in the design chats:
**indicative Delhi ex-showroom prices** (not real Umerkote/Odisha rates) and
the **placeholder email** `shreebajajumerkote@gmail.com`. Update
`client/src/data/site.js` and `client/src/data/models.js` once you have the
real figures.

## Where things live

- `client/src/data/site.js` — showroom contact info, hours, nav/footer
  links, offers, "why us" copy, services list.
- `client/src/data/models.js` — all 6 model lines: card copy for Home,
  Models-page copy, and full detail-page content (specs, variants,
  highlights).
- `client/src/styles/tokens.css` — the Modernist design tokens (colors,
  fonts) as CSS custom properties.
- `client/src/styles/global.css` — every component class used by the pages.
- `client/src/pages/ModelDetail.jsx` — one generic template drives all 6
  model detail pages via `models.js`, instead of 6 near-duplicate files.

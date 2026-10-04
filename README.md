# Grid & Gesture — portfolio

A portfolio for a UI/UX designer who is also a painter. Dark, gallery-like and monochrome, with motion throughout. The design is based on the "Sediment & Void" Figma reference.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · [Motion](https://motion.dev) · [Lenis](https://lenis.darkroom.engineering) smooth scroll

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (every page is pre-rendered)
npm run lint
```

## Editing the content

All text and images live in `src/content/`. You don't need to touch any components.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, role, hero copy, location/time zone, availability, email, socials, nav |
| `projects.ts` | UI/UX case studies (each one gets a page at `/work/[slug]`) plus the smaller "Index" list |
| `paintings.ts` | The painting repertory: title, medium, size, status, note, aspect ratio |
| `practice.ts` | Services for both disciplines, stats, philosophy quote, chronology |

### Replacing the placeholder images

Images are random placeholders from picsum.photos, created with `ph(seed, width, height)`. To use real artwork:

1. Put the file in `public/`, e.g. `public/paintings/summit.jpg`.
2. Replace the `ph(...)` call with the path: `image: "/paintings/summit.jpg"`.
3. For paintings, set `ratio` to the real width ÷ height so the frame matches the canvas.

Images display in grayscale and turn to colour on hover. To change that, edit `src/components/ui/art-image.tsx`.

## Motion and interaction

- **Preloader:** runs once per browser session, a counter to 100 followed by a curtain lift.
- **Hero:** the title assembles letter by letter, a "raking light" beam follows the cursor over the painting, and the background parallaxes and drifts slowly.
- **Case studies:** 3D-tilt gallery frames with a light sheen, curtain-reveal images, count-up metrics and three alternating layouts.
- **Paintings:** pinned horizontal scroll on desktop and a swipeable row on mobile. The lightbox supports ← → and Esc.
- **Elsewhere:** a scroll-velocity marquee, a hover-preview index list, a quote that reveals word by word with scroll, a filterable chronology, a magnetic call-to-action and a custom cursor.
- **Floating dock** (from the Figma):
  - **Drift / Storm / Still** sets motion intensity. Still turns most motion off and is the default when the OS has reduced motion enabled.
  - **Raking light** toggles the cursor-following light.
  - **55Hz Drone** plays an ambient sound generated live with the Web Audio API, so there are no audio files.

## Structure

```
src/
  app/                  layout, home page, /work/[slug], 404, icon
  components/
    layout/             nav, dock, preloader
    sections/           home page sections + lightbox
    case/               case-study page pieces
    ui/                 reusable primitives (reveal, tilt frame, marquee, cursor…)
    providers/          atmosphere (motion mode, light, sound) + smooth scroll
  content/              ← edit this
  lib/                  store, hooks, placeholder helper, ambient drone
```

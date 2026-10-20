# Wildline Expeditions

Website for Wildline, a guided 4x4 convoy expedition company. The home page opens on a scroll-driven drone film (two shots drawn on a canvas), then previews every section; each section also has its own page. The site is dark only.

- **Live site:** https://wildline-expeditions.vercel.app
- **Repository:** https://github.com/groovyatoms-cmyk/WILDLINE-EXPEDITIONS

## Stack

| Area      | Choice                                                                          |
| --------- | ------------------------------------------------------------------------------- |
| Framework | Next.js 16, App Router, pages prerendered at build time                         |
| Language  | TypeScript (strict)                                                             |
| UI        | React 19, one plain CSS file, Framer Motion, Embla Carousel, Lucide icons       |
| Fonts     | Inter Tight (headings), Instrument Serif italic (accent), JetBrains Mono, Inter |
| Film      | One full-screen `<canvas>` drawing pre-exported WebP frames                     |
| Tests     | Jest, Testing Library, jsdom                                                    |

## Quick start

```bash
npm install
npm run dev     # http://localhost:5176
npm run build   # production build
npm run start   # serve the production build on http://localhost:5176
npm test        # Jest tests
npm run lint    # ESLint (npm run lint:fix to auto-fix)
npm run format  # Prettier (npm run format:check to verify)
```

The `@/` import alias points at `src/`.

## Project layout

```
public/
  frames/shot1  shot1m  shot2  shot2m   film frames (desktop, mobile), 0001.webp ...
  hero/                                  hero stills (desktop, mobile)
  topo.svg                               contour map used as a section texture
src/
  app/            routes, metadata, sitemap, robots, manifest, one global stylesheet (globals.css)
  components/
    layout/       site chrome: Shell, Header, Footer, TopBar, Preloader, Cursor, PublicLayout
    home/         Home: the film stage plus the section previews
    film/         the scroll film: FrameCanvas, Hero, AutoPlay, BigLine, Stats, Coordinates, CornerTitle, ScrollCue
    overlays/     CookieBanner, Enquire panel, Panel (the draggable sheet)
    ui/           shared primitives: Button, Section, Reveal, ShimmerImg (lazy image with shimmer placeholder), SectionSkeleton (placeholder for lazy-loaded sections), ScrollWords, Odometer, PosterCarousel, StarSky, JsonLd, BrandIcons
    expeditions/  Expeditions, Atlas, Climb, ExpeditionDetail, Poster
    safety/       ConvoyCockpit, Crew, How
    convoys/      Join, Countdown, DepartureBoard
    blog/         BlogIndex, BlogPreview, BlogCard, BlogArticle
    about/        About, Team, Gallery, Careers
    contact/      Contact, Enquiry, Faq, NightCamp
    legal/        LegalPage
  data/           site.ts (all copy, trips, prices, dates), blog.ts (posts), legal.ts (policy text)
  hooks/          useScrollProgress (eased scroll progress for the film and pinned scenes)
  lib/            guard (null and empty checks), frames (loader), timeline, seo, enquire, season, upcoming, confetti
  __tests__/      component, logic, season and SEO tests
```

Rule of thumb: a component lives in the folder of the page or feature that owns it. Only things used by several features go in `ui/`.

## Routes

`/` home, `/expeditions`, `/expeditions/[slug]`, `/safety`, `/team`, `/join`, `/faq`, `/about`, `/contact`, `/careers`, `/blog`, `/blog/[slug]`, and the policy pages `/privacy`, `/terms`, `/refund`, `/cookies`. The sitemap, structured data and page metadata are generated from the data files.

## Editing content

Everything a person would edit is in `src/data/`:

- `site.ts`: name, contact details, trips (name, days, altitude, season, price, photo), itineraries, departures, FAQ, crew, the film timeline and frame counts.
- `blog.ts`: field notes. Each post is built from the data in `site.ts`, so the blog cannot disagree with the rest of the site. Add a post by adding an entry to `POSTS`.
- `legal.ts`: the four policy pages.

Placeholder values to replace before launch: the WhatsApp number, email address and social links in `site.ts`, the team names, bios and photos, and the office address.

## How the film works

`Shell` owns the film state. `useScrollProgress` turns scroll position over the tall film section into an eased 0 to 1 value. `FrameCanvas` draws the matching frame, blending neighbours, with a zoom-through between shot 1 and shot 2. `src/lib/frames.ts` loads a window of frames around the playhead and decodes them at no more than 1920 px (desktop) or 1080 px (mobile). `AutoPlay` scrolls the page at real-time speed. The film length is `film.heightVh` in `site.ts`; the split between the shots is `shot1End` and `shot2Start`.

## Replacing the footage

The frame counts and sizes in `frames` in `site.ts` must match the files. Current set:

| Shot | Source (clip, time)         | Desktop                  | Mobile                   |
| ---- | --------------------------- | ------------------------ | ------------------------ |
| 1    | DJI_0015, 1:19 to 2:03 (44 s) | 880 frames, 1920x1080    | 440 frames, 1080x810     |
| 2    | DJI_0009, 1:18 to 2:06 (48 s) | 960 frames, 1920x1080    | 480 frames, 1080x1440    |

Export with ffmpeg (`-ss` start, `-t` length, a colour grade in the filter, WebP output). Example for shot 1, desktop:

```bash
ffmpeg -ss 00:01:19 -t 44 -i DJI_0015.MP4 -map 0:v:0 \
  -vf "fps=20,crop=4096:2304:0:420,scale=1920:1080:flags=lanczos" \
  -frames:v 880 -c:v libwebp -q:v 80 -preset photo public/frames/shot1/%04d.webp
```

Shot 2 desktop is rotated to upright with `transpose=2` before the crop. Mobile sets use every other frame (`fps=10`). Update `count`, `mobileCount`, `w` and `mw` in `site.ts` and the seconds in `AutoPlay.tsx` if the length changes.

## Design

Dark only. Colours are tokens at the top of `globals.css`: Obsidian background, Mist and Ink for the light bands, Dust Amber for actions and markers. Motion uses Framer Motion and CSS scroll-driven animation; every animation is off under `prefers-reduced-motion`, and blur panels fall back to solid under `prefers-reduced-transparency`.

## Testing

`npm test` runs the Jest suites: components (cards link to the right pages, FAQ, cookie banner), logic (timeline, frame maths), season parsing and SEO (sitemap, metadata).

## Known limits

- Enquiry and booking have no backend: sending opens WhatsApp with the message written.
- Departure dates come from `site.ts`; dates in the past are hidden automatically.
- The frame set is about 315 MB. Serve it from a CDN in production.

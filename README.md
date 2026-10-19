# WILDLINE EXPEDITIONS

Website for WILDLINE, a guided 4x4 convoy expedition company. The home page is a cinematic, scroll-driven film made of two drone shots, with large type over the footage, a push-in transition between the shots, and a play button that runs the film by itself. Below the film are short previews of the main sections. Every section also has its own page: expeditions (with a detail page for each trip), about, team, careers, join, contact, FAQ and the four policy pages.

- **Live site:** https://wildline-expeditions.vercel.app
- **Repository:** https://github.com/groovyatoms-cmyk/WILDLINE-EXPEDITIONS

## Contents

1. [Stack](#stack)
2. [Quick start](#quick-start)
3. [Project layout](#project-layout)
4. [Routes](#routes)
5. [Editing content](#editing-content)
6. [How the film works](#how-the-film-works)
7. [Adding or replacing footage](#adding-or-replacing-footage)
8. [Design, fonts and theme](#design-fonts-and-theme)
9. [SEO](#seo)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Accessibility and motion](#accessibility-and-motion)
13. [Known limits](#known-limits)

## Stack

| Area        | Choice                                                                      |
| ----------- | --------------------------------------------------------------------------- |
| Framework   | Next.js 16, App Router, pages prerendered at build time                     |
| Language    | TypeScript (strict)                                                         |
| UI          | React 18, plain CSS (one stylesheet), Framer Motion, Lucide icons           |
| Fonts       | Bebas Neue for headings, Poppins for everything else, self-hosted by `next/font` |
| Film        | One full-screen `<canvas>` drawing pre-exported WebP frames                 |
| Tests       | Jest, Testing Library, jsdom                                                |
| Hosting     | Vercel, deployed automatically from the `main` branch on GitHub             |

## Quick start

```bash
npm install
npm run dev       # development server on http://localhost:5176
npm run build     # production build
npm run start     # serve the production build on http://localhost:5176
npm test          # run the Jest tests
```

Node 20 or newer is recommended (Vercel uses Node 24). The `@/` import alias points at `src/`.

## Project layout

```
public/
  frames/
    shot1/  shot1m/        shot 1 frames: desktop (0001.webp ...) and mobile
    shot2/  shot2m/        shot 2 frames: desktop and mobile
src/
  app/                     routes (see Routes), global CSS, SEO files
    layout.tsx             fonts, site-wide metadata, organisation structured data
    globals.css            all styles; colour tokens at the top
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg
  components/
    Shell.tsx              header, preloader, footer, overlays and film state for every route;
                           draws the home page itself (the film shares state with the header)
    Home.tsx               the film stage plus the section previews
    JsonLd.tsx             safe <script type="application/ld+json"> output
    film/                  FrameCanvas, AutoPlay, BigLine, Stats, CornerTitle, Coordinates
    sections/              Expeditions, ExpeditionDetail, About, Crew, Team, Careers, Join,
                           Contact, Faq, LegalPage
    ui/                    Header, Footer, TopBar, Button, Panel, Section, Reveal, ShimmerImg,
                           Preloader, FrameCounter, ThemeToggle, BrandIcons
    overlays/              Enquire (side panel), CookieBanner
  data/
    site.ts                all copy, numbers, dates and settings (components contain no copy)
    legal.ts               privacy, terms, refund and cookies policy text
  hooks/                   useScrollProgress, useTheme
  lib/                     frames (frame loader), timeline, enquire (WhatsApp helpers), seo
  layout/PublicLayout.tsx  header, page body, footer and overlays
  __tests__/               Jest tests
next.config.ts             cache headers for /frames
jest.config.ts jest.setup.ts
```

## Routes

| Path                         | Page                                                   |
| ---------------------------- | ------------------------------------------------------ |
| `/`                          | Home: the film and a preview of each section           |
| `/expeditions`               | All expeditions                                        |
| `/expeditions/[slug]`        | One expedition: route, stops, itinerary, departures, FAQ |
| `/about`                     | About us and the crew's equipment and safety specs     |
| `/team`, `/careers`          | Core team, open roles                                  |
| `/join`                      | Departure dates, what is included, booking steps       |
| `/contact`, `/faq`           | Contact channels, frequently asked questions           |
| `/privacy` `/terms` `/refund` `/cookies` | Policy pages, generated from `legal.ts`    |

Unknown paths return a 404. Section headings on the home page link to their full page. Links starting with `/` navigate without a page reload.

## Editing content

Everything editable is in [src/data/site.ts](src/data/site.ts) and [src/data/legal.ts](src/data/legal.ts). Components contain no copy.

| Export in `site.ts`        | What it controls                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `site`                     | Brand name, tagline, WhatsApp number (digits with country code), email, social links, copyright          |
| `frames`                   | Frame counts and decode widths per shot (see [Adding footage](#adding-or-replacing-footage))            |
| `film`                     | Scroll layout: film height in `vh` and where each shot starts and ends (0 to 1)                          |
| `chapters`                 | Corner-title names while the film plays                                                                  |
| `bigLines`                 | Large overlay lines and the scroll point (`at`, 0 to 1) where each appears                               |
| `stats`                    | The count-up stats and their scroll point                                                                |
| `route`                    | Start and end coordinates and altitude shown under the corner title                                      |
| `trips`                    | One entry per expedition: name, optional `slug`, days, altitude, season, price, card image, alt text     |
| `tripDetails`              | Per trip (keyed by slug): level, route, stops with altitudes, overview, highlights                       |
| `tripItinerary`            | Per trip (keyed by slug): day-by-day plan                                                                |
| `tripFaq`                  | The short FAQ shown on every expedition page                                                             |
| `join`                     | Departure dates, inclusions, exclusions, booking steps, policies and note                                |
| `crew`, `about`, `team`, `careers`, `contact`, `faq` | Text for those sections and pages                                              |
| `menuLinks`                | Links in the full-screen menu                                                                            |

### Adding an expedition

1. Add an entry to the top of `trips` (the list is shown in the order written, newest first). Give it a `slug` if the first word of the name would not be unique or readable.
2. Add `tripDetails` and `tripItinerary` entries keyed by that slug.
3. Optionally add a departure to `join.dates`. Its `trip` must match the trip's `name` exactly.
4. The detail page, sitemap entry, share image, booking form option and structured data appear on their own. `npm test` checks that every trip has details and an itinerary.

### Placeholders to replace before launch

The following are sample values: the WhatsApp number (`919000000000`), email and social handles, the office address and phone hours, all trip prices, dates, seats, itineraries, stop altitudes and highlights, the team members, open roles, and the policy text in `legal.ts` (have a lawyer review it). The email, phone and address also appear in the structured data search engines read.

## How the film works

### Scroll film

The home page renders one very tall section (`film.heightVh`, 1200vh) with a sticky full-height stage. Scrolling through it is the film. `useScrollProgress` turns window scroll into a 0 to 1 progress value and eases it with a lerp inside `requestAnimationFrame`. Geometry is cached and refreshed on resize, so the loop does not force layout every frame.

Film components subscribe with `useProgress` and write to the DOM directly, so scrolling does not re-render React. Text and styles are only written when their value changes.

### Timeline

`src/lib/timeline.ts` maps progress to the footage:

| Progress                         | What plays                                                      |
| -------------------------------- | --------------------------------------------------------------- |
| 0 to `film.shot1End` (0.45)      | Shot 1, first frame to last                                     |
| `shot1End` to `shot2Start` (0.45 to 0.55) | Transition from shot 1 to shot 2                       |
| `shot2Start` to `shot2End` (0.55 to 0.90) | Shot 2, first frame to last                            |
| 0.90 to 1                        | Shot 2 held on its last frame                                   |

Overlay timings (`bigLines`, `stats`) use the same scale. Each big line is visible from `at - 0.015` to `at + 0.05`, so lines placed at least 0.05 apart never show together.

### Drawing

`FrameCanvas.tsx` draws the current frame with cover-fit. Between two frames it fades the next frame in by the fractional position, which smooths the motion. The canvas is capped at 2x pixel density. During the transition shot 1 keeps zooming in while it dissolves and shot 2 arrives from the same zoom and settles, under a light blur that peaks mid-transition, so the two shots read as one camera move.

### Loading frames

Decoded images are large in memory (a 1440px frame is about 4.7 MB), so `createLoader` in `src/lib/frames.ts` keeps only a window of frames decoded around the playhead (12 behind, 48 ahead) plus every 30th frame as a fallback while scrubbing quickly. Frames outside the window are closed and decoded again if needed.

- Loading starts after the first paint, so frame requests never compete with the page itself.
- The preloader waits only for the first 16 frames of shot 1. Its counter eases toward the real progress.
- Shot 2 starts loading after the visitor is a third of the way through shot 1.
- If a frame file is missing the loader draws a numbered placeholder, so the film can be tested with no footage.
- `next.config.ts` sets a one-day cache on `/frames/*`.

### Play button

`AutoPlay.tsx` shows a play icon on the right edge of the film. Nothing plays until the visitor presses it. While playing, the page scrolls at a steady pace and a blinking red REC badge ("REC 4K/25FPS ISO 100") shows at the bottom right. Pressing the button again, or using the wheel, touch, keyboard or scrollbar, pauses it and hides the badge.

Pace is set by `PLAN` at the top of `AutoPlay.tsx`: seconds for each stretch of the film (shot 1 about 25 s for its 23 s of footage, the transition 4 s, shot 2 18 s, the end 3 s). On a slow network playback waits for frames to arrive instead of showing a frozen picture.

### Header, title and enquiry

- `Shell.tsx` owns the preloader, header, footer and overlays. On the home page it also drives the corner title from film progress.
- `CornerTitle.tsx` shows the chapter name, re-typing itself through mountain-script glyphs on every change. Below the film, and on every other page, it shows the logo name.
- `Enquire.tsx` is a side panel opened anywhere with `openEnquire()`. There is no backend: submitting opens WhatsApp with a prefilled message (name, phone, trip, group size). To send enquiries elsewhere, change `submit` in that file.
- The theme toggle and cookie choice are stored in `localStorage` and read after the page mounts, so server and browser render the same HTML.

## Adding or replacing footage

Frames are numbered WebP files, `0001.webp` upward. Each shot has its own frame count, set in `frames` in `src/data/site.ts`:

| Shot | Source (clip range)           | Desktop        | Mobile        |
| ---- | ----------------------------- | -------------- | ------------- |
| 1    | `DJI_0203` 00:25 to 00:48     | 600 frames     | 300 frames    |
| 2    | `DJI_0199` 00:10 to 00:20     | 200 frames     | 100 frames    |

Desktop frames are 1920px wide and mobile frames 1080px. Aim for 20 to 30 frames per second of footage; fewer looks like a slideshow. Set `fps` to `frames ÷ seconds`. [ffmpeg](https://ffmpeg.org) must be installed. These commands produced the current frames:

```bash
ffmpeg -ss 00:00:25 -to 00:00:48 -i DJI_0203.MOV -vf "fps=600/23,scale=1920:-2:flags=lanczos" -c:v libwebp -quality 60 -compression_level 6 -preset photo public/frames/shot1/%04d.webp
ffmpeg -ss 00:00:25 -to 00:00:48 -i DJI_0203.MOV -vf "fps=300/23,scale=1080:-2:flags=lanczos" -c:v libwebp -quality 65 -compression_level 6 -preset photo public/frames/shot1m/%04d.webp
ffmpeg -ss 00:00:10 -to 00:00:20 -i DJI_0199.MOV -vf "fps=200/10,scale=1920:-2:flags=lanczos" -c:v libwebp -quality 65 -compression_level 6 -preset photo public/frames/shot2/%04d.webp
ffmpeg -ss 00:00:10 -to 00:00:20 -i DJI_0199.MOV -vf "fps=100/10,scale=1080:-2:flags=lanczos" -c:v libwebp -quality 70 -compression_level 6 -preset photo public/frames/shot2m/%04d.webp
```

If you change a frame count or width, update `frames` in `site.ts` to match. If you change the clip length, revisit `PLAN` in `AutoPlay.tsx` so the pace still suits the footage.

The expedition cards use single frames as photos (for example `frames/shot2/0100.webp`) via each trip's `still` path. When frame counts change, point those paths at the matching new frame numbers.

The frames folder is about 190 MB. Keep it in mind for repository size and bandwidth; a CDN or Vercel Blob is the next step if it grows.

## Design, fonts and theme

- Colour tokens are at the top of `src/app/globals.css`. `--sand` is the headline orange (`#ff7a1a`), `--stone` the muted grey. The `:root[data-theme='light']` block defines the light theme. The film and the title over it stay on a dark photo in both themes.
- Fonts are loaded in `src/app/layout.tsx` with `next/font` and exposed as `--font-display` (Bebas Neue) and `--font-body` (Poppins). Small uppercase labels (`.mono`) use the body font too.
- The theme is applied by an inline script before first paint to avoid a flash, then kept in sync by `useTheme`.
- Responsive rules live in the same stylesheet: phones (up to 768px) use swipeable card rows and a full-width menu; tablets (769 to 1024px) use a two-column expedition grid and stacked two-column sections.

## SEO

- Every page sets its own title, description, canonical URL and social-share tags through `pageMeta` in `src/lib/seo.ts`.
- Share images are generated: `opengraph-image.tsx` for the site and one per expedition.
- `sitemap.ts`, `robots.ts`, `manifest.ts` and `icon.svg` are generated by Next.js.
- Structured data (JSON-LD): a travel-agency entry on every page, trip and breadcrumb data on each expedition page, FAQ data on `/faq`.
- Each page has exactly one `h1`.
- **Set `NEXT_PUBLIC_SITE_URL`** (in Vercel project settings, and in `.env.local` for local builds) to the real domain, for example `https://wildline-expeditions.vercel.app`. All canonical, sitemap and share URLs derive from it. If unset, it falls back to a default in `src/lib/seo.ts`.
- After launch, submit `/sitemap.xml` in Google Search Console.

## Testing

`npm test` runs Jest with Testing Library in jsdom (25 tests in `src/__tests__/`):

- timeline maths, the WhatsApp link builder, and checks on the content data (unique trip slugs, details and itinerary for every trip, departures that match real trips, policy paths);
- components: button, FAQ, expedition cards and detail page, cookie banner;
- SEO: sitemap contents, robots, page metadata, and that structured data cannot close its own script tag.

`jest.setup.ts` stubs `IntersectionObserver`, which jsdom lacks and Framer Motion needs.

## Deployment

The site is a Vercel project named `wildline-expeditions`, connected to the GitHub repository. Every push to `main` deploys to production automatically. There is only one branch, `main`.

To deploy by hand from this folder (requires the Vercel CLI and a login):

```bash
vercel link --project wildline-expeditions
vercel deploy --prod
```

Notes:

- The project framework preset must be Next.js. Do not add a `framework` key to a `vercel.json`; there is no `vercel.json` and Vercel detects Next.js on its own.
- Vercel Authentication (Deployment Protection) may make the site ask visitors to log in. Turn it off in Project Settings, Deployment Protection, to make the site public.
- Each deployment also gets its own address, and each branch gets a preview address. These cannot be turned off.
- `next dev` writes an `AGENTS.md` file at the repository root; it is harmless and kept in the repository.

## Accessibility and motion

- Semantic landmarks, one `h1` per page, and real text for the scrambling corner title (screen readers read the true chapter name).
- The canvas has a descriptive `aria-label`; images have alt text; icon buttons (home, menu, play and pause) have labels.
- The menu and enquiry panel are `inert` while closed. Escape closes the menu. Page scroll is locked while the menu is open.
- Small text meets WCAG contrast (the footer copyright text is deliberately lighter than the shared muted grey for that reason).
- `prefers-reduced-motion`: the film shows one still per shot with a plain crossfade, no zoom or blur, no glyph flicker, no grain animation, no shimmer or menu transitions, no blinking REC dot, and the preloader fades instead of slicing.

## Known limits

- The film downloads a lot of image data as it plays (about 108 MB for shot 1 on desktop, 22 MB on mobile). Fast connections are fine; on slow ones playback pauses to wait for frames. Lowering quality or frame count in the export commands reduces this.
- Mobile frames are 1080px wide and stretched to a portrait screen, so they look softer than desktop.
- Performance was tested in a browser without graphics acceleration, where the first seconds after loading can stutter while frames download. Check on real devices.
- The corner title stays fixed above all content, so it overlaps sections as they scroll under it.
- Reduced-motion visitors still download the frames the film needs, although only one still per shot is shown.
- Next.js 16 deprecates React 18; upgrading to React 19 is planned work.
- Hover reveals are not used on touch screens; expedition cards always show their photo there.

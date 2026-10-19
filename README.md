# WILDLINE EXPEDITIONS

Cinematic, scroll-driven landing page for a guided 4x4 convoy company. Two drone shots are played on the scrollbar, with big type over them, a blurred crossfade between the shots and a corner title that re-types itself through mountain-script glyphs. After the shots come short previews of the main sections (Expeditions, About Us, Crew, Core Team, Join), each with a VIEW MORE button to its own page, then the footer.

Stack: React 18 + Vite 5, plain CSS, Framer Motion for UI animation, Lucide icons, a dark/light theme (`useTheme`), one full-screen `<canvas>` for the film.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output in dist/
npm run preview   # serve the production build
```

Node 18+ is required. `dist/` is a static site, but pages use real paths (`/about`, `/team`, ...), so the host must serve `index.html` for every path. `vercel.json` already does this for Vercel; Netlify and others need an equivalent rewrite. The router assumes the site is served from the root, so a sub-path deploy would need changes in `src/App.jsx` as well as `base` in `vite.config.js`.

## Editing content

Everything editable lives in [src/data/site.js](src/data/site.js). Components contain no copy.

| Export      | What it controls                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| `site`      | Brand name, full name, tagline, WhatsApp number (digits with country code), email, social links, copyright |
| `frames`    | Frames per shot (`count`, `mobileCount`) and decode widths (`w`, `mw`)                                     |
| `film`      | Scroll layout: pinned height in `vh` and where each shot starts and ends (0–1)                             |
| `chapters`  | The corner-title names while the film plays                                                                |
| `bigLines`  | Large overlay lines and the scroll point (`at`, 0–1) where each appears                                    |
| `stats`     | The count-up stats row and its scroll point                                                                |
| `route`     | Start and end coordinates and altitude shown under the corner title                                        |
| `trips`     | Expedition rows: name, days, max altitude, season, price, hover still, alt text                            |
| `crew`      | Crew headline and spec list                                                                                |
| `about`, `team`, `careers` | About Us text and stats, core team members, open roles                                      |
| `join`      | Join headline, upcoming dates, inclusions and booking note                                                 |
| `menuLinks` | Links in the full-screen menu                                                                              |

Several values in `site.js` are placeholders and must be replaced before launch: the WhatsApp number (`919000000000`), the email and social handles, trip days, altitudes, seasons and prices, and the convoy dates.

Legal copy (privacy, terms, refund) lives in [src/data/legal.js](src/data/legal.js). It is placeholder text and needs a lawyer's review before launch.

## How it works

### One scroll film

`App.jsx` renders a single tall section (`film.heightVh`, 1200vh) containing a sticky 100vh stage. Scrolling through that section is the "film". `useScrollProgress` ([src/hooks/useScrollProgress.js](src/hooks/useScrollProgress.js)) converts window scroll into a 0–1 progress value and eases it with a lerp (0.1) inside `requestAnimationFrame`.

Components subscribe to that eased value with `useProgress` and write to the DOM directly, so scrolling does not cause React re-renders. The exception is the corner title, which sets state when the chapter changes.

### Timeline

[src/lib/timeline.js](src/lib/timeline.js) maps progress to the footage:

| Progress                              | What plays                                            |
| ------------------------------------- | ----------------------------------------------------- |
| 0 – `film.shot1End` (0.45)            | Shot 1, frame 1 to last                               |
| `shot1End` – `shot2Start` (0.45–0.55) | Transition: shot 1 held, shot 2 fades in under a blur |
| `shot2Start` – `shot2End` (0.55–0.90) | Shot 2, frame 1 to last                               |
| 0.90 – 1                              | Shot 2 held on its last frame                         |

Overlay timings (`bigLines`, `stats`) use the same 0–1 scale.

### Rendering

[FrameCanvas.jsx](src/components/film/FrameCanvas.jsx) draws the current frame of each shot with cover-fit and `devicePixelRatio` scaling. During the transition it draws shot 2 on top of shot 1 with `globalAlpha` equal to the transition progress. A CSS `blur()` filter on the canvas peaks mid-transition (18px) and is removed at both ends. The transition depends only on scroll position, so scrolling back reverses it exactly.

### Loading

[src/lib/frames.js](src/lib/frames.js) decodes frames with `createImageBitmap`, 8 at a time, resized to the screen. Shot 1 decodes first and blocks the preloader. Shot 2 then decodes in the background while the visitor scrolls shot 1. If shot 2 frames have not arrived yet, the nearest decoded frame is drawn.

The preloader counter ([Preloader.jsx](src/components/ui/Preloader.jsx)) glides to the real decode progress with Framer Motion and never passes it. At 100 the preloader wipes away with a diagonal slice and scrolling unlocks.

### Corner title

[CornerTitle.jsx](src/components/film/CornerTitle.jsx) is fixed top-left and shows the current chapter. Chapter order follows the film: see `chapters` in `site.js`. Once the Expeditions section reaches the middle of the screen the title shrinks to the logo name. Pages other than Home always show the small logo name. On every change each letter flickers through 4–6 random glyphs (Tibetan, Devanagari and topo marks) before settling, left to right with a 35 ms stagger. [Coordinates.jsx](src/components/film/Coordinates.jsx) shows position and altitude interpolated between `route.from` and `route.to`.

### Enquiry form

The enquiry panel ([Enquire.jsx](src/components/overlays/Enquire.jsx)) is mounted once in the layout and opened from anywhere with `openEnquire()` ([src/lib/enquire.js](src/lib/enquire.js)). It has no backend: submitting opens WhatsApp with a prefilled message built from name, phone, trip and group size. To send enquiries somewhere else, change `submit` in `Enquire.jsx`.

## Project layout

```
index.html                 meta + OG tags, fonts
vercel.json                SPA rewrite so every path serves index.html
vite.config.js             React plugin + "@" alias for src/
jsconfig.json              same alias for the editor
src/
  main.jsx                 entry
  App.jsx                  routing, loading, header title logic
  styles/index.css         all styles, colour tokens in :root
  data/                    site.js (all copy and settings), legal.js (policy pages: /privacy, /terms, /refund, /cookies)
  hooks/                   useScrollProgress
  lib/                     frames (loading), timeline, enquire (WhatsApp + openEnquire)
  layout/                  PublicLayout: header, page body, footer, overlays
  pages/                   Home (film + previews), one file per page, index.js route map
  components/
    ui/                    reusable building blocks: Header, Footer, TopBar, Reveal, Button, Panel,
                           Section, Preloader, FrameCounter
    sections/              content sections: Expeditions, About, Crew, Team, Careers, Join
    film/                  scroll-film pieces: FrameCanvas, BigLine, Stats,
                           CornerTitle, Coordinates
    overlays/              site-wide popups: Enquire, CookieBanner
public/frames/
  shot1/  shot2/           desktop frames  0001.webp ... 0200.webp
  shot1m/ shot2m/          mobile frames   0001.webp ... 0100.webp
```

Colours are the tokens at the top of `src/styles/index.css`. The `--sand` token holds the headline orange (`#ff7a1a`).

## Adding footage

Frames are numbered WebP files, `0001.webp` upward. The desktop set is 200 frames at 1920px wide. The mobile set is 100 frames (every second frame) at 1080px wide. Export with ffmpeg, which is not bundled and must be installed.

Pick the clip range, then set `fps` to `frames ÷ seconds`. For a range of S seconds that is `200/S` for desktop and `100/S` for mobile. A 23 s range:

```bash
ffmpeg -ss 00:00:25 -to 00:00:48 -i shot1.mp4 -vf "fps=200/23,scale=1920:-2" -c:v libwebp -quality 75 public/frames/shot1/%04d.webp
ffmpeg -ss 00:00:25 -to 00:00:48 -i shot1.mp4 -vf "fps=100/23,scale=1080:-2" -c:v libwebp -quality 75 public/frames/shot1m/%04d.webp
```

Repeat for shot 2 with `shot2` and `shot2m`. For a simple 30 fps export of a whole short clip, use `fps=30` for desktop and `fps=15` for mobile.

A range that is shorter than the frame count in seconds plays in slow motion as you scroll. For example, 10 s spread over 200 frames runs at half speed. A longer range runs faster.

If you use a different frame count, update `frames.count` and `frames.mobileCount` in `site.js`.

Current footage: shot 1 is `DJI_0203` 00:25–00:48. Shot 2 is `DJI_0199` 00:10–00:20.

### Placeholders

If a frame file is missing, the loader draws a placeholder in the browser: a gradient that shifts with the frame number, with the number printed on it. So the scroll mechanics can be tested with no footage at all. Real files replace placeholders frame by frame.

The Expeditions hover stills point at specific frames (for example `frames/shot1/0100.webp`). If the file is missing the image is hidden.

## Accessibility and motion

- Semantic landmarks, a hidden `h1`, and real text for the scrambling title (screen readers read the true chapter name).
- The canvas has a descriptive `aria-label`. Trip stills have alt text.
- The menu and enquiry panel are `inert` while closed. Escape closes the menu.
- `prefers-reduced-motion`: one still per shot (the middle frame), a plain crossfade with no blur, no glyph flicker (title swaps instantly), no grain animation, no menu or panel transitions, and the preloader fades instead of slicing.

## Mobile

At 768px wide and below, the loader uses the mobile frame set. The corner title moves below the nav, the frame counter moves to the bottom right, and overlays sit in the bottom third.

## Known limits

- Decoded frames are held in memory. Two shots of 200 full-size frames is heavy on low-end phones, which is why mobile uses 100 smaller frames. Lower `frames.count` if memory is a problem.
- The mobile 1080px frames are stretched to fill a portrait screen, so they look softer than desktop.
- The corner title stays fixed above all content, so it overlaps the Expeditions, Crew and Join sections as they scroll under it.
- Reduced-motion visitors still decode all frames, although only two are shown.
- There is no `og:image`. Add `public/og.jpg` and an `og:image` meta tag in `index.html` for link previews.
- Hover reveals on the Expeditions rows need a pointer. On touch devices the row is a normal link to Join.

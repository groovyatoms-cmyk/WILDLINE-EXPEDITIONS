# Wildline Expeditions: test cases

Manual and automated cases for every page and component. `[A]` = already covered by Jest in `src/__tests__/`. `[M]` = manual check. Run automated tests with `npm test`.

Test devices: desktop (≥1280 px), tablet (768–1024 px), phone (390×844). Browsers: Chrome, Safari (iOS), Firefox.

## 1. Global (every page)

| ID | Case | Expected |
|----|------|----------|
| G-01 | Open any page | `<title>`, meta description, canonical URL and Open Graph tags are present and unique per page [A seo.test] |
| G-02 | Open `/robots.txt` and `/sitemap.xml` | Robots allows crawling and links the sitemap; sitemap lists every page, expedition and blog post [A seo.test] |
| G-03 | Open `/manifest.webmanifest` and the site icon | Both load; name and icon are set |
| G-04 | Open a URL that does not exist | 404 page shows, header and footer still render |
| G-05 | First visit with no stored choice | Cookie banner slides in |
| G-06 | Resize 360 px → 1920 px on every page | No horizontal scroll, no overlapping text |
| G-07 | Tab through the page with the keyboard | Focus order is logical, every control shows a focus ring |
| G-08 | Turn on "reduce motion" | No zoom or blur on the film; plain crossfade; reveals do not animate |
| G-09 | Lighthouse on each page (mobile) | Accessibility ≥ 90, no console errors |
| G-10 | Structured data on home, expedition and blog pages | JSON-LD parses as valid JSON and matches the page content [A seo.test] |

## 2. Layout components

### Header / TopBar / Shell / PublicLayout
| ID | Case | Expected |
|----|------|----------|
| L-01 | Desktop: check centre links | Expeditions, Safety, Crew, Convoys, Gallery, Blog go to `/expeditions`, `/safety`, `/team`, `/join`, `/gallery`, `/blog` |
| L-02 | Press "Reserve a seat" | Enquiry panel opens |
| L-03 | Phone: tap the menu icon | Menu opens, page scroll behind it is locked |
| L-04 | Phone: tap a menu link | Navigates and the menu closes; scroll lock is released |
| L-05 | Phone: tap the close icon | Menu closes, scroll lock is released |
| L-06 | Open the menu, then navigate back | No stuck `overflow: hidden` on the page |
| L-07 | Menu on phone over the hero film | Menu is centred and readable |
| L-08 | Menu legal links and FAQ link | Every legal page and `/faq` open |

### Footer
| ID | Case | Expected |
|----|------|----------|
| L-10 | Click each footer link | Every link resolves, none returns 404 |
| L-11 | Social icons | Open in a new tab with `rel="noopener"` [M] |
| L-12 | WhatsApp, phone and email links | Open the right app with the right number or address |

### Preloader
| ID | Case | Expected |
|----|------|----------|
| L-20 | Load home on a fast network | Preloader finishes and hides; page is usable |
| L-21 | Load home on a throttled network (Slow 4G) | Preloader waits for the first frames only, then hides |
| L-22 | Load any non-home page | No preloader blocks content |

### Cursor
| ID | Case | Expected |
|----|------|----------|
| L-30 | Desktop with a mouse | Custom cursor follows the pointer, grows over links and buttons |
| L-31 | Touch device | Custom cursor is not shown |

## 3. Overlays

### Enquire panel (`Enquire`, `Panel`)
| ID | Case | Expected |
|----|------|----------|
| O-01 | Press any BOOK NOW or ENQUIRE button | Panel opens (`open-enquire` event) |
| O-02 | Press Escape or click outside | Panel closes |
| O-03 | Submit with empty name or phone | Browser validation blocks submit |
| O-04 | Phone "abc" or fewer than 7 digits | Rejected by the pattern |
| O-05 | Phone "+91 98765 43210" | Accepted |
| O-06 | Group size 0 and 25 | Rejected (min 1, max 24); default is 2 |
| O-07 | Trip list | Contains every trip from `trips` |
| O-08 | Valid submit | WhatsApp opens in a new tab with the prefilled message (name, phone, trip, group size); panel closes; confetti plays |
| O-09 | Focus | Focus moves into the panel on open and returns to the opener on close |

### Cookie banner
| ID | Case | Expected |
|----|------|----------|
| O-20 | First visit | Banner shows after mount; no flash on the server render |
| O-21 | Press Accept | Banner slides away; `localStorage["cookie-consent"] = "accepted"` |
| O-22 | Press Decline | Banner slides away; value is `"declined"` |
| O-23 | Reload after a choice | Banner does not return |
| O-24 | Private mode with storage blocked | No crash; banner closes for the session and asks again next visit |
| O-25 | "Cookies Policy" link | Opens `/cookies` |

## 4. Home `/` (`Home`, film components)

| ID | Case | Expected |
|----|------|----------|
| H-01 | Load home | Hero film shows frame 1, never a black screen |
| H-02 | Scroll slowly through the film | Frames advance smoothly with the scroll; shot 1 then shot 2 |
| H-03 | Scroll through the shot 1 → shot 2 transition | Push-in zoom with blur and a short dissolve, no flash or jump |
| H-04 | Shot 2 on phone | Frames are upright (not rotated), subject visible |
| H-05 | Play button | Starts automatic scrolling, REC badge shows, icon becomes Pause |
| H-06 | While playing: wheel, touch, key press or mouse down | Playback stops |
| H-07 | Press Pause | Playback stops and stays stopped (no restart) |
| H-08 | Play on a slow network | Playback pauses while frames load, never freezes on a stale frame |
| H-09 | Hero "next convoy" line and Countdown | Show Winter Frozen Spiti, 25 Dec 2026 (first entry of `join.dates`) |
| H-10 | Countdown values | Days / hours / minutes are correct and update every 30 s; never negative |
| H-11 | Countdown before mount | Empty reserved box, no layout shift |
| H-12 | Stats (odometer) | Numbers count up once when scrolled into view and match `site.ts` |
| H-13 | BigLine, CornerTitle, Coordinates | Text appears at the right scroll point and hides after it |
| H-14 | ScrollCue | Visible at the top, fades out after scrolling |
| H-15 | Window resize or phone rotation | Canvas refits and repaints at once, no blank frame |
| H-16 | Frame loader | Only a window of frames is requested around the playhead; no 404s in the network tab |
| H-17 | Home sections below the film | Atlas, expeditions, blog preview, enquiry all render [A pages.test] |
| H-18 | Home shows 4 expeditions with a link to all | Link goes to `/expeditions` |

## 5. Expeditions

### `/expeditions` (`Expeditions`, `Poster`, `PosterCarousel`, `Atlas`, `Climb`)
| ID | Case | Expected |
|----|------|----------|
| E-01 | Page lists every trip | One poster per trip [A pages.test] |
| E-02 | Poster of a trip with a slug | Links to `/expeditions/<slug>` [A pages.test] |
| E-03 | Poster of a trip without a slug | Does not link to a dead page |
| E-04 | Poster shows name, days, altitude, season and price | Values match `trips` |
| E-05 | Carousel: swipe, arrow keys, buttons | Moves one poster at a time, does not overscroll |
| E-06 | Atlas | Marker for every trip with coordinates; no marker for a trip without them |
| E-07 | Climb (altitude chart) | Bars scale with altitude; labels readable on phone |
| E-08 | Images | Show a shimmer while loading, then the image; no layout shift |

### `/expeditions/[slug]` (`ExpeditionDetail`)
| ID | Case | Expected |
|----|------|----------|
| E-20 | Open each slug (`winter-spiti`, `adi-kailash`, `zanskar`, …) | Page renders title, itinerary, price, inclusions and exclusions |
| E-21 | Open an unknown slug | 404 |
| E-22 | Departures list | Shows only `join.dates` entries whose trip equals this trip |
| E-23 | Trip with no departure | Shows a sensible empty state, not a blank box |
| E-24 | Enquire button | Opens the panel with this trip selected [M] |
| E-25 | Metadata | Title, description and canonical use this slug |
| E-26 | `/expeditions/<slug>/opengraph-image` | Returns a PNG with the trip name |
| E-27 | Static params | One page is built per trip with a slug |

## 6. Convoys `/join` (`Join`, `DepartureBoard`, `Countdown`)

| ID | Case | Expected |
|----|------|----------|
| J-01 | Departure board | Lists upcoming departures from today, first row is Winter Frozen Spiti (25 Dec 2026) |
| J-02 | A departure date earlier than yesterday | Hidden from the board |
| J-03 | Every departure passed | Falls back to the full list, no empty board |
| J-04 | `to` prop (home preview) | Shows only the first 5 rows |
| J-05 | Seats | Number is ≥ 0; 0 shows as full, not "0 seats" |
| J-06 | Each `join.dates` trip name | Matches a trip in `trips` [A logic.test, data.test] |
| J-07 | Date formatting | "25 Dec 2026" format, valid date [A data.test] |
| J-08 | Includes and excludes lists | Match `join.includes` and `join.excludes` |
| J-09 | Steps (Enquire → Roll Out) | Rendered in order |
| J-10 | Server vs client render | No hydration warning in the console (list computed after mount) |

## 7. Safety `/safety` (`How`, `Crew`, `ConvoyCockpit`)

| ID | Case | Expected |
|----|------|----------|
| S-01 | Page renders all three sections [A pages.test] | How, Crew and ConvoyCockpit each show content |
| S-02 | ConvoyCockpit interaction | Controls respond to click and keyboard; no console errors |
| S-03 | Crew cards | Name, role and photo for each member; images have alt text |
| S-04 | Mobile layout | Sections stack, nothing cut off |

## 8. About, Team, Careers

| ID | Case | Expected |
|----|------|----------|
| A-01 | `/about` renders About [A pages.test]; `/gallery` renders the Gallery | Copy matches `site.ts`; gallery images load |
| A-02 | Gallery on phone | Images keep orientation and aspect ratio |
| A-03 | `/team` renders Team [A pages.test] | One card per crew member |
| A-04 | `/careers` renders Careers [A pages.test] | Roles listed, apply button opens `mailto:` with subject "Application: " |
| A-05 | Each page | Has exactly one `h1` |

## 9. Contact, Enquiry, FAQ, NightCamp

| ID | Case | Expected |
|----|------|----------|
| C-01 | `/contact` renders Contact, Enquiry, NightCamp [A pages.test] | All three present |
| C-02 | Press Send with nothing filled | No WhatsApp opens; the first missing blank is focused; "missing" state shows on trip, month, name, phone |
| C-03 | Fill trip only | Month is flagged next |
| C-04 | Invalid phone (letters, too short) | Phone flagged, send blocked |
| C-05 | Valid form, Send | WhatsApp opens in a new tab with the sentence (name, trip, month, "by myself / as a duo / as a group of N", phone, note); "Cleared for departure" shows; confetti plays |
| C-06 | Group size 1, 2, 3+ | Sentence says "by myself", "as a duo", "as a group of N" |
| C-07 | Month "any" (flex) | Sentence says "any month" |
| C-08 | Optional note | Appended to the sentence only when not empty |
| C-09 | "Write another" | Form resets to empty, size back to 2 |
| C-10 | Open a pop-up (trip, month, size), then Escape or click outside | Pop-up closes |
| C-11 | Open one pop-up while another is open | Only one open at a time |
| C-12 | Keyboard use of the blanks | Reachable by Tab, toggle with Enter or Space, `aria-expanded` updates |
| C-13 | `/faq` | Questions expand and collapse; answers match `site.ts`; only valid JSON-LD FAQ |
| C-14 | NightCamp | Animation runs, pauses on reduced motion, StarSky does not hurt scroll performance |
| C-15 | Contact details | Phone, email and WhatsApp links are correct |

## 10. Blog `/blog`, `/blog/[slug]`

| ID | Case | Expected |
|----|------|----------|
| B-01 | `/blog` lists every post [A pages.test] | One card per post, newest first |
| B-02 | Card | Links to `/blog/<slug>` [A pages.test] |
| B-03 | Each post renders a heading [A pages.test] | One `h1`, body, cover image |
| B-04 | Slugs are unique and every post has a cover [A pages.test] | Pass |
| B-05 | Unknown post slug | 404 |
| B-06 | BlogPreview on home | Shows latest posts and links to `/blog` [A pages.test] |
| B-07 | Post metadata and JSON-LD | Title, description, `Article` schema, published date |

## 11. Legal `/[legal]` (`LegalPage`)

| ID | Case | Expected |
|----|------|----------|
| P-01 | Open every key in `legal` (privacy, terms, cookies, …) | Shows an `h1` and the full text [A pages.test] |
| P-02 | Open `/not-a-legal-page` | 404, not an empty page |
| P-03 | Last-updated date | Shown and valid |
| P-04 | Legal links in footer and menu | All resolve |

## 12. UI primitives

| ID | Component | Case | Expected |
|----|-----------|------|----------|
| U-01 | Button | Default, `rust` variant, disabled | Right style, disabled does not fire `onClick` [A components.test] |
| U-02 | Button | Renders as link when given `href` | Real `<a>`, keyboard works |
| U-03 | Section | Title, `to` link, heading level (`h1`/`h2`) | Renders the right tag and link [A components.test] |
| U-04 | SectionSkeleton | Shown while a lazy section loads | Same height as the real section, no layout shift |
| U-05 | Reveal | Enters on scroll, once | Content visible with JS slow or off-screen; no reveal under reduced motion |
| U-06 | ShimmerImg | Loading, loaded, broken URL | Shimmer, then image; a broken URL shows a fallback, no crash |
| U-07 | Odometer | Value 0, large value, value change | Digits roll to the right number |
| U-08 | ScrollWords | Scroll through text | Words light up in order, readable without motion |
| U-09 | StarSky | Mount and unmount | Canvas cleaned up, no leaked listeners |
| U-10 | BrandIcons | Each icon | Renders as SVG with an accessible label |
| U-11 | JsonLd | Any object | Outputs `<script type="application/ld+json">` with escaped `<` |
| U-12 | PosterCarousel | See E-05 | |

## 13. Libraries and data

| ID | Area | Case | Expected |
|----|------|------|----------|
| D-01 | `enquire.wa` | With and without text | `https://wa.me/<number>` plain, `?text=` URL-encoded [A logic.test] |
| D-02 | `enquire.openEnquire` | Call it | Dispatches `open-enquire` |
| D-03 | `guard.isPresent / isFilled / hasItems` | null, undefined, "", "  ", [], [x] | Right booleans [A guard.test] |
| D-04 | `season` | Month → trips in season | Matches each trip's `season` text [A season.test] |
| D-05 | `timeline` | Progress 0, 0.47, 0.5, 0.53, 0.9, 1 | Frames and transition `t` are continuous and in range [A logic.test] |
| D-06 | `frames` | Count per shot, mobile = half | 880/440 and 960/480 frames exist on disk, none missing |
| D-07 | `frames.createLoader` | Move the playhead | Out-of-window frames are closed; no memory growth |
| D-08 | `seo` helpers | Title length, canonical, OG image | Valid for every page [A seo.test] |
| D-09 | `site.ts` data | Trips: unique names and slugs, every slug has details and coordinates | [A data.test] |
| D-10 | `join.dates` | Valid dates, seats ≥ 0, trip names known | [A data.test] |
| D-11 | `confetti` | Call twice quickly | No error; canvas removed after the animation |

## 14. Cross-cutting

| ID | Case | Expected |
|----|------|----------|
| X-01 | Accessibility: every image has `alt`, every control has a label, contrast ≥ 4.5:1 | Pass |
| X-02 | Performance: home on mid-range phone | Scroll stays near 60 fps, no long tasks over 200 ms |
| X-03 | Memory: scroll the whole film twice | Memory does not keep climbing |
| X-04 | Cache: deploy, purge, reload | New frames and copy appear; old ones are gone |
| X-05 | Build: `npm run build` | No type, lint or build errors |
| X-06 | Deep links | Every route opens directly (refresh on `/join`, `/blog/<slug>`) |

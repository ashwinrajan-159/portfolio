# Ashwin Rajan — Portfolio

A static site. No build step and nothing to install: the **contents of this
folder** are what gets deployed.

Unpacked from `../Ashwin Rajan Portfolio.html` — a single-file bundle that
inlined every asset as base64 and reassembled them into blob URLs at runtime.
That file is still there, untouched, as the source of record.

## Layout

```
index.html                     the page
favicon.svg                    "AR" mark
Ashwin_Rajan_Resume.pdf        linked from the nav
vercel.json                    cache + security headers
set-site-url.ps1               stamps the live domain into the absolute URLs
robots.txt  sitemap.xml        SEO
assets/
  js/runtime.js                the x-dc component runtime
  js/image-slot.js             <image-slot> custom element
  js/react*.min.js             React 18.3.1, vendored
  img/backdrop.jpg             blurred page backdrop
  img/og-image.png             1200x630 social card
  img/apple-touch-icon.png
  fonts/*                      24 self-hosted faces
```

Nothing is fetched from a third-party origin at runtime — no Google Fonts, no
unpkg. 1.7 MB total; a first visit pulls ~600 KB of it (six font subsets, React,
the runtime and the backdrop), and everything under `assets/` is served
`immutable` so repeat visits are HTML-only.

## Deploying to Vercel

Vercel has no drag-and-drop upload, so it needs either its CLI (which needs
Node) or a Git repo. Neither Node nor git is on this machine yet; `winget` is:

```powershell
winget install OpenJS.NodeJS.LTS     # for the CLI route
winget install Git.Git               # for the GitHub route
```

Then, the CLI route:

```powershell
npm i -g vercel      # once
vercel login
vercel --prod        # from inside this folder
```

Vercel auto-detects a static site — accept the defaults; there is no framework
and no build command. The project name defaults to this folder name, which is
why it is `ashwin-rajan-portfolio` and not `site`.

### Importing from GitHub instead

This folder is a **subdirectory** of the repo (github.com/ashwinrajan-159/portfolio),
so on *Add New → Project → Import* you must set:

> **Root Directory** = `ashwin-rajan-portfolio`

Without it Vercel looks for `index.html` at the repo root, finds none, and
deploys an empty site. Framework Preset stays *Other*; leave build and output
commands blank. Everything else, including this folder's `vercel.json`, is picked
up from there.

### After the first deploy

Vercel only tells you the hostname once the project exists, and a *relative*
`og:image` will not render on LinkedIn, X or WhatsApp — so stamp the real domain
in and redeploy:

```powershell
.\set-site-url.ps1 ashwin-rajan-portfolio.vercel.app
vercel --prod
```

That rewrites the canonical link, `og:url`, `og:image`, `twitter:image`,
`robots.txt` and `sitemap.xml`. It is re-runnable, so attaching a custom domain
later is the same one-liner with the new host.

## Local preview

Must be served over HTTP. Opening `index.html` off the filesystem fails, because
the runtime loads `assets/js/*` as modules and `file://` has a null origin.

```powershell
vercel dev           # or: python -m http.server 8099
```

## Images

All four `<image-slot>`s are filled via a `src` attribute on their `x-import`
tag in `index.html`. To swap any of them, replace the file or repoint `src`:

| slot id         | file                            | fit     |
| --------------- | ------------------------------- | ------- |
| `portrait`      | `assets/img/portrait.jpg`       | cover   |
| `trustlens-img` | `assets/img/trustlens-card.jpg` | contain |
| `fedlearn-img`  | `assets/img/fedlearn-card.jpg`  | contain |
| `flimo-img`     | `assets/img/flimo-card.jpg`     | contain |

The three project cards are generated, not screenshots — see
`../social-previews/` for the 1280x640 PNG masters and the script that built
them. The site copies are JPEG re-encodes at quality 84 (~70 KB each instead of
~210 KB).

Every image renders greyscale: `applyTweaks()` in the page's `text/x-dc` script
sets `filter:grayscale(1)` on each `[data-mono]` container, defaulting to on
because the `monochromeImages` prop is unset in a static deploy. Change that
default in the script to show images in colour.

## Known gaps

- **The project panels duplicate their own captions.** Each generated card
  repeats the project name and tagline that already sit in the left column of the
  same row, and the greyscale filter flattens the card's bronze and gold. They
  were designed as GitHub social previews, where they work well; on the page they
  are a stopgap. The original placeholders asked for screenshots of the running
  projects ("Drop a TrustLens screenshot", "a FedLearn browser visualization"),
  which is still the right fill.
- **The repos have no description set**, so GitHub's own preview falls back to a
  stats card. Upload the masters from `../social-previews/` under each repo's
  Settings → General → Social preview, and add a one-line description while you
  are there.
- The mobile layout comes from a `@media (max-width:900px)` block at the end of
  the second `<style>` element. The original design had no breakpoints at all;
  that block collapses the fixed 12-column grids to one column. Delete it to get
  the original back.

## What changed during unpacking

- 31 base64 assets became real files; the uuid references in the markup were
  rewritten to relative paths.
- React and ReactDOM were vendored locally and wired up through
  `window.__resources`; the runtime used to pull them from unpkg.com on every
  visit. Babel is deliberately *not* vendored — nothing on the page needs runtime
  transpiling, so it is never requested, and the runtime falls back to the
  SRI-pinned unpkg copy on its own if that ever changes.
- The backdrop went from a 2.9 MB PNG to an 81 KB JPEG. It is only ever painted
  behind an 18px blur, so the detail was unused.
- Four declared-but-unused display faces (HyperScrypt, Makcasa, Airstrike,
  HeavyRain — ~925 KB) were dropped along with their `@font-face` rules.
- Added: `<title>`, meta description, Open Graph / Twitter card tags, favicon,
  apple-touch-icon, font preloads, a `prefers-reduced-motion` block, the résumé
  nav link, and the mobile breakpoint.
- The marker beside each project number was a 30px Mythology One engraving, which
  was illegible at that size; it is now a 9px `#C9A227` square. The large
  Mythology One ornaments on the section titles are untouched — that face is still
  used, so it stays in `assets/fonts/`.

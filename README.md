# Personal Portfolio — Lucas Nunes de Assis

Personal portfolio website showcasing experience, skills, projects and testimonials.
It is a **static site** (no build step required) built on the DevFolio Bootstrap template.

## Pages

| File | Purpose |
| --- | --- |
| [`index.html`](index.html) | Home page — English (default) |
| [`index-pt-br.html`](index-pt-br.html) | Home page — Portuguese |
| [`curriculo.html`](curriculo.html) | Résumé / CV page |

The two home pages are language mirrors: **any content change (project, testimonial, skill)
must be made in both** to keep them in sync.

## Tech stack

- **Bootstrap 4**, **jQuery 3.3.1** (+ migrate), **Popper** — layout & interactions
- **Owl Carousel 2.3.4** — the *Skills* and *Testimonials* carousels
- **Typed.js** — the animated subtitle
- **CounterUp / Waypoints** — the animated stat counters
- **Lightbox** — project image popups
- **Ionicons** — skill icons are now **self-hosted SVGs** in [`img/icons/`](img/icons/)
  (no external CDN); the counter icons still use the local Ionicons v2 font in `lib/`.

All third-party libraries are vendored under [`lib/`](lib/). Custom code lives in
[`js/main.js`](js/main.js) and [`css/style.css`](css/style.css).

## Local development

```bash
npm install        # one-time: installs dev tooling (live-server, prettier, htmlhint)
npm run dev        # serve with auto-reload at http://localhost:8080
```

No bundler or compile step is needed — edit the HTML/CSS/JS and refresh.

### Useful scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with live reload |
| `npm run check:links` | Fail-fast audit that every local `src`/`href` resolves (catches 404s) |
| `npm run lint:html` | HTMLHint structural lint of the three pages |
| `npm run format` | Prettier format (skips vendored `lib/` and minified files) |
| `npm run format:check` | Prettier check without writing |

## Repository-specific helpers

Common edits are documented as Claude Code skills in [`.claude/skills/`](.claude/skills/):

- **preview-portfolio** — serve the site and screenshot it in a headless browser
- **add-project** — add a project card to both language pages consistently
- **add-testimonial** — add a testimonial to the carousel on both pages

## Credits

Template: [DevFolio](https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/)
by [BootstrapMade](https://bootstrapmade.com).

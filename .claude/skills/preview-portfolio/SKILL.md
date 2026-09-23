---
name: preview-portfolio
description: Serve this portfolio locally and inspect/screenshot it in a headless browser. Use whenever you change HTML/CSS/JS and want to SEE the result, verify a carousel/animation works, check for console errors or broken (404) assets, or capture a screenshot at desktop/tablet/mobile widths.
---

# Preview the portfolio

This is a static site — no build step. Serve the folder over HTTP (some browser
features misbehave on `file://`) and drive it with Playwright.

## 1. Serve

```bash
# from the repo root
python3 -m http.server 8199 >/dev/null 2>&1 &   # or: npm run dev  (port 8080, live reload)
```

Pages: `/index.html` (EN), `/index-pt-br.html` (PT), `/curriculo.html` (CV).

## 2. Drive it with Playwright

If Playwright is not installed yet:

```bash
npx --yes playwright@1.63.0 install chromium
# in a scratch dir: npm init -y && npm install playwright@1.63.0
```

Minimal inspection script — captures console errors, 4xx responses, and screenshots:

```js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1366, height: 900 } });
  const problems = [];
  p.on('console', m => { if (m.type() === 'error') problems.push(m.text()); });
  p.on('pageerror', e => problems.push('pageerror: ' + e.message));
  p.on('response', r => { if (r.status() >= 400) problems.push(`HTTP ${r.status()} ${r.url()}`); });
  await p.goto('http://localhost:8199/index.html', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2000);
  console.log(problems.length ? problems.join('\n') : 'no console/network problems');
  await p.screenshot({ path: 'preview.png', fullPage: true });
  await b.close();
})();
```

Test the carousels specifically by reading `#testimonial-mf` (dots/nav/loop) and
`.services-carousel` (icons). To check responsiveness, re-run with viewport widths
`1366`, `768`, and `390`.

## 3. Static checks (no browser)

```bash
npm run check:links   # every local src/href resolves (catches 404s)
npm run lint:html     # HTMLHint structural lint
```

## Cleanup

```bash
pkill -f "http.server 8199"
```

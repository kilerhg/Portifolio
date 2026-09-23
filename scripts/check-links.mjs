#!/usr/bin/env node
/**
 * check-links.mjs — fail-fast audit of local asset references.
 *
 * Scans every HTML page for local (non-http) references to files and reports any
 * that do not exist on disk. Covers both:
 *   - src="..." / href="..." attributes, and
 *   - CSS url(...) references (e.g. inline style="background-image: url(img/x.webp)").
 * This is the guard against the class of "404 on a vendored asset" bug (missing
 * contactform.js, wrong image extension, deleted vendor dir, etc.).
 *
 * Usage: node scripts/check-links.mjs   (or: npm run check:links)
 * Exit code 1 if any reference is broken.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "index-pt-br.html", "curriculo.html"];

// src="..." / href="..." values (double or single quoted).
const ATTR = /(?:src|href)\s*=\s*(?:"([^"]+)"|'([^']+)')/gi;
// CSS url(...) values, with optional quotes: url(x), url('x'), url("x").
const CSS_URL = /url\(\s*(?:"([^"]+)"|'([^']+)'|([^)'"]+))\s*\)/gi;

const isExternal = (u) =>
  /^(https?:)?\/\//i.test(u) ||
  u.startsWith("data:") ||
  u.startsWith("mailto:") ||
  u.startsWith("tel:") ||
  u.startsWith("#") ||
  u.startsWith("javascript:");

let broken = 0;
let checked = 0;

const checkRef = (raw, page) => {
  const ref = (raw ?? "").trim();
  if (!ref || isExternal(ref)) return;
  const clean = ref.split("#")[0].split("?")[0];
  if (!clean || clean.endsWith("/")) return;
  checked++;
  const target = normalize(join(root, clean));
  if (!existsSync(target)) {
    console.error(`✗ ${page}: broken reference -> ${ref}`);
    broken++;
  }
};

for (const page of pages) {
  const abs = join(root, page);
  if (!existsSync(abs)) {
    console.error(`✗ page not found: ${page}`);
    broken++;
    continue;
  }
  const html = readFileSync(abs, "utf8");
  for (const m of html.matchAll(ATTR)) checkRef(m[1] ?? m[2], page);
  for (const m of html.matchAll(CSS_URL)) checkRef(m[1] ?? m[2] ?? m[3], page);
}

if (broken > 0) {
  console.error(`\n${broken} broken reference(s) found (${checked} local refs checked).`);
  process.exit(1);
}
console.log(`✓ All ${checked} local references across ${pages.length} pages resolve.`);

#!/usr/bin/env node
// SEO acceptance checker for TowingNo.1.
// Node built-ins only (Node >= 18: global fetch, AbortSignal.timeout). ESM. GET requests only.
// It measures; it never fixes. Exit code is 0 even when checks fail (2 only for bad arguments).
//
// Usage:
//   node scripts/seo/check-seo.mjs --base <url> --out <dir> [--max-pages 200] [--header 'name: value']...
//     [--prod-origin https://www.towingno1.com] [--concurrency 3] [--timeout 20000]
//     [--probe-404 <path>]... [--no-probe-404] [--orphan-exceptions <file>]
//
// URLs that point at --prod-origin are fetched from the --base host and reported as production URLs.

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const CHECKER_VERSION = '1.0.0';
const DEFAULT_PROD_ORIGIN = 'https://www.towingno1.com';
const DEFAULT_404_PROBES = [
  '/seo-check-nonexistent-page',
  '/services/seo-check-nonexistent-service',
  '/locations/seo-check-nonexistent-city',
  '/blog/seo-check-nonexistent-post',
];
const DEFAULT_UA = 'Mozilla/5.0 (compatible; TowingNo1-SEO-Checker/' + CHECKER_VERSION + ')';
const SAFE_HEADER_VALUES = new Set(['x-forwarded-proto', 'user-agent', 'accept-language', 'accept']);
const KEPT_RESPONSE_HEADERS = ['content-type', 'x-robots-tag', 'location', 'cache-control', 'link', 'strict-transport-security', 'x-vercel-cache', 'server'];
const THRESHOLDS = { titleMin: 30, titleMax: 60, descMin: 70, descMax: 160, minWords: 300, maxRedirectHops: 10, maxBodyBytes: 5 * 1024 * 1024, lastmodFutureToleranceHours: 24 };
const ROBOTS_AGENTS = ['*', 'googlebot'];
const MAX_ITEMS_IN_SUMMARY = 25;

// ---------------------------------------------------------------- arguments
function usage() {
  return [
    'Usage: node scripts/seo/check-seo.mjs --base <url> --out <dir> [options]',
    '',
    'Options:',
    '  --base <url>               Origin to crawl (required), e.g. http://localhost:3101',
    '  --out <dir>                Output directory for results.json and summary.md (required)',
    '  --max-pages <n>            Max internal URLs to fetch during the crawl (default 200)',
    "  --header 'name: value'     Extra request header, repeatable (e.g. 'x-forwarded-proto: https')",
    '  --prod-origin <url>        Production origin used for reporting (default ' + DEFAULT_PROD_ORIGIN + ')',
    '  --concurrency <n>          Parallel requests (default 3)',
    '  --timeout <ms>             Per-request timeout (default 20000)',
    '  --probe-404 <path>         Path expected to return 404, repeatable (default: 4 built-in probes)',
    '  --no-probe-404             Skip 404 probes',
    '  --orphan-exceptions <file> JSON list of orphan exceptions (default scripts/seo/orphan-exceptions.json)',
    '  --help                     Show this help',
  ].join('\n');
}

function parseArgs(argv) {
  const a = { headers: [], probes: null, maxPages: 200, concurrency: 3, timeout: 20000, prodOrigin: DEFAULT_PROD_ORIGIN, probe404: true };
  for (let i = 0; i < argv.length; i++) {
    let arg = argv[i];
    let val;
    const eq = arg.indexOf('=');
    if (arg.startsWith('--') && eq > 0) { val = arg.slice(eq + 1); arg = arg.slice(0, eq); }
    const next = () => { if (val !== undefined) return val; i++; if (i >= argv.length) throw new Error('Missing value for ' + arg); return argv[i]; };
    switch (arg) {
      case '--help': case '-h': a.help = true; break;
      case '--base': a.base = next(); break;
      case '--out': a.out = next(); break;
      case '--max-pages': a.maxPages = Number(next()); break;
      case '--header': a.headers.push(next()); break;
      case '--prod-origin': a.prodOrigin = next(); break;
      case '--concurrency': a.concurrency = Number(next()); break;
      case '--timeout': a.timeout = Number(next()); break;
      case '--probe-404': (a.probes ||= []).push(next()); break;
      case '--no-probe-404': a.probe404 = false; break;
      case '--orphan-exceptions': a.orphanExceptions = next(); break;
      default: throw new Error('Unknown argument: ' + arg);
    }
  }
  return a;
}

// ---------------------------------------------------------------- helpers
const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '\u2013', mdash: '\u2014', hellip: '\u2026', rsquo: '\u2019', lsquo: '\u2018', ldquo: '\u201c', rdquo: '\u201d', copy: '\u00a9', reg: '\u00ae', trade: '\u2122', middot: '\u00b7', bull: '\u2022', times: '\u00d7', rarr: '\u2192', larr: '\u2190', deg: '\u00b0' };
function decodeEntities(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e) => {
    if (e[0] === '#') {
      const cp = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      try { return String.fromCodePoint(cp); } catch { return m; }
    }
    const v = NAMED_ENTITIES[e.toLowerCase()];
    return v === undefined ? m : v;
  });
}
const collapse = (s) => String(s).replace(/\s+/g, ' ').trim();
const textOf = (html) => collapse(decodeEntities(String(html).replace(/<[^>]*>/g, ' ')));
const charLen = (s) => [...s].length;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseAttrs(s) {
  const out = Object.create(null);
  const re = /([^\s"'>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m;
  while ((m = re.exec(s || ''))) {
    const name = m[1].toLowerCase();
    if (name in out) continue;
    const v = m[2] ?? m[3] ?? m[4];
    out[name] = v === undefined ? '' : decodeEntities(v);
  }
  return out;
}
function findTags(html, tagNames) {
  const re = new RegExp('<(' + tagNames.join('|') + ')\\b((?:[^>"\']|"[^"]*"|\'[^\']*\')*)>', 'gi');
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push({ tag: m[1].toLowerCase(), attrs: parseAttrs(m[2]), index: m.index });
  return out;
}
function safeUrl(href, baseUrl) {
  try { return new URL(href, baseUrl); } catch { return null; }
}
const hasNoindex = (s) => /\bnoindex\b|\bnone\b/i.test(s || '');

// ---------------------------------------------------------------- robots.txt
function parseRobots(txt) {
  const groups = [];
  const sitemaps = [];
  const other = [];
  let current = null;
  let lastWasUA = false;
  for (const raw of String(txt).split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const m = line.match(/^([^:]+):\s*(.*)$/);
    if (!m) { other.push(line); continue; }
    const key = m[1].trim().toLowerCase();
    const val = m[2].trim();
    if (key === 'user-agent') {
      if (!current || !lastWasUA) { current = { agents: [], rules: [] }; groups.push(current); }
      current.agents.push(val.toLowerCase());
      lastWasUA = true;
    } else if (key === 'allow' || key === 'disallow') {
      if (current) current.rules.push({ type: key, path: val });
      lastWasUA = false;
    } else if (key === 'sitemap') {
      sitemaps.push(val);
    } else {
      other.push(line);
      lastWasUA = false;
    }
  }
  return { groups, sitemaps, other };
}
function rulesFor(robots, agent) {
  const specific = robots.groups.filter((g) => g.agents.includes(agent) && agent !== '*');
  const chosen = specific.length ? specific : robots.groups.filter((g) => g.agents.includes('*'));
  return chosen.flatMap((g) => g.rules);
}
function robotsPatternMatches(pattern, p) {
  let pat = pattern;
  let anchored = false;
  if (pat.endsWith('$')) { anchored = true; pat = pat.slice(0, -1); }
  const re = '^' + pat.split('*').map((x) => x.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') + (anchored ? '$' : '');
  return new RegExp(re).test(p);
}
function robotsAllowed(rules, pathWithQuery) {
  let best = null;
  for (const r of rules) {
    if (r.path === '') continue;
    if (!robotsPatternMatches(r.path, pathWithQuery)) continue;
    const len = r.path.length;
    if (!best || len > best.len || (len === best.len && r.type === 'allow')) best = { len, type: r.type, rule: r.path };
  }
  return { allowed: best ? best.type === 'allow' : true, rule: best ? best.type + ': ' + best.rule : null };
}

// ---------------------------------------------------------------- sitemap
function parseSitemap(xml) {
  const isIndex = /<sitemapindex[\s>]/i.test(xml);
  const blockRe = isIndex ? /<sitemap>([\s\S]*?)<\/sitemap>/gi : /<url>([\s\S]*?)<\/url>/gi;
  const tag = (block, name) => {
    const m = block.match(new RegExp('<' + name + '>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*</' + name + '>', 'i'));
    return m ? decodeEntities(m[1].trim()) : null;
  };
  const entries = [];
  let m;
  while ((m = blockRe.exec(xml))) {
    entries.push({ loc: tag(m[1], 'loc'), lastmod: tag(m[1], 'lastmod'), changefreq: tag(m[1], 'changefreq'), priority: tag(m[1], 'priority') });
  }
  return { isIndex, isUrlset: /<urlset[\s>]/i.test(xml), entries };
}

// ---------------------------------------------------------------- HTML analysis
function analyzeHtml(html, pageFetchUrl, ctx) {
  const noComments = html.replace(/<!--[\s\S]*?-->/g, ' ');
  const scriptRe = /<script\b((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*?)<\/script\s*>/gi;
  const jsonLd = [];
  const scriptSrcs = [];
  let m;
  let blockIndex = 0;
  while ((m = scriptRe.exec(noComments))) {
    const attrs = parseAttrs(m[1]);
    if (attrs.src) scriptSrcs.push(attrs.src);
    if ((attrs.type || '').trim().toLowerCase() === 'application/ld+json') {
      const raw = m[2].trim();
      const block = { index: blockIndex++, bytes: raw.length, ok: false, error: null, types: [], ids: [], definedIds: [] };
      try {
        const data = JSON.parse(raw);
        block.ok = true;
        walkJsonLd(data, block);
      } catch (e) {
        block.error = String(e.message).slice(0, 200);
      }
      jsonLd.push(block);
    }
  }
  const noScript = noComments.replace(scriptRe, ' ').replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ');
  const doc = noScript.replace(/<svg\b[\s\S]*?<\/svg\s*>/gi, ' ');
  const headEnd = doc.search(/<\/head\s*>/i);
  const head = headEnd >= 0 ? doc.slice(0, headEnd) : '';
  const body = headEnd >= 0 ? doc.slice(headEnd) : doc;
  const where = (idx) => (headEnd >= 0 && idx < headEnd ? 'head' : 'body');

  // html lang
  const htmlTag = findTags(doc, ['html'])[0];
  const lang = htmlTag ? htmlTag.attrs.lang ?? null : null;

  // title
  const titleRe = /<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi;
  const titles = [];
  while ((m = titleRe.exec(doc))) titles.push({ text: textOf(m[1]), location: where(m.index) });
  const titleEntry = titles.find((t) => t.location === 'head') || titles[0] || null;
  const title = titleEntry ? titleEntry.text : null;

  // meta + link tags
  const metas = Object.create(null);
  const metaLocations = Object.create(null);
  let viewport = null;
  for (const t of findTags(doc, ['meta'])) {
    const key = (t.attrs.name || t.attrs.property || t.attrs['http-equiv'] || t.attrs.itemprop || '').toLowerCase();
    if (!key) continue;
    (metas[key] ||= []).push(t.attrs.content ?? '');
    (metaLocations[key] ||= []).push(where(t.index));
    if (key === 'viewport') viewport = t.attrs.content ?? '';
  }
  const meta1 = (k) => (metas[k] && metas[k].length ? collapse(metas[k][0]) : null);
  const canonicals = [];
  const hreflang = [];
  const stylesheets = [];
  const preloads = [];
  for (const t of findTags(doc, ['link'])) {
    const rels = (t.attrs.rel || '').toLowerCase().split(/\s+/).filter(Boolean);
    const href = t.attrs.href;
    if (!href) continue;
    if (rels.includes('canonical')) {
      const u = safeUrl(href, pageFetchUrl);
      canonicals.push({ raw: href, url: u ? ctx.toReport(u.href) : null, location: where(t.index) });
    }
    if (rels.includes('alternate') && t.attrs.hreflang) hreflang.push({ hreflang: t.attrs.hreflang, href });
    if (rels.includes('stylesheet')) stylesheets.push(href);
    if (rels.includes('preload') || rels.includes('icon') || rels.includes('apple-touch-icon') || rels.includes('manifest')) preloads.push(href);
  }

  // headings (body only, svg removed)
  const headings = [];
  const hRe = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi;
  while ((m = hRe.exec(body))) headings.push({ level: Number(m[1]), text: textOf(m[2]).slice(0, 120) });
  const headingSkips = [];
  let prev = 1; // the page start counts as level 1, so a first h2 is fine and a first h3 is a skip
  let prevText = '(page start)';
  for (const h of headings) {
    if (h.level > prev + 1) headingSkips.push({ from: prevText === '(page start)' ? '(page start)' : 'h' + prev, to: 'h' + h.level, text: h.text, after: prevText.slice(0, 80) });
    prev = h.level;
    prevText = h.text;
  }
  const h1Count = headings.filter((h) => h.level === 1).length;

  // images
  const images = [];
  for (const t of findTags(doc, ['img'])) {
    const src = t.attrs.src || t.attrs['data-src'] || (t.attrs.srcset || '').split(/\s+/)[0] || '';
    const hasAlt = 'alt' in t.attrs;
    const hasDims = !!(t.attrs.width && t.attrs.width.trim() && t.attrs.height && t.attrs.height.trim());
    images.push({ src: src.startsWith('data:') ? src.slice(0, 40) + '...' : src, alt: hasAlt ? t.attrs.alt : null, missingAlt: !hasAlt, emptyAlt: hasAlt && t.attrs.alt.trim() === '', missingDimensions: !hasDims, width: t.attrs.width ?? null, height: t.attrs.height ?? null, loading: t.attrs.loading ?? null });
  }

  // anchors
  const anchors = [];
  for (const t of findTags(doc, ['a'])) {
    const href = t.attrs.href;
    if (href === undefined || href === '' || href.startsWith('#')) continue;
    anchors.push({ href, rel: (t.attrs.rel || '').toLowerCase() });
  }

  // visible words: body text without scripts, styles, svg, noscript, template
  const visible = body.replace(/<(noscript|template)\b[\s\S]*?<\/\1\s*>/gi, ' ');
  const words = (textOf(visible).match(/[\p{L}\p{N}][\p{L}\p{N}'\u2019-]*/gu) || []).length;

  return {
    lang,
    viewport,
    title,
    titleLength: title === null ? null : charLen(title),
    titleCount: titles.length,
    titleLocation: titleEntry ? titleEntry.location : null,
    metaDescription: meta1('description'),
    metaDescriptionLength: meta1('description') === null ? null : charLen(meta1('description')),
    metaDescriptionCount: (metas.description || []).length,
    metaDescriptionLocation: metaLocations.description ? metaLocations.description[0] : null,
    metaRobots: meta1('robots'),
    metaGooglebot: meta1('googlebot'),
    canonical: canonicals.length ? canonicals[0].url : null,
    canonicalRaw: canonicals.length ? canonicals[0].raw : null,
    canonicalCount: canonicals.length,
    canonicalLocation: canonicals.length ? canonicals[0].location : null,
    hreflang,
    og: { title: meta1('og:title'), description: meta1('og:description'), image: meta1('og:image'), url: meta1('og:url'), type: meta1('og:type') },
    twitter: { card: meta1('twitter:card'), image: meta1('twitter:image'), title: meta1('twitter:title'), description: meta1('twitter:description') },
    keywordsMeta: meta1('keywords'),
    h1Count,
    headings,
    headingSkips,
    images,
    imagesMissingAlt: images.filter((i) => i.missingAlt).length,
    imagesEmptyAlt: images.filter((i) => i.emptyAlt).length,
    imagesMissingDimensions: images.filter((i) => i.missingDimensions).length,
    jsonLd,
    anchors,
    wordCount: words,
    resources: { scripts: scriptSrcs, stylesheets, otherLinks: preloads, images: images.map((i) => i.src).filter(Boolean) },
  };
}
function walkJsonLd(node, block, depth = 0) {
  if (depth > 50 || node === null || typeof node !== 'object') return;
  if (Array.isArray(node)) { for (const n of node) walkJsonLd(n, block, depth + 1); return; }
  const t = node['@type'];
  if (t) for (const x of [].concat(t)) block.types.push(String(x));
  if (typeof node['@id'] === 'string') {
    block.ids.push(node['@id']);
    if (t) block.definedIds.push(node['@id']);
  }
  for (const [k, v] of Object.entries(node)) if (k !== '@context') walkJsonLd(v, block, depth + 1);
}

// ---------------------------------------------------------------- main
async function main() {
  let args;
  try { args = parseArgs(process.argv.slice(2)); } catch (e) { console.error(e.message + '\n\n' + usage()); process.exit(2); }
  if (args.help) { console.log(usage()); return; }
  if (!args.base || !args.out) { console.error('--base and --out are required\n\n' + usage()); process.exit(2); }
  if (!Number.isFinite(args.maxPages) || args.maxPages < 1) { console.error('--max-pages must be a positive number'); process.exit(2); }

  const baseOrigin = new URL(args.base).origin;
  const prodOrigin = new URL(args.prodOrigin).origin;
  const prodHost = new URL(prodOrigin).hostname;
  const prodApex = prodHost.replace(/^www\./, '');
  const reqHeaders = { 'user-agent': DEFAULT_UA, accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' };
  for (const h of args.headers) {
    const i = h.indexOf(':');
    if (i <= 0) { console.error('Bad --header (expected "name: value"): ' + h); process.exit(2); }
    reqHeaders[h.slice(0, i).trim().toLowerCase()] = h.slice(i + 1).trim();
  }
  const outDir = path.resolve(args.out);
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const exceptionsPath = path.resolve(args.orphanExceptions || path.join(scriptDir, 'orphan-exceptions.json'));
  const startedAt = new Date();

  const toFetch = (u) => { const x = new URL(u); x.hash = ''; return x.origin === prodOrigin ? baseOrigin + x.pathname + x.search : x.href; };
  const toReport = (u) => { const x = new URL(u); x.hash = ''; return x.origin === baseOrigin ? prodOrigin + x.pathname + x.search : x.href; };
  const ctx = { toReport };

  let orphanExceptions = [];
  let orphanExceptionsError = null;
  try {
    const parsed = JSON.parse(await readFile(exceptionsPath, 'utf8'));
    orphanExceptions = (Array.isArray(parsed) ? parsed : []).map((e) => (typeof e === 'string' ? { url: e, reason: '' } : e));
  } catch (e) { orphanExceptionsError = String(e.message); }
  const exceptionSet = new Map(orphanExceptions.map((e) => [safeUrl(e.url, prodOrigin)?.href ?? e.url, e.reason || '']));

  // ------------------------------------------------ fetching
  let requestCount = 0;
  async function fetchWithRedirects(fetchUrl) {
    const chain = [];
    const seen = new Set();
    let current = fetchUrl;
    const t0 = Date.now();
    for (let hop = 0; hop <= THRESHOLDS.maxRedirectHops; hop++) {
      if (seen.has(current)) return { chain, loop: true, error: 'redirect loop', status: null, finalUrl: toReport(current), finalFetchUrl: current, ms: Date.now() - t0 };
      seen.add(current);
      let res;
      requestCount++;
      try {
        res = await fetch(current, { method: 'GET', redirect: 'manual', headers: reqHeaders, signal: AbortSignal.timeout(args.timeout) });
      } catch (e) {
        return { chain, error: String(e.cause?.code || e.cause?.message || e.name + ': ' + e.message), status: null, finalUrl: toReport(current), finalFetchUrl: current, ms: Date.now() - t0 };
      }
      const headers = {};
      for (const k of KEPT_RESPONSE_HEADERS) { const v = res.headers.get(k); if (v !== null) headers[k] = v; }
      const loc = res.headers.get('location');
      if (res.status >= 300 && res.status < 400 && loc) {
        try { await res.body?.cancel(); } catch { /* ignore */ }
        const nextAbs = new URL(loc, current).href;
        chain.push({ url: toReport(current), status: res.status, location: loc, xRobotsTag: headers['x-robots-tag'] ?? null });
        const mapped = toFetch(nextAbs);
        if (new URL(mapped).origin !== baseOrigin) {
          return { chain, offBase: true, status: null, finalUrl: toReport(nextAbs), finalFetchUrl: mapped, error: 'redirect leaves the --base host; not followed', ms: Date.now() - t0 };
        }
        current = mapped;
        continue;
      }
      const ct = res.headers.get('content-type') || '';
      let body = null;
      let truncated = false;
      if (/text\/|xml|json|javascript/i.test(ct) || ct === '') {
        try {
          body = await res.text();
          if (body.length > THRESHOLDS.maxBodyBytes) { body = body.slice(0, THRESHOLDS.maxBodyBytes); truncated = true; }
        } catch (e) {
          return { chain, error: 'body read failed: ' + e.message, status: res.status, headers, finalUrl: toReport(current), finalFetchUrl: current, ms: Date.now() - t0 };
        }
      } else {
        try { await res.body?.cancel(); } catch { /* ignore */ }
      }
      return { chain, status: res.status, headers, contentType: ct, body, truncated, finalUrl: toReport(current), finalFetchUrl: current, ms: Date.now() - t0 };
    }
    return { chain, error: 'more than ' + THRESHOLDS.maxRedirectHops + ' redirects', status: null, finalUrl: toReport(current), finalFetchUrl: current, ms: Date.now() - t0 };
  }

  const failures = [];

  // ------------------------------------------------ robots.txt
  const robotsRes = await fetchWithRedirects(baseOrigin + '/robots.txt');
  const robotsParsed = robotsRes.status === 200 && robotsRes.body ? parseRobots(robotsRes.body) : { groups: [], sitemaps: [], other: [] };
  if (robotsRes.error) failures.push({ url: prodOrigin + '/robots.txt', phase: 'robots', error: robotsRes.error });
  const robotsAgentRules = Object.fromEntries(ROBOTS_AGENTS.map((a) => [a, rulesFor(robotsParsed, a)]));
  const robotsCheck = (reportUrl) => {
    const u = new URL(reportUrl);
    const out = {};
    for (const a of ROBOTS_AGENTS) out[a] = robotsAllowed(robotsAgentRules[a], u.pathname + u.search);
    return out;
  };

  // ------------------------------------------------ sitemaps
  const sitemapQueue = [prodOrigin + '/sitemap.xml'];
  for (const s of robotsParsed.sitemaps) { const u = safeUrl(s, prodOrigin); if (u) sitemapQueue.push(u.href); }
  const sitemaps = [];
  const sitemapUrls = new Map(); // report url -> entry
  const sitemapSeen = new Set();
  while (sitemapQueue.length && sitemaps.length < 50) {
    const sUrl = toReport(sitemapQueue.shift());
    if (sitemapSeen.has(sUrl)) continue;
    sitemapSeen.add(sUrl);
    const r = await fetchWithRedirects(toFetch(sUrl));
    const rec = { url: sUrl, status: r.status, redirectChain: r.chain, contentType: r.contentType ?? null, xRobotsTag: r.headers?.['x-robots-tag'] ?? null, error: r.error ?? null, isIndex: false, urlCount: 0, children: [] };
    if (r.error) failures.push({ url: sUrl, phase: 'sitemap', error: r.error });
    if (r.status === 200 && r.body) {
      const p = parseSitemap(r.body);
      rec.isIndex = p.isIndex;
      rec.validRoot = p.isIndex || p.isUrlset;
      if (p.isIndex) {
        for (const e of p.entries) if (e.loc) { rec.children.push(e.loc); sitemapQueue.push(e.loc); }
      } else {
        rec.urlCount = p.entries.length;
        for (const e of p.entries) {
          if (!e.loc) continue;
          const u = safeUrl(e.loc, prodOrigin);
          if (!u) { failures.push({ url: sUrl, phase: 'sitemap', error: 'invalid <loc>: ' + e.loc }); continue; }
          const key = toReport(u.href);
          if (!sitemapUrls.has(key)) sitemapUrls.set(key, { ...e, loc: e.loc, url: key, sitemap: sUrl, duplicates: 0 });
          else sitemapUrls.get(key).duplicates++;
        }
      }
    }
    sitemaps.push(rec);
  }

  // ------------------------------------------------ crawl
  const discovered = new Map(); // report url -> { sources:Set }
  const queue = [];
  const entries = new Map(); // report url -> result
  const excluded = { api: new Map(), mailto: new Map(), tel: new Map(), external: new Map(), hostVariant: new Map(), nextAssets: new Map(), otherScheme: new Map(), invalid: new Map() };
  const resources = { images: new Set(), scripts: new Set(), stylesheets: new Set(), otherLinks: new Set() };
  const edges = []; // { from, to, rel }
  const addExcluded = (bucket, url, from) => {
    const m = excluded[bucket];
    if (!m.has(url)) m.set(url, new Set());
    const s = m.get(url);
    if (s.size < 5) s.add(from);
  };
  const enqueue = (reportUrl, source) => {
    if (!discovered.has(reportUrl)) { discovered.set(reportUrl, { sources: new Set() }); queue.push(reportUrl); }
    discovered.get(reportUrl).sources.add(source);
  };
  // classify a link found on a page; returns report url when it is a crawlable internal URL
  const classify = (href, pageFetchUrl, pageReportUrl) => {
    const u = safeUrl(href, pageFetchUrl);
    if (!u) { addExcluded('invalid', href, pageReportUrl); return null; }
    const proto = u.protocol;
    if (proto === 'mailto:') { addExcluded('mailto', '<redacted mailto>', pageReportUrl); return null; }
    if (proto === 'tel:') { addExcluded('tel', u.href, pageReportUrl); return null; }
    if (proto !== 'http:' && proto !== 'https:') { addExcluded('otherScheme', u.href.slice(0, 80), pageReportUrl); return null; }
    u.hash = '';
    const internal = u.origin === baseOrigin || u.origin === prodOrigin;
    if (!internal) {
      if (u.hostname === prodHost || u.hostname === prodApex || u.hostname === 'www.' + prodApex) { addExcluded('hostVariant', u.href, pageReportUrl); return null; }
      addExcluded('external', u.href, pageReportUrl);
      return null;
    }
    const rep = toReport(u.href);
    const p = new URL(rep).pathname;
    if (p === '/api' || p.startsWith('/api/')) { addExcluded('api', rep, pageReportUrl); return null; }
    if (p.startsWith('/_next/')) { addExcluded('nextAssets', rep, pageReportUrl); return null; }
    return rep;
  };

  enqueue(prodOrigin + '/', 'seed');
  for (const k of sitemapUrls.keys()) {
    const p = new URL(k).pathname;
    if (new URL(k).origin !== prodOrigin) { addExcluded('external', k, 'sitemap'); continue; }
    if (p === '/api' || p.startsWith('/api/')) { addExcluded('api', k, 'sitemap'); continue; }
    enqueue(k, 'sitemap');
  }

  let reserved = 0;
  let inFlight = 0;
  let limitReached = false;
  async function processUrl(key) {
    const r = await fetchWithRedirects(toFetch(key));
    const entry = {
      url: key,
      fetchedUrl: toFetch(key),
      status: r.chain.length ? r.chain[0].status : r.status,
      finalStatus: r.status,
      redirectChain: r.chain,
      finalUrl: r.finalUrl,
      redirectOffBase: !!r.offBase,
      redirectLoop: !!r.loop,
      contentType: r.contentType ?? null,
      xRobotsTag: r.headers?.['x-robots-tag'] ?? null,
      responseHeaders: r.headers ?? {},
      timeMs: r.ms,
      error: r.error ?? null,
      bodyTruncated: !!r.truncated,
      analyzed: false,
    };
    entries.set(key, entry);
    if (r.error) failures.push({ url: key, phase: 'crawl', error: r.error });
    if (r.chain.length && !r.offBase && !r.loop && r.status !== null) {
      const fp = new URL(r.finalUrl).pathname;
      if (!(fp === '/api' || fp.startsWith('/api/'))) enqueue(r.finalUrl, 'redirect');
    }
    const isHtml = /text\/html|application\/xhtml/i.test(entry.contentType || '');
    if (!r.chain.length && r.status === 200 && isHtml && r.body) {
      const a = analyzeHtml(r.body, entry.fetchedUrl, ctx);
      entry.analyzed = true;
      Object.assign(entry, a);
      const outLinks = new Set();
      for (const an of a.anchors) {
        const rep = classify(an.href, entry.fetchedUrl, key);
        if (!rep) continue;
        edges.push({ from: key, to: rep, nofollow: /\bnofollow\b/.test(an.rel) });
        outLinks.add(rep);
        enqueue(rep, 'link');
      }
      entry.internalLinksOut = [...outLinks];
      entry.internalLinksOutCount = outLinks.size;
      for (const s of a.resources.images) { const u = safeUrl(s, entry.fetchedUrl); if (u) resources.images.add(toReport(u.href)); }
      for (const s of a.resources.scripts) { const u = safeUrl(s, entry.fetchedUrl); if (u) resources.scripts.add(toReport(u.href)); }
      for (const s of a.resources.stylesheets) { const u = safeUrl(s, entry.fetchedUrl); if (u) resources.stylesheets.add(toReport(u.href)); }
      for (const s of a.resources.otherLinks) { const u = safeUrl(s, entry.fetchedUrl); if (u) resources.otherLinks.add(toReport(u.href)); }
      delete entry.anchors;
      delete entry.resources;
    }
  }
  const worker = async () => {
    for (;;) {
      if (reserved >= args.maxPages) { if (queue.length) limitReached = true; return; }
      const key = queue.shift();
      if (key === undefined) { if (inFlight === 0) return; await sleep(25); continue; }
      reserved++;
      inFlight++;
      try { await processUrl(key); } catch (e) { failures.push({ url: key, phase: 'crawl', error: 'checker exception: ' + e.message }); }
      finally { inFlight--; }
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, args.concurrency) }, worker));
  const notCrawled = queue.slice();
  if (notCrawled.length) limitReached = true;

  // ------------------------------------------------ helpers over results
  const resolveFinal = (url) => { const e = entries.get(url); if (!e) return null; return e.redirectChain.length && !e.redirectOffBase && !e.redirectLoop ? entries.get(e.finalUrl) || null : e; };
  const pages = [...entries.values()].filter((e) => e.analyzed);
  for (const p of pages) {
    p.robots = robotsCheck(p.url);
    p.noindex = hasNoindex(p.metaRobots) || hasNoindex(p.metaGooglebot) || hasNoindex(p.xRobotsTag);
    p.canonicalIsSelf = p.canonical ? p.canonical === p.url : null;
    p.indexable = !p.noindex && p.robots['*'].allowed && p.robots.googlebot.allowed && (p.canonical === null || p.canonicalIsSelf);
  }

  // canonical targets not crawled -> extra fetch
  const extraFetches = [];
  const canonTargets = new Map();
  for (const p of pages) {
    if (!p.canonical || p.canonicalIsSelf) continue;
    if (canonTargets.has(p.canonical)) continue;
    const known = entries.get(p.canonical);
    if (known) { canonTargets.set(p.canonical, { status: known.status, finalStatus: known.finalStatus, redirectChain: known.redirectChain, source: 'crawl' }); continue; }
    const cu = new URL(p.canonical);
    if (cu.origin !== prodOrigin) { canonTargets.set(p.canonical, { status: null, error: 'canonical points to another host; not fetched', source: 'skipped' }); continue; }
    const r = await fetchWithRedirects(toFetch(p.canonical));
    const rec = { status: r.chain.length ? r.chain[0].status : r.status, finalStatus: r.status, redirectChain: r.chain, error: r.error ?? null, source: 'extra' };
    canonTargets.set(p.canonical, rec);
    extraFetches.push({ purpose: 'canonical-target', url: p.canonical, ...rec });
  }

  // 404 probes
  const probes = [];
  if (args.probe404) {
    for (const pth of args.probes || DEFAULT_404_PROBES) {
      const rep = prodOrigin + (pth.startsWith('/') ? pth : '/' + pth);
      const r = await fetchWithRedirects(toFetch(rep));
      let info = {};
      if (r.status && r.body && /text\/html/i.test(r.contentType || '')) {
        const a = analyzeHtml(r.body, toFetch(rep), ctx);
        info = { title: a.title, metaRobots: a.metaRobots, canonical: a.canonical, h1: a.headings.filter((h) => h.level === 1).map((h) => h.text) };
      }
      const rec = { url: rep, status: r.chain.length ? r.chain[0].status : r.status, finalStatus: r.status, redirectChain: r.chain, xRobotsTag: r.headers?.['x-robots-tag'] ?? null, error: r.error ?? null, ...info };
      probes.push(rec);
      extraFetches.push({ purpose: '404-probe', ...rec });
    }
  }

  // ------------------------------------------------ rules
  const rules = [];
  const addRule = (id, scope, description, passItems, failItems, extra = {}) => {
    rules.push({ id, scope, description, pass: passItems, fail: failItems.length, items: failItems, ...extra });
  };
  const fetched = [...entries.values()];

  // TECH
  addRule('TECH-FETCH-ERROR', 'url', 'Crawled internal URL fetched without network/timeout error', fetched.filter((e) => !e.error).length,
    fetched.filter((e) => e.error).map((e) => ({ url: e.url, error: e.error })));
  addRule('TECH-STATUS', 'url', 'Crawled internal URL ends in HTTP 200 (after redirects)', fetched.filter((e) => e.finalStatus === 200).length,
    fetched.filter((e) => e.finalStatus !== 200).map((e) => ({ url: e.url, status: e.status, finalStatus: e.finalStatus, finalUrl: e.finalUrl, error: e.error })));
  addRule('TECH-REDIRECT', 'url', 'Crawled internal URL answers without a redirect', fetched.filter((e) => !e.redirectChain.length).length,
    fetched.filter((e) => e.redirectChain.length).map((e) => ({ url: e.url, chain: e.redirectChain.map((c) => c.status + ' ' + c.url).join(' -> ') + ' -> ' + (e.finalStatus ?? 'n/a') + ' ' + e.finalUrl })));
  addRule('TECH-REDIRECT-CHAIN', 'url', 'Redirecting URL reaches its target in one hop (no chains, loops or off-host redirects)',
    fetched.filter((e) => e.redirectChain.length === 1 && !e.redirectLoop && !e.redirectOffBase).length,
    fetched.filter((e) => e.redirectChain.length > 1 || e.redirectLoop || e.redirectOffBase).map((e) => ({ url: e.url, hops: e.redirectChain.length, loop: e.redirectLoop, offBase: e.redirectOffBase, finalUrl: e.finalUrl })));
  const nonHtml = fetched.filter((e) => !e.redirectChain.length && e.finalStatus === 200 && !/text\/html|application\/xhtml/i.test(e.contentType || ''));
  addRule('TECH-CONTENT-TYPE', 'url', 'Crawled internal 200 URL linked as a page is text/html (non-HTML targets listed)', fetched.filter((e) => e.finalStatus === 200 && !e.redirectChain.length).length - nonHtml.length,
    nonHtml.map((e) => ({ url: e.url, contentType: e.contentType })));
  addRule('TECH-404', 'probe', 'Non-existent URL returns HTTP 404 (not 200 soft 404, not a redirect)', probes.filter((p) => p.status === 404).length,
    probes.filter((p) => p.status !== 404).map((p) => ({ url: p.url, status: p.status, finalStatus: p.finalStatus, title: p.title ?? null, metaRobots: p.metaRobots ?? null, error: p.error })));
  addRule('TECH-404-NOINDEX', 'probe', 'Error page served for a non-existent URL is not indexable (404 status or noindex)', probes.filter((p) => p.status === 404 || hasNoindex(p.metaRobots) || hasNoindex(p.xRobotsTag)).length,
    probes.filter((p) => !(p.status === 404 || hasNoindex(p.metaRobots) || hasNoindex(p.xRobotsTag))).map((p) => ({ url: p.url, status: p.status })));
  addRule('TECH-404-CANONICAL', 'probe', 'Error page for a non-existent URL does not declare a canonical to another page', probes.filter((p) => !p.canonical).length,
    probes.filter((p) => p.canonical).map((p) => ({ url: p.url, status: p.status, canonical: p.canonical })));

  // INDEX
  addRule('INDEX-META-ROBOTS', 'page', 'Page has no noindex in meta robots/googlebot', pages.filter((p) => !hasNoindex(p.metaRobots) && !hasNoindex(p.metaGooglebot)).length,
    pages.filter((p) => hasNoindex(p.metaRobots) || hasNoindex(p.metaGooglebot)).map((p) => ({ url: p.url, metaRobots: p.metaRobots, metaGooglebot: p.metaGooglebot })));
  addRule('INDEX-XROBOTS', 'page', 'Page has no noindex in the X-Robots-Tag header', pages.filter((p) => !hasNoindex(p.xRobotsTag)).length,
    pages.filter((p) => hasNoindex(p.xRobotsTag)).map((p) => ({ url: p.url, xRobotsTag: p.xRobotsTag })));
  addRule('INDEX-ROBOTS-BLOCKED', 'page', 'Crawled page is allowed by robots.txt for * and Googlebot', pages.filter((p) => p.robots['*'].allowed && p.robots.googlebot.allowed).length,
    pages.filter((p) => !(p.robots['*'].allowed && p.robots.googlebot.allowed)).map((p) => ({ url: p.url, star: p.robots['*'].rule, googlebot: p.robots.googlebot.rule })));

  // CANON
  const withCanon = pages.filter((p) => p.canonical);
  addRule('CANON-MISSING', 'page', 'Page declares a rel=canonical', withCanon.length, pages.filter((p) => !p.canonical).map((p) => ({ url: p.url })));
  addRule('CANON-MULTI', 'page', 'Page declares at most one rel=canonical', pages.filter((p) => p.canonicalCount <= 1).length,
    pages.filter((p) => p.canonicalCount > 1).map((p) => ({ url: p.url, count: p.canonicalCount })));
  addRule('CANON-HOST', 'page', 'Canonical is an absolute https URL on the production host', withCanon.filter((p) => /^https:\/\//i.test(p.canonicalRaw) && new URL(p.canonical).origin === prodOrigin).length,
    withCanon.filter((p) => !(/^https:\/\//i.test(p.canonicalRaw) && new URL(p.canonical).origin === prodOrigin)).map((p) => ({ url: p.url, canonicalRaw: p.canonicalRaw })));
  addRule('CANON-SELF', 'page', 'Canonical points to the page itself', withCanon.filter((p) => p.canonicalIsSelf).length,
    withCanon.filter((p) => !p.canonicalIsSelf).map((p) => ({ url: p.url, canonical: p.canonical })));
  const canonBad = (t) => !t || t.status !== 200;
  addRule('CANON-TARGET-STATUS', 'page', 'Canonical target answers HTTP 200 without redirect', withCanon.filter((p) => p.canonicalIsSelf || !canonBad(canonTargets.get(p.canonical))).length,
    withCanon.filter((p) => !p.canonicalIsSelf && canonBad(canonTargets.get(p.canonical))).map((p) => { const t = canonTargets.get(p.canonical) || {}; return { url: p.url, canonical: p.canonical, status: t.status ?? null, finalStatus: t.finalStatus ?? null, error: t.error ?? null }; }));
  addRule('CANON-IN-HEAD', 'page', 'Canonical link is in <head> (not streamed into <body>)', withCanon.filter((p) => p.canonicalLocation === 'head').length,
    withCanon.filter((p) => p.canonicalLocation !== 'head').map((p) => ({ url: p.url, location: p.canonicalLocation })));

  // ONPAGE
  addRule('ONPAGE-TITLE-MISSING', 'page', 'Page has a non-empty <title>', pages.filter((p) => p.title).length, pages.filter((p) => !p.title).map((p) => ({ url: p.url })));
  addRule('ONPAGE-TITLE-MULTI', 'page', 'Page has exactly one <title> (svg titles excluded)', pages.filter((p) => p.titleCount <= 1).length,
    pages.filter((p) => p.titleCount > 1).map((p) => ({ url: p.url, count: p.titleCount })));
  addRule('ONPAGE-TITLE-LENGTH', 'page', 'Title length ' + THRESHOLDS.titleMin + '-' + THRESHOLDS.titleMax + ' characters (heuristic)',
    pages.filter((p) => p.title && p.titleLength >= THRESHOLDS.titleMin && p.titleLength <= THRESHOLDS.titleMax).length,
    pages.filter((p) => p.title && (p.titleLength < THRESHOLDS.titleMin || p.titleLength > THRESHOLDS.titleMax)).map((p) => ({ url: p.url, length: p.titleLength, title: p.title })));
  addRule('ONPAGE-DESC-MISSING', 'page', 'Page has a non-empty meta description', pages.filter((p) => p.metaDescription).length, pages.filter((p) => !p.metaDescription).map((p) => ({ url: p.url })));
  addRule('ONPAGE-DESC-LENGTH', 'page', 'Meta description length ' + THRESHOLDS.descMin + '-' + THRESHOLDS.descMax + ' characters (heuristic)',
    pages.filter((p) => p.metaDescription && p.metaDescriptionLength >= THRESHOLDS.descMin && p.metaDescriptionLength <= THRESHOLDS.descMax).length,
    pages.filter((p) => p.metaDescription && (p.metaDescriptionLength < THRESHOLDS.descMin || p.metaDescriptionLength > THRESHOLDS.descMax)).map((p) => ({ url: p.url, length: p.metaDescriptionLength, description: p.metaDescription })));
  const indexablePages = pages.filter((p) => p.indexable);
  const dupGroups = (field) => {
    const m = new Map();
    for (const p of indexablePages) { const v = p[field]; if (!v) continue; const k = v.toLowerCase(); if (!m.has(k)) m.set(k, { value: v, urls: [] }); m.get(k).urls.push(p.url); }
    return [...m.values()].filter((g) => g.urls.length > 1);
  };
  const titleDups = dupGroups('title');
  const descDups = dupGroups('metaDescription');
  const inGroups = (groups) => new Set(groups.flatMap((g) => g.urls));
  addRule('ONPAGE-TITLE-DUP', 'site', 'Indexable page title is unique across indexable pages', indexablePages.filter((p) => p.title && !inGroups(titleDups).has(p.url)).length,
    titleDups.map((g) => ({ title: g.value, urls: g.urls })), { failUnit: 'groups', failPages: inGroups(titleDups).size });
  addRule('ONPAGE-DESC-DUP', 'site', 'Indexable page meta description is unique across indexable pages', indexablePages.filter((p) => p.metaDescription && !inGroups(descDups).has(p.url)).length,
    descDups.map((g) => ({ description: g.value, urls: g.urls })), { failUnit: 'groups', failPages: inGroups(descDups).size });
  addRule('ONPAGE-META-IN-HEAD', 'page', 'Title and meta description are in <head> (not streamed into <body>)',
    pages.filter((p) => (!p.title || p.titleLocation === 'head') && (!p.metaDescription || p.metaDescriptionLocation === 'head')).length,
    pages.filter((p) => !((!p.title || p.titleLocation === 'head') && (!p.metaDescription || p.metaDescriptionLocation === 'head'))).map((p) => ({ url: p.url, titleLocation: p.titleLocation, descriptionLocation: p.metaDescriptionLocation })));
  addRule('ONPAGE-H1', 'page', 'Page has exactly one H1', pages.filter((p) => p.h1Count === 1).length,
    pages.filter((p) => p.h1Count !== 1).map((p) => ({ url: p.url, h1Count: p.h1Count, h1: p.headings.filter((h) => h.level === 1).map((h) => h.text) })));
  addRule('ONPAGE-HEADING-ORDER', 'page', 'Heading levels never skip (e.g. h2 -> h4); page start counts as h1', pages.filter((p) => !p.headingSkips.length).length,
    pages.filter((p) => p.headingSkips.length).map((p) => ({ url: p.url, skips: p.headingSkips })));
  addRule('ONPAGE-LANG', 'page', '<html> has a lang attribute', pages.filter((p) => p.lang).length, pages.filter((p) => !p.lang).map((p) => ({ url: p.url })));
  addRule('CONTENT-WORDS-LOW', 'page', 'Visible text has at least ' + THRESHOLDS.minWords + ' words (heuristic flag for thin pages; raw HTML, no JS)',
    pages.filter((p) => p.wordCount >= THRESHOLDS.minWords).length,
    pages.filter((p) => p.wordCount < THRESHOLDS.minWords).map((p) => ({ url: p.url, words: p.wordCount })));

  // SOCIAL
  const socialRule = (id, label, get) => addRule(id, 'page', 'Page has ' + label, pages.filter((p) => get(p)).length, pages.filter((p) => !get(p)).map((p) => ({ url: p.url })));
  socialRule('SOCIAL-OG-TITLE', 'og:title', (p) => p.og.title);
  socialRule('SOCIAL-OG-DESC', 'og:description', (p) => p.og.description);
  socialRule('SOCIAL-OG-IMAGE', 'og:image', (p) => p.og.image);
  socialRule('SOCIAL-OG-URL', 'og:url', (p) => p.og.url);
  socialRule('SOCIAL-TWITTER-CARD', 'twitter:card', (p) => p.twitter.card);
  socialRule('SOCIAL-TWITTER-IMAGE', 'twitter:image', (p) => p.twitter.image);
  const ogMatch = pages.filter((p) => p.og.url && p.canonical);
  const sameUrl = (a, b) => { const x = safeUrl(a, prodOrigin); const y = safeUrl(b, prodOrigin); return x && y && x.href === y.href; };
  addRule('SOCIAL-OG-URL-MATCH', 'page', 'og:url equals the canonical URL (pages that have both)', ogMatch.filter((p) => sameUrl(p.og.url, p.canonical)).length,
    ogMatch.filter((p) => !sameUrl(p.og.url, p.canonical)).map((p) => ({ url: p.url, ogUrl: p.og.url, canonical: p.canonical })));

  // IMG (per image instance)
  const allImgs = pages.flatMap((p) => p.images.map((i) => ({ page: p.url, ...i })));
  const imgFail = (pred) => allImgs.filter(pred).map((i) => ({ url: i.page, src: i.src }));
  const uniq = (arr) => new Set(arr.map((x) => x.src)).size;
  const altFails = imgFail((i) => i.missingAlt);
  const dimFails = imgFail((i) => i.missingDimensions);
  addRule('IMG-ALT', 'image', '<img> has an alt attribute (empty alt counted as decorative pass)', allImgs.length - altFails.length, altFails, { failUnit: 'image instances', uniqueFailingSrc: uniq(altFails) });
  addRule('IMG-DIMENSIONS', 'image', '<img> has width and height attributes (next/image fill output has none)', allImgs.length - dimFails.length, dimFails, { failUnit: 'image instances', uniqueFailingSrc: uniq(dimFails) });

  // SCHEMA
  const allBlocks = pages.flatMap((p) => p.jsonLd.map((b) => ({ page: p.url, ...b })));
  addRule('SCHEMA-PARSE', 'jsonld', 'JSON-LD block parses as JSON', allBlocks.filter((b) => b.ok).length,
    allBlocks.filter((b) => !b.ok).map((b) => ({ url: b.page, block: b.index, error: b.error })), { failUnit: 'blocks' });
  addRule('SCHEMA-PRESENT', 'page', 'Page has at least one JSON-LD block', pages.filter((p) => p.jsonLd.length).length, pages.filter((p) => !p.jsonLd.length).map((p) => ({ url: p.url })));
  const idDupPages = pages.map((p) => {
    const counts = new Map();
    for (const b of p.jsonLd) for (const id of b.definedIds) counts.set(id, (counts.get(id) || 0) + 1);
    return { url: p.url, dups: [...counts.entries()].filter(([, n]) => n > 1).map(([id, n]) => ({ id, count: n })) };
  });
  addRule('SCHEMA-ID-DUP', 'page', 'No @id is defined (node with @type) more than once on the same page', idDupPages.filter((x) => !x.dups.length).length,
    idDupPages.filter((x) => x.dups.length));

  // LINKS
  const uniqEdges = new Map();
  for (const e of edges) { const k = e.from + ' -> ' + e.to; if (!uniqEdges.has(k)) uniqEdges.set(k, e); }
  const edgeList = [...uniqEdges.values()];
  const broken = [];
  const redirected = [];
  const unchecked = [];
  let okEdges = 0;
  for (const e of edgeList) {
    const t = entries.get(e.to);
    if (!t) { unchecked.push({ from: e.from, to: e.to }); continue; }
    if (t.finalStatus !== 200) broken.push({ from: e.from, to: e.to, status: t.status, finalStatus: t.finalStatus, error: t.error });
    else okEdges++;
    if (t.redirectChain.length) redirected.push({ from: e.from, to: e.to, finalUrl: t.finalUrl, status: t.status });
  }
  addRule('LINK-BROKEN', 'link', 'Internal link (unique source -> target) resolves to HTTP 200', okEdges, broken, { notChecked: unchecked.length, failUnit: 'links' });
  addRule('LINK-REDIRECT', 'link', 'Internal link points directly at the final URL (no redirect)', edgeList.length - unchecked.length - redirected.length, redirected, { failUnit: 'links' });
  const variantLinks = [...excluded.hostVariant.entries()].map(([url, from]) => ({ to: url, from: [...from] }));
  addRule('LINK-HOST-VARIANT', 'link', 'Absolute internal links use the canonical origin (' + prodOrigin + ')', null, variantLinks, { failUnit: 'unique target URLs', note: 'pass count not applicable' });

  // inbound + orphans
  const inbound = new Map();
  for (const e of edgeList) {
    const target = resolveFinal(e.to);
    const tUrl = target ? target.url : e.to;
    if (tUrl === e.from) continue;
    if (!inbound.has(tUrl)) inbound.set(tUrl, new Set());
    inbound.get(tUrl).add(e.from);
  }
  for (const p of pages) p.inboundInternalLinks = inbound.has(p.url) ? inbound.get(p.url).size : 0;
  const orphans = indexablePages.filter((p) => !p.inboundInternalLinks);
  const orphanFail = orphans.filter((p) => !exceptionSet.has(p.url));
  const orphanExcepted = orphans.filter((p) => exceptionSet.has(p.url)).map((p) => ({ url: p.url, reason: exceptionSet.get(p.url) }));
  addRule('LINK-ORPHAN', 'page', 'Indexable 200 page has at least one inbound internal link from another crawled page', indexablePages.length - orphans.length,
    orphanFail.map((p) => ({ url: p.url, discoveredVia: [...(discovered.get(p.url)?.sources || [])] })), { excepted: orphanExcepted });

  // SITEMAP
  const smList = [...sitemapUrls.values()];
  const smEntry = (u) => entries.get(u);
  addRule('SITEMAP-FETCH', 'sitemap', 'Sitemap file returns 200 with a <urlset> or <sitemapindex> root', sitemaps.filter((s) => s.status === 200 && s.validRoot).length,
    sitemaps.filter((s) => !(s.status === 200 && s.validRoot)).map((s) => ({ url: s.url, status: s.status, error: s.error })));
  addRule('SITEMAP-HOST', 'sitemap', 'Sitemap <loc> is https on the production host', smList.filter((s) => new URL(s.url).origin === prodOrigin && /^https:/i.test(s.loc)).length,
    smList.filter((s) => !(new URL(s.url).origin === prodOrigin && /^https:/i.test(s.loc))).map((s) => ({ loc: s.loc })));
  addRule('SITEMAP-DUP', 'sitemap', 'Sitemap <loc> appears once', smList.filter((s) => !s.duplicates).length, smList.filter((s) => s.duplicates).map((s) => ({ loc: s.loc, extraCopies: s.duplicates })));
  const smChecked = smList.filter((s) => smEntry(s.url));
  const smNotChecked = smList.filter((s) => !smEntry(s.url)).map((s) => s.url);
  addRule('SITEMAP-URL-STATUS', 'sitemap', 'Sitemap URL answers HTTP 200 directly', smChecked.filter((s) => smEntry(s.url).status === 200).length,
    smChecked.filter((s) => smEntry(s.url).status !== 200).map((s) => ({ url: s.url, status: smEntry(s.url).status, finalStatus: smEntry(s.url).finalStatus, finalUrl: smEntry(s.url).finalUrl })), { notChecked: smNotChecked.length });
  addRule('SITEMAP-URL-REDIRECT', 'sitemap', 'Sitemap URL is not redirected', smChecked.filter((s) => !smEntry(s.url).redirectChain.length).length,
    smChecked.filter((s) => smEntry(s.url).redirectChain.length).map((s) => ({ url: s.url, finalUrl: smEntry(s.url).finalUrl })));
  const smPages = smChecked.map((s) => smEntry(s.url)).filter((e) => e.analyzed);
  addRule('SITEMAP-URL-NOINDEX', 'sitemap', 'Sitemap URL is not noindex (meta or header)', smPages.filter((p) => !p.noindex).length, smPages.filter((p) => p.noindex).map((p) => ({ url: p.url, metaRobots: p.metaRobots, xRobotsTag: p.xRobotsTag })));
  addRule('SITEMAP-URL-NONCANONICAL', 'sitemap', 'Sitemap URL is its own canonical', smPages.filter((p) => p.canonicalIsSelf).length,
    smPages.filter((p) => !p.canonicalIsSelf).map((p) => ({ url: p.url, canonical: p.canonical })));
  addRule('SITEMAP-URL-ROBOTS', 'sitemap', 'Sitemap URL is allowed by robots.txt for * and Googlebot', smList.filter((s) => { const r = robotsCheck(s.url); return r['*'].allowed && r.googlebot.allowed; }).length,
    smList.filter((s) => { const r = robotsCheck(s.url); return !(r['*'].allowed && r.googlebot.allowed); }).map((s) => ({ url: s.url })));
  const futureLimit = Date.now() + THRESHOLDS.lastmodFutureToleranceHours * 3600 * 1000;
  addRule('SITEMAP-LASTMOD', 'sitemap', 'Sitemap <lastmod> is a valid date not in the future (tolerance ' + THRESHOLDS.lastmodFutureToleranceHours + ' h, host clock)',
    smList.filter((s) => s.lastmod && !Number.isNaN(Date.parse(s.lastmod)) && Date.parse(s.lastmod) <= futureLimit).length,
    smList.filter((s) => !(s.lastmod && !Number.isNaN(Date.parse(s.lastmod)) && Date.parse(s.lastmod) <= futureLimit)).map((s) => ({ url: s.url, lastmod: s.lastmod })));
  const smSet = new Set(smList.map((s) => s.url));
  addRule('SITEMAP-COVERAGE', 'sitemap', 'Indexable crawled page is listed in the sitemap', indexablePages.filter((p) => smSet.has(p.url)).length,
    indexablePages.filter((p) => !smSet.has(p.url)).map((p) => ({ url: p.url })));

  // ROBOTS
  addRule('ROBOTS-FETCH', 'robots', 'robots.txt returns 200 text/plain without redirect', robotsRes.status === 200 && !robotsRes.chain.length && /text\/plain/i.test(robotsRes.contentType || '') ? 1 : 0,
    robotsRes.status === 200 && !robotsRes.chain.length && /text\/plain/i.test(robotsRes.contentType || '') ? [] : [{ status: robotsRes.status, contentType: robotsRes.contentType ?? null, error: robotsRes.error ?? null }]);
  const smDeclared = robotsParsed.sitemaps.map((s) => ({ sitemap: s, ok: (safeUrl(s, prodOrigin)?.origin === prodOrigin) && sitemaps.some((x) => x.url === toReport(safeUrl(s, prodOrigin).href) && x.status === 200) }));
  addRule('ROBOTS-SITEMAP', 'robots', 'robots.txt declares at least one Sitemap on the production host that returns 200', smDeclared.filter((s) => s.ok).length ? 1 : 0,
    smDeclared.filter((s) => s.ok).length ? smDeclared.filter((s) => !s.ok) : [{ declared: robotsParsed.sitemaps }]);

  // CRAWL
  addRule('CRAWL-LIMIT', 'crawl', 'Crawl finished before --max-pages (' + args.maxPages + ')', limitReached ? 0 : 1, limitReached ? notCrawled.map((u) => ({ url: u })) : []);
  addRule('CRAWL-SITEMAP-COVERED', 'crawl', 'Every sitemap URL was fetched by the crawl', smChecked.length, smNotChecked.map((u) => ({ url: u })));

  // ------------------------------------------------ output
  const finishedAt = new Date();
  const redactedHeaders = Object.fromEntries(Object.entries(reqHeaders).map(([k, v]) => [k, SAFE_HEADER_VALUES.has(k) ? v : '<redacted>']));
  const mapToList = (m) => [...m.entries()].map(([url, from]) => ({ url, from: [...from] }));
  const results = {
    meta: {
      tool: 'scripts/seo/check-seo.mjs',
      checkerVersion: CHECKER_VERSION,
      node: process.version,
      startedAt: startedAt.toISOString(),
      finishedAt: finishedAt.toISOString(),
      clockNote: 'Host clock; see DECISION-LOG D-004 (host about 5 h 30 min behind real UTC).',
      base: baseOrigin,
      prodOrigin,
      reportingNote: baseOrigin === prodOrigin ? 'Crawled production directly.' : 'URLs on ' + prodOrigin + ' were fetched from ' + baseOrigin + '; all URLs are reported in production form.',
      requestHeaders: redactedHeaders,
      maxPages: args.maxPages,
      concurrency: args.concurrency,
      timeoutMs: args.timeout,
      thresholds: THRESHOLDS,
      requestCount,
      orphanExceptionsFile: exceptionsPath,
      orphanExceptionsError,
      method: 'GET only, redirect: manual (each hop recorded), raw HTML without JavaScript execution. robots.txt rules are evaluated and reported but not obeyed for fetching (own-site audit). /api/ links are never fetched.',
    },
    counts: {
      discovered: discovered.size,
      crawled: entries.size,
      analyzedHtmlPages: pages.length,
      indexablePages: indexablePages.length,
      sitemapUrls: smList.length,
      internalLinkEdges: edgeList.length,
      extraFetches: extraFetches.length,
      failures: failures.length,
    },
    rules: rules.map((r) => ({ ...r, status: r.fail ? 'FAIL' : 'PASS' })),
    robots: { url: prodOrigin + '/robots.txt', status: robotsRes.status, redirectChain: robotsRes.chain, contentType: robotsRes.contentType ?? null, xRobotsTag: robotsRes.headers?.['x-robots-tag'] ?? null, body: robotsRes.body ?? null, parsed: robotsParsed, evaluatedAgents: ROBOTS_AGENTS },
    sitemaps,
    sitemapUrls: smList,
    pages: fetched,
    extraFetches,
    site: {
      duplicateTitles: titleDups,
      duplicateDescriptions: descDups,
      missingCanonicals: pages.filter((p) => !p.canonical).map((p) => p.url),
      canonicalNotSelf: withCanon.filter((p) => !p.canonicalIsSelf).map((p) => ({ url: p.url, canonical: p.canonical })),
      noindexPages: pages.filter((p) => p.noindex).map((p) => p.url),
      orphans: orphanFail.map((p) => p.url),
      orphanExcepted,
      brokenLinks: broken,
      redirectedLinks: redirected,
      linksToUncrawledTargets: unchecked,
    },
    crawl: {
      seeds: [prodOrigin + '/', 'every sitemap <loc>'],
      limitReached,
      notCrawledDueToLimit: notCrawled,
      discoveredVia: Object.fromEntries([...discovered.entries()].map(([u, d]) => [u, [...d.sources]])),
      excluded: {
        api: mapToList(excluded.api),
        mailto: mapToList(excluded.mailto),
        tel: mapToList(excluded.tel),
        external: mapToList(excluded.external),
        hostVariant: mapToList(excluded.hostVariant),
        nextAssets: mapToList(excluded.nextAssets),
        otherScheme: mapToList(excluded.otherScheme),
        invalid: mapToList(excluded.invalid),
      },
      resourcesNotFetched: {
        note: 'Images, scripts, stylesheets, icons and preloads referenced by pages are recorded but not fetched.',
        images: [...resources.images],
        scripts: [...resources.scripts],
        stylesheets: [...resources.stylesheets],
        otherLinks: [...resources.otherLinks],
      },
      failures,
    },
  };

  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2), 'utf8');
  const summaryPath = path.join(outDir, 'summary.md');
  await writeFile(summaryPath, renderSummary(results), 'utf8');
  console.log(summaryPath);
}

// ---------------------------------------------------------------- summary
function renderSummary(r) {
  const L = [];
  const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
  const m = r.meta;
  L.push('# SEO checker summary', '');
  L.push('- Tool: `' + m.tool + '` v' + m.checkerVersion + ', Node ' + m.node);
  L.push('- Base: ' + m.base + ' (reported as ' + m.prodOrigin + ')');
  L.push('- Started: ' + m.startedAt + ', finished: ' + m.finishedAt + ' (' + m.clockNote + ')');
  L.push('- Request headers: ' + Object.entries(m.requestHeaders).map(([k, v]) => '`' + k + ': ' + v + '`').join(', '));
  L.push('- Limits: max pages ' + m.maxPages + ', concurrency ' + m.concurrency + ', timeout ' + m.timeoutMs + ' ms, max redirect hops ' + m.thresholds.maxRedirectHops + '; HTTP requests made: ' + m.requestCount);
  L.push('- Method: ' + m.method);
  L.push('- Orphan exceptions file: `' + m.orphanExceptionsFile + '`' + (m.orphanExceptionsError ? ' (not loaded: ' + m.orphanExceptionsError + ')' : ''));
  L.push('');
  L.push('## Counts', '');
  L.push('| Measure | Value |', '|---|---|');
  for (const [k, v] of Object.entries(r.counts)) L.push('| ' + k + ' | ' + v + ' |');
  L.push('| crawl limit reached | ' + (r.crawl.limitReached ? 'yes (' + r.crawl.notCrawledDueToLimit.length + ' discovered URLs not fetched)' : 'no') + ' |');
  L.push('');
  L.push('## Rules', '');
  L.push('| Rule ID | Status | PASS | FAIL | Unit | Description |', '|---|---|---|---|---|---|');
  for (const x of r.rules) L.push('| ' + x.id + ' | ' + x.status + ' | ' + (x.pass ?? 'n/a') + ' | ' + x.fail + (x.notChecked ? ' (+' + x.notChecked + ' not checked)' : '') + ' | ' + (x.failUnit || x.scope) + ' | ' + esc(x.description) + ' |');
  L.push('');
  const failing = r.rules.filter((x) => x.fail).sort((a, b) => b.fail - a.fail);
  L.push('## Failing rules by FAIL count', '');
  L.push(failing.length ? failing.map((x) => x.id + ' (' + x.fail + ')').join(', ') : 'None.');
  L.push('');
  L.push('## Failure details', '', 'At most ' + MAX_ITEMS_IN_SUMMARY + ' items per rule; full lists are in results.json.', '');
  for (const x of failing) {
    L.push('### ' + x.id + ' (' + x.fail + ')', '');
    if (x.uniqueFailingSrc !== undefined) L.push('Unique failing image sources: ' + x.uniqueFailingSrc, '');
    if (x.failPages !== undefined) L.push('Pages in duplicate groups: ' + x.failPages, '');
    for (const it of x.items.slice(0, MAX_ITEMS_IN_SUMMARY)) L.push('- ' + esc(JSON.stringify(it)).slice(0, 400));
    if (x.items.length > MAX_ITEMS_IN_SUMMARY) L.push('- ... ' + (x.items.length - MAX_ITEMS_IN_SUMMARY) + ' more in results.json');
    L.push('');
  }
  const orphanRule = r.rules.find((x) => x.id === 'LINK-ORPHAN');
  L.push('## Orphan exceptions applied', '');
  L.push(orphanRule && orphanRule.excepted && orphanRule.excepted.length ? orphanRule.excepted.map((e) => '- ' + e.url + ': ' + esc(e.reason)).join('\n') : 'None.');
  L.push('');
  L.push('## robots.txt', '');
  L.push('- Status ' + r.robots.status + ', content-type `' + (r.robots.contentType || '') + '`, X-Robots-Tag `' + (r.robots.xRobotsTag || '') + '`');
  L.push('- Groups: ' + r.robots.parsed.groups.length + '; Sitemap lines: ' + (r.robots.parsed.sitemaps.join(', ') || 'none') + (r.robots.parsed.other.length ? '; other lines: ' + r.robots.parsed.other.map(esc).join(' / ') : ''));
  L.push('');
  L.push('## Sitemaps', '');
  L.push('| Sitemap | Status | Index | URLs | X-Robots-Tag |', '|---|---|---|---|---|');
  for (const s of r.sitemaps) L.push('| ' + s.url + ' | ' + s.status + ' | ' + (s.isIndex ? 'yes' : 'no') + ' | ' + s.urlCount + ' | ' + esc(s.xRobotsTag) + ' |');
  L.push('');
  L.push('## Crawl coverage and exclusions', '');
  const ex = r.crawl.excluded;
  L.push('| Category | Unique URLs | Fetched |', '|---|---|---|');
  L.push('| API routes (/api/*) | ' + ex.api.length + ' | no |');
  L.push('| mailto: | ' + ex.mailto.length + ' (addresses redacted) | no |');
  L.push('| tel: | ' + ex.tel.length + ' | no |');
  L.push('| External hosts | ' + ex.external.length + ' | no |');
  L.push('| Production host variants (http/apex) linked from pages | ' + ex.hostVariant.length + ' | no |');
  L.push('| /_next/ assets linked as anchors | ' + ex.nextAssets.length + ' | no |');
  L.push('| Other schemes / invalid hrefs | ' + (ex.otherScheme.length + ex.invalid.length) + ' | no |');
  const rn = r.crawl.resourcesNotFetched;
  L.push('| Resources: images / scripts / stylesheets / other link tags | ' + rn.images.length + ' / ' + rn.scripts.length + ' / ' + rn.stylesheets.length + ' / ' + rn.otherLinks.length + ' | no |');
  L.push('| Discovered internal URLs not fetched (crawl limit) | ' + r.crawl.notCrawledDueToLimit.length + ' | no |');
  L.push('');
  if (ex.api.length) { L.push('API routes linked: ' + ex.api.map((e) => e.url).join(', '), ''); }
  if (ex.external.length) { L.push('External hosts: ' + [...new Set(ex.external.map((e) => { try { return new URL(e.url).host; } catch { return e.url; } }))].join(', '), ''); }
  L.push('## Fetch failures', '');
  L.push(r.crawl.failures.length ? r.crawl.failures.map((f) => '- ' + f.phase + ' ' + f.url + ': ' + esc(f.error)).join('\n') : 'None.');
  L.push('');
  L.push('## 404 probes', '');
  const probes = r.extraFetches.filter((e) => e.purpose === '404-probe');
  L.push('| URL | Status | Title | Meta robots |', '|---|---|---|---|');
  for (const p of probes) L.push('| ' + p.url + ' | ' + p.status + ' | ' + esc(p.title) + ' | ' + esc(p.metaRobots) + ' |');
  L.push('');
  L.push('## Pages', '');
  L.push('| URL | Status | Title len | Desc len | H1 | Words | Canonical self | Noindex | JSON-LD types | Inbound |', '|---|---|---|---|---|---|---|---|---|---|');
  for (const p of r.pages) {
    if (!p.analyzed) { L.push('| ' + p.url + ' | ' + (p.status ?? 'ERR') + (p.redirectChain.length ? ' -> ' + (p.finalStatus ?? 'n/a') + ' ' + p.finalUrl : '') + ' | | | | | | | | |'); continue; }
    const types = [...new Set(p.jsonLd.flatMap((b) => b.types))].join(', ');
    L.push('| ' + p.url + ' | ' + p.status + ' | ' + (p.titleLength ?? '-') + ' | ' + (p.metaDescriptionLength ?? '-') + ' | ' + p.h1Count + ' | ' + p.wordCount + ' | ' + (p.canonical ? (p.canonicalIsSelf ? 'yes' : 'no') : 'missing') + ' | ' + (p.noindex ? 'yes' : 'no') + ' | ' + esc(types) + ' | ' + p.inboundInternalLinks + ' |');
  }
  L.push('');
  return L.join('\n');
}

main().catch((e) => {
  console.error('check-seo fatal error: ' + (e && e.stack ? e.stack : e));
  process.exit(1);
});

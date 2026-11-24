/**
 * Blog post dates are stored as human calendar strings ("October 1, 2026").
 * `new Date("October 1, 2026")` parses that in the build machine's local time
 * zone, so a build in UTC+5:30 emits the previous day in UTC. These helpers
 * read the string as a calendar date and pin it to 12:00 UTC, which is the
 * same calendar day in every zone from UTC-12 to UTC+11, so JSON-LD,
 * Open Graph and the sitemap agree with the visible date on any build host.
 */

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function monthIndex(name: string): number {
  const w = name.toLowerCase();
  return MONTHS.findIndex((m) => m === w || (w.length === 3 && m.startsWith(w)));
}

/**
 * Parse "Month D, YYYY" (full or 3-letter month) or "YYYY-MM-DD" as a calendar
 * date at 12:00 UTC. Returns null for anything else or an impossible date.
 */
export function parsePostDate(dateStr: string): Date | null {
  const s = dateStr.trim();
  let year: number;
  let month: number;
  let day: number;

  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  const human = /^([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})$/.exec(s);
  if (iso) {
    year = Number(iso[1]);
    month = Number(iso[2]) - 1;
    day = Number(iso[3]);
  } else if (human) {
    year = Number(human[3]);
    month = monthIndex(human[1]);
    day = Number(human[2]);
    if (month === -1) return null;
  } else {
    return null;
  }

  const d = new Date(Date.UTC(year, month, day, 12, 0, 0));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month || d.getUTCDate() !== day) {
    return null;
  }
  return d;
}

/**
 * ISO timestamp for a post date, for schema, Open Graph and the sitemap.
 * Unparseable dates fall back to `now`; future dates are clamped to `now` so
 * a placeholder or typo never ships a future publish/modified timestamp.
 */
export function postDateISO(dateStr: string, now: Date = new Date()): string {
  const d = parsePostDate(dateStr);
  if (!d) return now.toISOString();
  return (d.getTime() > now.getTime() ? now : d).toISOString();
}

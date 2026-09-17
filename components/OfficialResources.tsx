type Resource = { label: string; href: string; note?: string };

/**
 * A small block of citations to authoritative external resources (B.C.
 * government, ICBC, DriveBC). Used on safety-critical service pages to support
 * E-E-A-T / GEO: factual, safety-relevant claims link to the official source.
 * Links open in a new tab and are marked as external.
 */
export default function OfficialResources({
  heading = "Official B.C. resources",
  intro,
  items,
}: {
  heading?: string;
  intro?: string;
  items: Resource[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-navy-900 mb-4">{heading}</h2>
      {intro ? <p className="text-slate-600 leading-relaxed mb-4">{intro}</p> : null}
      <ul className="space-y-3">
        {items.map((r) => (
          <li key={r.href} className="text-slate-600 text-sm leading-relaxed">
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-600 hover:text-amber-700"
            >
              {r.label}
            </a>
            {r.note ? <> — {r.note}</> : null}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-400">
        External links to official B.C. government, DriveBC, and ICBC resources. TowingNo.1 is an independent towing company and is not affiliated with these organizations.
      </p>
    </div>
  );
}

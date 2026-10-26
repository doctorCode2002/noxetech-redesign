import { LogoMarkMono } from "../logo";

export type ReportLine = { site: string; who: string; status: string; tone: "ok" | "warn" | "idle" };

/** Intrinsic page size (A-series ratio). The page is always drawn at this size and scaled as a whole. */
export const PAGE_W = 420;
export const PAGE_H = 594;

// Inspections per day, Monday to Sunday (sums to the 112 in the summary).
const perDay = [14, 18, 21, 16, 19, 12, 12];
const days = ["M", "T", "W", "T", "F", "S", "S"];
const peak = Math.max(...perDay);

const tone = {
  ok: "bg-[#16a34a]/12 text-[#166534]",
  warn: "bg-[#ff6a1a]/15 text-[#9a3412]",
  idle: "bg-black/8 text-black/70",
};

/** The weekly inspections report as a printed A-size page. Reflects the live checklist state. */
export function ReportDocument({ lines, issues }: { lines: ReportLine[]; issues: number }) {
  const followUps = lines.filter((l) => l.tone === "warn");

  return (
    <article
      className="flex flex-col bg-[#fbfaf7] p-7 text-[9.5px] leading-[1.45] text-[#16181c]"
      style={{ width: PAGE_W, height: PAGE_H }}
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoMarkMono className="size-5" />
          <span className="text-[11px] font-semibold">NoxeTech</span>
        </div>
        <span className="figures rounded-full bg-[#ff6a1a] px-2 py-1 text-[8px] font-semibold text-black">
          REPORT-W43
        </span>
      </header>

      <h3 className="mt-6 text-[18px] font-semibold leading-tight tracking-[-0.01em]">
        Weekly Inspections Report
      </h3>
      <p className="figures mt-1 text-[8.5px] text-black/55">WEEK 43 · 20–26 OCT 2026 · EXAMPLE APP</p>
      <div className="mt-4 h-0.5 bg-[#ff6a1a]" />

      <dl className="mt-4 grid grid-cols-4 gap-2">
        {[
          ["Sites inspected", "38"],
          ["Inspections", "112"],
          ["Open issues", String(issues)],
          ["On time", "96%"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-black/10 p-2">
            <dt className="text-[7.5px] uppercase tracking-[0.06em] text-black/55">{k}</dt>
            <dd className="figures mt-1 text-[15px] font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-5">
        <h4 className="text-[8px] font-semibold uppercase tracking-[0.08em] text-black/55">
          Inspections per day
        </h4>
        <div className="mt-2 flex h-16 items-end gap-2 border-b border-black/15 pb-1" aria-hidden="true">
          {perDay.map((n, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-3/5 rounded-t-sm ${n === peak ? "bg-[#ff6a1a]" : "bg-black/75"}`}
                style={{ height: `${(n / peak) * 44}px` }}
              />
              <span className="figures text-[7px] text-black/55">{days[i]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h4 className="text-[8px] font-semibold uppercase tracking-[0.08em] text-black/55">
          Latest inspections
        </h4>
        <table className="mt-2 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-black/15 text-[7.5px] uppercase tracking-[0.06em] text-black/55">
              <th className="py-1 font-medium">Site</th>
              <th className="py-1 font-medium">Inspector</th>
              <th className="py-1 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.site} className="border-b border-black/8">
                <td className="py-1 font-medium">{l.site}</td>
                <td className="py-1 text-black/70">{l.who}</td>
                <td className="py-1 text-right">
                  <span className={`rounded-full px-2 py-px text-[8px] font-medium ${tone[l.tone]}`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-5 rounded-md bg-black/[0.04] p-3">
        <h4 className="text-[8px] font-semibold uppercase tracking-[0.08em] text-black/55">Follow-ups</h4>
        {followUps.length ? (
          <ul className="mt-1 space-y-1">
            {followUps.map((l) => (
              <li key={l.site}>
                {l.site}: {l.status}, revisit scheduled
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1">No open follow-ups. Every site passed.</p>
        )}
      </section>

      <footer className="mt-auto flex items-end justify-between border-t border-black/15 pt-2 text-[7.5px] text-black/55">
        <span>Example only. No file is created.</span>
        <span className="figures">PAGE 1 / 1</span>
      </footer>
    </article>
  );
}

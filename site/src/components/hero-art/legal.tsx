/**
 * Legal: a ruled document sheet with a margin rule and numbered clause blocks (one per section of
 * the policy), with a reading line moving down through the clauses. `clauses` and `seed` come from
 * the page's own data, so each policy gets its own sheet.
 */
const SHEET = { x: 1004, y: 196, w: 400 };
const MARGIN = 1060;
const TEXT_X = 1076;
const TEXT_W = 300;
const TOP = 252;
const ROW = 10;
const GAP = 12;
const LOOP = 12;

export function LegalArt({ clauses, seed = 0 }: { clauses: number; seed?: number }) {
  const n = Math.max(3, Math.min(clauses, 7));
  // Deterministic line lengths so the server render is stable.
  const frac = (i: number, j: number) => (((seed * 7 + i * 13 + j * 5) % 11) / 11) * 0.4;

  const linesOf = (i: number) => 2 + ((seed + i) % 2);
  const blocks = Array.from({ length: n }, (_, i) => ({
    lines: linesOf(i),
    top: TOP + Array.from({ length: i }, (_, k) => ROW * (linesOf(k) + 1) + GAP).reduce((a, b) => a + b, 0),
  }));
  const last = blocks[n - 1];
  const end = last.top + ROW * (last.lines + 1);
  const span = end - TOP;

  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid slice" fill="none">
      <style>{`
        .lg-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .lg-margin { stroke: var(--field); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.5; }
        .lg-mark { fill: var(--field); opacity: 0.15; animation: lg-mark ${LOOP}s linear infinite; }
        .lg-read { animation: lg-read ${LOOP}s linear infinite; }
        @keyframes lg-mark { 0%, 14%, 100% { opacity: 0.15; } 3% { opacity: 0.9; } }
        @keyframes lg-read {
          0% { transform: translateY(0); opacity: 0; }
          6% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateY(${span}px); opacity: 0; }
        }
      `}</style>

      {/* the sheet beneath, then the document itself */}
      <rect className="lg-line" x={SHEET.x + 16} y={SHEET.y + 16} width={SHEET.w} height="720" rx="4" fill="var(--paper)" />
      <rect className="lg-line" x={SHEET.x} y={SHEET.y} width={SHEET.w} height="720" rx="4" fill="var(--paper)" />
      <path className="lg-margin" d={`M${MARGIN} ${SHEET.y}V720`} />

      {/* title block */}
      <rect className="lg-line" x={TEXT_X} y={SHEET.y + 20} width="200" height="8" />
      <path className="lg-line" d={`M${TEXT_X} ${SHEET.y + 38}h120M${TEXT_X} ${TOP - 12}H${SHEET.x + SHEET.w - 16}`} />

      {/* numbered clauses */}
      {blocks.map(({ top, lines }, i) => (
        <g key={i}>
          <rect className="lg-line" x={MARGIN - 32} y={top - 4} width="16" height="16" rx="2" fill="var(--paper)" />
          {/* the clause number, as tally marks */}
          {Array.from({ length: Math.min(i + 1, 4) }, (_, t) => (
            <path key={t} className="lg-line" d={`M${MARGIN - 28 + t * 3} ${top}v8`} />
          ))}
          <rect
            className="lg-mark"
            style={{ animationDelay: `${((top - TOP) / span) * LOOP - LOOP}s` }}
            x={MARGIN - 32}
            y={top - 4}
            width="16"
            height="16"
            rx="2"
          />
          <rect className="lg-line" x={TEXT_X} y={top} width={120 + frac(i, 9) * 200} height="6" />
          {Array.from({ length: lines }, (_, j) => (
            <path
              key={j}
              className="lg-line"
              d={`M${TEXT_X} ${top + ROW * (j + 1) + 4}h${TEXT_W * (j === lines - 1 ? 0.35 + frac(i, j) : 0.6 + frac(i, j))}`}
            />
          ))}
        </g>
      ))}

      {/* dimension line ahead of the sheet, ticked at every clause */}
      <path className="lg-line" d={`M960 ${TOP - 4}V${end}M952 ${TOP - 4}h16M952 ${end}h16`} />
      {blocks.map(({ top }) => (
        <path key={top} className="lg-line" d={`M956 ${top - 4}h8`} />
      ))}

      {/* the reading line */}
      <g className="lg-read">
        <path className="lg-margin" style={{ opacity: 1 }} d={`M${SHEET.x + 8} ${TOP - 4}H${SHEET.x + SHEET.w - 8}`} />
        <path d={`M${SHEET.x - 12} ${TOP - 10}l10 6-10 6Z`} fill="var(--field)" />
      </g>
    </svg>
  );
}

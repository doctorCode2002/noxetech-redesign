/**
 * Services: the three tiers every capability is built from (presentation, business logic,
 * infrastructure), drawn as an isometric stack; requests travel up through it.
 */
const CX = 1120;
const TIERS = [150, 360, 570];
const HW = 340; // plate half-width: wide enough to show on both sides of the hero map panel
const HH = 136; // plate half-height

const rhomb = (cx: number, cy: number, hw: number, hh: number) =>
  `M${cx} ${cy - hh}L${cx + hw} ${cy}L${cx} ${cy + hh}L${cx - hw} ${cy}Z`;

// Module tiles on each plate; a lit tile per tier marks where the work happens.
const tiles = [-1, 0, 1].flatMap((i) => [-1, 0, 1].map((j) => [i, j] as const));
const lit = [
  [1, -1],
  [0, 0],
  [-1, 1],
];

export function ServicesArt() {
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid slice" fill="none">
      <style>{`
        .sv-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .sv-dash { stroke-dasharray: 4 6; }
        .sv-lit { fill: var(--field); animation: sv-pulse 4s ease-in-out infinite; }
        .sv-packet { fill: var(--field); animation: sv-rise 6s cubic-bezier(0.65, 0, 0.35, 1) infinite; opacity: 0; }
        @keyframes sv-pulse { 0%, 100% { opacity: 0.18; } 50% { opacity: 0.55; } }
        @keyframes sv-rise {
          0% { transform: translateY(0); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateY(-420px); opacity: 0; }
        }
      `}</style>

      {/* risers between the tiers */}
      {[CX - HW, CX, CX + HW].map((x, k) => (
        <path
          key={x}
          className="sv-line sv-dash"
          d={`M${x} ${TIERS[0] + (k === 1 ? HH : 0)}V${TIERS[2] + (k === 1 ? HH : 0)}`}
        />
      ))}

      {TIERS.map((cy, t) => (
        <g key={cy}>
          <path className="sv-line" d={rhomb(CX, cy, HW, HH)} fill="var(--paper)" />
          {tiles.map(([i, j]) => (
            <path
              key={`${i}${j}`}
              className="sv-line"
              d={rhomb(CX + (i - j) * 113, cy + (i + j) * 45, 74, 30)}
            />
          ))}
          <path
            className="sv-lit"
            style={{ animationDelay: `${t * 1.3}s` }}
            d={rhomb(CX + (lit[t][0] - lit[t][1]) * 113, cy + (lit[t][0] + lit[t][1]) * 45, 74, 30)}
          />
        </g>
      ))}

      {/* requests rising from infrastructure to the interface */}
      {[0, 2, 4].map((delay, k) => (
        <path
          key={delay}
          className="sv-packet"
          style={{ animationDelay: `${delay}s` }}
          d={rhomb(CX + (k - 1) * 300, TIERS[2], 16, 7)}
        />
      ))}
    </svg>
  );
}

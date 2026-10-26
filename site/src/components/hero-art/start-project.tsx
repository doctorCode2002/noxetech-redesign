/**
 * Start a Project: a blank sheet being laid out. Rulers frame it, construction lines are struck
 * one by one, a compass sweeps the first circle and a set square slides into place.
 */
const S = { x: 944, y: 144, w: 376, h: 296 }; // the sheet; stays above the hero's promise list
const P = { x: 1080, y: 296, r: 96 }; // compass pivot and radius

// Construction lines that run past the sheet edges, struck in turn.
const construction = [
  `M864 ${P.y}H1404`, // through the pivot
  `M${P.x} 96V472`,
  `M${S.x} ${S.y + S.h}L${S.x + S.w} ${S.y}`,
];

// Where they cross, marked as the layout firms up.
const marks: [number, number][] = [
  [P.x, P.y],
  [P.x + P.r, P.y],
];

export function StartProjectArt() {
  const topTicks = Array.from({ length: S.w / 8 + 1 }, (_, i) => S.x + i * 8);
  const sideTicks = Array.from({ length: S.h / 8 + 1 }, (_, i) => S.y + i * 8);
  return (
    <svg
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <style>{`
        .stp-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .stp-dash { stroke-dasharray: 4 6; }
        .stp-strike { opacity: 0.15; animation: stp-strike 9s ease-in-out var(--delay) infinite; }
        .stp-mark { fill: var(--field); opacity: 0.2; animation: stp-pulse 4.5s ease-in-out var(--delay) infinite; }
        .stp-compass {
          transform-box: view-box;
          transform-origin: ${P.x}px ${P.y}px;
          animation: stp-sweep 12s linear infinite;
        }
        .stp-cursor { animation: stp-slide 9s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        .stp-square { animation: stp-square 11s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        /* on phones the ruler cursor would sit on the headline */
        @media (max-width: 1023px) { .stp-cursor { display: none; } }
        @keyframes stp-strike { 0%, 100% { opacity: 0.15; } 20%, 60% { opacity: 1; } }
        @keyframes stp-pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.9; } }
        @keyframes stp-sweep { to { transform: rotate(360deg); } }
        @keyframes stp-slide {
          0%, 100% { transform: translateX(0); }
          45%, 55% { transform: translateX(${P.r * 2}px); }
        }
        @keyframes stp-square {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-48px, 0); }
        }
      `}</style>

      {/* construction lines */}
      {construction.map((d, i) => (
        <path
          key={d}
          className="stp-line stp-strike"
          style={{ "--delay": `${i * 3}s` } as React.CSSProperties}
          d={d}
        />
      ))}

      {/* the sheet, with its border and an empty title block */}
      <rect
        className="stp-line"
        x={S.x}
        y={S.y}
        width={S.w}
        height={S.h}
        fill="var(--paper)"
      />
      <rect
        className="stp-line"
        x={S.x + 12}
        y={S.y + 12}
        width={S.w - 24}
        height={S.h - 24}
      />
      <path
        className="stp-line"
        d={`M${S.x + S.w - 132} ${S.y + S.h - 12}V${S.y + S.h - 56}H${S.x + S.w - 12}M${S.x + S.w - 72} ${S.y + S.h - 56}V${S.y + S.h - 12}`}
      />

      {/* construction lines again, faint, where they cross the sheet */}
      {construction.map((d) => (
        <path key={d} className="stp-line stp-dash" d={d} opacity="0.5" />
      ))}

      {/* rulers along the top and left edges */}
      <path className="stp-line" d={`M${S.x} ${S.y - 28}H${S.x + S.w}`} />
      {topTicks.map((x, i) => (
        <path
          key={x}
          className="stp-line"
          d={`M${x} ${S.y - 28}V${S.y - 28 + (i % 5 === 0 ? 12 : 6)}`}
        />
      ))}
      <path className="stp-line" d={`M${S.x - 28} ${S.y}V${S.y + S.h}`} />
      {sideTicks.map((y, i) => (
        <path
          key={y}
          className="stp-line"
          d={`M${S.x - 28} ${y}H${S.x - 28 + (i % 5 === 0 ? 12 : 6)}`}
        />
      ))}
      <g className="stp-cursor">
        <path
          d={`M${P.x - P.r - 6} ${S.y - 40}H${P.x - P.r + 6}L${P.x - P.r} ${S.y - 30}Z`}
          fill="var(--field)"
        />
      </g>

      {/* the first circle, and the compass sweeping it */}
      <circle className="stp-line" cx={P.x} cy={P.y} r={P.r} />
      <circle className="stp-line stp-dash" cx={P.x} cy={P.y} r={P.r / 2} />
      <g className="stp-compass">
        <path
          className="stp-line"
          d={`M${P.x} ${P.y}L${P.x + P.r / 2} ${P.y - 40}L${P.x + P.r} ${P.y}`}
        />
        <circle
          className="stp-line"
          cx={P.x + P.r / 2}
          cy={P.y - 40}
          r="6"
          fill="var(--paper)"
        />
        <circle cx={P.x + P.r} cy={P.y} r="4" fill="var(--field)" />
      </g>

      {marks.map(([x, y], i) => (
        <rect
          key={x}
          className="stp-mark"
          style={{ "--delay": `${i * 2}s` } as React.CSSProperties}
          x={x - 4}
          y={y - 4}
          width="8"
          height="8"
        />
      ))}

      {/* a set square resting on the sheet's lower edge */}
      <g className="stp-square">
        <path
          className="stp-line"
          d={`M1236 ${S.y + S.h + 20}H1396V${S.y + S.h - 140}Z`}
          fill="var(--paper)"
        />
        <path
          className="stp-line"
          d={`M1292 ${S.y + S.h + 4}H1380V${S.y + S.h - 84}Z`}
        />
      </g>
    </svg>
  );
}

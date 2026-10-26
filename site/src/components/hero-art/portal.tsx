/**
 * Portal: concentric access rings around the sign-in pass, like a combination dial. Two magic
 * links travel in toward the centre; the keyhole on the inner ring lights as access is granted.
 */
const C = { x: 1142, y: 364 }; // centre of the access-pass card at 1440×900
const R = [260, 330, 400];
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C.x + r * Math.cos(a), C.y + r * Math.sin(a)] as const;
};
const arc = (r: number, from: number, to: number) => {
  const [x1, y1] = pt(r, from);
  const [x2, y2] = pt(r, to);
  return `M${x1} ${y1}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

// gates on the dial ring, each a small lock sitting in a gap
const GATES = [-20, 100, 220];
const GAP = 7;
// [angle, duration s, delay s, highlighted?]
const links: [number, number, number, boolean][] = [
  [150, 7, 0, true],
  [-60, 7, 3.5, false],
];

export function PortalArt() {
  const key = pt(R[0], -90);
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid slice" fill="none">
      <style>{`
        .pt-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .pt-dash { stroke-dasharray: 4 6; }
        .pt-turn { transform-box: view-box; transform-origin: ${C.x}px ${C.y}px; }
        .pt-dial { animation: pt-dial 12s ease-in-out infinite; }
        .pt-outer { animation: pt-outer 12s ease-in-out infinite; }
        .pt-gate { fill: var(--field); animation: pt-blink 6s ease-in-out infinite; }
        .pt-key { fill: var(--field); animation: pt-key 7s ease-in-out infinite; }
        .pt-link { animation: pt-in var(--d) cubic-bezier(0.5, 0, 0.6, 1) var(--delay) infinite; opacity: 0; }
        .pt-chain { stroke: var(--field); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
        @keyframes pt-dial { 0%, 100% { transform: rotate(0deg); } 45%, 55% { transform: rotate(24deg); } }
        @keyframes pt-outer { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-12deg); } }
        @keyframes pt-blink { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        @keyframes pt-key { 0%, 60%, 100% { opacity: 0.25; } 75% { opacity: 1; } }
        @keyframes pt-in {
          0% { transform: translate(0, 0); opacity: 0; }
          12% { opacity: 1; }
          82% { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
      `}</style>

      {/* link approach paths */}
      {links.map(([deg]) => {
        const [x1, y1] = pt(560, deg);
        const [x2, y2] = pt(R[0], deg);
        return <path key={deg} className="pt-line pt-dash" d={`M${x1} ${y1}L${x2} ${y2}`} />;
      })}

      {/* outer ring, slowly counter-turning */}
      <g className="pt-turn pt-outer">
        <circle className="pt-line pt-dash" cx={C.x} cy={C.y} r={R[2]} />
        {[0, 90, 180, 270].map((deg) => {
          const [x1, y1] = pt(R[2] - 8, deg);
          const [x2, y2] = pt(R[2] + 8, deg);
          return <path key={deg} className="pt-line" d={`M${x1} ${y1}L${x2} ${y2}`} />;
        })}
      </g>

      {/* the dial ring: three arcs broken by lock gates; it turns like a combination */}
      <g className="pt-turn pt-dial">
        {GATES.map((g, i) => (
          <path key={g} className="pt-line" d={arc(R[1], g + GAP, GATES[(i + 1) % 3] + (i === 2 ? 360 : 0) - GAP)} />
        ))}
        {GATES.map((g, i) => {
          const [x, y] = pt(R[1], g);
          return (
            <g key={g} transform={`rotate(${g + 90} ${x} ${y})`}>
              <path className="pt-line" d={`M${x - 6} ${y - 8}v-6a6 6 0 0 1 12 0v6`} />
              <rect className="pt-line" x={x - 12} y={y - 8} width="24" height="20" rx="4" fill="var(--paper)" />
              <circle className="pt-gate" style={{ animationDelay: `${i * 2}s` }} cx={x} cy={y + 2} r="3" />
            </g>
          );
        })}
      </g>

      {/* inner ring with its scale */}
      <circle className="pt-line" cx={C.x} cy={C.y} r={R[0]} />
      {Array.from({ length: 48 }, (_, i) => {
        const deg = i * 7.5;
        const [x1, y1] = pt(R[0], deg);
        const [x2, y2] = pt(R[0] + (i % 4 ? 6 : 12), deg);
        return <path key={i} className="pt-line" d={`M${x1} ${y1}L${x2} ${y2}`} />;
      })}

      {/* keyhole on the inner ring, just above the pass */}
      <circle className="pt-line" cx={key[0]} cy={key[1]} r="24" fill="var(--paper)" />
      <path
        className="pt-line"
        d={`M${key[0] - 4} ${key[1] + 2}l-3 12h14l-3-12a7 7 0 1 0-8 0Z`}
      />
      <path className="pt-key" d={`M${key[0] - 4} ${key[1] + 2}l-3 12h14l-3-12a7 7 0 1 0-8 0Z`} />

      {/* magic links travelling in */}
      {links.map(([deg, d, delay, lit]) => {
        const [x1, y1] = pt(560, deg);
        const [x2, y2] = pt(R[0] + 24, deg);
        return (
          <g
            key={deg}
            className="pt-link"
            style={
              {
                "--d": `${d}s`,
                "--delay": `${delay}s`,
                "--dx": `${x2 - x1}px`,
                "--dy": `${y2 - y1}px`,
              } as React.CSSProperties
            }
          >
            <g transform={`translate(${x1} ${y1}) rotate(${deg})`}>
              <rect x="-22" y="-7" width="26" height="14" rx="7" fill="var(--paper)" className={lit ? "pt-chain" : "pt-line"} />
              <rect x="-4" y="-7" width="26" height="14" rx="7" className={lit ? "pt-chain" : "pt-line"} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

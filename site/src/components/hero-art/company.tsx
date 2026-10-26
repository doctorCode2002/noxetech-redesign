/**
 * Company: a dashed requirement boundary with modules cut to fill it exactly. The last module
 * reshapes and drops into the one gap left, shaped by the requirement rather than the other way.
 */
const O = { x: 1000, y: 80 };
const C = 72; // cell
const G = 6; // gap between module and boundary

// requirement outline, in cells
const OUTLINE: [number, number][] = [
  [1, 0], [4, 0], [4, 2], [5, 2], [5, 4], [4, 4], [4, 5], [2, 5], [2, 4], [1, 4], [1, 3], [0, 3], [0, 1], [1, 1],
];
// modules [col, row, w, h]; the first is the one still arriving
const MODULES: [number, number, number, number][] = [
  [1, 0, 2, 1],
  [3, 0, 1, 2],
  [0, 1, 1, 2],
  [1, 1, 2, 1],
  [1, 2, 2, 2],
  [3, 2, 2, 1],
  [3, 3, 2, 1],
  [2, 4, 2, 1],
];
const box = ([c, r, w, h]: [number, number, number, number]) => ({
  x: O.x + c * C + G,
  y: O.y + r * C + G,
  width: w * C - G * 2,
  height: h * C - G * 2,
});
const outline = `M${OUTLINE.map(([c, r]) => `${O.x + c * C} ${O.y + r * C}`).join("L")}Z`;
const BOUNDS = { x0: O.x, y0: O.y, x1: O.x + 5 * C, y1: O.y + 5 * C };

export function CompanyArt() {
  const [first, ...rest] = MODULES;
  const slot = box(first);
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid slice" fill="none">
      <style>{`
        .co-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .co-dash { stroke-dasharray: 4 6; }
        .co-req { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; stroke-dasharray: 8 6; }
        .co-slot { stroke: var(--field); stroke-width: 1; vector-effect: non-scaling-stroke; stroke-dasharray: 4 6;
          animation: co-slot 10s ease-in-out infinite; }
        .co-piece { fill: var(--field); fill-opacity: 0.75; transform-box: fill-box; transform-origin: center; animation: co-fit 10s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        .co-mark { animation: co-pulse 5s ease-in-out infinite; }
        @media (max-width: 1023px) { .co-piece { fill-opacity: 0.3; } }
        @keyframes co-fit {
          0% { transform: translateY(-32px) scale(0.5, 1.8); opacity: 0; }
          10% { opacity: 1; }
          30% { transform: translateY(-32px) scale(0.5, 1.8); }
          55%, 88% { transform: translateY(0) scale(1, 1); opacity: 1; }
          100% { transform: translateY(0) scale(1, 1); opacity: 0; }
        }
        @keyframes co-slot { 0%, 45%, 100% { opacity: 1; } 55%, 90% { opacity: 0; } }
        @keyframes co-pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.9; } }
      `}</style>

      {/* construction lines */}
      <path className="co-line co-dash" d={`M${O.x - 140} ${O.y + 2.5 * C}H1440`} />
      <path className="co-line co-dash" d={`M${O.x + 2.5 * C} 24V${BOUNDS.y1 + 24}`} />

      {/* dimension lines along the top and right */}
      <path className="co-line" d={`M${BOUNDS.x0} ${BOUNDS.y0 - 32}H${BOUNDS.x1}`} />
      <path className="co-line" d={`M${BOUNDS.x1 + 24} ${BOUNDS.y0}V${BOUNDS.y1}`} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <g key={k}>
          <path className="co-line" d={`M${O.x + k * C} ${BOUNDS.y0 - 40}v16`} />
          <path className="co-line" d={`M${BOUNDS.x1 + 16} ${O.y + k * C}h16`} />
        </g>
      ))}

      {/* the requirement */}
      <path className="co-req" d={outline} />

      {/* modules already in place */}
      {rest.map((m) => (
        <g key={m.join()}>
          <rect className="co-line" {...box(m)} rx="4" fill="var(--paper)" />
          <circle className="co-line" cx={box(m).x + 12} cy={box(m).y + 12} r="3" />
        </g>
      ))}

      {/* the gap, and the module reshaping to fit it */}
      <rect className="co-slot" {...slot} rx="4" />
      <rect className="co-piece" {...slot} rx="4" />

      {/* corner brackets marking the boundary */}
      {[
        [BOUNDS.x0, BOUNDS.y0, 1, 1],
        [BOUNDS.x1, BOUNDS.y0, -1, 1],
        [BOUNDS.x0, BOUNDS.y1, 1, -1],
        [BOUNDS.x1, BOUNDS.y1, -1, -1],
      ].map(([x, y, sx, sy], k) => (
        <path
          key={k}
          className="co-mark"
          style={{ animationDelay: `${k * 1.25}s` }}
          d={`M${x - sx * 8} ${y + sy * 24}V${y - sy * 8}H${x + sx * 24}`}
          stroke="var(--field)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/**
 * SMS Switch custom request: a provisioning blueprint. A throughput gauge is dialled up to a
 * custom value, spec rails beside it slide to their settings, and dimension lines size the build.
 */
const G = { x: 1150, y: 430, r: 200 }; // gauge centre and radius
const RAILS = [250, 320, 390]; // spec rails, left of the gauge
const RAIL = { x0: 760, x1: 900 };

// Gauge ticks across the upper half: every 9deg, longer every 45deg.
const ticks = Array.from({ length: 21 }, (_, i) => -90 + i * 9);
const polar = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [G.x + r * Math.cos(a), G.y + r * Math.sin(a)] as const;
};
const arc = (r: number, from: number, to: number) => {
  const [x0, y0] = polar(from, r);
  const [x1, y1] = polar(to, r);
  return `M${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}`;
};
const TARGET = 36; // the custom setting, in gauge degrees

// Dimension line with extension marks and open arrowheads.
const dimH = (x0: number, x1: number, y: number) =>
  `M${x0} ${y - 12}V${y + 12}M${x1} ${y - 12}V${y + 12}M${x0} ${y}H${x1}` +
  `M${x0 + 10} ${y - 5}L${x0} ${y}L${x0 + 10} ${y + 5}M${x1 - 10} ${y - 5}L${x1} ${y}L${x1 - 10} ${y + 5}`;
const dimV = (y0: number, y1: number, x: number) =>
  `M${x - 12} ${y0}H${x + 12}M${x - 12} ${y1}H${x + 12}M${x} ${y0}V${y1}` +
  `M${x - 5} ${y0 + 10}L${x} ${y0}L${x + 5} ${y0 + 10}M${x - 5} ${y1 - 10}L${x} ${y1}L${x + 5} ${y1 - 10}`;

export function SmsCustomRequestArt() {
  const [tx0, ty0] = polar(TARGET, G.r - 4);
  const [tx1, ty1] = polar(TARGET, G.r + 20);
  return (
    <svg
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <style>{`
        .scr-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .scr-dash { stroke-dasharray: 4 6; }
        .scr-accent { stroke: var(--field); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
        .scr-needle {
          transform-box: view-box;
          transform-origin: ${G.x}px ${G.y}px;
          animation: scr-dial 10s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .scr-target { animation: scr-pulse 10s ease-in-out infinite; }
        .scr-knob { animation: scr-slide 10s cubic-bezier(0.65, 0, 0.35, 1) var(--delay) infinite; }
        /* on phones the rails would sit right behind the headline */
        @media (max-width: 1023px) { .scr-rails { display: none; } }
        @keyframes scr-dial {
          0%, 8% { transform: rotate(-78deg); }
          44% { transform: rotate(${TARGET + 6}deg); }
          52%, 84% { transform: rotate(${TARGET}deg); }
          100% { transform: rotate(-78deg); }
        }
        @keyframes scr-pulse { 0%, 40%, 100% { opacity: 0.2; } 52%, 80% { opacity: 1; } }
        @keyframes scr-slide {
          0%, 10% { transform: translateX(0); }
          46%, 84% { transform: translateX(var(--to)); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* dimensioning */}
      <path className="scr-line" d={dimH(G.x - G.r, G.x + G.r, G.y + 64)} />
      <path className="scr-line" d={dimV(G.y - G.r, G.y, G.x + G.r + 64)} />
      <path
        className="scr-line scr-dash"
        d={`M${G.x - G.r - 40} ${G.y}H${G.x + G.r + 80}`}
      />
      <path
        className="scr-line scr-dash"
        d={`M${G.x} ${G.y - G.r - 60}V${G.y + 96}`}
      />
      <path
        className="scr-line scr-dash"
        d={`M${G.x} ${G.y - G.r}H${G.x + G.r + 80}`}
      />

      {/* the gauge */}
      <path className="scr-line" d={arc(G.r, -90, 90)} />
      <path className="scr-line" d={arc(G.r - 40, -90, 90)} />
      {ticks.map((deg) => {
        const long = deg % 45 === 0;
        const [x0, y0] = polar(deg, G.r);
        const [x1, y1] = polar(deg, G.r - (long ? 28 : 14));
        return (
          <path key={deg} className="scr-line" d={`M${x0} ${y0}L${x1} ${y1}`} />
        );
      })}
      <path
        className="scr-accent scr-target"
        d={`M${tx0} ${ty0}L${tx1} ${ty1}`}
      />
      <path
        className="scr-accent scr-target"
        d={arc(G.r - 40, TARGET - 18, TARGET)}
      />

      <g className="scr-needle">
        <path
          className="scr-accent"
          d={`M${G.x} ${G.y + 24}V${G.y - G.r + 32}`}
        />
      </g>
      <circle
        className="scr-line"
        cx={G.x}
        cy={G.y}
        r="16"
        fill="var(--paper)"
      />
      <circle cx={G.x} cy={G.y} r="5" fill="var(--field)" />

      {/* spec rails, each knob sliding to its custom setting */}
      <g className="scr-rails">
        {RAILS.map((y, i) => (
          <g key={y}>
            <path className="scr-line" d={`M${RAIL.x0} ${y}H${RAIL.x1}`} />
            {Array.from({ length: 8 }, (_, k) => RAIL.x0 + k * 20).map((x) => (
              <path
                key={x}
                className="scr-line"
                d={`M${x} ${y + 8}V${y + 14}`}
              />
            ))}
            <path
              className="scr-line scr-dash"
              d={`M${RAIL.x1} ${y}H${G.x - G.r - 40}`}
            />
            <g
              className="scr-knob"
              style={
                {
                  "--to": `${[96, 56, 120][i]}px`,
                  "--delay": `${i * 0.4}s`,
                } as React.CSSProperties
              }
            >
              <rect
                className={i === 0 ? undefined : "scr-line"}
                x={RAIL.x0 - 8}
                y={y - 8}
                width="16"
                height="16"
                rx="4"
                fill={i === 0 ? "var(--field)" : "var(--paper)"}
              />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

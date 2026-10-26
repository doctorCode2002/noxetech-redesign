/**
 * How We Work: the five delivery stages as a schedule. A progress marker sweeps through the
 * stages, each bar filling as it passes; engineering and verification loop back on each other.
 */
const X0 = 800;
const X1 = 1400;
const TOP = 72;
const BOTTOM = 360;
const ROW = 56;
const BAR_H = 28;
const STAGES: [number, number][] = [
  [820, 960],
  [920, 1080],
  [1040, 1260],
  [1180, 1320],
  [1300, 1400],
];
const rowY = (i: number) => 92 + i * ROW;
const SWEEP = 0.85; // share of the loop the marker spends travelling
const pct = (x: number) => (((x - X0) / (X1 - X0)) * SWEEP * 100).toFixed(1);
const LOOP = { x: 1350, top: rowY(2) + BAR_H / 2, bottom: rowY(3) + BAR_H / 2 };
const LOOP_R = (LOOP.bottom - LOOP.top) / 2;
const LOOP_CY = LOOP.top + LOOP_R;

const fills = STAGES.map(
  ([s, e], i) => `
  @keyframes hw-f${i} {
    0%, ${pct(s)}% { transform: scaleX(0); opacity: 1; }
    ${pct(e)}%, 92% { transform: scaleX(1); opacity: 1; }
    100% { transform: scaleX(1); opacity: 0; }
  }
  .hw-f${i} { animation: hw-f${i} 12s linear infinite; }`,
).join("");

export function HowWeWorkArt() {
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid slice" fill="none">
      <style>{`
        .hw-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .hw-dash { stroke-dasharray: 4 6; }
        .hw-fill { fill: var(--field); transform-box: fill-box; transform-origin: left center; }
        .hw-marker { animation: hw-sweep 12s linear infinite; }
        .hw-orbit { transform-origin: ${LOOP.x}px ${LOOP_CY}px; animation: hw-orbit 6s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        @keyframes hw-sweep {
          0% { transform: translateX(0); opacity: 0; }
          4% { opacity: 1; }
          ${SWEEP * 100}% { transform: translateX(${X1 - X0}px); opacity: 1; }
          92%, 100% { transform: translateX(${X1 - X0}px); opacity: 0; }
        }
        @keyframes hw-orbit {
          0% { transform: rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          75% { transform: rotate(-180deg); opacity: 1; }
          90%, 100% { transform: rotate(-180deg); opacity: 0; }
        }
        ${fills}
      `}</style>

      {/* time columns */}
      {Array.from({ length: 11 }, (_, k) => X0 + k * 60).map((x) => (
        <path key={x} className="hw-line hw-dash" d={`M${x} ${TOP}V${BOTTOM}`} />
      ))}
      <path className="hw-line" d={`M${X0 - 40} ${TOP}H${X1 + 40}M${X0 - 40} ${BOTTOM}H${X1 + 40}`} />
      {Array.from({ length: 21 }, (_, k) => X0 + k * 30).map((x, k) => (
        <path key={x} className="hw-line" d={`M${x} ${TOP}v${k % 2 ? -6 : -12}`} />
      ))}

      {/* hand-offs between stages */}
      {STAGES.slice(1).map(([s], i) => (
        <g key={s}>
          <path className="hw-line" d={`M${s + 12} ${rowY(i) + BAR_H}V${rowY(i + 1)}`} />
          <circle className="hw-line" cx={s + 12} cy={rowY(i) + BAR_H} r="3" fill="var(--paper)" />
        </g>
      ))}

      {/* stage bars, filling as the marker passes */}
      {STAGES.map(([s, e], i) => (
        <g key={s}>
          <rect className="hw-line" x={s} y={rowY(i)} width={e - s} height={BAR_H} rx="6" fill="var(--paper)" />
          <rect
            className={`hw-fill hw-f${i}`}
            x={s + 6}
            y={rowY(i) + BAR_H - 10}
            width={e - s - 12}
            height="4"
            rx="2"
          />
        </g>
      ))}

      {/* iteration loop: verification hands back to engineering */}
      <path
        className="hw-line hw-dash"
        d={`M${STAGES[3][1]} ${LOOP.bottom}H${LOOP.x}A${LOOP_R} ${LOOP_R} 0 0 0 ${LOOP.x} ${LOOP.top}H${STAGES[2][1]}`}
      />
      <path className="hw-line" d={`M${STAGES[2][1] + 10} ${LOOP.top - 6}l-8 6l8 6`} />
      <g className="hw-orbit">
        <circle cx={LOOP.x} cy={LOOP.bottom} r="4" fill="var(--field)" />
      </g>

      {/* the progress marker */}
      <g className="hw-marker">
        <path d={`M${X0} ${TOP}V${BOTTOM + 16}`} stroke="var(--field)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d={`M${X0 - 7} ${TOP - 20}h14l-7 10z`} fill="var(--field)" />
      </g>
    </svg>
  );
}

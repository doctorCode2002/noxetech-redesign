/**
 * Work: an index of file folders receding into the archive, tabs staggered like a real drawer.
 * One slot in the middle is still empty, its orange tab lifting as if the next project is about
 * to be filed there.
 */
const N = 7; // folders, back (0) to front (N - 1)
const SLOT = 3; // the empty slot
const FRONT = { x: 880, y: 304 };
const STEP = { x: 40, y: -30 };
const W = 320;
const H = 190;
const TAB_W = 96;
const TAB_H = 24;
const TABS = [16, 112, 208];

const at = (i: number) => ({ x: FRONT.x + (N - 1 - i) * STEP.x, y: FRONT.y + (N - 1 - i) * STEP.y });
const tabPath = (x: number, y: number) =>
  `M${x} ${y + 1}L${x + 8} ${y - TAB_H}H${x + TAB_W - 8}L${x + TAB_W} ${y + 1}`;

export function WorkArt() {
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid slice" fill="none">
      <style>{`
        .wk-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .wk-dash { stroke-dasharray: 4 6; }
        .wk-slot { stroke: var(--field); stroke-width: 1; vector-effect: non-scaling-stroke; stroke-dasharray: 4 6; }
        .wk-mark { fill: var(--field); animation: wk-pulse 6s ease-in-out infinite; }
        .wk-lift { animation: wk-lift 8s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        .wk-cue { animation: wk-cue 8s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        .wk-tab { fill: var(--field); fill-opacity: 0.75; }
        @media (max-width: 1023px) { .wk-tab { fill-opacity: 0.3; } .wk-cue { stroke-opacity: 0.5; } }
        @keyframes wk-pulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.6; } }
        @keyframes wk-lift {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          45%, 60% { transform: translateY(-28px); opacity: 1; }
        }
        @keyframes wk-cue {
          0%, 100% { transform: translateY(-24px); opacity: 0; }
          45%, 60% { transform: translateY(0); opacity: 0.9; }
        }
      `}</style>

      {/* drawer rails running back into the archive */}
      {[0, W].map((dx) => (
        <path
          key={dx}
          className="wk-line wk-dash"
          d={`M${FRONT.x + dx} ${FRONT.y + H + 24}L${at(0).x + dx} ${at(0).y + H + 24}`}
        />
      ))}
      <path className="wk-line" d={`M${FRONT.x - 24} ${FRONT.y + H + 24}H${FRONT.x + W + 24}`} />
      {Array.from({ length: N }, (_, i) => {
        const p = at(i);
        return <path key={i} className="wk-line" d={`M${p.x - 8} ${p.y + H + 24}h16`} />;
      })}

      {Array.from({ length: N }, (_, i) => {
        const { x, y } = at(i);
        const tx = x + TABS[i % TABS.length];
        if (i === SLOT) {
          // the open slot: an outline waiting to be filled, its tab lifting
          return (
            <g key={i}>
              <rect className="wk-slot" x={x} y={y} width={W} height={H} rx="6" />
              <g className="wk-lift">
                <path className="wk-tab" d={tabPath(tx, y)} />
              </g>
              <path
                className="wk-cue"
                d={`M${tx + TAB_W / 2 - 10} ${y - TAB_H - 64}l10 10l10 -10`}
                stroke="var(--field)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        }
        return (
          <g key={i}>
            <path className="wk-line" d={tabPath(tx, y)} fill="var(--paper)" />
            <rect className="wk-line" x={x} y={y} width={W} height={H} rx="6" fill="var(--paper)" />
            <rect className="wk-line" x={tx + 20} y={y - TAB_H + 8} width={TAB_W - 40} height="8" rx="2" />
            {i % 2 === 0 && (
              <rect
                className="wk-mark"
                style={{ animationDelay: `${i * 0.9}s` }}
                x={tx + 20}
                y={y - TAB_H + 8}
                width="12"
                height="8"
                rx="2"
              />
            )}
          </g>
        );
      })}

      {/* ruled lines on the front folder */}
      {[64, 88, 112, 136].map((dy, k) => (
        <path key={dy} className="wk-line" d={`M${FRONT.x + 32} ${FRONT.y + dy}h${k === 3 ? 120 : 200}`} />
      ))}
    </svg>
  );
}

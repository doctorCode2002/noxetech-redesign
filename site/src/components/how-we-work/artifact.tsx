/**
 * The project artifact as it stands after each stage: a scoped requirement sheet (01) becomes a
 * data-model blueprint (02), then assembled modules inside an app frame (03), then verified
 * modules (04), then a released system standing on its hosting (05).
 *
 * Layers switch on with data-r1…data-r4 flags on the wrapper ("stage reached"), so the drawing
 * is plain markup in its final state without JavaScript and only transitions opacity/transform.
 */

const T = "transition-[opacity,translate,scale,stroke-dashoffset] duration-700 ease-out-expo motion-reduce:transition-none";

// Data-model boxes (x, y) on the 480 × 340 drawing.
const boxes = [
  [112, 64],
  [292, 64],
  [112, 180],
  [292, 180],
] as const;
const W = 148;
const H = 92;

function flags(state: number) {
  return {
    "data-r1": state >= 1 ? "" : undefined,
    "data-r2": state >= 2 ? "" : undefined,
    "data-r3": state >= 3 ? "" : undefined,
    "data-r4": state >= 4 ? "" : undefined,
  };
}

export function Artifact({ state, className = "", ...rest }: { state: number } & React.ComponentProps<"div">) {
  return (
    <div aria-hidden="true" className={`group/art ${className}`} {...flags(state)} {...rest}>
      <svg viewBox="0 0 480 344" className="block h-auto w-full overflow-visible">
        {/* 05: the hosting platform the released system stands on. */}
        <g className={`${T} opacity-0 group-data-[r4]/art:opacity-100`}>
          <ellipse cx="240" cy="326" rx="196" ry="8" className="fill-ink/10" />
          <rect x="56" y="320" width="368" height="12" rx="6" className="fill-field" />
          {[160, 240, 320].map((x) => (
            <path
              key={x}
              d={`M${x} 316v-4m-4 4 4-4 4 4`}
              className="fill-none stroke-on-field"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0 12)"
            />
          ))}
        </g>

        {/* Everything above lifts onto the platform at release. */}
        <g className={`${T} group-data-[r4]/art:-translate-y-2`}>
          <rect x="8" y="8" width="464" height="300" rx="12" className="fill-sheet stroke-rule-strong" />

          {/* 03+: application chrome */}
          <g className={`${T} opacity-0 group-data-[r2]/art:opacity-100`}>
            <line x1="8" x2="472" y1="40" y2="40" className="stroke-rule" />
            {[28, 44, 60].map((cx) => (
              <circle key={cx} cx={cx} cy="24" r="4" className="fill-rule-strong" />
            ))}
            <rect x="160" y="18" width="160" height="12" rx="6" className="fill-paper" />
            <line x1="92" x2="92" y1="40" y2="308" className="stroke-rule" />
            {[60, 80, 100, 120].map((y, i) => (
              <rect key={y} x="24" y={y} width={i === 0 ? 52 : 40} height="8" rx="4" className={i === 0 ? "fill-field" : "fill-rule"} />
            ))}
          </g>
          {/* 05: live status light */}
          <circle cx="452" cy="24" r="5" className="fill-rule-strong" />
          <circle cx="452" cy="24" r="5" className={`${T} fill-field opacity-0 group-data-[r4]/art:opacity-100`} />

          {/* 01: the requirement sheet, its marked-up lines and the dashed project boundary. */}
          <g className={`${T} group-data-[r1]/art:-translate-y-2 group-data-[r1]/art:opacity-0`}>
            <rect
              x="32"
              y="48"
              width="416"
              height="236"
              rx="8"
              className="fill-none stroke-field"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            {[300, 352, 248, 328, 276].map((w, i) => (
              <g key={i}>
                <circle cx="64" cy={88 + i * 40} r="4" className="fill-field" />
                <rect x="80" y={84 + i * 40} width={w} height="8" rx="4" className="fill-rule-strong" />
                {(i === 1 || i === 3) && (
                  <path
                    d={`M80 ${100 + i * 40}q${w / 4} 4 ${w / 2} 0t${w / 2} 0`}
                    className="markup-underline"
                  />
                )}
              </g>
            ))}
          </g>

          {/* 02: data model boxes and their relations. */}
          <g className={`${T} translate-y-2 opacity-0 group-data-[r1]/art:translate-y-0 group-data-[r1]/art:opacity-100`}>
            {[
              `M${112 + W} 110H292`,
              `M${112 + W} 226H292`,
              `M186 ${64 + H}V180`,
              `M366 ${64 + H}V180`,
            ].map((d) => (
              <path
                key={d}
                d={d}
                pathLength={1}
                strokeDasharray="1"
                className={`${T} fill-none stroke-field [stroke-dashoffset:1] group-data-[r1]/art:[stroke-dashoffset:0] group-data-[r1]/art:delay-300`}
                strokeWidth="1.5"
              />
            ))}
            {boxes.map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect x={x} y={y} width={W} height={H} rx="6" className="fill-paper stroke-ink-3" />
                <rect x={x} y={y} width={W} height="20" rx="6" className="fill-redline-wash" />
                {[36, 52, 68].map((dy, j) => (
                  <rect key={dy} x={x + 12} y={y + dy} width={[96, 72, 84][j]} height="6" rx="3" className="fill-rule-strong" />
                ))}
              </g>
            ))}
          </g>

          {/* 03: modules built into the boxes. */}
          {boxes.map(([x, y], i) => (
            <g
              key={`m${i}`}
              className={`${T} translate-y-2 opacity-0 group-data-[r2]/art:translate-y-0 group-data-[r2]/art:opacity-100`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <rect x={x} y={y} width={W} height={H} rx="6" className="fill-sheet stroke-ink" />
              {i === 0 &&
                [40, 24, 52, 32, 60].map((h, j) => (
                  <rect key={j} x={x + 16 + j * 24} y={y + H - 12 - h} width="14" height={h} rx="2" className={j === 4 ? "fill-field" : "fill-ink-3"} />
                ))}
              {i === 1 &&
                [16, 36, 56].map((dy) => (
                  <g key={dy}>
                    <circle cx={x + 20} cy={y + dy + 4} r="5" className="fill-rule-strong" />
                    <rect x={x + 32} y={y + dy} width="96" height="8" rx="4" className="fill-rule" />
                  </g>
                ))}
              {i === 2 &&
                [16, 44].map((dy) => (
                  <rect key={dy} x={x + 12} y={y + dy} width={W - 24} height="20" rx="4" className="fill-paper stroke-rule-strong" />
                ))}
              {i === 3 && (
                <>
                  <rect x={x + 12} y={y + 16} width="88" height="8" rx="4" className="fill-rule" />
                  <rect x={x + 12} y={y + 32} width="112" height="8" rx="4" className="fill-rule" />
                  <rect x={x + 12} y={y + 56} width="72" height="24" rx="12" className="fill-field" />
                </>
              )}
            </g>
          ))}

          {/* 04: a check on every module, and a test pass sweeping the frame. */}
          {boxes.map(([x, y], i) => (
            <g
              key={`c${i}`}
              className={`${T} scale-0 [transform-box:fill-box] [transform-origin:center] group-data-[r3]/art:scale-100`}
              style={{ transitionDelay: `${200 + i * 140}ms` }}
            >
              <circle cx={x + W} cy={y} r="12" className="fill-field" />
              <path
                d={`M${x + W - 5} ${y}l3.5 3.5 6.5-7`}
                className="fill-none stroke-on-field"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}
          <rect
            x="8"
            y="44"
            width="464"
            height="2"
            className="fill-field opacity-0 transition-[opacity,translate] duration-[1200ms] ease-in-out group-data-[r3]/art:translate-y-[256px] group-data-[r3]/art:opacity-100 group-data-[r4]/art:opacity-0 motion-reduce:hidden"
          />
        </g>
      </svg>
    </div>
  );
}

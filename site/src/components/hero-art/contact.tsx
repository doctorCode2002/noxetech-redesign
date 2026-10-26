/**
 * Contact: messages routed in from the left, merging onto two lines that end in the page's two
 * mailboxes (general inquiries above, project scoping below). Envelopes run the lines into the inboxes.
 */
const LANES = [228, 498]; // run above and below the hero's project card on desktop
const BOX = { x: 1216, w: 80, h: 56 };
const START = 760;

// Feeders: [entry y, x where it turns, lane it merges into]
const feeders: [number, number, number][] = [
  [196, 640, 0],
  [260, 600, 0],
  [466, 620, 1],
  [530, 660, 1],
];

// [lane, duration s, delay s, highlighted?]
const envelopes: [number, number, number, boolean][] = [
  [0, 8, 0, false],
  [0, 8, 4, true],
  [1, 9, 2, true],
  [1, 9, 6.5, false],
];

export function ContactArt() {
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid slice" fill="none">
      <style>{`
        .ct-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .ct-dash { stroke-dasharray: 4 6; }
        .ct-env { animation: ct-run var(--d) cubic-bezier(0.45, 0, 0.55, 1) var(--delay) infinite; opacity: 0; }
        .ct-flap { stroke: var(--paper); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .ct-dot { fill: var(--field); animation: ct-blink 4s ease-in-out infinite; }
        @keyframes ct-run {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          86% { opacity: 1; }
          100% { transform: translateX(var(--dx)); opacity: 0; }
        }
        @keyframes ct-blink { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
      `}</style>

      {/* the two mail lines, and the feeders merging onto them */}
      {LANES.map((y) => (
        <path key={y} className="ct-line" d={`M420 ${y}H${BOX.x}`} />
      ))}
      {feeders.map(([y, x, lane]) => {
        const ly = LANES[lane];
        const jx = x + Math.abs(y - ly);
        return (
          <g key={y}>
            <path className="ct-line" d={`M420 ${y}H${x}L${jx} ${ly}`} />
            <circle className="ct-line" cx={jx} cy={ly} r="3" fill="var(--paper)" />
          </g>
        );
      })}

      {/* the inboxes, each handing on to the team at the right edge */}
      {LANES.map((y, i) => (
        <g key={y}>
          <path className="ct-line ct-dash" d={`M${BOX.x + BOX.w} ${y}H1440`} />
          <circle className="ct-line" cx="1368" cy={y} r="5" fill="var(--paper)" />
          <rect
            className="ct-line"
            x={BOX.x}
            y={y - BOX.h / 2}
            width={BOX.w}
            height={BOX.h}
            rx="12"
            fill="var(--paper)"
          />
          {/* tray: an open inbox with its notch */}
          <path
            className="ct-line"
            d={`M${BOX.x + 16} ${y - 12}V${y + 12}H${BOX.x + 64}V${y - 12}M${BOX.x + 16} ${y + 2}H${BOX.x + 30}l4 6h12l4-6H${BOX.x + 64}`}
          />
          <circle
            className="ct-dot"
            style={{ animationDelay: `${i * 2}s` }}
            cx={BOX.x + BOX.w - 12}
            cy={y - BOX.h / 2 + 12}
            r="4"
          />
        </g>
      ))}

      {/* envelopes in flight */}
      {envelopes.map(([lane, d, delay, lit], k) => {
        const y = LANES[lane];
        return (
          <g
            key={k}
            className="ct-env"
            style={
              {
                "--d": `${d}s`,
                "--delay": `${delay}s`,
                "--dx": `${BOX.x - START - 40}px`,
              } as React.CSSProperties
            }
          >
            <rect
              x={START}
              y={y - 10}
              width="32"
              height="20"
              rx="3"
              fill={lit ? "var(--field)" : "var(--paper)"}
              className={lit ? undefined : "ct-line"}
            />
            <path
              className={lit ? "ct-flap" : "ct-line"}
              d={`M${START + 3} ${y - 7}L${START + 16} ${y + 2}L${START + 29} ${y - 7}`}
            />
          </g>
        );
      })}
    </svg>
  );
}

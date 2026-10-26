/**
 * SMS Switch: one switch node fanning traffic out to carrier routes. Message capsules run the
 * lanes; the orange one keeps taking the least-cost route.
 */
const SW = { x: 700, y: 360 };
const CARRIERS = [150, 255, 360, 465, 570];
const END_X = 1360;

// [lane index, duration s, delay s, best route?]
const messages: [number, number, number, boolean][] = [
  [0, 7, 0, false],
  [1, 6, 2.4, false],
  [2, 5, 1, true],
  [2, 5, 3.5, true],
  [3, 6.5, 0.8, false],
  [4, 7.5, 3, false],
];

export function SmsSwitchArt() {
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid slice" fill="none">
      <style>{`
        .sm-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .sm-best { stroke: var(--field); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
        .sm-msg { animation: sm-run var(--d) linear var(--delay) infinite; opacity: 0; }
        .sm-node { animation: sm-blink 2.5s ease-in-out infinite; }
        @keyframes sm-run {
          0% { transform: translate(0, 0); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
        @keyframes sm-blink { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
      `}</style>

      {/* inbound traffic converging on the switch */}
      {[300, 360, 420].map((y) => (
        <path key={y} className="sm-line" d={`M420 ${y}C560 ${y} 600 ${SW.y} ${SW.x} ${SW.y}`} />
      ))}

      {/* carrier routes */}
      {CARRIERS.map((y, i) => (
        <g key={y}>
          <path className={i === 2 ? "sm-best" : "sm-line"} d={`M${SW.x} ${SW.y}L${END_X} ${y}`} />
          <circle
            className={i === 2 ? "sm-node" : "sm-line"}
            cx={END_X}
            cy={y}
            r="10"
            fill={i === 2 ? "var(--field)" : "var(--paper)"}
            stroke={i === 2 ? "none" : undefined}
          />
        </g>
      ))}

      {/* the switch */}
      <rect
        className="sm-line"
        x={SW.x - 32}
        y={SW.y - 32}
        width="64"
        height="64"
        rx="12"
        fill="var(--paper)"
      />
      <circle cx={SW.x} cy={SW.y} r="8" fill="var(--field)" />

      {/* messages in flight */}
      {messages.map(([lane, d, delay, best], k) => (
        <g
          key={k}
          className="sm-msg"
          style={
            {
              "--d": `${d}s`,
              "--delay": `${delay}s`,
              "--dx": `${END_X - SW.x - 40}px`,
              "--dy": `${CARRIERS[lane] - SW.y}px`,
            } as React.CSSProperties
          }
        >
          <rect
            x={SW.x + 20}
            y={SW.y - 9}
            width="36"
            height="18"
            rx="9"
            fill={best ? "var(--field)" : "var(--paper)"}
            className={best ? undefined : "sm-line"}
          />
        </g>
      ))}
    </svg>
  );
}

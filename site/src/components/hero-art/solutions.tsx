/**
 * Solutions: operational friction turning into a system. Tangled, broken strands on the left
 * straighten into clean parallel routes that drop into one system block (framing the hero's
 * method card) and leave it as orderly outputs.
 */
const BLOCK = { x: 948, y: 176, w: 456, h: 368 }; // sits just outside the PROBLEM_SOLVER card
const START_X = 1000; // where the tangle ends and the clean routes begin
const R = 20; // corner radius of the routes

// Clean lanes: [y of the horizontal run, x where it turns down into the block]
const LANES: [number, number][] = [
  [44, 1336],
  [72, 1264],
  [100, 1192],
  [128, 1120],
];

// Tangled, broken strands, one per lane, each split where it "breaks". All end at START_X on its lane.
const strands = [
  [
    "M808 26C850 0 884 74 858 94S818 54 852 40",
    "M864 34C896 22 914 70 940 60S976 30 1000 44",
  ],
  [
    "M820 124C832 70 896 150 914 104",
    "M922 92C940 62 948 126 966 98S990 66 1000 72",
  ],
  [
    "M812 66C860 92 840 160 880 150S910 90 934 118",
    "M942 126C958 150 976 92 1000 100",
  ],
  [
    "M800 158C846 192 866 112 896 170",
    "M906 176C924 196 946 120 964 140S988 140 1000 128",
  ],
];

// Loose ends: fragments that go nowhere yet.
const loose = [
  "M836 110C856 132 880 128 872 112S844 96 862 80",
  "M884 20C900 40 930 12 948 30",
];

// Friction points: the gaps in the strands.
const sparks: [number, number][] = [
  [860, 37],
  [918, 98],
  [901, 174],
];

const route = ([y, xd]: [number, number]) =>
  `M${START_X} ${y}H${xd - R}Q${xd} ${y} ${xd} ${y + R}V${BLOCK.y}`;

export function SolutionsArt() {
  return (
    <svg
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <style>{`
        .sol-line { stroke: var(--rule-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
        .sol-dash { stroke-dasharray: 4 6; }
        .sol-spark { fill: var(--field); animation: sol-flicker 5s ease-in-out infinite; opacity: 0.2; }
        .sol-port { fill: var(--field); animation: sol-pulse 4s ease-in-out infinite; }
        .sol-packet {
          fill: var(--field);
          animation: sol-run var(--d) cubic-bezier(0.45, 0, 0.55, 1) var(--delay) infinite;
          opacity: 0;
        }
        .sol-out { fill: var(--field); animation: sol-drop 6s linear var(--delay) infinite; opacity: 0; }
        /* phones scale the art up ~2x behind the copy: keep only the lines there */
        @media (max-width: 1023px) {
          .sol-packet, .sol-out, .sol-port { display: none; }
        }
        @keyframes sol-flicker { 0%, 100% { opacity: 0.15; } 40% { opacity: 0.8; } 55% { opacity: 0.2; } 70% { opacity: 0.7; } }
        @keyframes sol-pulse { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.85; } }
        @keyframes sol-run {
          0% { transform: translate(0, 0); opacity: 0; }
          8% { opacity: 1; }
          62% { transform: translate(var(--dx), 0); }
          92% { transform: translate(var(--dx), var(--dy)); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
        @keyframes sol-drop {
          0% { transform: translateY(0); opacity: 0; }
          12% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(150px); opacity: 0; }
        }
      `}</style>

      {/* friction: tangled, broken strands */}
      {strands.map((parts, i) =>
        parts.map((d) => <path key={`${i}${d}`} className="sol-line" d={d} />),
      )}
      {loose.map((d) => (
        <path key={d} className="sol-line sol-dash" d={d} />
      ))}
      {sparks.map(([x, y], i) => (
        <rect
          key={x}
          className="sol-spark"
          style={{ animationDelay: `${i * 1.2}s` }}
          x={x - 3}
          y={y - 3}
          width="6"
          height="6"
        />
      ))}

      {/* straightened: clean parallel routes into the block */}
      {LANES.map((lane) => (
        <path key={lane[0]} className="sol-line" d={route(lane)} />
      ))}

      {/* the system block, drawn as a stacked pair so it reads as one solid unit around the card */}
      <rect
        className="sol-line"
        x={BLOCK.x + 16}
        y={BLOCK.y + 16}
        width={BLOCK.w}
        height={BLOCK.h}
        rx="16"
        fill="var(--paper)"
      />
      <rect
        className="sol-line"
        x={BLOCK.x}
        y={BLOCK.y}
        width={BLOCK.w}
        height={BLOCK.h}
        rx="16"
        fill="var(--paper)"
      />
      {/* ports where the routes land */}
      {LANES.map(([, xd], i) => (
        <rect
          key={xd}
          className="sol-port"
          style={{ animationDelay: `${i * 0.8}s` }}
          x={xd - 8}
          y={BLOCK.y - 4}
          width="16"
          height="8"
          rx="2"
        />
      ))}

      {/* orderly outputs leaving the system */}
      {LANES.map(([, xd]) => (
        <path
          key={xd}
          className="sol-line sol-dash"
          d={`M${xd + 16} ${BLOCK.y + BLOCK.h + 16}V720`}
        />
      ))}
      {[1192].map((xd, k) => (
        <rect
          key={xd}
          className="sol-out"
          style={{ "--delay": `${k * 3}s` } as React.CSSProperties}
          x={xd + 12}
          y={BLOCK.y + BLOCK.h + 24}
          width="8"
          height="16"
          rx="2"
        />
      ))}

      {/* work moving through: one packet per lane */}
      {LANES.map(([y, xd], i) => (
        <rect
          key={y}
          className="sol-packet"
          style={
            {
              "--d": `${7 + i * 0.6}s`,
              "--delay": `${i * 1.7}s`,
              "--dx": `${xd - START_X}px`,
              "--dy": `${BLOCK.y - y - 12}px`,
            } as React.CSSProperties
          }
          x={START_X - 6}
          y={y - 6}
          width="12"
          height="12"
          rx="2"
        />
      ))}
    </svg>
  );
}

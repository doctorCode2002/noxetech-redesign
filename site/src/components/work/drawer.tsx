/**
 * A card-catalogue cabinet seen from slightly above. Its middle drawer (the repository archive)
 * slides out as the section scrolls past, showing blank index dividers and nothing filed behind
 * them. Drawn in its open state; DrawerMotion starts it closed once the scroll scene is built.
 */

const SLOT_X = 72;
const SLOT_W = 256;
const SLOT_H = 88;
const SLOTS = [32, 136, 240];
export const DRAWER_TRAVEL = 112;
const FRONT_Y = SLOTS[1] + DRAWER_TRAVEL; // open position

function Front({ y, open = false }: { y: number; open?: boolean }) {
  const cx = SLOT_X + SLOT_W / 2;
  return (
    <g>
      <rect
        x={SLOT_X}
        y={y}
        width={SLOT_W}
        height={SLOT_H}
        rx="6"
        className={open ? "fill-sheet stroke-ink" : "fill-sheet stroke-ink-3"}
        strokeWidth={open ? 1.5 : 1}
      />
      <rect x={cx - 32} y={y + 16} width="64" height="24" rx="3" className="fill-paper stroke-ink-3" />
      {open && <rect x={cx - 24} y={y + 26} width="48" height="4" rx="2" className="fill-field" />}
      <rect x={cx - 28} y={y + 56} width="56" height="12" rx="6" className={open ? "fill-ink" : "fill-ink-3"} />
    </g>
  );
}

export function Drawer() {
  const dividers = [24, 52, 80, 108, 136];
  return (
    <svg viewBox="0 0 400 384" aria-hidden="true" className="block h-auto w-full overflow-visible">
      <defs>
        <clipPath id="archive-mouth">
          <rect x="0" y={SLOTS[1]} width="400" height="248" />
        </clipPath>
      </defs>

      {/* Cabinet */}
      <ellipse cx="200" cy="356" rx="168" ry="10" className="fill-ink/10" />
      <rect x="56" y="16" width="288" height="328" rx="10" className="fill-sheet stroke-rule-strong" />
      <rect x="72" y="344" width="24" height="10" rx="2" className="fill-rule-strong" />
      <rect x="304" y="344" width="24" height="10" rx="2" className="fill-rule-strong" />
      {SLOTS.map((y) => (
        <rect key={y} x={SLOT_X - 4} y={y - 4} width={SLOT_W + 8} height={SLOT_H + 8} rx="8" className="fill-paper" />
      ))}
      <Front y={SLOTS[0]} />
      <Front y={SLOTS[2]} />

      {/* The open drawer: its inside shows through the mouth of the slot. */}
      <g clipPath="url(#archive-mouth)">
        <g data-drawer-move>
          <rect x={SLOT_X + 4} y={FRONT_Y - 176} width={SLOT_W - 8} height="176" className="fill-paper stroke-rule-strong" />
          {dividers.map((d, i) => {
            const y = FRONT_Y - d;
            const tab = SLOT_X + 24 + ((i * 52) % 176);
            return (
              <g key={d} data-divider>
                <path
                  d={`M${SLOT_X + 12} ${y}H${tab}v-12h48v12H${SLOT_X + SLOT_W - 12}`}
                  className="fill-sheet stroke-ink-3"
                  strokeLinejoin="round"
                />
                <rect x={SLOT_X + 12} y={y} width={SLOT_W - 24} height="4" className="fill-rule" />
              </g>
            );
          })}
        </g>
      </g>
      <g data-drawer-move>
        <rect x={SLOT_X} y={FRONT_Y + SLOT_H - 4} width={SLOT_W} height="12" rx="6" className="fill-ink/15" />
        <Front y={FRONT_Y} open />
      </g>
    </svg>
  );
}

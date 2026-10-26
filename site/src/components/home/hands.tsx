/**
 * Illustrated hands holding the report page by its side edges. Each hand is two
 * layers: the sleeve and palm go behind the paper, the thumb lies on top of it.
 * Drawn for the left edge (page edge at x=120 in the viewBox) and mirrored for the right.
 */

const SKIN = "#d39a72";
const LINE = "#8a5a3c";
const NAIL = "#efc8aa";
const SLEEVE = "#ff6a1a";
const CUFF = "#c2410c";

// Grip low on the page, so the thumbs rest on the margin rather than the table.
const box = "absolute h-[240px] w-[180px] top-[400px]";
const place = { left: `${box} left-[-120px]`, right: `${box} right-[-120px] -scale-x-100` };

export function HandBack({ side }: { side: "left" | "right" }) {
  return (
    <svg data-hand viewBox="0 0 180 240" aria-hidden="true" className={`${place[side]} z-0`}>
      {/* palm, reaching behind the page */}
      <path
        d="M44 170C36 136 50 102 80 86L168 50V178C150 188 128 190 110 182Z"
        fill={SKIN}
        stroke={LINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* knuckle crease */}
      <path
        d="M70 120c10-8 24-14 40-16"
        fill="none"
        stroke={LINE}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* sleeve and cuff */}
      <path d="M6 240L32 170Q36 160 48 162L110 176Q120 180 116 192L98 240Z" fill={SLEEVE} />
      <path d="M32 170Q36 160 48 162L110 176Q120 180 116 192L113 200L28 180Z" fill={CUFF} />
    </svg>
  );
}

export function HandThumb({ side }: { side: "left" | "right" }) {
  return (
    <svg
      data-hand
      viewBox="0 0 180 240"
      aria-hidden="true"
      className={`${place[side]} z-20 drop-shadow-[0_2px_2px_rgb(0_0_0/0.25)]`}
    >
      <path
        d="M100 116C106 96 122 80 142 70C154 64 166 70 161 82C155 95 139 106 126 122Z"
        fill={SKIN}
        stroke={LINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <ellipse cx="152" cy="74" rx="7" ry="4.5" transform="rotate(-30 152 74)" fill={NAIL} />
    </svg>
  );
}

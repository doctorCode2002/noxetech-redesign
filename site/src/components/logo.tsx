import { useId } from "react";

/** NoxeTech circuit mark. Charcoal tracks follow the ink color, so the mark works in both themes. */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="12" y1="6" x2="88" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA100" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
      </defs>
      <g strokeLinecap="round" strokeLinejoin="round" className="stroke-ink-2">
        <path data-logo-track d="M12 56v16l28 16" strokeWidth="7" />
        <path data-logo-track d="M24 54v11l14 8" strokeWidth="6.5" />
        <path data-logo-track d="M88 52v20" strokeWidth="7" />
      </g>
      <g strokeLinecap="round" strokeLinejoin="round" stroke={`url(#${id})`}>
        <path data-logo-circuit d="M12 42V28L50 6l32 18v8" strokeWidth="7" />
        <path data-logo-circuit d="M12 28l70 40-24 14" strokeWidth="7.5" />
      </g>
      <g fill="#FF7800" strokeWidth="2.5" className="stroke-paper">
        <circle data-logo-node cx="82" cy="34" r="5.5" />
        <circle data-logo-node cx="56" cy="83" r="5.5" />
      </g>
    </svg>
  );
}

/** Single-color version of the mark (for use on the orange field); every stroke follows currentColor. */
export function LogoMarkMono({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7">
        <path pathLength={1} d="M12 56v16l28 16" />
        <path pathLength={1} d="M24 54v11l14 8" />
        <path pathLength={1} d="M88 52v20" />
        <path pathLength={1} d="M12 42V28L50 6l32 18v8" />
        <path pathLength={1} d="M12 28l70 40-24 14" />
      </g>
      <g fill="currentColor">
        <circle cx="82" cy="34" r="5.5" />
        <circle cx="56" cy="83" r="5.5" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark />
      <span className="text-[1.3rem] font-semibold tracking-[-0.01em] [font-stretch:88%]">
        Noxe<span className="text-redline-ink">Tech</span>
      </span>
    </span>
  );
}

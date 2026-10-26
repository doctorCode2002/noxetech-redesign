"use client";

import { scrollToHash, useMotion } from "../motion/motion-provider";

/** Scroll to an in-page section the same way every in-page link on the site does. */
export function useJump() {
  const { lenis } = useMotion();
  return (hash: string, immediate = false) => void scrollToHash(hash, lenis, immediate);
}

/** Wraps an in-page link so it lands exactly at the section's scroll margin. */
export function JumpScope({
  hash,
  onJump,
  children,
}: {
  hash: string;
  onJump?: () => void;
  children: React.ReactNode;
}) {
  const jump = useJump();
  return (
    <span
      className="contents"
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        // Handled here (so the package can be preselected first); keep the site-wide hash
        // handler from scrolling a second time.
        e.nativeEvent.stopPropagation();
        onJump?.();
        jump(hash);
      }}
    >
      {children}
    </span>
  );
}

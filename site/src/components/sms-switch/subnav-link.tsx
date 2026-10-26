"use client";

import { useJump } from "./jump";

export function SubnavLink({ href, children }: { href: string; children: string }) {
  const jump = useJump();
  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        e.nativeEvent.stopPropagation(); // Lenis's anchor handler would scroll a second time
        history.replaceState(history.state, "", href);
        jump(href);
      }}
      className="block rounded-full px-3 py-1 text-[0.9rem] text-ink-2 transition-colors hover:bg-redline-wash hover:text-ink"
    >
      {children}
    </a>
  );
}

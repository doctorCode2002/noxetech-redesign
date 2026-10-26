"use client";

import { scrollToHash, useMotion } from "../motion/motion-provider";

/**
 * In-page link to a capability section, landing it just under the floating header (with Lenis
 * when it runs). Without JavaScript it is a plain anchor and the section's scroll-margin applies.
 */
export function AnchorLink({ href, onClick, children, ...rest }: React.ComponentProps<"a"> & { href: `#${string}` }) {
  const { lenis } = useMotion();
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const el = document.getElementById(href.slice(1));
        if (!el) return;
        e.preventDefault();
        // Keep Lenis's own anchor handler (which would scroll a second time) out of it.
        e.stopPropagation();
        history.replaceState(history.state, "", href);
        // Same landing spot as arriving from another page with the hash.
        scrollToHash(href, lenis);
        el.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}

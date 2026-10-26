"use client";

import Link from "next/link";
import { useMotion } from "./motion-provider";

type Props = React.ComponentProps<typeof Link> & {
  href: string;
  /** Shown large on the transition sheet; defaults to the link's text. */
  sheetLabel?: string;
};

/** Internal link that plays the page transition. Modified clicks behave normally. */
export function TransitionLink({ href, sheetLabel, onClick, children, ...rest }: Props) {
  const { navigate } = useMotion();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          rest.target === "_blank"
        )
          return;
        e.preventDefault();
        const text = sheetLabel ?? (typeof children === "string" ? children : "");
        navigate(href, text);
      }}
    >
      {children}
    </Link>
  );
}

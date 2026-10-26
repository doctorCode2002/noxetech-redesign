"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMotion } from "./motion-provider";

type Props = React.ComponentProps<typeof Link> & {
  href: string;
  /** Shown large on the transition sheet; defaults to the link's text. */
  sheetLabel?: string;
};

/** Internal link that plays the page transition. Modified clicks behave normally. */
export function TransitionLink({
  href,
  sheetLabel,
  onClick,
  onPointerEnter,
  onTouchStart,
  onFocus,
  prefetch = false,
  children,
  ...rest
}: Props) {
  const { navigate } = useMotion();
  const router = useRouter();
  // Links don't prefetch just for being on screen (that parsed route data mid-scroll); they
  // prefetch on intent instead, which still lands well before the transition sheet has covered.
  // Pass `prefetch={null}` for Next's default viewport prefetching (the header nav does).
  const intent = () => {
    if (prefetch === false && href.startsWith("/")) router.prefetch(href);
  };
  return (
    <Link
      href={href}
      prefetch={prefetch}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        intent();
      }}
      onTouchStart={(e) => {
        onTouchStart?.(e);
        intent();
      }}
      onFocus={(e) => {
        onFocus?.(e);
        intent();
      }}
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

"use client";

import { useEffect, useRef } from "react";

/**
 * Lights up the row under the pointer the moment the mouse moves over it.
 * While the page scrolls (including smooth-scroll's glide), the lit row only
 * switches off once it has actually moved out from under the pointer; it never
 * lights rows that merely pass under a still cursor.
 */
export function CapList({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = list.current!;
    let hot: Element | null = null;
    let x = -1;
    let y = -1;
    const set = (row: Element | null) => {
      if (row === hot) return;
      hot?.classList.remove("is-hot");
      row?.classList.add("is-hot");
      hot = row;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      set((e.target as Element).closest(".cap-row"));
    };
    const onLeave = () => set(null);
    const onScroll = () => {
      if (!hot) return;
      const under = document.elementFromPoint(x, y)?.closest(".cap-row");
      if (under !== hot) set(null);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <ul ref={list} className={className} style={style}>
      {children}
    </ul>
  );
}

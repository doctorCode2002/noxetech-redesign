/** Runs `cb` once the browser is idle after load, so heavy setup stays out of the critical path. */
export function whenIdle(cb: () => void, timeout = 2500) {
  let cancelled = false;
  let handle = 0;
  const run = () => {
    if (cancelled) return;
    if ("requestIdleCallback" in window) handle = requestIdleCallback(() => !cancelled && cb(), { timeout });
    else handle = globalThis.setTimeout(() => !cancelled && cb(), 200) as unknown as number;
  };
  if (document.readyState === "complete") run();
  else addEventListener("load", run, { once: true });
  return () => {
    cancelled = true;
    removeEventListener("load", run);
    if ("cancelIdleCallback" in window) cancelIdleCallback(handle);
    clearTimeout(handle);
  };
}

/**
 * Runs `cb` on the visitor's first scroll, touch, click or key press. Used for
 * scroll-driven sections, which are only seen after scrolling and are costly to set up.
 */
export function onFirstInteraction(cb: () => void) {
  const events = ["wheel", "scroll", "touchstart", "pointerdown", "keydown"] as const;
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    off();
    cb();
  };
  const off = () => events.forEach((e) => removeEventListener(e, run));
  events.forEach((e) => addEventListener(e, run, { passive: true, once: true }));
  // Arriving mid-page (back navigation, anchors) counts as already interacting.
  if (scrollY > 0) queueMicrotask(run);
  return () => {
    done = true;
    off();
  };
}

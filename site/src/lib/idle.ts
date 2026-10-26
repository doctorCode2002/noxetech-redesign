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
 * Runs `cb` once `el` is about to come into view (within `ahead` viewports below the fold), or
 * straight away if it is already on screen or scrolled past. Phones use this for scroll-driven
 * scenes: each is set up just before it is needed, in a short idle slot, instead of all at once
 * inside the first touch (which made that first swipe stutter).
 */
export function whenNear(el: Element, cb: () => void, ahead = 1.5) {
  let done = false;
  let handle = 0;
  const run = () => {
    if (done) return;
    done = true;
    io.disconnect();
    if ("requestIdleCallback" in window) handle = requestIdleCallback(cb, { timeout: 200 });
    else handle = globalThis.setTimeout(cb, 0) as unknown as number;
  };
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting || e.boundingClientRect.top < 0) run();
    },
    { rootMargin: `0px 0px ${ahead * 100}% 0px` },
  );
  io.observe(el);
  return () => {
    done = true;
    io.disconnect();
    if ("cancelIdleCallback" in window) cancelIdleCallback(handle);
    clearTimeout(handle);
  };
}

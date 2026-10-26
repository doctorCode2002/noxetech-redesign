import { ScrollTrigger } from "gsap/ScrollTrigger";

let frame = 0;

/**
 * Scenes are built lazily (on idle or first interaction), so they can be created out of page
 * order. A pin adds height to everything below it, so triggers must be measured top to bottom:
 * sort them into page order, then refresh once (batched, two frames later).
 */
export function settleScrollTriggers() {
  cancelAnimationFrame(frame);
  // Two frames: the first lets the new layout (and any lazily built pin spacers) commit.
  frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
  });
}

import { ScrollTrigger } from "gsap/ScrollTrigger";

let frame = 0;

/**
 * Scenes are built lazily (on idle or first interaction), so they can be created out of page
 * order. A pin adds height to everything below it, so triggers must be measured top to bottom:
 * sort them into page order, then refresh once (batched into the next frame).
 */
export function settleScrollTriggers() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
}

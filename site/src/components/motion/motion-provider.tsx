"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { settleScrollTriggers } from "@/lib/scroll-settle";
import { pageTitles } from "@/lib/site";
import { LogoMarkMono } from "../logo";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

type Motion = {
  lenis: Lenis | null;
  navigate: (href: string, label?: string) => void;
};

const MotionContext = createContext<Motion>({ lenis: null, navigate: () => {} });
export const useMotion = () => useContext(MotionContext);

export function prefersReducedMotion() {
  return typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Clearance under the fixed header when jumping to an in-page section. */
const HEADER_OFFSET = 88;

/**
 * Scroll to the element a `#hash` names. Each section's own CSS `scroll-margin-top` (e.g.
 * `scroll-mt-24`) decides where it lands, exactly as native anchor jumps do without JavaScript;
 * sections without one clear the fixed header by HEADER_OFFSET.
 */
export function scrollToHash(hash: string, lenis: Lenis | null, immediate = false) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const el = id ? document.getElementById(id) : null;
  if (!el) return false;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || HEADER_OFFSET;
  // Layout position (offsetTop chain), not getBoundingClientRect: transforms don't skew it, so a
  // page still sliding in from its entrance transition is measured where it will settle.
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  const top = y - margin;
  if (lenis) lenis.scrollTo(top, { immediate, force: true });
  else window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
  return true;
}

/**
 * Lock and unlock page scrolling for modals and menus. Uses Lenis when it runs; with reduced
 * motion there is no Lenis, so it falls back to clipping the root element.
 */
export function lockScroll(lenis: Lenis | null) {
  if (lenis) lenis.stop();
  else document.documentElement.style.overflow = "hidden";
}
export function unlockScroll(lenis: Lenis | null) {
  if (lenis) lenis.start();
  else document.documentElement.style.overflow = "";
}

/**
 * Owns smooth scrolling and page transitions.
 * Lenis runs on GSAP's ticker so ScrollTrigger always reads the smoothed position.
 * A navigation started from <TransitionLink> covers the page with a fresh sheet,
 * pushes the route, then uncovers the new page once the pathname changes.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const cover = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const route = useRef<HTMLSpanElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const covering = useRef(false);
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // lerp (frame-rate independent damping) rather than a fixed duration: it follows the wheel more
    // closely. Touch stays native (syncTouch off): native momentum, off the main thread.
    const l = new Lenis({
      autoRaf: false, // GSAP's ticker drives it; a second loop would double-step and jitter
      lerp: 0.1,
      stopInertiaOnNavigate: true,
    });
    const tick = (time: number) => l.raf(time * 1000);
    l.on("scroll", ScrollTrigger.update);
    // Prioritized, so Lenis updates before GSAP's tweens and ScrollTriggers read the scroll each frame.
    gsap.ticker.add(tick, false, true);
    // No lag smoothing: scroll and ScrollTrigger must stay in lockstep (tweens may jump after a stall).
    gsap.ticker.lagSmoothing(0);
    // Lenis is created on the client only; publishing it to context is the point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(l);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      setLenis(null);
    };
  }, []);

  // Every plain same-page "#section" link (tables of contents, chips…) goes through scrollToHash,
  // so all in-page jumps land the same way and the hash is kept in the URL.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(a instanceof HTMLAnchorElement) || a.target === "_blank") return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      if (!document.getElementById(decodeURIComponent(url.hash.slice(1)))) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToHash(url.hash, lenis);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  const navigate = useCallback(
    (href: string, text?: string) => {
      const target = new URL(href, location.href);
      if (target.pathname === location.pathname) {
        if (target.hash) {
          // Same page: glide to the section and record it in the URL (Next won't scroll for us).
          history.pushState(null, "", target.hash);
          scrollToHash(target.hash, lenis);
          return;
        }
        return lenis ? lenis.scrollTo(0) : scrollTo({ top: 0, behavior: "smooth" });
      }
      if (prefersReducedMotion() || !cover.current || covering.current)
        return router.push(href, { scroll: false });

      covering.current = true;
      lockScroll(lenis);
      if (label.current) label.current.textContent = pageTitles[target.pathname] ?? text ?? "";
      if (route.current) route.current.textContent = target.pathname;
      const c = cover.current;
      // The sheet covers the page, then the route starts loading straight away while the mark
      // draws itself and the title rises, so the animation overlaps the load instead of adding to it.
      intro.current?.kill();
      intro.current = gsap
        .timeline()
        .set(c, { autoAlpha: 1, clipPath: "inset(100% 0 0 0)" })
        .to(c, { clipPath: "inset(0% 0 0 0)", duration: 0.42, ease: "expo.inOut" })
        .call(() => router.push(href, { scroll: false }))
        .fromTo("[data-cover-rule]", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, 0.12)
        .fromTo(
          c.querySelectorAll("[data-cover-logo] path"),
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.5, stagger: 0.05, ease: "power2.inOut" },
          0.2,
        )
        .fromTo(
          c.querySelectorAll("[data-cover-logo] circle"),
          { scale: 0, transformOrigin: "50% 50%" },
          { scale: 1, duration: 0.3, ease: "back.out(3)", stagger: 0.08 },
          0.55,
        )
        .fromTo(
          "[data-cover-meta]",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "expo.out", stagger: 0.06 },
          0.3,
        )
        .fromTo(
          label.current,
          { yPercent: 60, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: "expo.out" },
          0.28,
        );
    },
    [lenis, router],
  );

  // A new route has rendered: reset scroll and uncover (or settle in after back/forward).
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    // Next's own scroll handling is off (scroll: false) so it never fights Lenis; reset here.
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    unlockScroll(lenis);
    // Re-measure once the new page has laid out: Lenis's own resize is debounced, so do it now,
    // then refresh triggers in page order.
    lenis?.resize();
    settleScrollTriggers();
    // Arriving at /page#section: jump there once the new page and its pins have been measured.
    if (location.hash) {
      const hash = location.hash;
      setTimeout(() => scrollToHash(hash, lenis, true), 120);
    }

    const page = document.getElementById("page");
    if (prefersReducedMotion()) {
      if (page) gsap.fromTo(page, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 });
      return;
    }
    if (covering.current && cover.current) {
      covering.current = false;
      const c = cover.current;
      const uncover = () =>
        gsap
          .timeline()
          .to(c, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "expo.inOut" })
          .set(c, { autoAlpha: 0 })
          .fromTo(page, { y: 32 }, { y: 0, duration: 0.8, ease: "expo.out", clearProps: "transform" }, 0.1);
      // Lift the sheet once the new page is here and the mark has finished drawing.
      const t = intro.current;
      if (t && t.isActive()) t.eventCallback("onComplete", uncover);
      else uncover();
    } else if (page) {
      gsap.fromTo(
        page,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "expo.out", clearProps: "all" },
      );
    }
  }, [pathname, lenis]);

  return (
    <MotionContext.Provider value={{ lenis, navigate }}>
      {children}
      <div
        ref={cover}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[70] bg-field text-on-field"
      >
        <div data-cover-rule className="absolute inset-x-0 top-0 h-1 origin-left bg-on-field" />
        <div className="shell flex h-full flex-col justify-between pb-[10vh] pt-[12vh]">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <span data-cover-logo>
                <LogoMarkMono className="size-12 sm:size-16" />
              </span>
              <span
                data-cover-meta
                className="text-[1.5rem] font-semibold tracking-[-0.01em] [font-stretch:88%]"
              >
                NoxeTech
              </span>
            </span>
            <span ref={route} data-cover-meta className="figures text-sm" />
          </div>
          <span ref={label} className="mega text-[clamp(3.5rem,13vw,12rem)] [font-stretch:80%]" />
        </div>
      </div>
    </MotionContext.Provider>
  );
}

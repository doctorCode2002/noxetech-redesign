"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const covering = useRef(false);
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ duration: 1.1, anchors: { offset: -88 } });
    const tick = (time: number) => l.raf(time * 1000);
    l.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
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

  const navigate = useCallback(
    (href: string, text?: string) => {
      const target = new URL(href, location.href);
      if (target.pathname === location.pathname) {
        if (target.hash) return router.push(href);
        return lenis ? lenis.scrollTo(0) : scrollTo({ top: 0, behavior: "smooth" });
      }
      if (prefersReducedMotion() || !cover.current || covering.current) return router.push(href);

      covering.current = true;
      lenis?.stop();
      if (label.current) label.current.textContent = text ?? "";
      gsap
        .timeline({ onComplete: () => router.push(href) })
        .set(cover.current, { autoAlpha: 1, clipPath: "inset(100% 0 0 0)" })
        .to(cover.current, { clipPath: "inset(0% 0 0 0)", duration: 0.42, ease: "expo.inOut" })
        .fromTo(
          "[data-cover-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "expo.out" },
          0.12,
        )
        .fromTo(
          label.current,
          { yPercent: 60, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: "expo.out" },
          0.22,
        );
    },
    [lenis, router],
  );

  // A new route has rendered: reset scroll and uncover (or settle in after back/forward).
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (!location.hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
    lenis?.start();
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const page = document.getElementById("page");
    if (prefersReducedMotion()) {
      if (page) gsap.fromTo(page, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 });
      return;
    }
    if (covering.current && cover.current) {
      covering.current = false;
      gsap
        .timeline()
        .to(cover.current, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "expo.inOut" })
        .set(cover.current, { autoAlpha: 0 })
        .fromTo(page, { y: 32 }, { y: 0, duration: 0.8, ease: "expo.out", clearProps: "transform" }, 0.1);
    } else if (page) {
      gsap.fromTo(page, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "expo.out", clearProps: "all" });
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
        <div className="shell flex h-full items-end pb-[10vh]">
          <span ref={label} className="mega text-[clamp(3.5rem,13vw,12rem)] [font-stretch:80%]" />
        </div>
      </div>
    </MotionContext.Provider>
  );
}

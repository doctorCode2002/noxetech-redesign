"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./logo";
import { TransitionLink } from "./motion/transition-link";
import { useMotion } from "./motion/motion-provider";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";

/** Wraps capsule parts that fold away when the capsule shrinks. */
function Fold({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`capsule-fold ${className}`}>
      {/* Vertical room so the tactile button's edge and shadow aren't clipped by the fold. */}
      <div className="-my-4 min-w-0 overflow-hidden py-4">{children}</div>
    </div>
  );
}

/**
 * Floating capsule navigation. Scrolling down shrinks it to the logo and the
 * log-in button (the menu button below lg, where log-in lives in the menu);
 * scrolling up, hovering or focusing it brings the rest back.
 */
export function Header() {
  const pathname = usePathname();
  const { lenis } = useMotion();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [shrunk, setShrunk] = useState(false);
  const [held, setHeld] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const collapsed = shrunk && !held && !open;

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      if (y < 80) setShrunk(false);
      else if (y > last + 6) setShrunk(true);
      else if (y < last - 6) setShrunk(false);
      last = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    if (open) addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, lenis]);

  useGSAP(
    () => {
      if (!open || !panel.current) return;
      gsap.fromTo(
        panel.current.querySelectorAll("[data-menu-item]"),
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.04, ease: "expo.out" },
      );
    },
    { dependencies: [open] },
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {open && (
        <div
          id="mobile-menu"
          ref={panel}
          data-lenis-prevent
          className="pointer-events-auto fixed inset-0 overflow-y-auto bg-paper pt-24 lg:hidden"
        >
          <nav aria-label="Mobile" className="shell pb-10">
            <ul>
              {nav.map((item) => (
                <li key={item.href} data-menu-item className="border-b border-rule">
                  <TransitionLink
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="display flex py-4 text-[2rem] text-ink aria-[current=page]:text-redline-ink"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
            <div data-menu-item className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/start-project">Start a Project</Button>
              <Button href="/portal" variant="solid" sheetLabel="Client Portal">
                Client Portal
              </Button>
              <span className="ml-auto">
                <ThemeToggle />
              </span>
            </div>
          </nav>
        </div>
      )}

      {/* Side gutters match the hero card, so on phones the capsule lines up with its edges. */}
      <div className="flex justify-center px-2 pt-3 sm:px-3 sm:pt-4">
        <div
          data-collapsed={collapsed || undefined}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
          className="capsule pointer-events-auto flex h-14 w-full max-w-full items-center lg:w-auto rounded-full border border-rule bg-sheet/90 py-2 pl-3 pr-2 shadow-sheet backdrop-blur-md"
        >
          <TransitionLink
            href="/"
            sheetLabel="NoxeTech"
            aria-label="NoxeTech home"
            className="flex shrink-0 items-center rounded-full"
          >
            <Logo />
          </TransitionLink>

          <Fold className="hidden lg:grid">
            <nav aria-label="Main" className="pl-6 xl:pl-10">
              <ul className="flex items-center gap-1 xl:gap-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className="block whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] xl:px-4 text-ink-2 transition-colors duration-150 hover:bg-redline-wash hover:text-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Fold>

          <div className="ml-auto flex shrink-0 items-center gap-1 pl-3 xl:pl-8">
            <Fold className="hidden sm:grid">
              <div className="pr-1">
                <Button href="/start-project" size="sm">
                  Start a Project
                </Button>
              </div>
            </Fold>
            <span className="hidden lg:block">
              <Button href="/portal" variant="solid" size="sm" sheetLabel="Client Portal">
                Client Portal
              </Button>
            </span>
            <div className="lg:hidden">
              <button
                type="button"
                className="ml-1 inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-redline-wash"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpenOn(open ? null : pathname)}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

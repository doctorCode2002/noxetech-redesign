"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const current = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

/** Re-renders whenever <html data-theme> changes, whoever changed it. */
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function apply(theme: Theme, save: boolean) {
  if (save) {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }
  document.documentElement.dataset.theme = theme;
}

/** Light/dark switch: two states only. The choice is remembered across visits. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, current, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply(next, true);
    // The new theme washes out from the button.
    const r = e.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${r.left + r.width / 2}px`);
    root.style.setProperty("--vt-y", `${r.top + r.height / 2}px`);
    root.dataset.themeSwitching = "";
    const t = document.startViewTransition(() => apply(next, true));
    t.finished.finally(() => delete root.dataset.themeSwitching);
  }

  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex size-12 items-center justify-center rounded-full border border-rule bg-sheet/90 text-ink shadow-sheet backdrop-blur-md transition-colors duration-150 hover:border-ink"
    >
      <Icon className="size-5" strokeWidth={1.75} />
    </button>
  );
}

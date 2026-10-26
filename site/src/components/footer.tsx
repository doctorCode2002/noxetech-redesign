import { footerNav, legalNav, site } from "@/lib/site";
import { TransitionLink } from "./motion/transition-link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rule bg-sheet">
      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-sm text-[1.05rem] text-ink">
            Custom Software & Technology Solutions. We design, architect, and engineer digital products, custom
            software systems, and technology solutions built precisely to client specifications.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block font-medium text-ink underline decoration-rule-strong hover:decoration-field"
          >
            {site.email}
          </a>
        </div>
        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title} className="md:col-span-2">
            <h2 className="text-sm font-semibold text-ink">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((l) => (
                <li key={l.href}>
                  <TransitionLink href={l.href} className="text-ink-2 transition-colors hover:text-ink">
                    {l.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      {/* The wordmark is sized from its container's width (26cqi ≈ its measured 3.79 width-to-size ratio), so it always fits edge to edge. */}
      <div aria-hidden="true" className="shell">
        <div className="[container-type:inline-size]">
          <p className="mega select-none whitespace-nowrap pb-1 text-[26cqi] leading-[0.82] [font-stretch:75%]">
            Noxe<span className="text-redline-ink">Tech</span>
          </p>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="shell flex flex-col gap-3 py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NoxeTech. All rights reserved. • Custom Technology Solutions</p>
          <ul className="flex gap-5">
            {legalNav.map((l) => (
              <li key={l.href}>
                <TransitionLink href={l.href} className="hover:text-ink">
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

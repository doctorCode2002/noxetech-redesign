"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, Info, Minus, Plus, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { input, label } from "../form/fields";
import { prefersReducedMotion } from "../motion/motion-provider";
import { ScrambleValue } from "../scramble";
import {
  MAX_SEATS,
  PACKAGE_EVENT,
  SEAT_PRICE,
  base,
  editionCard,
  features,
  money,
  packageTabs,
  themes,
  type PackageId,
} from "./data";

// What each product theme looks like, for the small swatches (product UI colours, same in both site themes).
const swatch: Record<string, [string, string, string]> = {
  default: ["#0f1115", "#262a33", "#ff6a1a"],
  executive: ["#1e2228", "#3a3f47", "#b8a48a"],
  cyber: ["#05121a", "#0e2a36", "#22d3ee"],
  amber: ["#120d02", "#2a1f06", "#f5a524"],
  silver: ["#e6e8eb", "#9ba1aa", "#33373d"],
};

const stepLabel = `${label} flex items-center gap-2`;

/**
 * The commercial configurator, rebuilt from the live original: package, add-ons (Custom only),
 * theme, sub-admin seats, coupon, and a summary that recalculates as you go.
 *
 * Every change is drawn as a message routed through the switch: a pulse leaves the step you
 * touched, runs down the route line and lands in the summary, which re-prices and stamps a
 * delivery receipt. Checkout, coupons and payment are switched off in this preview build.
 */
export function Configurator() {
  const [pkg, setPkg] = useState<PackageId>("lite");
  const [picked, setPicked] = useState<string[]>([]);
  const [theme, setTheme] = useState("default");
  const [seats, setSeats] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponNote, setCouponNote] = useState(false);
  const [seq, setSeq] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const route = useRef<HTMLDivElement>(null);
  const pulse = useRef<HTMLSpanElement>(null);
  const flash = useRef<HTMLSpanElement>(null);

  const pulseTo = useRef<((step: string) => void) | null>(null);

  // The pulse animation is built once, inside the GSAP context, and called from handlers.
  useGSAP(
    (_ctx, contextSafe) => {
      /** Send a pulse from the step that changed down the route line into the summary. */
      pulseTo.current = contextSafe!((step: string) => {
        if (prefersReducedMotion() || !route.current || !pulse.current) return;
        const node = route.current.querySelector<HTMLElement>(`[data-node="${step}"]`);
        if (!node) return;
        const top = route.current.getBoundingClientRect().top;
        const from = node.getBoundingClientRect().top - top + node.offsetHeight / 2;
        const to = route.current.offsetHeight;
        gsap.killTweensOf([pulse.current, flash.current]);
        gsap.fromTo(node, { scale: 1.7 }, { scale: 1, duration: 0.5, ease: "expo.out" });
        gsap
          .timeline()
          .fromTo(
            pulse.current,
            { y: from, autoAlpha: 1 },
            { y: to, duration: Math.min(0.7, 0.25 + (to - from) / 1600), ease: "power2.in" },
          )
          .to(pulse.current, { autoAlpha: 0, duration: 0.15 })
          .fromTo(flash.current, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.9, ease: "power2.out" }, "<");
      });
      return () => {
        pulseTo.current = null;
      };
    },
    { scope: root },
  );

  const ping = (step: string) => {
    setSeq((s) => s + 1);
    pulseTo.current?.(step);
  };

  // Edition cards and the hero jump here with a package already chosen.
  useEffect(() => {
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<PackageId>).detail;
      if (id === "lite" || id === "pro" || id === "custom") {
        setPkg(id);
        setSeq((s) => s + 1);
        // Let the page scroll to the configurator first, then route the change.
        setTimeout(() => pulseTo.current?.("package"), 700);
      }
    };
    addEventListener(PACKAGE_EVENT, onPick);
    return () => removeEventListener(PACKAGE_EVENT, onPick);
  }, []);

  const chosenFeatures = pkg === "custom" ? features.filter((f) => picked.includes(f.id)) : [];
  const chosenTheme = themes.find((t) => t.id === theme)!;
  const extras = [
    ...chosenFeatures.map((f) => ({ id: f.id, line: f.name, amount: f.price })),
    ...(chosenTheme.price ? [{ id: "theme", line: `Theme: ${chosenTheme.name}`, amount: chosenTheme.price }] : []),
  ];
  const seatFee = seats * SEAT_PRICE;
  // As on the live original: the monthly total includes the seats (e.g. Custom + Finance Pro +
  // Executive Dark + 1 seat = $368.00), which are also itemised below it.
  const monthly = base[pkg].amount + extras.reduce((s, x) => s + x.amount, 0) + seatFee;

  const choosePkg = (id: PackageId) => {
    if (id === pkg) return;
    setPkg(id);
    ping("package");
  };
  const toggleFeature = (id: string) => {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    ping("features");
  };
  const chooseTheme = (id: string) => {
    setTheme(id);
    ping("theme");
  };
  const changeSeats = (d: number) => {
    setSeats((s) => Math.max(0, Math.min(MAX_SEATS, s + d)));
    ping("seats");
  };

  return (
    <div ref={root} className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
      {/* ---------- the route: steps 1–5 ---------- */}
      <div ref={route} className="relative min-w-0 pl-8 sm:pl-12 lg:col-span-7">
        <span aria-hidden="true" className="absolute bottom-0 left-2 top-4 w-px bg-rule sm:left-4" />
        <span
          ref={pulse}
          aria-hidden="true"
          className="invisible absolute -left-1 top-0 size-4 -translate-y-1/2 rounded-full bg-field shadow-[0_0_0_4px_var(--redline-wash)] sm:left-1"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 size-4 translate-y-1/2 rounded-full border-2 border-field bg-paper sm:left-2"
        />

        <Step node="package">
          <fieldset>
            <legend className={stepLabel}>CHOOSE PACKAGE</legend>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {packageTabs.map((t) => {
                const on = pkg === t.id;
                return (
                  <label
                    key={t.id}
                    className={`min-w-0 cursor-pointer rounded-xl border px-3 py-3 transition-colors sm:px-4 ${
                      on ? "border-field bg-redline-wash" : "border-rule bg-sheet hover:border-rule-strong"
                    }`}
                  >
                    <input
                      type="radio"
                      name="package"
                      value={t.id}
                      checked={on}
                      onChange={() => choosePkg(t.id)}
                      className="peer sr-only"
                    />
                    <span className="block font-semibold uppercase tracking-[0.04em] text-ink">{t.name}</span>
                    <span
                      className={`figures mt-1 block text-[0.75rem] sm:text-[0.8rem] ${
                        on ? "text-redline-ink" : "text-ink-3"
                      }`}
                    >
                      {t.sub}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {pkg === "pro" && (
            <div className="mt-4 rounded-xl border border-rule p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Already included in this edition
              </p>
              <ul className="mt-2">
                <li className="flex items-center gap-2 text-ink">
                  <Check aria-hidden="true" className="size-4 text-redline-ink" strokeWidth={3} />
                  Finance Pro
                </li>
              </ul>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-rule bg-sheet p-4 sm:p-6">
            <div>
              <p className="font-semibold text-ink">{editionCard[pkg].title}</p>
              <p className="text-sm text-ink-2">{editionCard[pkg].body}</p>
            </div>
            <p className="figures text-redline-ink">{editionCard[pkg].price}</p>
          </div>
        </Step>

        {pkg === "custom" && (
          <Step node="features">
            <fieldset>
              <legend className={stepLabel}>2. Select Premium Features (+$XX / mo)</legend>
              <div className="mt-4 grid gap-3">
                {features.map((f) => (
                  <Option
                    key={f.id}
                    type="checkbox"
                    name="features"
                    checked={picked.includes(f.id)}
                    onChange={() => toggleFeature(f.id)}
                    title={f.name}
                    desc={f.desc}
                    price={`+${money(f.price)} / mo`}
                  />
                ))}
              </div>
            </fieldset>
          </Step>
        )}

        <Step node="theme">
          <fieldset>
            <legend className={stepLabel}>3. Select Theme (+$XX / mo)</legend>
            <div className="mt-4 grid gap-3">
              {themes.map((t) => (
                <Option
                  key={t.id}
                  type="radio"
                  name="theme_selection"
                  checked={theme === t.id}
                  onChange={() => chooseTheme(t.id)}
                  title={t.name}
                  desc={t.desc}
                  price={t.price ? `+${money(t.price)} / mo` : "Included"}
                  swatch={swatch[t.id]}
                />
              ))}
            </div>
          </fieldset>
        </Step>

        <Step node="seats">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 id="seats-label" className={stepLabel}>
              4. Sub Admin Licenses
            </h3>
            <p className="figures text-sm text-redline-ink">
              <span>$</span>
              <span>30.00</span> <span>/ user / month</span>
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-rule bg-sheet p-4 sm:p-6">
            <div className="min-w-0">
              <p className="font-semibold text-ink">Sub Admin Operator Seats</p>
              <p className="figures mt-1 text-sm text-ink-2">
                Monthly License Fee: $<ScrambleValue value={seatFee.toFixed(2)} />
                /month
              </p>
              <p className="mt-1 text-sm text-ink-3">
                Monthly licensing obligation; billed separately from edition subscription.
              </p>
            </div>
            <div role="group" aria-labelledby="seats-label" className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeSeats(-1)}
                disabled={seats === 0}
                aria-label="Remove a seat"
                className="flex size-10 items-center justify-center rounded-full border border-rule-strong text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus aria-hidden="true" className="size-4" />
              </button>
              <output aria-live="polite" className="figures w-10 text-center text-[1.25rem] text-ink">
                {seats}
              </output>
              <button
                type="button"
                onClick={() => changeSeats(1)}
                disabled={seats === MAX_SEATS}
                aria-label="Add a seat"
                className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </Step>

        <Step node="coupon" last>
          <label htmlFor="coupon" className={stepLabel}>
            5. Coupon
          </label>
          <form
            className="mt-2 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setCouponNote(true);
            }}
          >
            <div className="relative min-w-0 flex-1">
              <Tag aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-ink-3" />
              <input
                id="coupon"
                className={`${input} figures pl-12 uppercase placeholder:normal-case`}
                placeholder="Enter coupon or offer code"
                autoComplete="off"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponNote(false);
                }}
                aria-describedby={couponNote ? "coupon-note" : undefined}
              />
            </div>
            <Button type="submit" variant="secondary" className="mt-2 !h-[3.25rem] shrink-0">
              Apply
            </Button>
          </form>
          {couponNote && (
            <p id="coupon-note" role="status" className="mt-2 flex items-center gap-2 text-sm text-ink-2">
              <Info aria-hidden="true" className="size-4 shrink-0 text-redline-ink" />
              Coupons can’t be applied in this preview build.
            </p>
          )}
        </Step>
      </div>

      {/* ---------- 6. the summary, styled as a delivery receipt ---------- */}
      <aside
        aria-labelledby="summary-title"
        className="relative min-w-0 overflow-hidden rounded-2xl border border-rule bg-sheet p-6 shadow-sheet sm:p-8 lg:sticky lg:top-28 lg:col-span-5"
      >
        <span
          ref={flash}
          aria-hidden="true"
          className="pointer-events-none invisible absolute inset-0 bg-redline-wash"
        />
        <div className="relative">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 id="summary-title" className="display text-[1.9rem]">
              6. Pricing Summary
            </h3>
            <p aria-hidden="true" className="figures text-[0.7rem] text-ink-3">
              DLR · id:<ScrambleValue value={String(seq).padStart(4, "0")} /> ·{" "}
              <span className="text-redline-ink">stat:DELIVRD</span>
            </p>
          </div>

          <div className="figures mt-6 border-t border-dashed border-rule-strong text-[0.92rem]">
            <div className="flex justify-between gap-4 py-3">
              <span className="font-sans text-ink-2">{base[pkg].line}</span>
              <span>
                <ScrambleValue value={money(base[pkg].amount)} />
              </span>
            </div>
            {extras.length > 0 && (
              <>
                <p className="pt-2 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                  Selected Feature(s):
                </p>
                {extras.map((x) => (
                  <div key={x.id} className="flex justify-between gap-4 py-2">
                    <span className="font-sans text-ink-2">{x.line}</span>
                    <span className="text-redline-ink">+{money(x.amount)}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-dashed border-rule-strong pt-4">
            <p className="max-w-[14ch] text-xs font-semibold uppercase tracking-[0.08em] text-ink">
              Monthly Subscription Total
            </p>
            <p className="text-right">
              <span className="figures block text-[clamp(1.75rem,3vw,2.25rem)] leading-none text-redline-ink">
                <ScrambleValue value={money(monthly)} /> / mo
              </span>
              <span className="figures mt-1 block text-xs text-ink-3">USD</span>
            </p>
          </div>

          {seats > 0 && (
            <div className="mt-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-dashed border-rule-strong pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink">Sub-Admin Licenses</p>
              <p className="text-right">
                <span className="figures block text-[1.25rem] text-ink">
                  <ScrambleValue value={money(seatFee)} /> / mo
                </span>
                <span className="figures mt-1 block text-xs text-ink-3">
                  {seats} user(s) × $30.00 / user / month
                </span>
              </p>
            </div>
          )}

          <Button disabled className="mt-8 w-full" aria-describedby="checkout-note">
            Proceed to Secure Checkout
          </Button>
          <p id="checkout-note" className="mt-4 flex gap-2 text-sm text-ink-3">
            <Info aria-hidden="true" className="mt-1 size-4 shrink-0 text-redline-ink" />
            Preview build: checkout is not connected, so nothing is charged or sent.
          </p>
        </div>
      </aside>
    </div>
  );
}

/** One hop on the route: a node on the line beside its step. */
function Step({ node, last, children }: { node: string; last?: boolean; children: React.ReactNode }) {
  return (
    <div className={`relative ${last ? "pb-12" : "pb-12 sm:pb-16"}`}>
      <span
        aria-hidden="true"
        data-node={node}
        className="absolute -left-8 top-1 size-4 rounded-full border-2 border-ink bg-paper sm:-left-10"
      />
      {children}
    </div>
  );
}

/** A radio/checkbox card with a price, in the same style as the shared `Choice`. */
function Option({
  type,
  name,
  checked,
  onChange,
  title,
  desc,
  price,
  swatch: colors,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  desc: string;
  price: string;
  swatch?: [string, string, string];
}) {
  return (
    <label
      className={`relative flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
        checked ? "border-field bg-redline-wash" : "border-rule bg-sheet hover:border-rule-strong"
      }`}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`mt-1 inline-flex size-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-field ${
          type === "radio" ? "rounded-full" : "rounded-md"
        } ${checked ? "border-field bg-field text-on-field" : "border-rule-strong"}`}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-4">
          <span className="font-semibold text-ink">{title}</span>
          <span className={`figures text-sm ${checked ? "text-redline-ink" : "text-ink-2"}`}>{price}</span>
        </span>
        <span className="mt-1 block text-sm text-ink-2">{desc}</span>
      </span>
      {colors && (
        <span
          aria-hidden="true"
          className="mt-1 hidden h-8 w-12 shrink-0 overflow-hidden rounded-md border border-rule sm:flex"
          style={{ background: colors[0] }}
        >
          <span className="w-3" style={{ background: colors[1] }} />
          <span className="m-1 h-1 w-4 rounded-full" style={{ background: colors[2] }} />
        </span>
      )}
    </label>
  );
}

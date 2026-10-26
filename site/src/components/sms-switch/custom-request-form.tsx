"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { ErrorNote, PreviewNote, input, label } from "../form/fields";
import { errors as intakeErrors } from "../intake/intake-data";
import { prefersReducedMotion, useMotion } from "../motion/motion-provider";

// Original form, verbatim: labels, placeholders and options.
const contact = [
  ["fullName", "Full Name *", "Your full name", "text", "name"],
  ["company", "Company Name", "Company / Carrier", "text", "organization"],
  ["email", "Email *", "email@company.com", "email", "email"],
  ["techEmail", "Technical Contact Email", "tech@company.com", "email", "off"],
  ["phone", "Phone / WhatsApp", "+1 (555) 000-0000", "tel", "tel"],
  ["country", "Country", "Country", "text", "country-name"],
] as const;

const capacity = [
  ["tps", "Expected Traffic / TPS", "e.g., 500 TPS"],
  ["volume", "Expected Monthly SMS Volume", "e.g., 50M messages/month"],
  ["smpp", "Number of SMPP Connections", "e.g., 20 connections"],
  ["users", "Users / Sub Admins", "e.g., 15 users"],
] as const;

const selects = [
  ["deployment", "Preferred Deployment Model", ["Cloud Hosted", "On-Premise", "Hybrid"]],
  ["billing", "Preferred Billing Period", ["Monthly", "Quarterly", "Semi-Annual", "Annual"]],
] as const;

const texts = [
  ["features", "Required Features", "List specific features you need...", 3],
  ["infrastructure", "Existing Infrastructure", "Describe your current setup...", 3],
  ["notes", "Project Notes / Requirements", "Any additional requirements or questions...", 4],
] as const;

const budgets = [
  "Prefer not to say",
  "Under $500/mo",
  "$500 – $1,000/mo",
  "$1,000 – $3,000/mo",
  "$3,000 – $5,000/mo",
  "$5,000+/mo",
];

type Key =
  | (typeof contact)[number][0]
  | (typeof capacity)[number][0]
  | (typeof selects)[number][0]
  | (typeof texts)[number][0]
  | "budget";

type Data = Record<Key, string> & { consent: boolean };

const empty: Data = {
  fullName: "",
  company: "",
  email: "",
  techEmail: "",
  phone: "",
  country: "",
  tps: "",
  volume: "",
  smpp: "",
  users: "",
  deployment: "",
  billing: "",
  features: "",
  infrastructure: "",
  notes: "",
  budget: "Prefer not to say",
  consent: false,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The provisioning sheet: the capacity you ask for, read back as a switch would provision it. */
const sheet: [Key, string][] = [
  ["tps", "Expected Traffic / TPS"],
  ["volume", "Expected Monthly SMS Volume"],
  ["smpp", "Number of SMPP Connections"],
  ["users", "Users / Sub Admins"],
  ["deployment", "Preferred Deployment Model"],
  ["billing", "Preferred Billing Period"],
];

/**
 * "Request a Custom Version", rebuilt. Validates for real; the submit is simulated in the
 * browser and nothing is sent. Beside the form, a provisioning sheet fills in as the
 * technical requirements are typed.
 */
export function CustomRequestForm() {
  const [d, setD] = useState<Data>(empty);
  const [err, setErr] = useState<Partial<Record<Key | "consent", string>>>({});
  const [phase, setPhase] = useState<"form" | "sending" | "sent">("form");
  const top = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const { lenis } = useMotion();

  useEffect(() => () => clearTimeout(timer.current), []);

  useGSAP(
    () => {
      if (phase !== "sent" || prefersReducedMotion()) return;
      gsap.from("[data-sent]", { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.06, ease: "expo.out" });
    },
    { scope: top, dependencies: [phase] },
  );

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    if (err[k as Key]) setErr((e) => ({ ...e, [k]: undefined }));
  };

  function scrollTo(el: HTMLElement | null, offset: number) {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset });
    else el.scrollIntoView({ block: "center", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const x: typeof err = {};
    if (!d.fullName.trim()) x.fullName = intakeErrors.fullName;
    if (!EMAIL.test(d.email.trim())) x.email = intakeErrors.email;
    if (d.techEmail.trim() && !EMAIL.test(d.techEmail.trim()))
      x.techEmail = "Please provide a valid technical contact email.";
    if (!d.consent) x.consent = "Please confirm your consent so the technical team can contact you.";
    setErr(x);
    if (Object.keys(x).length) {
      requestAnimationFrame(() => {
        const first = top.current?.querySelector<HTMLElement>("[aria-invalid='true']");
        first?.focus({ preventScroll: true });
        scrollTo(first ?? null, -160);
      });
      return;
    }
    // Simulated submit: nothing leaves the browser.
    setPhase("sending");
    timer.current = window.setTimeout(() => {
      setPhase("sent");
      scrollTo(top.current, -112);
    }, prefersReducedMotion() ? 200 : 1100);
  }

  function restart() {
    setD(empty);
    setErr({});
    setPhase("form");
  }

  const filled = sheet.filter(([k]) => d[k].trim()).length;

  const specCard = (
    <div className="rounded-2xl bg-ground p-6 text-on-ground shadow-sheet">
      <div className="flex items-center justify-between gap-4 border-b border-ground-rule pb-4">
        <p className="figures text-xs text-field">SMS SWITCH · CUSTOM</p>
        <p className="figures text-xs text-on-ground-2">
          {filled}/{sheet.length}
        </p>
      </div>
      <dl className="mt-2 text-[0.9rem]">
        {sheet.map(([k, l]) => {
          const v = d[k].trim();
          return (
            <div key={k} className="flex flex-col gap-1 border-b border-ground-rule py-3 last:border-0">
              <dt className="text-xs text-on-ground-2">{l}</dt>
              <dd className={`figures break-words ${v ? "text-on-ground" : "text-on-ground-2/60"}`}>
                {v || "—"}
              </dd>
            </div>
          );
        })}
      </dl>
      <div aria-hidden="true" className="mt-2 h-1 overflow-hidden rounded-full bg-ground-rule">
        <div
          className="h-full origin-left rounded-full bg-field transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${filled / sheet.length})` }}
        />
      </div>
    </div>
  );

  if (phase === "sent") {
    return (
      <div ref={top} className="mx-auto max-w-2xl py-8 text-center">
        <div data-sent>
          <PreviewNote />
        </div>
        <p
          data-sent
          className="mx-auto mt-10 flex size-14 items-center justify-center rounded-full bg-field text-on-field"
        >
          <Check aria-hidden="true" className="size-6" strokeWidth={3} />
        </p>
        <h2 data-sent className="display mt-6 text-[clamp(2rem,4vw,3rem)]">
          Custom request ready
        </h2>
        <p data-sent className="mx-auto mt-4 max-w-xl text-ink-2">
          Thank you, <strong className="text-ink">{d.fullName.trim()}</strong>.
        </p>
        <div data-sent className="mx-auto mt-10 max-w-sm text-left">
          {specCard}
        </div>
        <div data-sent className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Button href="/solutions/sms-switch" sheetLabel="SMS Switch">
            Back to SMS Switch
          </Button>
          <Button variant="text" onClick={restart}>
            Start a new request
          </Button>
        </div>
      </div>
    );
  }

  const field = (k: Key) => ({
    id: k,
    value: d[k],
    "aria-invalid": err[k] ? true : undefined,
    "aria-describedby": err[k] ? `${k}-error` : undefined,
    className: input,
  });

  return (
    <div ref={top} className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
      <form noValidate onSubmit={submit} className="min-w-0 space-y-6 lg:col-span-8" aria-busy={phase === "sending"}>
        <fieldset className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8">
          <legend className="sr-only">Contact Information</legend>
          <p aria-hidden="true" className="figures text-xs uppercase tracking-[0.12em] text-redline-ink">
            Contact Information
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {contact.map(([k, l, ph, type, ac]) => (
              <div key={k}>
                <label className={label} htmlFor={k}>
                  {l}
                </label>
                <input
                  {...field(k)}
                  type={type}
                  autoComplete={ac}
                  placeholder={ph}
                  maxLength={150}
                  required={l.endsWith("*")}
                  onChange={(e) => set(k, e.target.value)}
                />
                <ErrorNote id={`${k}-error`} text={err[k]} />
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8">
          <legend className="sr-only">Technical Requirements</legend>
          <p aria-hidden="true" className="figures text-xs uppercase tracking-[0.12em] text-redline-ink">
            Technical Requirements
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {capacity.map(([k, l, ph]) => (
              <div key={k}>
                <label className={label} htmlFor={k}>
                  {l}
                </label>
                <input {...field(k)} placeholder={ph} maxLength={100} onChange={(e) => set(k, e.target.value)} />
              </div>
            ))}
            {selects.map(([k, l, opts]) => (
              <div key={k}>
                <label className={label} htmlFor={k}>
                  {l}
                </label>
                <select {...field(k)} onChange={(e) => set(k, e.target.value)}>
                  <option value="">Select...</option>
                  {opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
            {texts.map(([k, l, ph, rows]) => (
              <div key={k} className="sm:col-span-2">
                <label className={label} htmlFor={k}>
                  {l}
                </label>
                <textarea
                  {...field(k)}
                  rows={rows}
                  placeholder={ph}
                  maxLength={4000}
                  onChange={(e) => set(k, e.target.value)}
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className={label} htmlFor="budget">
                Budget Range (optional)
              </label>
              <select {...field("budget")} onChange={(e) => set("budget", e.target.value)}>
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <div className="lg:hidden">{specCard}</div>

        <div
          className={`rounded-2xl border bg-sheet p-6 sm:p-8 ${err.consent ? "border-[#b91c1c] dark:border-[#f87171]" : "border-rule"}`}
        >
          <label htmlFor="consent" className="flex cursor-pointer gap-4">
            <input
              id="consent"
              type="checkbox"
              checked={d.consent}
              required
              aria-invalid={err.consent ? true : undefined}
              aria-describedby={err.consent ? "consent-error" : undefined}
              onChange={(e) => set("consent", e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={`mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-field ${
                d.consent ? "border-field bg-field text-on-field" : "border-rule-strong"
              }`}
            >
              {d.consent && <Check className="size-3" strokeWidth={3} />}
            </span>
            <span className="text-ink-2">
              I would like the NoxeTech technical team to contact me to discuss a custom deployment. I consent
              to NoxeTech processing the information provided for this purpose. *
            </span>
          </label>
          <ErrorNote id="consent-error" text={err.consent} />
        </div>

        <Button type="submit" disabled={phase === "sending"} className="w-full !h-14 text-[1.05rem]">
          {phase === "sending" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-5 animate-spin motion-reduce:animate-none" />
              Submitting…
            </>
          ) : (
            "Submit Custom Request"
          )}
        </Button>
      </form>

      <aside aria-label="Request summary" className="hidden min-w-0 lg:sticky lg:top-28 lg:col-span-4 lg:block">
        {specCard}
      </aside>
    </div>
  );
}

"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { Counter, ErrorNote, helper, input, label, PreviewNote } from "../form/fields";
import { TransitionLink } from "../motion/transition-link";
import { prefersReducedMotion, useMotion } from "../motion/motion-provider";
import { MessageSlip } from "./message-slip";

// Original options, in the original order.
export const inquiryTypes = [
  "General Inquiry",
  "Existing Project Discussion",
  "Partnership / Business",
  "Technical Question",
  "Other",
];

const MAX = 4000;
const MIN = 10;

// The original's validation messages were not captured. Name and email reuse the original intake
// wording; the rest is minimal, neutral microcopy.
const msg = {
  fullName: "Please provide your full name.",
  email: "Please provide a valid email address.",
  messageEmpty: "Please enter your message.",
  messageShort: `Please enter at least ${MIN} characters.`,
  consent: "Please confirm your consent to continue.",
};

export type ContactData = {
  websiteUrl: string; // honeypot
  fullName: string;
  email: string;
  company: string;
  phone: string;
  inquiryType: string;
  message: string;
  consent: boolean;
};

const empty: ContactData = {
  websiteUrl: "",
  fullName: "",
  email: "",
  company: "",
  phone: "",
  inquiryType: inquiryTypes[0],
  message: "",
  consent: false,
};

type Field = Exclude<keyof ContactData, "websiteUrl">;

/**
 * The original general message form: same fields, options, helper text and consent. It validates
 * for real and simulates sending in the browser (no network request). On send, the form folds
 * away and the message is filed as a slip showing exactly what the team will read.
 */
export function ContactForm() {
  const [d, setD] = useState<ContactData>(empty);
  const [err, setErr] = useState<Partial<Record<Field, string>>>({});
  const [phase, setPhase] = useState<"form" | "sending" | "sent">("form");
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const { lenis } = useMotion();

  useEffect(() => () => clearTimeout(timer.current), []);

  const set = <K extends keyof ContactData>(k: K, v: ContactData[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    // Clear a field's error as soon as it is edited.
    if (k in err) setErr((e) => ({ ...e, [k]: undefined }));
  };

  function validate() {
    const e: Partial<Record<Field, string>> = {};
    if (!d.fullName.trim()) e.fullName = msg.fullName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = msg.email;
    if (!d.message.trim()) e.message = msg.messageEmpty;
    else if (d.message.trim().length < MIN) e.message = msg.messageShort;
    if (!d.consent) e.consent = msg.consent;
    setErr(e);
    return e;
  }

  const { contextSafe } = useGSAP({ scope: root });


  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (phase !== "form") return;
    const e = validate();
    const first = (Object.keys(e) as Field[])[0];
    if (first) {
      root.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (d.websiteUrl) return; // honeypot filled: silently ignore
    setPhase("sending");
    const fold = contextSafe(() => {
      const card = root.current?.querySelector("[data-form-body]");
      if (!card || prefersReducedMotion()) return Promise.resolve();
      return new Promise<void>((done) =>
        gsap.to(card, { opacity: 0, y: -16, scale: 0.98, duration: 0.35, ease: "power2.in", onComplete: done }),
      );
    });
    // Simulated send: nothing leaves the browser.
    timer.current = window.setTimeout(async () => {
      await fold();
      setPhase("sent");
      const el = root.current;
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -112 });
        else el.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    }, 900);
  }

  function reset() {
    setD(empty);
    setErr({});
    setPhase("form");
  }

  if (phase === "sent") {
    return (
      <div ref={root} className="scroll-mt-28">
        <div className="mb-6">
          <PreviewNote />
        </div>
        <MessageSlip data={d} onReset={reset} />
      </div>
    );
  }

  const describe = (k: Field, extra?: string) =>
    [extra, err[k] ? `${k}-error` : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div ref={root} className="scroll-mt-28">
      <form noValidate onSubmit={submit} data-form-body className="rounded-2xl border border-rule bg-sheet p-6 sm:p-10">
        <h2 id="message-title" className="display text-[clamp(1.9rem,3.2vw,2.6rem)]">
          Send a General Message
        </h2>
        <p className="mt-3 border-b border-rule pb-6 text-ink-2">
          Fill out the form below and our team will review your inquiry. All fields marked with an asterisk (
          <span className="text-redline-ink">*</span>) are required.
        </p>

        {/* Honeypot: invisible to people, tempting to bots. */}
        <div aria-hidden="true" className="sr-only">
          <label>
            Website (Leave blank)
            <input
              type="text"
              name="websiteUrl"
              tabIndex={-1}
              autoComplete="off"
              value={d.websiteUrl}
              onChange={(e) => set("websiteUrl", e.target.value)}
            />
          </label>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {(
            [
              ["fullName", "Full Name", true, "e.g. Alex Mercer", "text", "name", 100],
              ["email", "Email Address", true, "name@company.com", "email", "email", 150],
              ["company", "Company / Organization", false, "Organization name", "text", "organization", 150],
              ["phone", "Phone / WhatsApp", false, "+1 (555) 000-0000", "tel", "tel", 50],
            ] as const
          ).map(([k, l, req, ph, type, ac, max]) => (
            <div key={k}>
              <label className={label} htmlFor={`c-${k}`}>
                {l}{" "}
                {req ? (
                  <span className="text-redline-ink">*</span>
                ) : (
                  <span className="font-normal text-ink-3">(Optional)</span>
                )}
              </label>
              <input
                id={`c-${k}`}
                name={k}
                type={type}
                autoComplete={ac}
                required={req}
                maxLength={max}
                placeholder={ph}
                className={input}
                aria-invalid={!!err[k as Field]}
                aria-describedby={describe(k as Field)}
                value={d[k]}
                onChange={(e) => set(k, e.target.value)}
              />
              <ErrorNote id={`${k}-error`} text={err[k as Field]} />
            </div>
          ))}

          <div className="sm:col-span-2">
            <label className={label} htmlFor="c-inquiryType">
              Inquiry Category <span className="text-redline-ink">*</span>
            </label>
            <div className="relative mt-2">
              <select
                id="c-inquiryType"
                name="inquiryType"
                className={`${input.replace("mt-2 ", "")} appearance-none pr-12`}
                value={d.inquiryType}
                onChange={(e) => set("inquiryType", e.target.value)}
              >
                {inquiryTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-3"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={label} htmlFor="c-message">
              Message <span className="text-redline-ink">*</span>
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={6}
              required
              maxLength={MAX}
              placeholder="Please share details about your inquiry..."
              className={`${input} resize-y`}
              aria-invalid={!!err.message}
              aria-describedby={describe("message", "message-help")}
              value={d.message}
              onChange={(e) => set("message", e.target.value)}
            />
            <div className="flex items-start justify-between gap-4">
              <p id="message-help" className={helper}>
                Minimum 10 characters.
              </p>
              <Counter value={d.message} max={MAX} />
            </div>
            <ErrorNote id="message-error" text={err.message} />
          </div>
        </div>

        <div className="mt-8">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              name="consent"
              checked={d.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={!!err.consent}
              aria-describedby={describe("consent")}
              className="mt-1 size-4 shrink-0 accent-[var(--field)]"
            />
            <span>
              I consent to NoxeTech processing this information solely to respond to my inquiry in accordance
              with the{" "}
              <TransitionLink href="/privacy" className="text-redline-ink underline">
                Privacy Policy
              </TransitionLink>
              . <span className="text-redline-ink">*</span>
            </span>
          </label>
          <ErrorNote id="consent-error" text={err.consent} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <Button type="submit" disabled={phase === "sending"} aria-live="polite">
            {phase === "sending" ? "Sending…" : "Send Message"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <p className="figures text-xs text-ink-3">Protected by server anti-abuse filters</p>
        </div>
      </form>
    </div>
  );
}

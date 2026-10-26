"use client";

import gsap from "gsap";
import { Check, Info } from "lucide-react";
import { Choice, Counter, ErrorNote, helper, input, label } from "../form/fields";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { TransitionLink } from "../motion/transition-link";
import { prefersReducedMotion, useMotion } from "../motion/motion-provider";
import { HoldButton } from "./hold-button";
import {
  audiences,
  budgets,
  contactMethods,
  errors as msg,
  features,
  projectTypes,
  stages,
  steps,
  timelines,
} from "./intake-data";
import { Ticket } from "./ticket";

type Data = {
  website: string; // honeypot
  projectType: string;
  projectName: string;
  description: string;
  goal: string;
  currentStage: string;
  situation: string;
  features: string[];
  otherRequirements: string;
  integrations: "No" | "Yes" | "Not sure";
  integrationDetails: string;
  users: string[];
  timeline: string;
  launchDate: string;
  budgetStatus: string;
  budgetRange: string;
  fullName: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  country: string;
  contactMethod: string;
  notes: string;
  consent: boolean;
};

const empty: Data = {
  website: "",
  projectType: "",
  projectName: "",
  description: "",
  goal: "",
  currentStage: "",
  situation: "",
  features: [],
  otherRequirements: "",
  integrations: "Not sure",
  integrationDetails: "",
  users: [],
  timeline: "",
  launchDate: "",
  budgetStatus: "",
  budgetRange: "",
  fullName: "",
  email: "",
  company: "",
  role: "",
  phone: "",
  country: "",
  contactMethod: "No preference",
  notes: "",
  consent: false,
};

const UNDO_SECONDS = 5;

/* ---------- the wizard ---------- */

/**
 * The original 7-step project intake, rebuilt: same questions, options, helper text
 * and messages. Review ends in a hold-to-submit with a timed undo, and the
 * confirmation is a perforated ticket with the reference ID.
 *
 * Not connected to a backend yet: submitting is simulated in the browser and nothing is sent.
 */
export function IntakeWizard() {
  const [step, setStep] = useState(1);
  const [reached, setReached] = useState(1);
  const [d, setD] = useState<Data>(empty);
  const [err, setErr] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"form" | "pending" | "sent">("form");
  const [countdown, setCountdown] = useState(UNDO_SECONDS);
  const [refId, setRefId] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const { lenis } = useMotion();

  useEffect(() => () => clearInterval(timer.current), []);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((p) => ({ ...p, [k]: v }));
  const toggle = (k: "features" | "users", v: string) =>
    setD((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 1 && !d.projectType) e.projectType = msg.projectType;
    if (s === 2) {
      if (!d.description.trim()) e.description = msg.descriptionEmpty;
      else if (d.description.trim().length < 10) e.description = msg.descriptionShort;
    }
    if (s === 3 && !d.currentStage) e.currentStage = msg.currentStage;
    if (s === 4 && d.integrations === "Yes" && !d.integrationDetails.trim())
      e.integrationDetails = msg.integrations;
    if (s === 5) {
      if (!d.timeline) e.timeline = msg.timeline;
      if (!d.budgetStatus) e.budgetStatus = msg.budget;
    }
    if (s === 6) {
      if (!d.fullName.trim()) e.fullName = msg.fullName;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = msg.email;
    }
    if (s === 7 && !d.consent) e.consent = msg.consent;
    setErr(e);
    return Object.keys(e).length === 0;
  }

  function goTo(s: number) {
    setErr({});
    setStep(s);
    const el = top.current;
    if (el) {
      if (lenis) lenis.scrollTo(el, { offset: -96 });
      else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
    if (panel.current && !prefersReducedMotion())
      gsap.fromTo(
        panel.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "expo.out" },
      );
  }

  /** Bring the first error message into view (it may be far above the button that was pressed). */
  function showFirstError() {
    requestAnimationFrame(() => {
      const el = panel.current?.querySelector<HTMLElement>('[role="alert"]');
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -160 });
      else el.scrollIntoView({ block: "center", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
  }

  function next() {
    if (!validate(step)) return showFirstError();
    const n = Math.min(7, step + 1);
    setReached((r) => Math.max(r, n));
    goTo(n);
  }

  // Hold completes → a short window to undo, then the inquiry is "sent".
  function confirm() {
    if (!validate(7)) return showFirstError();
    if (d.website) return; // honeypot filled: silently ignore
    setPhase("pending");
    setCountdown(UNDO_SECONDS);
    let left = UNDO_SECONDS;
    clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      left -= 1;
      setCountdown(left);
      if (left <= 0) {
        clearInterval(timer.current);
        setRefId(`NX-${Date.now().toString(36).toUpperCase().slice(-6)}`);
        setPhase("sent");
        top.current?.scrollIntoView({ block: "start" });
      }
    }, 1000);
  }

  function undo() {
    clearInterval(timer.current);
    setPhase("form");
  }

  function restart() {
    setD(empty);
    setStep(1);
    setReached(1);
    setPhase("form");
    setRefId("");
  }

  if (phase === "sent") {
    return (
      <div ref={top} className="scroll-mt-28 py-8 text-center">
        <p className="mx-auto mb-8 flex max-w-xl items-center justify-center gap-2 rounded-lg border border-rule bg-sheet px-4 py-3 text-sm text-ink-2">
          <Info className="size-4 shrink-0 text-redline-ink" />
          Preview build: this form is not connected yet, so nothing was sent.
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-redline-ink">INQUIRY RECEIVED</p>
        <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">Project Inquiry Received</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-2">
          Thank you, <strong className="text-ink">{d.fullName}</strong>. The information you submitted has
          been sent to NoxeTech for technical evaluation and scope analysis.
        </p>
        <div className="mt-12">
          <Ticket referenceId={refId} category={d.projectType} timeline={d.timeline} email={d.email} />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Button href="/">Return Home</Button>
          <Button href="/how-we-work" variant="secondary" sheetLabel="How We Work">
            Explore How We Work
          </Button>
          <Button variant="text" onClick={restart}>
            Submit another project inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-28">
      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="sr-only">
        <label>
          Website (Leave blank)
          <input
            tabIndex={-1}
            autoComplete="off"
            name="projectWebsiteUrl"
            value={d.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </label>
      </div>

      {/* Stepper */}
      <nav aria-label="Project Intake Progress">
        <p className="figures text-xs text-ink-3">
          STEP {step} OF 7 · <span className="text-ink">{steps[step - 1]}</span>
        </p>
        <ol className="mt-4 grid grid-cols-7 gap-1 sm:gap-2">
          {steps.map((name, i) => {
            const n = i + 1;
            const done = n < reached && n !== step;
            const can = n <= reached;
            return (
              <li key={name}>
                <button
                  type="button"
                  disabled={!can}
                  onClick={() => can && goTo(n)}
                  aria-current={n === step ? "step" : undefined}
                  className="group w-full text-left disabled:cursor-not-allowed"
                >
                  <span
                    className={`block h-1 rounded-full transition-colors ${
                      n === step ? "bg-field" : done ? "bg-ink" : "bg-rule"
                    }`}
                  />
                  <span className="mt-2 hidden items-center gap-2 text-xs sm:flex">
                    <span
                      className={`figures inline-flex size-5 items-center justify-center rounded-full text-[0.65rem] ${
                        n === step
                          ? "bg-field text-on-field"
                          : done
                            ? "bg-ink text-paper"
                            : "bg-rule text-ink-3"
                      }`}
                    >
                      {done ? <Check className="size-3" strokeWidth={3} /> : n}
                    </span>
                    <span className={n === step ? "text-ink" : "text-ink-3"}>{name}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div ref={panel} className="mt-8 rounded-2xl border border-rule bg-sheet p-6 sm:p-10">
        <p className="figures text-xs text-redline-ink">
          STEP 0{step} / 07 • {steps[step - 1].toUpperCase()}
        </p>

        {step === 1 && (
          <fieldset className="mt-4">
            <legend className="display text-[clamp(1.8rem,3.2vw,2.6rem)]">
              What are you looking to build?
            </legend>
            <p className="mt-3 text-ink-2">
              Select the category that best describes your project, or choose &quot;I&apos;m Not Sure
              Yet&quot;.
            </p>
            <ErrorNote text={err.projectType} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {projectTypes.map(([t, desc]) => (
                <Choice
                  key={t}
                  type="radio"
                  name="projectType"
                  checked={d.projectType === t}
                  onChange={() => set("projectType", t)}
                  title={t}
                  desc={desc}
                />
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-8">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.2vw,2.6rem)]">Project Overview</h2>
              <p className="mt-3 text-ink-2">
                Describe your idea, system, or workflow in your own words. Technical terminology is not
                required.
              </p>
            </div>
            <div>
              <label className={label} htmlFor="projectName">
                Project / Idea Name (Optional)
              </label>
              <input
                id="projectName"
                className={input}
                maxLength={100}
                placeholder="e.g., Internal Operations Platform"
                value={d.projectName}
                onChange={(e) => set("projectName", e.target.value)}
              />
              <p className={helper}>
                Give your project a working name if you have one (e.g., Client Portal, Inventory Tracker).
              </p>
            </div>
            <div>
              <label className={label} htmlFor="description">
                What would you like to build? *
              </label>
              <textarea
                id="description"
                rows={6}
                className={input}
                maxLength={4000}
                aria-invalid={!!err.description}
                aria-describedby={err.description ? "description-error" : undefined}
                placeholder="Tell us what the software needs to do, who will use it, and what tasks it should handle..."
                value={d.description}
                onChange={(e) => set("description", e.target.value)}
              />
              <Counter value={d.description} max={4000} />
              <ErrorNote id="description-error" text={err.description} />
              <p className={helper}>
                Describe the idea, system, workflow, or product in your own words. Technical terminology is
                not required.
              </p>
            </div>
            <div>
              <label className={label} htmlFor="goal">
                What should this project help you achieve? (Optional)
              </label>
              <input
                id="goal"
                className={input}
                maxLength={1000}
                placeholder="e.g., Centralize customer records and automate monthly reporting"
                value={d.goal}
                onChange={(e) => set("goal", e.target.value)}
              />
              <p className={helper}>
                e.g., Replace manual spreadsheets, launch a customer self-service tool, connect separated
                systems, or expand into mobile.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-4 space-y-8">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.2vw,2.6rem)]">Current Situation</h2>
              <p className="mt-3 text-ink-2">
                Tell us where this project stands today and what challenges or existing processes exist.
              </p>
            </div>
            <fieldset>
              <legend className={label}>Where is the project today? *</legend>
              <ErrorNote text={err.currentStage} />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {stages.map(([t, desc]) => (
                  <Choice
                    key={t}
                    type="radio"
                    name="currentStage"
                    checked={d.currentStage === t}
                    onChange={() => set("currentStage", t)}
                    title={t}
                    desc={desc}
                  />
                ))}
              </div>
            </fieldset>
            <div>
              <label className={label} htmlFor="situation">
                Tell us about the current situation (Optional)
              </label>
              <textarea
                id="situation"
                rows={4}
                className={input}
                maxLength={2000}
                placeholder="e.g., We currently track client requests across 4 Google Sheets and manually email invoices at the end of each week..."
                value={d.situation}
                onChange={(e) => set("situation", e.target.value)}
              />
              <Counter value={d.situation} max={2000} />
              <p className={helper}>
                Share any context regarding how work is handled today, what pain points exist, or what
                software is currently used.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mt-4 space-y-8">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.2vw,2.6rem)]">Requirements & Integrations</h2>
              <p className="mt-3 text-ink-2">
                Select the features, integrations, and user groups this system may need.
              </p>
            </div>
            <fieldset>
              <legend className={label}>What might the project need?</legend>
              <p className={helper}>
                Select any features that come to mind. These help us understand the scope and are not final
                commitments.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {features.map((f) => (
                  <Choice
                    key={f}
                    type="checkbox"
                    name="features"
                    checked={d.features.includes(f)}
                    onChange={() => toggle("features", f)}
                    title={f}
                  />
                ))}
              </div>
              <input
                className={`${input} mt-4`}
                maxLength={1000}
                aria-label="Other requirements"
                placeholder="Other requirements or specific technical features..."
                value={d.otherRequirements}
                onChange={(e) => set("otherRequirements", e.target.value)}
              />
            </fieldset>
            <fieldset>
              <legend className={label}>
                Does this project need to connect with any existing system or service? *
              </legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {(["No", "Yes", "Not sure"] as const).map((o) => (
                  <Choice
                    key={o}
                    type="radio"
                    name="integrations"
                    checked={d.integrations === o}
                    onChange={() => set("integrations", o)}
                    title={o}
                  />
                ))}
              </div>
              {d.integrations === "Yes" && (
                <div className="mt-4">
                  <label className={label} htmlFor="integrationDetails">
                    Which systems, services, APIs, platforms, or tools need to be connected?
                  </label>
                  <textarea
                    id="integrationDetails"
                    rows={3}
                    className={input}
                    maxLength={1000}
                    placeholder="List the tools, third-party software, or databases that need to exchange data..."
                    value={d.integrationDetails}
                    onChange={(e) => set("integrationDetails", e.target.value)}
                  />
                  <ErrorNote text={err.integrationDetails} />
                  <p className={helper}>
                    e.g., Stripe for payments, Salesforce CRM, custom internal SQL database, WhatsApp API, or
                    an existing legacy ERP.
                  </p>
                </div>
              )}
            </fieldset>
            <fieldset>
              <legend className={label}>Who will use the system? (Optional)</legend>
              <p className={helper}>Select the audience groups who will interact with the platform.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {audiences.map((a) => (
                  <Choice
                    key={a}
                    type="checkbox"
                    name="users"
                    checked={d.users.includes(a)}
                    onChange={() => toggle("users", a)}
                    title={a}
                  />
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 5 && (
          <div className="mt-4 space-y-8">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.2vw,2.6rem)]">Timeline & Planning</h2>
              <p className="mt-3 text-ink-2">
                Help us understand your target schedule and budget parameters.
              </p>
            </div>
            <fieldset>
              <legend className={label}>Do you have a target timeline? *</legend>
              <p className={helper}>This helps us plan engineering bandwidth and feasibility.</p>
              <ErrorNote text={err.timeline} />
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {timelines.map((t) => (
                  <Choice
                    key={t}
                    type="radio"
                    name="timeline"
                    checked={d.timeline === t}
                    onChange={() => set("timeline", t)}
                    title={t}
                  />
                ))}
              </div>
              {d.timeline === "I have a specific target launch date" && (
                <div className="mt-4">
                  <label className={label} htmlFor="launchDate">
                    Target Launch Date / Window
                  </label>
                  <input
                    id="launchDate"
                    className={input}
                    placeholder="e.g., Target launch by October 2026"
                    value={d.launchDate}
                    onChange={(e) => set("launchDate", e.target.value)}
                  />
                  <p className={helper}>
                    Specify your key date or milestone (e.g., Q4 2026, November 15, or before annual
                    conference).
                  </p>
                </div>
              )}
            </fieldset>
            <fieldset>
              <legend className={label}>Have you defined a project budget? *</legend>
              <p className={helper}>
                NoxeTech builds custom software scoped to your operational priorities. Sharing budget
                expectations helps us propose the right technical architecture.
              </p>
              <ErrorNote text={err.budgetStatus} />
              <div className="mt-4 grid gap-3">
                {budgets.map(([t, desc]) => (
                  <Choice
                    key={t}
                    type="radio"
                    name="budget"
                    checked={d.budgetStatus === t}
                    onChange={() => set("budgetStatus", t)}
                    title={t}
                    desc={desc}
                  />
                ))}
              </div>
              {d.budgetStatus === "I have an estimated budget or range" && (
                <div className="mt-4">
                  <label className={label} htmlFor="budgetRange">
                    Estimated Budget or Target Range
                  </label>
                  <input
                    id="budgetRange"
                    className={input}
                    maxLength={150}
                    placeholder="e.g., $15,000–$25,000"
                    value={d.budgetRange}
                    onChange={(e) => set("budgetRange", e.target.value)}
                  />
                  <p className={helper}>
                    You may enter your own amount and currency (e.g., $15,000–$25,000, €20,000, or Under
                    internal review).
                  </p>
                </div>
              )}
            </fieldset>
          </div>
        )}

        {step === 6 && (
          <div className="mt-4 space-y-8">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.2vw,2.6rem)]">Contact Information</h2>
              <p className="mt-3 text-ink-2">
                Provide your contact details so our engineering team can review and follow up.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {(
                [
                  ["fullName", "Full Name *", "e.g., Alex Johnson", 100, "text", "name"],
                  ["email", "Email Address *", "e.g., alex@company.com", 150, "email", "email"],
                  [
                    "company",
                    "Company / Organization (Optional)",
                    "e.g., Acme Logistics Ltd",
                    150,
                    "text",
                    "organization",
                  ],
                  [
                    "role",
                    "Role / Position (Optional)",
                    "e.g., Operations Director, Founder",
                    100,
                    "text",
                    "organization-title",
                  ],
                  ["phone", "Phone / WhatsApp (Optional)", "e.g., +1 (555) 019-2834", 50, "tel", "tel"],
                  [
                    "country",
                    "Country / Location (Optional)",
                    "e.g., United Kingdom, Canada, UAE",
                    100,
                    "text",
                    "country-name",
                  ],
                ] as const
              ).map(([k, l, ph, max, type, ac]) => (
                <div key={k}>
                  <label className={label} htmlFor={k}>
                    {l}
                  </label>
                  <input
                    id={k}
                    type={type}
                    autoComplete={ac}
                    className={input}
                    maxLength={max}
                    placeholder={ph}
                    aria-invalid={!!err[k]}
                    value={d[k]}
                    onChange={(e) => set(k, e.target.value)}
                  />
                  {k === "phone" && (
                    <p className={helper}>Include country code if applicable (e.g., +1, +44, +971).</p>
                  )}
                  <ErrorNote text={err[k]} />
                </div>
              ))}
            </div>
            <fieldset>
              <legend className={label}>Preferred Contact Method</legend>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {contactMethods.map((m) => (
                  <Choice
                    key={m}
                    type="radio"
                    name="contactMethod"
                    checked={d.contactMethod === m}
                    onChange={() => set("contactMethod", m)}
                    title={m}
                  />
                ))}
              </div>
            </fieldset>
            <div>
              <label className={label} htmlFor="notes">
                Anything else we should know? (Optional)
              </label>
              <textarea
                id="notes"
                rows={4}
                className={input}
                maxLength={2000}
                placeholder="e.g., We have an existing PostgreSQL database and would like to keep our data hosted in Europe..."
                value={d.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
              <Counter value={d.notes} max={2000} />
              <p className={helper}>
                Share any specific constraints, technical stack preferences, existing servers, or questions
                you have for our team.
              </p>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="mt-4 space-y-6">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.2vw,2.6rem)]">Review & Submit</h2>
              <p className="mt-3 text-ink-2">
                Review your project details before sending your inquiry to our engineering team.
              </p>
            </div>
            <p className="flex items-start gap-3 rounded-lg border border-rule bg-paper p-4 text-sm text-ink-2">
              <Info className="mt-1 size-4 shrink-0 text-redline-ink" />
              <span>
                Please review your project details below. You can click <strong>Edit</strong> on any section
                to adjust your responses before submission.
              </span>
            </p>
            {(
              [
                [1, "Project Type", [["Category:", d.projectType]]],
                [
                  2,
                  "Project Overview",
                  [
                    ["Project / Idea Name:", d.projectName],
                    ["Description:", d.description],
                    ["Goal:", d.goal],
                  ],
                ],
                [
                  3,
                  "Current Situation",
                  [
                    ["Stage:", d.currentStage],
                    ["Context & Details:", d.situation],
                  ],
                ],
                [
                  4,
                  "Requirements & Integrations",
                  [
                    [
                      "Identified Features / Capabilities:",
                      d.features.join(", ") || "No specific features selected",
                    ],
                    ["Other Requirements:", d.otherRequirements],
                    [
                      "Existing Integrations Needed:",
                      d.integrations === "Yes" ? d.integrationDetails : d.integrations,
                    ],
                    ["Users:", d.users.join(", ")],
                  ],
                ],
                [
                  5,
                  "Timeline & Planning",
                  [
                    ["Timeline:", d.launchDate ? `${d.timeline}: ${d.launchDate}` : d.timeline],
                    ["Budget Status:", d.budgetStatus],
                    ["Estimate: ", d.budgetRange],
                  ],
                ],
                [
                  6,
                  "Contact Information",
                  [
                    ["Name:", d.fullName],
                    ["Email:", d.email],
                    ["Organization:", [d.company, d.role].filter(Boolean).join(" · ")],
                    ["Phone / WhatsApp:", d.phone],
                    ["Preferred Contact:", d.contactMethod],
                    ["Additional Notes:", d.notes],
                  ],
                ],
              ] as const
            ).map(([n, title, rows]) => (
              <section key={title} className="rounded-xl border border-rule p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-ink">{title}</h3>
                  <Button variant="text" size="sm" onClick={() => goTo(n)}>
                    Edit
                  </Button>
                </div>
                <dl className="mt-3 space-y-2 text-sm">
                  {rows
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k} className="grid gap-1 sm:grid-cols-[14rem_1fr]">
                        <dt className="text-ink-3">{k}</dt>
                        <dd className="whitespace-pre-wrap text-ink">{v}</dd>
                      </div>
                    ))}
                </dl>
              </section>
            ))}
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={d.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-1 size-4 accent-[var(--field)]"
                />
                <span>
                  I agree that NoxeTech may use the information provided to evaluate and respond to this
                  project inquiry in accordance with our{" "}
                  <TransitionLink href="/privacy" className="text-redline-ink underline">
                    Privacy Policy
                  </TransitionLink>
                  .
                </span>
              </label>
              <ErrorNote text={err.consent} />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <Button
            variant="text"
            onClick={() => goTo(step - 1)}
            disabled={step === 1 || phase === "pending"}
            className="disabled:invisible"
          >
            Back
          </Button>
          {step < 7 ? (
            <Button onClick={next}>Continue</Button>
          ) : phase === "pending" ? (
            <div className="flex items-center gap-4" role="status" aria-live="polite">
              <span className="text-sm text-ink-2">
                Sending in <span className="figures text-ink">{countdown}s</span>
              </span>
              <Button onClick={undo}>Undo</Button>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-2">
              <HoldButton onConfirm={confirm}>Hold to Submit Project Inquiry</HoldButton>
              <span className="text-xs text-ink-3">Press and hold to send</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

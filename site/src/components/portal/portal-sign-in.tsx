"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../button";
import { ErrorNote, PreviewNote, input, label } from "../form/fields";
import { TransitionLink } from "../motion/transition-link";
import { prefersReducedMotion } from "../motion/motion-provider";
import { AccessPass, type PassState } from "./access-pass";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR = "Please provide a valid email address.";

/**
 * Magic-link sign-in, simulated: the email is validated for real, then the access pass is posted
 * through the slot beneath it (the link "leaves"), and comes back marked as sent. Nothing goes over
 * the network and nobody is signed in.
 */
export function PortalSignIn({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<PassState>("idle");
  const valid = EMAIL.test(email.trim());
  const passState: PassState = state === "idle" && valid ? "ready" : state;

  const { contextSafe } = useGSAP({ scope: root });

  const post = contextSafe(() => {
    // Selector text, resolved inside the component's GSAP scope.
    const pass = "[data-pass]";
    if (prefersReducedMotion()) {
      setState("sent");
      return;
    }
    gsap
      .timeline()
      .to(pass, { yPercent: -4, duration: 0.25, ease: "power2.out" })
      .to(pass, { yPercent: 112, duration: 0.55, ease: "power3.in" })
      .add(() => setState("sent"))
      .fromTo(pass, { yPercent: -112 }, { yPercent: 0, duration: 0.7, ease: "expo.out" }, "+=0.2");
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    if (!EMAIL.test(email.trim())) {
      setError(ERROR);
      field.current?.focus();
      return;
    }
    setError("");
    setState("sending");
    // Simulated round trip: no request is made.
    window.setTimeout(post, 600);
  }

  function reset() {
    setState("idle");
    setEmail("");
    requestAnimationFrame(() => field.current?.focus());
  }

  return (
    <div ref={root} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        {children}

        <div className="mt-10 max-w-lg">
          {state === "sent" ? (
            <div role="status" className="rounded-xl border border-rule bg-sheet p-5 sm:p-6">
              <p className="flex items-start gap-3 text-ink">
                <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-redline-ink" />
                <span>
                  Sign-in link sent to <strong className="figures break-all font-medium">{email.trim()}</strong>.
                </span>
              </p>
              <div className="mt-4 [&>p]:max-w-none [&>p]:justify-start">
                <PreviewNote />
              </div>
              <Button variant="text" onClick={reset} className="mt-2">
                Use a different email
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} aria-label="Customer Portal Sign-In">
              <label htmlFor="portal-email" className={label}>
                Business Email Address
              </label>
              <div className="relative mt-2">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-4 size-4 text-ink-3"
                />
                <input
                  ref={field}
                  id="portal-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error && EMAIL.test(e.target.value.trim())) setError("");
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "portal-email-error" : undefined}
                  className={`${input} mt-0! pl-12!`}
                />
              </div>
              <ErrorNote id="portal-email-error" text={error} />
              <Button type="submit" className="mt-6 w-full" disabled={state === "sending"}>
                Send Magic Sign-In Link <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </form>
          )}

          <div className="mt-8 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
            <TransitionLink
              href="/"
              sheetLabel="NoxeTech"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-field"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Return to NoxeTech Website
            </TransitionLink>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-3">
            <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-redline-ink" />
            Secure Passwordless Authentication · Strict Data Isolation
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        {/* The pass sits in a clipped frame; the slot underneath is where it is posted. */}
        <div className="overflow-hidden px-2 pb-4 pt-2">
          <div data-pass>
            <AccessPass email={email} state={passState} />
          </div>
        </div>
        <div aria-hidden="true" className="mx-4 h-2 rounded-full bg-ink" />
      </div>
    </div>
  );
}

import { Lock, ShieldCheck } from "lucide-react";
import { LogoMark } from "../logo";

export type PassState = "idle" | "ready" | "sending" | "sent";

// The three things the portal opens, from the page's own sentence ("your orders, payments, and invoices").
const rooms = ["Orders", "Payments", "Invoices"];

const status: Record<PassState, string> = {
  idle: "Awaiting email",
  ready: "Ready to send",
  sending: "Sending link",
  sent: "Link sent",
};

/**
 * The visitor's access pass: the email they type is printed onto it as they type, and the three
 * compartments it will open stay locked, because only the emailed link unlocks them.
 * Purely presentational; the sign-in form owns the state.
 */
export function AccessPass({ email, state }: { email: string; state: PassState }) {
  const shown = email.trim();
  return (
    <div className="relative overflow-hidden rounded-2xl border border-rule-strong bg-sheet shadow-[var(--shadow)]">
      <div aria-hidden="true" className="h-2 bg-field" />
      <div className="p-5 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoMark className="size-8" />
            <span className="text-lg font-bold tracking-tight text-ink">NoxeTech</span>
          </div>
          <span className="figures rounded-full border border-rule px-3 py-1 text-[0.7rem] uppercase text-ink-3">
            Customer Portal
          </span>
        </div>

        <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-3">
          Business Email Address
        </p>
        <p
          className={`figures mt-2 min-h-8 break-all text-[clamp(1.05rem,2vw,1.35rem)] leading-8 ${
            shown ? "text-ink" : "text-ink-3"
          }`}
        >
          {shown || "name@company.com"}
        </p>

        <ul className="mt-8 grid grid-cols-3 gap-2">
          {rooms.map((r) => (
            <li
              key={r}
              className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-rule-strong p-3"
            >
              <Lock aria-hidden="true" className="size-4 text-redline-ink" />
              <span className="text-sm font-semibold text-ink">{r}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-rule pt-4">
          <span className="flex items-center gap-2 text-xs text-ink-3">
            <ShieldCheck aria-hidden="true" className="size-4 text-redline-ink" />
            <span className="figures uppercase">Magic link</span>
          </span>
          <span className="figures flex items-center gap-2 text-xs uppercase text-ink">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${state === "idle" ? "bg-rule-strong" : "bg-field"} ${
                state === "sending" ? "animate-pulse" : ""
              }`}
            />
            {status[state]}
          </span>
        </div>
      </div>
    </div>
  );
}

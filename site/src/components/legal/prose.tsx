import { Mail } from "lucide-react";

/*
 * Typographic building blocks for the legal documents. Long-form reading: a comfortable
 * measure, generous leading, and only one accent (the orange markers) so nothing competes
 * with the text itself.
 */

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[1.0625rem] leading-[1.75] text-ink-2 first:mt-0">{children}</p>;
}

export function List({ children }: { children: React.ReactNode }) {
  return <ul className="mt-4 grid gap-3">{children}</ul>;
}

export function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-6 text-[1.0625rem] leading-[1.7] text-ink-2">
      <span aria-hidden="true" className="absolute left-0 top-3 size-2 bg-field print:bg-ink" />
      {children}
    </li>
  );
}

/** Bold lead-in label inside a list item or paragraph. */
export function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

/** A sentence the reader must not miss: set apart with the redline, not decoration. */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 border-l-2 border-field bg-redline-wash py-4 pl-4 pr-4 text-[1.0625rem] leading-[1.75] text-ink sm:pl-6 print:bg-transparent">
      {children}
    </div>
  );
}

export function MailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="figures text-[0.95em] text-redline-ink underline decoration-rule-strong underline-offset-4 hover:decoration-field"
    >
      {email}
    </a>
  );
}

/** The "Email: address" contact line that closes a document. */
export function ContactLine({ email }: { email: string }) {
  return (
    <p className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-rule bg-sheet px-4 py-4 sm:px-6">
      <Mail aria-hidden="true" className="size-4 text-redline-ink" />
      <span className="figures text-sm text-ink-3">Email:</span>
      <MailLink email={email} />
    </p>
  );
}

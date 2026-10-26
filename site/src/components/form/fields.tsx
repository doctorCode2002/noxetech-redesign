"use client";

import { Check, CircleAlert, Info } from "lucide-react";

/*
 * Form field primitives shared by every form on the site (project intake, contact,
 * custom package request, portal sign-in), so they all look and behave the same.
 */

/** Class strings for plain fields: `<label className={label}>`, `<input className={input}>`. */
export const label = "block text-xs font-semibold uppercase tracking-[0.08em] text-ink";
export const input =
  "mt-2 w-full rounded-lg border border-rule-strong bg-paper px-4 py-3 text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none aria-[invalid=true]:border-[#b91c1c] dark:aria-[invalid=true]:border-[#f87171]";
export const helper = "mt-2 text-sm text-ink-3";


export function ErrorNote({ text, id }: { text?: string; id?: string }) {
  if (!text) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-2 text-sm text-[#b91c1c] dark:text-[#f87171]"
    >
      <CircleAlert className="size-4 shrink-0" /> {text}
    </p>
  );
}

export function Choice({
  type,
  name,
  checked,
  onChange,
  title,
  desc,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  desc?: string;
}) {
  return (
    <label
      className={`relative flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
        checked ? "border-field bg-redline-wash" : "border-rule hover:border-rule-strong"
      }`}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`mt-1 inline-flex size-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-field ${
          type === "radio" ? "rounded-full" : "rounded-md"
        } ${checked ? "border-field bg-field text-on-field" : "border-rule-strong"}`}
      >
        {checked && <Check className="size-3.5" strokeWidth={3} />}
      </span>
      <span>
        <span className="block font-semibold text-ink">{title}</span>
        {desc && <span className="mt-1 block text-sm text-ink-2">{desc}</span>}
      </span>
    </label>
  );
}

export function Counter({ value, max }: { value: string; max: number }) {
  return (
    <p className="figures mt-2 text-right text-xs text-ink-3">
      {value.length} / {max} characters
    </p>
  );
}

/**
 * The site has no form backend yet: every form simulates its submit in the browser.
 * Show this on each success state so nobody thinks a message was really sent.
 */
export function PreviewNote() {
  return (
    <p className="mx-auto flex max-w-xl items-center justify-center gap-2 rounded-lg border border-rule bg-sheet px-4 py-3 text-sm text-ink-2">
      <Info className="size-4 shrink-0 text-redline-ink" />
      Preview build: this form is not connected yet, so nothing was sent.
    </p>
  );
}

import { Scramble } from "./scramble";

/** The original site's small section label (kept verbatim, including its capitals). */
export function Eyebrow({
  children,
  tone = "paper",
  className = "",
}: {
  children: string;
  tone?: "paper" | "field" | "ground";
  className?: string;
}) {
  const color = { paper: "text-redline-ink", field: "text-on-field/75", ground: "text-field" }[tone];
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${color} ${className}`}>
      <Scramble>{children}</Scramble>
    </p>
  );
}

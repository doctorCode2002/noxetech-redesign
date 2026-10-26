import { Mail, Compass } from "lucide-react";

// Original site copy, verbatim.
const channels = [
  {
    icon: Mail,
    title: "General Inquiries",
    text: "For general questions, non-project discussions, and administrative correspondence:",
    email: "contact@noxetech.com",
  },
  {
    icon: Compass,
    title: "Project Scoping",
    text: "For new software projects, RFPs, or technical specification submissions:",
    email: "projects@noxetech.com",
  },
];

const policy = [
  [
    "Direct Engineering Review:",
    "Inquiries are reviewed directly by technical personnel rather than sales call centers.",
  ],
  ["Zero Unsolicited Marketing:", "We never share or sell contact details to third-party marketing lists."],
  [
    "Verified Domain Transmission:",
    "Transactional communications originate exclusively from authenticated @noxetech.com mailboxes.",
  ],
];

export function ContactAside() {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-rule p-6">
        <p className="figures text-xs uppercase text-redline-ink">{"// DIRECT MAILBOX CHANNELS"}</p>
        <ul className="mt-4 grid gap-3">
          {channels.map(({ icon: Icon, title, text, email }) => (
            <li key={email} className="rounded-xl bg-sheet p-5">
              <h3 className="flex items-center gap-2 font-semibold text-ink">
                <Icon aria-hidden="true" className="size-4 text-redline-ink" />
                {title}
              </h3>
              <p className="mt-2 text-sm text-ink-2">{text}</p>
              <a
                href={`mailto:${email}`}
                className="figures mt-3 inline-block break-all text-[0.95rem] text-redline-ink underline decoration-rule-strong underline-offset-4 hover:decoration-redline"
              >
                {email}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-rule p-6">
        <p className="figures text-xs uppercase text-ink-3">{"// COMMUNICATIONS POLICY"}</p>
        <ul className="mt-4 grid gap-4 text-sm">
          {policy.map(([b, t]) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-field" />
              <span className="text-ink-2">
                <strong className="font-semibold text-ink">{b}</strong> {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

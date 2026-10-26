"use client";

import { ArrowLeft, Check, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isMuted, play, setMuted } from "@/lib/sound";
import { entities } from "./compile-data";
import { ReportPrinter } from "./report-printer";

type Item = { label: string; ok: boolean };
type Inspection = {
  id: string;
  site: string;
  who: string;
  time: string;
  inProgress?: boolean;
  items: Item[];
};

const initial: Inspection[] = [
  {
    id: "riverside",
    site: "Riverside depot",
    who: "A. Haddad",
    time: "2 min ago",
    items: [
      { label: "Fire exits clear", ok: true },
      { label: "Extinguishers serviced", ok: true },
      { label: "Signage visible", ok: true },
      { label: "Photos attached", ok: true },
    ],
  },
  {
    id: "north",
    site: "North plant, line 3",
    who: "S. Karimi",
    time: "14 min ago",
    items: [
      { label: "Guard rails secure", ok: false },
      { label: "Emergency stop tested", ok: true },
      { label: "Lighting working", ok: false },
      { label: "Floor markings visible", ok: true },
    ],
  },
  {
    id: "harbor",
    site: "Harbor warehouse",
    who: "L. Ortiz",
    time: "38 min ago",
    items: [
      { label: "Racking inspected", ok: true },
      { label: "Loading bay clear", ok: true },
      { label: "Forklift log signed", ok: true },
    ],
  },
  {
    id: "city",
    site: "City office",
    who: "M. Nasser",
    time: "now",
    inProgress: true,
    items: [
      { label: "First aid kit stocked", ok: true },
      { label: "Fire alarm tested", ok: false },
      { label: "Exit lights working", ok: false },
    ],
  },
];

const inspectors = [
  { name: "A. Haddad", where: "Riverside depot", state: "On site" },
  { name: "S. Karimi", where: "North plant", state: "On site" },
  { name: "L. Ortiz", where: "Harbor warehouse", state: "Synced 38 min ago" },
  { name: "M. Nasser", where: "City office", state: "Inspecting now" },
];

const sites = [
  { name: "Riverside depot", last: "Today", next: "In 7 days" },
  { name: "North plant, line 3", last: "Today", next: "Follow-up tomorrow" },
  { name: "Harbor warehouse", last: "Today", next: "In 14 days" },
  { name: "City office", last: "In progress", next: "—" },
];

function status(r: Inspection) {
  const open = r.items.filter((i) => !i.ok).length;
  if (!open) return { label: "Passed", tone: "ok" as const };
  if (r.inProgress) return { label: "In progress", tone: "idle" as const };
  return { label: `${open} issue${open > 1 ? "s" : ""}`, tone: "warn" as const };
}

const chip = {
  ok: "bg-[#16a34a]/12 text-[#166534]",
  warn: "bg-[#ff6a1a]/15 text-[#9a3412]",
  idle: "bg-black/8 text-black/70",
};

const mutedStore = {
  subscribe: (cb: () => void) => {
    addEventListener("storage", cb);
    addEventListener("nx-sound", cb);
    return () => {
      removeEventListener("storage", cb);
      removeEventListener("nx-sound", cb);
    };
  },
};

/**
 * The example app at the end of the compile scene, fully clickable: switch views,
 * open an inspection, tick checklist items (status updates live), export the
 * weekly report. Each action has a small synthesized sound; the speaker button mutes it.
 */
export function InspectionsApp() {
  const [view, setView] = useState("checklist");
  const [rows, setRows] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const muted = useSyncExternalStore(mutedStore.subscribe, isMuted, () => false);
  const saveTimer = useRef(0);

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  const open = rows.find((r) => r.id === openId) ?? null;
  const issues = rows.reduce((n, r) => n + (r.inProgress ? 0 : r.items.filter((i) => !i.ok).length), 0);

  function go(next: string) {
    if (next === view && !openId) return;
    play("tap");
    setView(next);
    setOpenId(null);
  }

  function toggleItem(rowId: string, idx: number) {
    setRows((rs) =>
      rs.map((r) => {
        if (r.id !== rowId) return r;
        const items = r.items.map((it, i) => (i === idx ? { ...it, ok: !it.ok } : it));
        const done = items.every((i) => i.ok);
        play(done ? "success" : "toggle");
        return { ...r, items, time: "just now", inProgress: done ? false : r.inProgress };
      }),
    );
    setSaving(true);
    clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => setSaving(false), 700);
  }

  function toggleSound() {
    setMuted(!muted);
    dispatchEvent(new Event("nx-sound"));
    if (muted) play("toggle");
  }

  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-ground-rule bg-[#f4f5f7] text-[#0c0d10] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-black/10 px-4 py-2">
        <span className="size-2.5 rounded-full bg-black/15" />
        <span className="size-2.5 rounded-full bg-black/15" />
        <span className="size-2.5 rounded-full bg-black/15" />
        <span className="ml-3 text-xs text-black/65">Inspections, example app (try it)</span>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          title={muted ? "Sound off" : "Sound on"}
          className="ml-auto inline-flex size-8 items-center justify-center rounded-full text-black/65 hover:bg-black/8 hover:text-black"
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
      </div>

      <div className="grid sm:grid-cols-[11rem_1fr]">
        <nav
          aria-label="Example app"
          className="flex gap-1 overflow-x-auto border-b border-black/10 p-2 text-sm sm:flex-col sm:border-b-0 sm:border-r"
        >
          {entities.map((e) => (
            <button
              key={e.k}
              type="button"
              data-nav={e.k}
              aria-current={view === e.k ? "page" : undefined}
              onClick={() => go(e.k)}
              className="shrink-0 rounded-md px-3 py-2 text-left text-black/70 transition-colors hover:bg-black/8 hover:text-black aria-[current=page]:bg-black aria-[current=page]:text-white"
            >
              <span data-nav-label>{e.name === "WeeklyReport" ? "Reports" : e.name + "s"}</span>
            </button>
          ))}
        </nav>

        <div className="min-h-[20rem] p-4 sm:p-5">
          {view === "checklist" && !open && (
            <>
              <div className="flex items-center justify-between">
                <p className="font-semibold">Today’s inspections</p>
                <p className="flex items-center gap-2 text-xs text-black/65" aria-live="polite">
                  <span
                    className={`size-2 rounded-full ${saving ? "animate-pulse bg-[#ff6a1a]" : "bg-[#16a34a]"}`}
                  />
                  {saving ? "Saving" : "Synced"}
                </p>
              </div>
              <table className="mt-3 w-full text-left text-[0.8rem] sm:text-sm">
                <thead className="text-black/65">
                  <tr>
                    <th className="py-2 font-normal">Site</th>
                    <th className="hidden py-2 font-normal sm:table-cell">Inspector</th>
                    <th className="py-2 font-normal">Result</th>
                    <th className="hidden py-2 text-right font-normal md:table-cell">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const st = status(r);
                    return (
                      <tr key={r.id} data-row className="border-t border-black/10">
                        <td className="py-2">
                          <button
                            type="button"
                            onClick={() => {
                              play("tap");
                              setOpenId(r.id);
                            }}
                            className="font-medium underline decoration-black/20 underline-offset-4 hover:decoration-[#ff6a1a]"
                          >
                            {r.site}
                          </button>
                        </td>
                        <td className="hidden py-2 text-black/70 sm:table-cell">{r.who}</td>
                        <td className="py-2">
                          <span className={`rounded-full px-2 py-1 text-xs font-medium ${chip[st.tone]}`}>
                            {st.label}
                          </span>
                        </td>
                        <td className="hidden py-2 text-right text-black/65 md:table-cell">{r.time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div
                data-report
                className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-black px-4 py-3 text-white"
              >
                <p className="text-sm">
                  Weekly report is ready: 38 sites, {issues} open issue{issues === 1 ? "" : "s"}
                </p>
                <button
                  type="button"
                  onClick={() => go("report")}
                  className="rounded-full bg-[#ff6a1a] px-3 py-1 text-xs font-semibold text-black hover:bg-white"
                >
                  Print report
                </button>
              </div>
            </>
          )}

          {view === "checklist" && open && (
            <div>
              <button
                type="button"
                onClick={() => {
                  play("tap");
                  setOpenId(null);
                }}
                className="inline-flex items-center gap-1 text-xs text-black/65 hover:text-black"
              >
                <ArrowLeft className="size-3.5" /> All inspections
              </button>
              <div className="mt-2 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{open.site}</p>
                  <p className="text-xs text-black/65">
                    {open.who} · updated {open.time}
                  </p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${chip[status(open).tone]}`}>
                  {status(open).label}
                </span>
              </div>
              <ul className="mt-4 divide-y divide-black/10 rounded-lg border border-black/10 bg-white">
                {open.items.map((it, i) => (
                  <li key={it.label}>
                    <label className="flex items-center gap-3 px-3 py-3 text-sm">
                      <input
                        type="checkbox"
                        checked={it.ok}
                        onChange={() => toggleItem(open.id, i)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`inline-flex size-5 items-center justify-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ff6a1a] ${
                          it.ok
                            ? "border-[#16a34a] bg-[#16a34a] text-white"
                            : "border-black/25 bg-white text-transparent"
                        }`}
                      >
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className={it.ok ? "" : "text-black/70"}>{it.label}</span>
                      {!it.ok && !open.inProgress && (
                        <span className="ml-auto inline-flex items-center gap-1 text-xs text-[#9a3412]">
                          <X className="size-3" /> Issue
                        </span>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-black/65">
                Tick items to resolve them. Changes sync instantly.
              </p>
            </div>
          )}

          {view === "inspector" && (
            <>
              <p className="font-semibold">Inspectors</p>
              <ul className="mt-3 divide-y divide-black/10">
                {inspectors.map((p) => (
                  <li key={p.name} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span>
                      <span className="font-medium">{p.name}</span>
                      <span className="block text-xs text-black/65">{p.where}</span>
                    </span>
                    <span className="flex items-center gap-2 text-xs text-black/70">
                      <span
                        className={`size-2 rounded-full ${p.state.startsWith("Synced") ? "bg-black/30" : "bg-[#16a34a]"}`}
                      />
                      {p.state}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {view === "site" && (
            <>
              <p className="font-semibold">Sites</p>
              <table className="mt-3 w-full text-left text-sm">
                <thead className="text-black/65">
                  <tr>
                    <th className="py-2 font-normal">Site</th>
                    <th className="py-2 font-normal">Last visit</th>
                    <th className="hidden py-2 font-normal sm:table-cell">Next visit</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.map((s) => (
                    <tr key={s.name} className="border-t border-black/10">
                      <td className="py-2 font-medium">{s.name}</td>
                      <td className="py-2 text-black/70">{s.last}</td>
                      <td className="hidden py-2 text-black/70 sm:table-cell">{s.next}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {view === "report" && (
            <ReportPrinter
              lines={rows.map((r) => ({
                site: r.site,
                who: r.who,
                status: status(r).label,
                tone: status(r).tone,
              }))}
              issues={issues}
            />
          )}
        </div>
      </div>
    </div>
  );
}

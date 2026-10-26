import { Eyebrow } from "../eyebrow";
import { LegalReader } from "./legal-reader";
import { HeroBackdrop } from "../hero-art/hero-backdrop";
import { LegalArt } from "../hero-art/legal";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

/*
 * One reading layout for every legal page: a quiet hero with the policy's label and date,
 * then the document with a contents rail that maps the reader's progress through each clause.
 * Section titles are the original headings, verbatim ("1. Payments are final").
 */
export function LegalDocument({
  label,
  updated,
  updatedIso,
  title,
  intro,
  sections,
  note,
}: {
  label: string;
  updated: string;
  updatedIso: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  note?: React.ReactNode;
}) {
  const toc = sections.map(({ id, title }) => {
    const m = /^(\d+)\.\s(.*)$/.exec(title);
    return { id, n: m ? m[1] : "", text: m ? m[2] : title };
  });

  return (
    <>
      <section className="drafting-grid relative isolate overflow-hidden border-b border-rule print:border-0 print:bg-none">
        <HeroBackdrop>
          <LegalArt clauses={sections.length} seed={title.length} />
        </HeroBackdrop>
        <div className="shell pb-16 pt-14 sm:pb-20 sm:pt-20 print:px-0 print:pb-8 print:pt-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Eyebrow>{label}</Eyebrow>
            <p className="figures text-xs text-ink-3">
              LAST UPDATED: <time dateTime={updatedIso}>{updated}</time>
            </p>
          </div>
          <h1 className="display mt-4 max-w-[20ch] text-[clamp(2.6rem,6vw,5rem)]">{title}</h1>
          <p className="mt-6 max-w-[60ch] text-[1.15rem] text-ink-2">{intro}</p>
        </div>
      </section>

      <LegalReader toc={toc}>
        {sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            data-clause
            className={`motion-reduce:scroll-mt-28 ${i ? "mt-12 border-t border-rule pt-12 sm:mt-16 sm:pt-16" : ""} print:break-inside-avoid-page`}
          >
            <h2
              id={`${s.id}-title`}
              className="display text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1]"
            >
              <span className="figures mr-1 align-[0.12em] text-[0.6em] font-medium tracking-normal text-redline-ink">
                {toc[i].n ? `${toc[i].n}.` : ""}
              </span>
              {toc[i].n ? " " : ""}
              {toc[i].text}
            </h2>
            <div className="mt-6">{s.body}</div>
          </section>
        ))}
        {note && (
          <p className="mt-16 border-t border-rule pt-8 text-sm leading-[1.7] text-ink-3">{note}</p>
        )}
      </LegalReader>
    </>
  );
}

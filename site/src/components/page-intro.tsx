export function PageIntro({ title, intro }: { title: string; intro: string }) {
  return (
    <section className="drafting-grid border-b border-rule">
      <div className="shell pb-20 pt-14 sm:pb-28 sm:pt-20">
        <h1 className="display max-w-[18ch] text-[clamp(2.6rem,6.4vw,5.25rem)]">{title}</h1>
        <p className="mt-8 max-w-[60ch] text-[1.15rem] text-ink-2">{intro}</p>
        <p className="mt-10 text-[0.95rem] text-ink-3">This page is next in the redesign.</p>
      </div>
    </section>
  );
}

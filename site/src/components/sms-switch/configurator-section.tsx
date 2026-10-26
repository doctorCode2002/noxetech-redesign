import { Configurator } from "./configurator";

export function ConfiguratorSection() {
  return (
    <section
      id="configurator"
      aria-labelledby="configurator-title"
      className="scroll-mt-24 border-t border-rule bg-sheet/40 py-20 sm:py-28"
    >
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="configurator-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            Interactive Commercial Configurator
          </h2>
          <p className="max-w-[52ch] text-[1.05rem] text-ink-2 lg:col-span-5">
            Configure your SMS Switch edition, optional feature add-ons, paid themes, and monthly Sub Admin
            seats. Authoritatively calculated server-side.
          </p>
        </div>
        <Configurator />
      </div>
    </section>
  );
}

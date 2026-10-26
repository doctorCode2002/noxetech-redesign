import { LogoMarkMono } from "./logo";

/**
 * First-visit loader, CSS only: the mark draws itself, a counter runs to 100,
 * then the panel wipes up. Rendered on the server so it is on screen before any
 * JavaScript loads; the inline script in the layout skips it for the rest of the session.
 */
export function Loader() {
  return (
    <div aria-hidden="true" className="loader fixed inset-0 z-[90] flex flex-col justify-between bg-field p-6 text-on-field sm:p-10">
      <LogoMarkMono className="loader-mark size-14 sm:size-16" />
      <div>
        <p className="mega text-[clamp(3.5rem,16vw,15rem)] [font-stretch:75%]">NoxeTech</p>
        <div className="mt-6 flex items-center gap-4">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-on-field/15">
            <div className="loader-bar h-full origin-left rounded-full bg-on-field" />
          </div>
          <span className="loader-count figures w-[4ch] text-right text-sm" />
        </div>
      </div>
    </div>
  );
}

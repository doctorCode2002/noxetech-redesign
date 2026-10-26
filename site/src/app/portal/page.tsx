import { PortalSignIn } from "@/components/portal/portal-sign-in";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/portal", "Customer Portal Sign-In — NoxeTech", "Use the same business email used for your NoxeTech order. Access your orders, payments, and invoices via secure email magic link.");

// Original site copy, verbatim.
export default function PortalPage() {
  return (
    <section className="drafting-grid border-b border-rule">
      <div className="shell flex min-h-[calc(100svh-5.25rem)] flex-col justify-center py-16 sm:py-20">
        <PortalSignIn>
          <h1 className="display max-w-[14ch] text-[clamp(2.6rem,6vw,5rem)]">Customer Portal Sign-In</h1>
          <p className="mt-6 max-w-[48ch] text-[1.15rem] text-ink-2">
            Use the same business email used for your NoxeTech order. Access your orders, payments, and invoices
            via secure email magic link.
          </p>
        </PortalSignIn>
      </div>
    </section>
  );
}

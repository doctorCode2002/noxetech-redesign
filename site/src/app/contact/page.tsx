import { ContactAside } from "@/components/contact/contact-aside";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/contact", "Contact NoxeTech — General & Technical Inquiries", "Contact NoxeTech directly for general questions, partnership discussions, or technical inquiries. Email contact@noxetech.com.");

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section aria-labelledby="message-title" className="py-16 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 lg:col-span-7">
            <ContactForm />
          </div>
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-5">
            <ContactAside />
          </div>
        </div>
      </section>
    </>
  );
}

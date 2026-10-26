import { LegalDocument } from "@/components/legal/legal-document";
import { Callout, ContactLine, P, Term } from "@/components/legal/prose";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/terms", "Terms of Use — Website & Engagement Governance | NoxeTech", "Terms governing the use of the NoxeTech website, technical scoping tools, and business communications.");

// Original site copy, verbatim.
export default function TermsPage() {
  return (
    <LegalDocument
      label="LEGAL GOVERNANCE"
      updated="August 20, 2026"
      updatedIso="2026-08-20"
      title="Terms of Use"
      intro="These terms govern your access to and use of the NoxeTech website, informational content, and project scoping tools."
      sections={[
        {
          id: "acceptance-scope",
          title: "1. Acceptance & Scope of Website Terms",
          body: (
            <>
              <P>
                By accessing or using this website (noxetech.com), you agree to comply with and be bound by these
                Terms of Use. If you do not agree with these terms, please refrain from using the site.
              </P>
              <P>
                These terms apply solely to the public website, its content, inquiry forms, and exploratory
                scoping tools.
              </P>
            </>
          ),
        },
        {
          id: "inquiries-vs-agreements",
          title: "2. Project Inquiries vs. Formal Commercial Agreements",
          body: (
            <>
              <Callout>
                <Term>Important Distinction:</Term> Submitting a contact message, inquiry, or project scoping
                questionnaire through this website does not establish a binding software engineering contract,
                professional commitment, quotation, or project timeline.
              </Callout>
              <P>
                All formal software engineering engagements, custom development milestones, deliverables, service
                level agreements (SLAs), pricing structures, and intellectual property transfers are governed
                exclusively by separate, mutually executed Master Services Agreements (MSAs), Statements of Work
                (SOWs), or written engagement contracts.
              </P>
            </>
          ),
        },
        {
          id: "intellectual-property",
          title: "3. Intellectual Property Rights",
          body: (
            <>
              <P>
                All text, graphics, user interface designs, visual layouts, code architectures, and branding
                elements published on this website are the property of NoxeTech and are protected by applicable
                copyright and intellectual property laws.
              </P>
              <P>
                You may not copy, reproduce, distribute, or reverse-engineer the proprietary layout, design
                system, or visual assets of this website without prior written authorization from NoxeTech.
              </P>
            </>
          ),
        },
        {
          id: "disclaimer-limitations",
          title: "4. Informational Disclaimer & Limitations",
          body: (
            <>
              <P>
                The information provided on this website is for general informational and scoping purposes only.
                While we strive to maintain accurate, up-to-date descriptions of our engineering capabilities and
                methodologies, we do not warrant that all content is error-free or exhaustive.
              </P>
              <P>
                To the maximum extent permitted by applicable law, NoxeTech shall not be liable for any indirect,
                incidental, or consequential damages resulting from the use or inability to use this website.
              </P>
            </>
          ),
        },
        {
          id: "inquiries-regarding-terms",
          title: "5. Inquiries Regarding Terms",
          body: (
            <>
              <P>For questions regarding these Terms of Use or legal governance, please contact:</P>
              <ContactLine email="contact@noxetech.com" />
            </>
          ),
        },
      ]}
    />
  );
}

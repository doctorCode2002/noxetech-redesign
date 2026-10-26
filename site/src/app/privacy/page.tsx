import { LegalDocument } from "@/components/legal/legal-document";
import { Callout, ContactLine, Item, List, MailLink, P, Term } from "@/components/legal/prose";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/privacy", "Privacy Policy — Data Handling & Communications | NoxeTech", "Learn how NoxeTech handles information submitted through our contact and project inquiry channels.");

// Original site copy, verbatim.
export default function PrivacyPage() {
  return (
    <LegalDocument
      label="DATA GOVERNANCE"
      updated="August 20, 2026"
      updatedIso="2026-08-20"
      title="Privacy Policy"
      intro="This policy explains how NoxeTech collects, processes, and protects information submitted through our website, contact forms, and project scoping wizard."
      sections={[
        {
          id: "information-you-provide",
          title: "1. Information You Voluntarily Provide",
          body: (
            <>
              <P>
                When you interact with our website to make an inquiry or scope a software project, you may choose
                to submit personal and business information, including:
              </P>
              <List>
                <Item>
                  <Term>Contact Coordinates:</Term> Full name, email address, company name, role/title, phone or
                  WhatsApp number, and country.
                </Item>
                <Item>
                  <Term>Project Scoping Details:</Term> Software category, project description, primary goals,
                  existing systems, integration requirements, user groups, target timeline, and budget parameters.
                </Item>
                <Item>
                  <Term>Inquiry Messages:</Term> Free-text messages, questions, or technical context supplied in
                  communication fields.
                </Item>
              </List>
            </>
          ),
        },
        {
          id: "how-we-use-information",
          title: "2. How We Use Submitted Information",
          body: (
            <>
              <P>
                Information submitted through our website is used strictly for legitimate business communication
                and engineering evaluation:
              </P>
              <List>
                <Item>To review, analyze, and respond to your general or technical inquiries.</Item>
                <Item>
                  To evaluate architectural requirements, feasibility, and resource planning for project scoping
                  requests.
                </Item>
                <Item>To communicate directly with you regarding your inquiry or proposed engagement.</Item>
              </List>
              <Callout>
                We do NOT sell, lease, rent, or trade your contact information or project specifications to
                third-party marketing lists, advertisers, or lead brokers.
              </Callout>
            </>
          ),
        },
        {
          id: "email-transmission-storage",
          title: "3. Email Transmission & Storage",
          body: (
            <>
              <P>When you submit a form on our website:</P>
              <List>
                <Item>
                  The website backend securely dispatches an internal notification via authenticated SMTP (TLS
                  1.2+) to designated NoxeTech mailboxes (<MailLink email="contact@noxetech.com" /> for general
                  inquiries, <MailLink email="projects@noxetech.com" /> for scoping requests).
                </Item>
                <Item>
                  A neutral confirmation message is dispatched to your provided email address to confirm
                  successful transmission.
                </Item>
                <Item>
                  Inquiry records reside in NoxeTech&apos;s authenticated email infrastructure and are accessed
                  only by authorized personnel conducting engineering and operational reviews.
                </Item>
              </List>
            </>
          ),
        },
        {
          id: "server-logs-anti-abuse",
          title: "4. Technical Server Logs & Anti-Abuse Controls",
          body: (
            <>
              <P>
                To safeguard our web infrastructure against spam, denial-of-service, and automated brute-force
                attacks:
              </P>
              <List>
                <Item>
                  Our servers process client IP addresses and standard HTTP request headers temporarily in memory
                  to enforce rate limits (e.g., maximum submission frequencies).
                </Item>
                <Item>Origin headers and hidden honeypot fields are evaluated to reject automated bot traffic.</Item>
                <Item>
                  We do not log personal messages, project descriptions, or contact information into public or
                  shared operational server log streams.
                </Item>
              </List>
            </>
          ),
        },
        {
          id: "cookies-tracking",
          title: "5. Cookies & Third-Party Tracking",
          body: (
            <P>
              NoxeTech is committed to minimal, respectful web practices. Our public website does not employ
              third-party advertising cookies, cross-site trackers, behavioral profiling pixels, or intrusive
              tracking scripts.
            </P>
          ),
        },
        {
          id: "retention-rights",
          title: "6. Data Retention & Rights",
          body: (
            <>
              <P>
                We retain communication and inquiry records for as long as necessary to fulfill the operational
                purpose of the correspondence, maintain business records, or comply with applicable legal
                obligations.
              </P>
              <P>
                If you wish to request deletion or correction of inquiry details you previously submitted, you may
                contact us at:
              </P>
              <ContactLine email="contact@noxetech.com" />
            </>
          ),
        },
      ]}
    />
  );
}

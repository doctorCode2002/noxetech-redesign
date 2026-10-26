import { LegalDocument } from "@/components/legal/legal-document";
import { Item, List, P, Term } from "@/components/legal/prose";
import { TransitionLink } from "@/components/motion/transition-link";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/legal/refund", "Payment, Delivery & Correction Policy | NoxeTech", "NoxeTech payments are final and non-refundable: infrastructure, licences and third-party resources are procured immediately once a payment is confirmed.");

// Original site copy, verbatim.
export default function LegalRefundPage() {
  return (
    <LegalDocument
      label="COMMERCIAL POLICY"
      updated="September 13, 2026"
      updatedIso="2026-09-13"
      title="Payment, Delivery & Correction Policy"
      intro="All payments are final and non-refundable. Infrastructure, licences and third-party resources are procured as soon as a payment is confirmed."
      sections={[
        {
          id: "payments-are-final",
          title: "1. Payments are final",
          body: (
            <>
              <P>
                All payments made to NoxeTech are <Term>final and non-refundable</Term>. By completing a payment
                you accept this. We state it plainly here rather than burying it, because it changes how you
                should decide to buy.
              </P>
              <P>
                Once a payment is confirmed, NoxeTech immediately begins purchasing, reserving or allocating the
                infrastructure, servers, licences and third-party resources required to deliver your product.
                Those commitments are made on your behalf and cannot be cancelled or recovered, so payments are
                not refundable.
              </P>
            </>
          ),
        },
        {
          id: "why-it-works-this-way",
          title: "2. Why it works this way",
          body: (
            <>
              <P>
                Software products that run on allocated infrastructure cannot be “returned”. The moment your
                payment is confirmed we begin purchasing, reserving or allocating the specific servers, VPS
                capacity, licences, third-party services and provisioning work your product needs. Those
                commitments are made to third parties in your name.
              </P>
              <P>
                A refund would mean NoxeTech absorbing a cost that has already been committed and cannot be
                recovered. That is why the position is flat rather than case by case.
              </P>
            </>
          ),
        },
        {
          id: "what-you-receive",
          title: "3. What you receive",
          body: (
            <>
              <P>What you paid for is delivered, and delivery is tracked:</P>
              <List>
                <Item>Provisioning and installation are recorded as a deployment with dated status changes.</Item>
                <Item>Access credentials are available in your client portal once your product is delivered.</Item>
                <Item>Your subscription or licence period is recorded with start and end dates.</Item>
                <Item>
                  If a deployment is delayed, we tell you and it is visible in the portal rather than left to you
                  to ask about.
                </Item>
              </List>
            </>
          ),
        },
        {
          id: "if-something-is-wrong",
          title: "4. If something is wrong",
          body: (
            <>
              <P>
                If you believe you have been charged in error — a duplicate payment, a charge for something you
                did not order, or an amount that does not match what was agreed — contact support. The charge is
                reviewed by NoxeTech and, where it is genuinely wrong, corrected.
              </P>
              <P>
                A correction is an accounting action performed by NoxeTech. It is recorded against your account
                with the reason and the date, and it never rewrites the history of the original payment or
                invoice — you can see both.
              </P>
              <P>Where a payment provider reverses or charges back a payment, we act on the provider’s determination.</P>
            </>
          ),
        },
        {
          id: "chargebacks",
          title: "5. Chargebacks",
          body: (
            <P>
              Please contact support before raising a chargeback with your bank or provider. A chargeback started
              without contacting us first slows down the review and can suspend the service while it is contested,
              which helps nobody.
            </P>
          ),
        },
        {
          id: "where-to-ask",
          title: "6. Where to ask",
          body: (
            <P>
              Payment questions go through the <Term>Support</Term> section of your client portal, where the
              conversation is recorded against your account, or through{" "}
              <TransitionLink
                href="/contact"
                sheetLabel="Contact"
                className="font-semibold text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-field"
              >
                the contact form
              </TransitionLink>{" "}
              if you have not purchased yet.
            </P>
          ),
        },
      ]}
      note="This page is the customer-facing statement of the same policy the platform enforces internally. It is generated from the platform’s own policy definition, so the wording here and the behaviour in the client portal cannot disagree."
    />
  );
}

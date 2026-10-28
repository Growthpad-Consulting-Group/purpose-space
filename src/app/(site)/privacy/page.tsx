import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Purpose Space Realtors",
  description:
    "How Purpose Space Realtors collects, uses and protects your information, and the terms governing use of this website.",
};

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24 border-t border-brand-gold/30 py-10 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-2xl text-brand-green sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base text-brand-ink">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <section className="bg-brand-ivory py-16 lg:py-24">
      <div className="container-fluid max-w-3xl">
        <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
          Legal
        </p>
        <h1 className="mt-6 font-heading text-4xl leading-[1.1] text-brand-green sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 max-w-xl text-base text-brand-ink">
          This policy explains how Purpose Space Realtors handles your
          information, and includes the terms governing use of this website.
          Last updated 3 August 2026.
        </p>

        <div className="mt-12">
          <Section title="Overview">
            <p>
              Purpose Space Realtors (&ldquo;Purpose Space&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides residential and
              commercial real estate services, including sales, letting,
              management and advisory, across Nairobi and the wider Kenyan
              market. This policy applies to information collected through
              this website, including property enquiries, listing
              submissions and general contact.
            </p>
          </Section>

          <Section title="Information we collect">
            <p>We collect information you provide directly, including:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Contact details submitted through our enquiry and contact
                forms, such as your name, email address, phone number and
                preferred contact method.
              </li>
              <li>
                Property details and photographs submitted when listing a
                property with us, including location, specifications and
                pricing expectations.
              </li>
              <li>
                Any additional notes or messages you choose to share with our
                team.
              </li>
            </ul>
            <p>
              We do not knowingly collect payment or financial account
              details through this website.
            </p>
          </Section>

          <Section title="How we use your information">
            <p>We use the information collected to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Respond to enquiries and arrange viewings or
                consultations.
              </li>
              <li>
                Review and list properties submitted through our property
                submission form.
              </li>
              <li>
                Communicate with you about your enquiry, submission or an
                ongoing instruction.
              </li>
              <li>
                Improve this website and the services we offer.
              </li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
          </Section>

          <Section title="Property listings and submissions">
            <p>
              When you submit a property through our listing form, the
              details and photographs you provide may be reviewed by our
              team and, with your agreement, published as a listing on this
              website. You retain the right to request that a submitted
              property, or any photographs associated with it, be removed at
              any time.
            </p>
          </Section>

          <Section title="Cookies and analytics">
            <p>
              This website may use basic cookies or similar technologies to
              understand how it is used and to improve performance. You can
              control or disable cookies through your browser settings;
              doing so should not prevent you from browsing listings or
              submitting an enquiry.
            </p>
          </Section>

          <Section title="Third-party services">
            <p>
              We use third-party service providers—such as content and image
              hosting—to help operate this website and store property
              listing content. These providers process information only as
              needed to provide their service to us.
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              We retain enquiry and submission information for as long as
              needed to respond to your request, maintain a record of our
              correspondence, or as required by law. You may request that we
              delete information you have shared with us, subject to any
              legal or contractual obligations that require us to keep it.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You may ask us at any time to access, correct or delete the
              personal information we hold about you, or to withdraw consent
              for us to contact you. To make a request, please reach out
              using the contact details below.
            </p>
          </Section>

          <Section id="terms" title="Terms of use">
            <p>
              By using this website, you agree to the following terms:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Property listings on this website are provided for general
                information and are subject to availability, change or
                withdrawal without notice. Details such as price, status and
                specifications should be confirmed directly with our team
                before making a decision.
              </li>
              <li>
                Content, images and branding on this website belong to
                Purpose Space Realtors or its licensors and may not be
                reproduced without permission.
              </li>
              <li>
                Submitting an enquiry or property listing through this
                website does not, on its own, create a binding instruction
                or agreement between you and Purpose Space Realtors—terms of
                engagement are confirmed separately.
              </li>
              <li>
                We aim to keep this website accurate and available, but do
                not guarantee it will be uninterrupted or error-free.
              </li>
            </ul>
          </Section>

          <Section title="Contact">
            <p>
              For any questions about this policy, or to make a request
              about your information, contact us at{" "}
              <a
                href="mailto:hello@purposespace.com"
                className="text-brand-green underline underline-offset-2 hover:text-brand-gold"
              >
                hello@purposespace.com
              </a>{" "}
              or via our{" "}
              <Link
                href="/contact"
                className="text-brand-green underline underline-offset-2 hover:text-brand-gold"
              >
                contact page
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </section>
  );
}

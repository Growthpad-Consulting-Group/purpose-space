import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutGuidesUs } from "@/components/sections/AboutGuidesUs";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal } from "@/shared/ui/Reveal";

export const metadata: Metadata = {
  title: "About | Purpose Space Realtors",
  description:
    "Purpose Space exists to make real estate feel considered rather than transactional.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Reveal>
        <AboutGuidesUs />
      </Reveal>
      <Reveal>
        <ClosingCta
          eyebrow="The next conversation"
          heading={
            <>
              Begin with
              <br />
              what matters.
            </>
          }
          description="Tell us what you are considering—your property, priorities or next decision. We'll take it from there."
          primaryLabel="Start a conversation"
          primaryHref="/contact"
          additionalLinks={[
            { label: "Property Management", href: "/services#management" },
            { label: "Sales & Letting", href: "/services#sales-letting" },
            { label: "Real Estate Advisory", href: "/services#advisory" },
          ]}
        />
      </Reveal>
    </>
  );
}

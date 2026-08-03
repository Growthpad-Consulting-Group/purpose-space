import type { Metadata } from "next";
import { TripleImageHero } from "@/components/sections/TripleImageHero";
import { ImageListSection } from "@/components/sections/ImageListSection";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal } from "@/shared/ui/Reveal";

export const metadata: Metadata = {
  title: "Services | Purpose Space Realtors",
  description:
    "Across residential and commercial property, our management, sales, letting and advisory services bring clarity to every next step.",
};

const items = [
  {
    number: "01",
    label: "Property Management",
    image: "/images/about-purpose.png",
  },
  {
    number: "02",
    label: "Sales & Letting",
    image: "/images/about-place.png",
  },
  {
    number: "03",
    label: "Advisory",
    image: "/images/about-possibility.png",
  },
];

const managementItems = [
  "Occupancy and tenant coordination",
  "Maintenance and service oversight",
  "Reporting and owner communication",
];

const salesLettingItems = [
  "Valuation and market positioning",
  "Marketing, viewings and enquiries",
  "Negotiation, documentation and handover",
];

const advisoryItems = [
  "Property valuation and opportunity review",
  "Acquisition and disposal guidance",
  "Portfolio and investment decisions",
];

export default function ServicesPage() {
  return (
    <>
      <TripleImageHero
        eyebrow="Our Services"
        heading={
          <>
            Expertise shaped
            <br />
            around every
            <br />
            property.
          </>
        }
        description="Across residential and commercial property, our management, sales, letting and advisory services bring clarity to every next step."
        items={items}
      />

      <Reveal>
        <ImageListSection
          id="management"
          eyebrow="01 / Property Management"
          heading={
            <>
              Your property,
              <br />
              carefully looked after.
            </>
          }
          description="We manage the everyday detail with the same care you would—protecting value, supporting occupants and keeping you clearly informed."
          listLabel="What we handle"
          listItems={managementItems}
          ctaLabel="Discuss management"
          ctaHref="/contact?topic=Management"
          image="/images/property-management.png"
          imageAlt="Purpose Space Realtors — managed property interior"
          imagePosition="left"
          background="white"
        />
      </Reveal>

      <Reveal>
        <ImageListSection
          id="sales-letting"
          eyebrow="02 / Sales & Letting"
          heading={
            <>
              Clear direction,
              <br />
              from listing to
              <br />
              handover.
            </>
          }
          description="We position each property thoughtfully, connect it with the right audience and guide negotiations through to a confident outcome."
          listLabel="What we handle"
          listItems={salesLettingItems}
          ctaLabel="Sell or let with us"
          ctaHref="/contact?topic=Sales%20%26%20letting"
          image="/images/sales-letting.jpg"
          imageAlt="Purpose Space Realtors — living room for sale or let"
          imagePosition="right"
          background="ivory"
        />
      </Reveal>

      <Reveal>
        <ImageListSection
          id="advisory"
          eyebrow="03 / Real Estate Advisory"
          heading={
            <>
              Advice grounded
              <br />
              in the right outcome.
            </>
          }
          description="For decisions that need more than a listing, we combine market understanding with a clear view of your priorities."
          listLabel="What we advise on"
          listItems={advisoryItems}
          ctaLabel="Request advisory"
          ctaHref="/contact?topic=Advisory"
          image="/images/about-guides-us.png"
          imageAlt="Purpose Space Realtors — balcony view"
          imagePosition="left"
          background="ink"
        />
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
          secondaryLabel="View properties"
          secondaryHref="/properties"
        />
      </Reveal>
    </>
  );
}

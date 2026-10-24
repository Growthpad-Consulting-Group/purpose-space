import { TripleImageHero } from "@/components/sections/TripleImageHero";

const images = [
  { number: "01", label: "Purpose", image: "/images/about-purpose.png" },
  { number: "02", label: "Place", image: "/images/about-place.png" },
  {
    number: "03",
    label: "Possibility",
    image: "/images/about-possibility.png",
  },
];

export function AboutHero() {
  return (
    <TripleImageHero
      eyebrow="About Purpose Space"
      heading={
        <>
          Real estate,
          <br />
          considered
          <br />
          around
          <br />
          people.
        </>
      }
      description={
        "We are a professional real estate services firm delivering purpose-led solutions across property management, agency, and property advisory. Our approach is anchored in the belief that every property decision must be intentional, strategic, and supported by strong professional insight. Through this perspective, we help clients unlock value, manage risk, and build resilient property portfolios in a fast-evolving market.\n\nPurpose-Led Real Estate Solutions is more than a tagline—it is the foundation of how we operate, the standard we uphold, and the value we bring to every engagement. We embrace innovation, transparent communication, and disciplined execution as key drivers of our service culture."
      }
      items={images}
    />
  );
}

import { ImageListSection } from "@/components/sections/ImageListSection";

const meansItems = [
  "Advice shaped around the outcome",
  "Attention to context, not just price",
  "Clear guidance from conversation to completion",
];

export function AboutBelief() {
  return (
    <ImageListSection
      eyebrow="01 / Our belief"
      heading={
        <>
          Property follows
          <br />
          purpose.
        </>
      }
      description="We begin by understanding what matters—how you want to live, work, invest or care for a property. Only then do we shape the right way forward."
      listLabel="What that means"
      listItems={meansItems}
      ctaLabel="Explore our services"
      ctaHref="/services"
      image="/images/about-belief.png"
      imageAlt="Purpose Space Realtors — interior courtyard"
      imagePosition="left"
      background="white"
    />
  );
}

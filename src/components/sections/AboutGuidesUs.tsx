import { ImageListSection } from "@/components/sections/ImageListSection";

const principles = ["Purpose-led advice", "Local understanding", "Attentive stewardship"];

export function AboutGuidesUs() {
  return (
    <ImageListSection
      eyebrow="03 / What guides us"
      heading={
        <>
          Composed. Warm.
          <br />
          Dependable.
        </>
      }
      description="Our approach is built around calm expertise and attentive service—so clients feel informed, supported and confident at every stage."
      listLabel="Our principles"
      listItems={principles}
      ctaLabel="Start a conversation"
      ctaHref="/contact"
      image="/images/about-guides-us.png"
      imageAlt="Purpose Space Realtors — balcony view"
      imagePosition="left"
      background="ink"
    />
  );
}

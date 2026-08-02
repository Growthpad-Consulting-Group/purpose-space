import { ImageListSection } from "@/components/sections/ImageListSection";

const considerItems = [
  "Place, access and everyday use",
  "Value, timing and market position",
  "Stewardship and long-term potential",
];

export function AboutPerspective() {
  return (
    <ImageListSection
      eyebrow="02 / Our perspective"
      heading={
        <>
          A better decision
          <br /> starts
          <br />
          with the whole <br />
          picture.
        </>
      }
      description="We consider the property, the setting, the market and the people it must serve—bringing practical judgement to residential and commercial real estate."
      listLabel="What we consider"
      listItems={considerItems}
      ctaLabel="Explore properties"
      ctaHref="/properties"
      image="/images/about-perspective.png"
      imageAlt="Purpose Space Realtors — living room"
      imagePosition="right"
      background="ivory"
    />
  );
}

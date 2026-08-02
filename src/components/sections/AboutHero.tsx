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
      description="Purpose Space exists to make real estate feel considered rather than transactional. Across homes, workplaces and investments, we guide decisions that fit lives, ambitions and long-term goals."
      items={images}
    />
  );
}

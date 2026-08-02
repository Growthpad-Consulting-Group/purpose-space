import Image from "next/image";

interface AboutImage {
  number: string;
  label: string;
  image: string;
}

const images: AboutImage[] = [
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
    <section className="bg-brand-ivory py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div className="animate-hero-text">
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            About Purpose Space
          </p>
          <h1 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
            Real estate,
            <br />
            considered
            <br />
            around
            <br />
            people.
          </h1>
          <p className="mt-8 max-w-md text-base text-brand-ink">
            Purpose Space exists to make real estate feel considered rather than
            transactional. Across homes, workplaces and investments, we guide
            decisions that fit lives, ambitions and long-term goals.
          </p>
        </div>

        <div className="animate-hero-image flex h-150 gap-6 border-l border-brand-gold/50 pl-8">
          {images.map((item) => (
            <div key={item.label} className="group flex h-full flex-1 flex-col">
              <div className="relative w-full flex-1 overflow-hidden rounded-t-full transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-xs font-semibold tracking-widest text-brand-green uppercase">
                {item.number} / {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

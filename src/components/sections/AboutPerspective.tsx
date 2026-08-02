import Image from "next/image";
import Link from "next/link";

const considerItems = [
  "Place, access and everyday use",
  "Value, timing and market position",
  "Stewardship and long-term potential",
];

export function AboutPerspective() {
  return (
    <section className="bg-brand-ivory py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            02 / Our perspective
          </p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.15] text-brand-green sm:text-5xl">
            A better decision
            <br /> starts
            <br />
            with the whole <br />
            picture.
          </h2>
          <p className="mt-6 max-w-lg text-base text-brand-ink">
            We consider the property, the setting, the market and the people it
            must serve—bringing practical judgement to residential and
            commercial real estate.
          </p>

          <p className="mt-10 text-xs font-semibold tracking-widest text-brand-gold uppercase">
            What we consider
          </p>
          <ul className="mt-4">
            {considerItems.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-brand-gold/40 py-4 first:pt-0"
              >
                <span className="text-xs font-medium text-brand-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-brand-green">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/properties"
            className="mt-8 inline-block rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
          >
            Explore properties
          </Link>
        </div>

        <div className="relative aspect-3/4 w-full max-w-md justify-self-end">
          <div
            aria-hidden
            className="absolute top-4 left-4 h-full w-full rounded-t-full border border-brand-gold"
          />
          <div className="absolute inset-0 overflow-hidden rounded-t-full">
            <Image
              src="/images/about-perspective.png"
              alt="Purpose Space Realtors — living room"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

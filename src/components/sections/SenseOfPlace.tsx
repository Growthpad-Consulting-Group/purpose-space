import { Icon } from "@iconify/react";

export function SenseOfPlace() {
  return (
    <section>
      <div
        className="relative flex aspect-[2.8/1] items-end overflow-hidden bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/images/sense-of-place.jpg')" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-brand-ink/65 via-transparent to-transparent"
        />
        <div className="container-fluid relative pb-16">
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Place, considered
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-[1.1] text-brand-ivory sm:text-6xl">
            Choose the life,
            <br />
            then the address.
          </h2>
        </div>
      </div>

      <div className="bg-brand-ivory py-16 lg:py-24">
        <div className="container-fluid grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              A sense of place
            </p>
            <h3 className="mt-6 font-heading text-3xl leading-[1.1] text-brand-green sm:text-4xl">
              The setting matters
              <br />
              as much as the space.
            </h3>
          </div>
          <div className="flex flex-col gap-8">
            <p className="max-w-lg text-base text-black">
              We consider the setting around every property — access,
              privacy, connection, character and the way it supports life or
              business.
            </p>
            <p className="text-xs font-medium tracking-widest text-brand-green uppercase mt-6">
              Space / Connection / Character
            </p>
            <a
              href="#"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
            >
              Find your place
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

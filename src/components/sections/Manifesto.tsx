import Image from "next/image";

export function Manifesto() {
  return (
    <section className="bg-brand-ink py-16">
      <div className="container-fluid grid gap-16 lg:grid-cols-[1fr_20rem]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Purpose before property
          </p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.15] text-brand-ivory sm:text-5xl">
            We begin with your desire.
            <br />
            Property follows with purpose.
          </h2>
          <p className="mt-14 max-w-2xl text-base text-brand-ivory/70">
            Thoughtful guidance for decisions that fit your life, ambitions
            and long-term goals.
          </p>
        </div>

        <div className="relative aspect-3/4 w-full">
          <div
            aria-hidden
            className="absolute -top-4 -left-4 h-full w-full rounded-t-full border border-brand-gold"
          />
          <div className="absolute inset-0 overflow-hidden rounded-t-full">
            <Image
              src="/images/manifesto-doorway.png"
              alt="Purpose Space Realtors — interior doorway"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

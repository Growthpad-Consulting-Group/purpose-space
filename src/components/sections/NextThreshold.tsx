import { Icon } from "@iconify/react";

export function NextThreshold() {
  return (
    <section className="relative overflow-hidden bg-brand-ivory py-16 lg:py-24">
      <div
        aria-hidden
        className="absolute top-4 -right-40 aspect-3/4 w-100 rounded-t-full border border-brand-gold/40"
      />

      <div className="container-fluid relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            The next threshold
          </p>
          <h2 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
            Your next
            <br />
            threshold.
          </h2>
          <p className="mt-6 max-w-2xl text-base text-black/70">
            Whether you are looking for your next property or deciding what
            comes next for one you own, we are ready to guide you.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a
            href="/properties"
            className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
          >
            Explore properties
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-gold"
          >
            Start a conversation
            <Icon icon="mdi:arrow-right" className="text-base" />
          </a>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

const meansItems = [
  "Advice shaped around the outcome",
  "Attention to context, not just price",
  "Clear guidance from conversation to completion",
];

export function AboutBelief() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <div className="relative aspect-3/4 w-full max-w-md">
          <div
            aria-hidden
            className="absolute top-4 left-4 h-full w-full rounded-t-full border border-brand-gold"
          />
          <div className="absolute inset-0 overflow-hidden rounded-t-full">
            <Image
              src="/images/about-belief.png"
              alt="Purpose Space Realtors — interior courtyard"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            01 / Our belief
          </p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.15] text-brand-green sm:text-5xl">
            Property follows
            <br />
            purpose.
          </h2>
          <p className="mt-6 max-w-lg text-base text-brand-ink">
            We begin by understanding what matters—how you want to live,
            work, invest or care for a property. Only then do we shape the
            right way forward.
          </p>

          <p className="mt-10 text-xs font-semibold tracking-widest text-brand-gold uppercase">
            What that means
          </p>
          <ul className="mt-4">
            {meansItems.map((item, index) => (
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
            href="#"
            className="mt-8 inline-block rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
          >
            Explore our services
          </Link>
        </div>
      </div>
    </section>
  );
}

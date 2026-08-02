import Image from "next/image";
import Link from "next/link";

const principles = ["Purpose-led advice", "Local understanding", "Attentive stewardship"];

export function AboutGuidesUs() {
  return (
    <section className="bg-brand-ink py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <div className="relative aspect-3/4 w-full max-w-md">
          <div
            aria-hidden
            className="absolute top-4 left-4 h-full w-full rounded-t-full border border-brand-gold"
          />
          <div className="absolute inset-0 overflow-hidden rounded-t-full">
            <Image
              src="/images/about-guides-us.png"
              alt="Purpose Space Realtors — balcony view"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            03 / What guides us
          </p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.15] text-brand-ivory sm:text-5xl">
            Composed. Warm.
            <br />
            Dependable.
          </h2>
          <p className="mt-6 max-w-lg text-base text-brand-ivory/70">
            Our approach is built around calm expertise and attentive
            service—so clients feel informed, supported and confident at
            every stage.
          </p>

          <p className="mt-10 text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Our principles
          </p>
          <ul className="mt-4">
            {principles.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-brand-gold/40 py-4 first:pt-0"
              >
                <span className="text-xs font-medium text-brand-ivory">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-brand-ivory">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#"
            className="mt-8 inline-block rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-ivory transition-colors hover:border-brand-ivory hover:bg-brand-ivory hover:text-brand-green"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}

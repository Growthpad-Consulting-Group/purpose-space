import Image from "next/image";
import Link from "next/link";

export function ListPropertyHero() {
  return (
    <section className="bg-brand-ivory py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
        <div className="lg:border-r lg:border-brand-gold/70 lg:pr-12">
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            List your property
          </p>
          <h1 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
            Let your property
            <br />
            move with purpose.
          </h1>
          <p className="mt-6 max-w-lg text-base text-brand-ink">
            Share the essentials and our team will advise on the best next
            step—whether you are selling, letting or looking for attentive
            management.
          </p>

          <Link
            href="#"
            className="mt-8 inline-block rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
          >
            List your property
          </Link>
        </div>

        <div className="relative aspect-3/3">
          <div className="absolute inset-0 overflow-hidden rounded-t-full">
            <Image
              src="/images/hero.png"
              alt="Purpose Space Realtors — entryway"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-brand-green px-8 py-6">
            <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              A helpful start
            </p>
            <p className="mt-2 text-base text-brand-ivory">
              Property type · Location · Sale, letting or management goal ·
              A few photographs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

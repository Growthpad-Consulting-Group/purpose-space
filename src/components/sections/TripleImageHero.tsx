import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface TripleImageHeroItem {
  number: string;
  label: string;
  image: string;
  href?: string;
}

interface TripleImageHeroProps {
  eyebrow: string;
  heading: ReactNode;
  description: string;
  items: TripleImageHeroItem[];
}

export function TripleImageHero({
  eyebrow,
  heading,
  description,
  items,
}: TripleImageHeroProps) {
  return (
    <section className="bg-brand-ivory py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div className="animate-hero-text">
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
            {heading}
          </h1>
          <p className="mt-8 max-w-md whitespace-pre-line text-base text-brand-ink">
            {description}
          </p>
        </div>

        <div className="animate-hero-image flex h-150 gap-6 border-l border-brand-gold/50 pl-8">
          {items.map((item) => {
            const card = (
              <div className="group flex h-full flex-1 flex-col">
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
            );

            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                aria-label={`Explore ${item.label}`}
                className="flex h-full flex-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
              >
                {card}
              </Link>
            ) : (
              <div key={item.label} className="flex h-full flex-1">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

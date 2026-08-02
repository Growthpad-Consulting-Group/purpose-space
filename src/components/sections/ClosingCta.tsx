import { Icon } from "@iconify/react";
import Link from "next/link";
import type { ReactNode } from "react";

interface ClosingCtaProps {
  eyebrow: string;
  heading: ReactNode;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export function ClosingCta({
  eyebrow,
  heading,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: ClosingCtaProps) {
  return (
    <section className="relative overflow-hidden bg-brand-ivory py-16 lg:py-24">
      <div
        aria-hidden
        className="absolute top-4 -right-40 aspect-3/4 w-100 rounded-t-full border border-brand-gold/40"
      />

      <div className="container-fluid relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-2xl text-base text-brand-ink">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:items-start lg:items-center">
          <Link
            href={primaryHref}
            className="w-full rounded-md border border-brand-gold px-6 py-3 text-center text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory sm:w-auto"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-gold"
          >
            {secondaryLabel}
            <Icon icon="mdi:arrow-right" className="text-base" />
          </Link>
        </div>
      </div>
    </section>
  );
}

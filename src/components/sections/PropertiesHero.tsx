"use client";

import { useParallax } from "@/hooks/useParallax";

export function PropertiesHero() {
  const { sectionRef, bgRef } = useParallax<HTMLElement, HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="relative flex aspect-square items-end overflow-hidden sm:aspect-video lg:aspect-[2.8/1]"
    >
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-x-0 inset-y-[-10%] bg-center bg-cover will-change-transform"
        style={{ backgroundImage: "url('/images/properties-hero.jpg')" }}
      />
      <div aria-hidden className="absolute inset-0 bg-brand-ink/20" />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-brand-ink/70 via-brand-ink/10 to-transparent"
      />
      <div className="container-fluid relative pb-24 lg:pb-28">
        <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
          Residential & Commercial
        </p>
        <h1 className="mt-4 font-heading text-4xl leading-[1.1] text-brand-ivory sm:text-6xl">
          Properties chosen
          <br />
          with purpose.
        </h1>
      </div>
    </section>
  );
}

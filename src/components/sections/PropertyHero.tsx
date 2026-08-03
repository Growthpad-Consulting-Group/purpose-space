"use client";

import Image from "next/image";
import Link from "next/link";
import { useParallax } from "@/hooks/useParallax";
import type { Listing } from "@/features/listings/types/listing";

export function PropertyHero({ listing }: { listing: Listing }) {
  const { sectionRef, bgRef } = useParallax<HTMLElement, HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="relative flex aspect-square flex-col overflow-hidden sm:aspect-video lg:aspect-[2.8/1]"
    >
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-x-0 inset-y-[-10%] will-change-transform"
      >
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-brand-ink/20" />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-brand-ink/80 via-brand-ink/20 to-transparent"
      />

      <div className="container-fluid relative pt-8 lg:pt-10">
        <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
          <Link href="/properties" className="hover:text-brand-ivory">
            Properties
          </Link>{" "}
          / {listing.category} / {listing.title}
        </p>
      </div>

      <div className="container-fluid relative flex flex-1 flex-col justify-center">
        <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
          {listing.status} · {listing.location}
        </p>
        <h1 className="mt-4 font-heading text-4xl leading-[1.05] text-brand-ivory sm:text-6xl">
          {listing.title}
        </h1>
        <p className="mt-6 text-xs font-semibold tracking-widest text-brand-ivory/80 uppercase">
          {listing.specs.join(" · ")}
        </p>
      </div>
    </section>
  );
}

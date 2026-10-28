import Link from "next/link";
import type { Listing } from "@/features/listings/types/listing";

export function PropertyOverview({ listing }: { listing: Listing }) {
  const priceLabel = listing.status === "For Sale" ? "Sale price" : "Monthly rent";

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
            {listing.tagline ?? `${listing.status} · ${listing.location}`}
          </p>
          <h2 className="mt-6 font-heading text-md leading-normal text-brand-green ">
            {listing.overviewHeading ?? listing.description}
          </h2>
        </div>

        <div className="lg:pt-1">
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            {priceLabel}
          </p>
          <p className="mt-3 font-heading text-3xl text-brand-green">
            {listing.priceDisplay}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-brand-green px-6 py-3 text-sm font-medium text-brand-ivory transition-colors hover:bg-brand-green/90"
            >
              Schedule a viewing
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
            >
              Request details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

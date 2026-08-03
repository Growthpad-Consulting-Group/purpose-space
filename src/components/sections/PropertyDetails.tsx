import Link from "next/link";
import type { Listing } from "@/features/listings/types/listing";

const FALLBACK_ROWS = (listing: Listing) => [
  { label: "Property type", value: listing.category },
  { label: "Status", value: listing.status },
  { label: "Location", value: listing.location },
  ...listing.specs.map((spec, index) => ({
    label: `Specification ${index + 1}`,
    value: spec,
  })),
];

export function PropertyDetails({ listing }: { listing: Listing }) {
  const rows = listing.detailRows?.length
    ? listing.detailRows
    : FALLBACK_ROWS(listing);

  return (
    <section className="bg-brand-ivory py-16 lg:py-24">
      <div className="container-fluid grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            {listing.category} details
          </p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.1] text-brand-green sm:text-5xl">
            {listing.detailsHeading ?? "The details that matter."}
          </h2>
          <p className="mt-6 max-w-md text-base text-brand-ink">
            {listing.detailsDescription ??
              "Specifications presented clearly for a confident decision."}
          </p>

          <dl className="mt-10">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[2rem_1fr_1fr] items-baseline gap-4 border-b border-brand-green/15 py-4"
              >
                <dt className="text-xs font-semibold text-brand-gold">
                  {String(rows.indexOf(row) + 1).padStart(2, "0")}
                </dt>
                <dt className="text-base text-brand-green">{row.label}</dt>
                <dd className="text-base font-medium text-brand-green">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          {listing.detailsFootnote && (
            <p className="mt-6 text-sm text-brand-ink/70">
              {listing.detailsFootnote}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between bg-brand-green px-8 py-10 sm:px-12 sm:py-12">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Location
            </p>
            <h3 className="mt-4 font-heading text-4xl text-brand-ivory sm:text-5xl">
              {listing.location}
            </h3>
            <p className="mt-4 max-w-md text-base text-brand-ivory/80">
              {listing.locationDescription ??
                "Exact location details are shared once an enquiry is confirmed."}
            </p>
          </div>

          <div className="relative my-10 aspect-8/5 overflow-hidden">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={`col-${index}`}
                aria-hidden
                className="absolute inset-y-0 w-px bg-brand-gold/46"
                style={{ left: `${(index / 6) * 100}%` }}
              />
            ))}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`row-${index}`}
                aria-hidden
                className="absolute inset-x-0 h-px bg-brand-gold/46"
                style={{ top: `${(index / 4) * 100}%` }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-gold">
              <span className="h-2 w-2 rounded-full bg-brand-gold" />
            </div>
          </div>

          <div>
            {listing.locationNote && (
              <p className="text-sm text-brand-ivory/70">
                {listing.locationNote}
              </p>
            )}
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-ivory transition-colors hover:bg-brand-gold hover:text-brand-green"
            >
              Ask about the location
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

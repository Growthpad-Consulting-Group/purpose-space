import type { Metadata } from "next";
import { PropertiesHero } from "@/components/sections/PropertiesHero";
import { PropertyFilters } from "@/components/sections/PropertyFilters";
import { ListingCard } from "@/features/listings/components/ListingCard";
import { getListings } from "@/features/listings/api/get-listings";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Pagination } from "@/shared/ui/Pagination";
import { Reveal } from "@/shared/ui/Reveal";

export const metadata: Metadata = {
  title: "Properties | Purpose Space Realtors",
  description:
    "A considered mix of homes, offices and investment properties chosen for character, setting and potential.",
};

const PAGE_SIZE = 6;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const listings = await getListings();

  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE));
  const currentPage = Math.min(totalPages, Math.max(1, Number(pageParam) || 1));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageListings = listings.slice(start, start + PAGE_SIZE);

  return (
    <>
      <PropertiesHero />
      <PropertyFilters />

      <Reveal>
        <section className="bg-brand-ivory pb-16 lg:pb-24">
          <div className="container-fluid">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
                  Available Properties
                </p>
                <h2 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
                  Find the space
                  <br />
                  that fits.
                </h2>
              </div>
              <div className="flex flex-col items-start gap-6">
                <p className="max-w-md text-base text-brand-ink">
                  Homes and commercial spaces currently represented by
                  Purpose Space. Refine the selection above.
                </p>
                <button
                  type="button"
                  className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
                >
                  Sort: Featured
                </button>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {pageListings.map((listing, index) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  index={start + index}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hrefFor={(page) =>
                page === 1 ? "/properties" : `/properties?page=${page}`
              }
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <ClosingCta
          eyebrow="Have a property to list?"
          heading={
            <>
              Your property,
              <br />
              considered.
            </>
          }
          description="From valuation and preparation to marketing and viewings, we bring clarity to every step."
          primaryLabel="List your property"
          primaryHref="#"
          secondaryLabel="Request a valuation"
          secondaryHref="#"
        />
      </Reveal>
    </>
  );
}

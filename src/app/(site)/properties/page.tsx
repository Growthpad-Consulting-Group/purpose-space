import type { Metadata } from "next";
import { PropertiesHero } from "@/components/sections/PropertiesHero";
import {
  ClearPropertyFilters,
  PropertyFilters,
} from "@/components/sections/PropertyFilters";
import { ListingCard } from "@/features/listings/components/ListingCard";
import { getListings } from "@/features/listings/api/get-listings";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Pagination } from "@/shared/ui/Pagination";
import { Reveal } from "@/shared/ui/Reveal";
import type { Listing } from "@/features/listings/types/listing";
import type { PropertyFilterConfig } from "@/components/sections/PropertyFilters";

export const metadata: Metadata = {
  title: "Properties | Purpose Space Realtors",
  description:
    "A considered mix of homes, offices and investment properties chosen for character, setting and potential.",
};

const PAGE_SIZE = 6;

type PropertySearchParams = {
  page?: string;
  category?: string;
  status?: string;
  location?: string;
  type?: string;
  price?: string;
};

const PRICE_RANGES = [
  "Under KES 20M",
  "KES 20M-50M",
  "KES 50M-100M",
  "Above KES 100M",
];

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function propertyType(listing: Listing) {
  const value = listing.detailRows?.find(
    (row) => row.label.toLowerCase() === "property type",
  )?.value ?? listing.category;
  const normalized = value.trim().toLowerCase();
  const aliases: Record<string, string> = {
    apartment: "Apartment",
    apartments: "Apartment",
    house: "House",
    houses: "House",
    office: "Office",
    offices: "Office",
    warehouse: "Warehouse",
    warehouses: "Warehouse",
  };
  return aliases[normalized] ?? value.trim();
}

function numericPrice(price: string) {
  const match = price.match(/(?:KES|KSH)\s*([\d,.]+)\s*([KMB])?/i);
  if (!match) return null;
  const amount = Number(match[1].replaceAll(",", ""));
  const suffix = match[2]?.toUpperCase() as "K" | "M" | "B" | undefined;
  const multiplier = suffix
    ? { K: 1_000, M: 1_000_000, B: 1_000_000_000 }[suffix]
    : 1;
  return amount * multiplier;
}

function matchesPrice(listing: Listing, range?: string) {
  if (!range) return true;
  const price = numericPrice(listing.priceDisplay);
  if (price === null) return false;
  if (range === "Under KES 20M") return price < 20_000_000;
  if (range === "KES 20M-50M") return price >= 20_000_000 && price <= 50_000_000;
  if (range === "KES 50M-100M") return price > 50_000_000 && price <= 100_000_000;
  if (range === "Above KES 100M") return price > 100_000_000;
  return true;
}

function matchesFilters(listing: Listing, filters: PropertySearchParams) {
  return (
    (!filters.category || listing.category === filters.category) &&
    (!filters.status || listing.status === filters.status) &&
    (!filters.location || listing.location === filters.location) &&
    (!filters.type || propertyType(listing) === filters.type) &&
    matchesPrice(listing, filters.price)
  );
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<PropertySearchParams>;
}) {
  const filters = await searchParams;
  const pageParam = filters.page;
  const listings = await getListings();

  const filteredListings = listings.filter((listing) =>
    matchesFilters(listing, filters),
  );
  const hasActiveFilters = Boolean(
    filters.category ||
      filters.status ||
      filters.location ||
      filters.type ||
      filters.price,
  );
  const filterConfigs: PropertyFilterConfig[] = [
    { label: "Category", param: "category", defaultLabel: "All properties", options: unique(listings.map((item) => item.category)) },
    { label: "Status", param: "status", defaultLabel: "Any status", options: unique(listings.map((item) => item.status)) },
    { label: "Location", param: "location", defaultLabel: "All locations", options: unique(listings.map((item) => item.location)) },
    { label: "Property Type", param: "type", defaultLabel: "Any type", options: unique(listings.map(propertyType)) },
    { label: "Price", param: "price", defaultLabel: "Any range", options: PRICE_RANGES },
  ];

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE));
  const currentPage = Math.min(totalPages, Math.max(1, Number(pageParam) || 1));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageListings = filteredListings.slice(start, start + PAGE_SIZE);

  return (
    <>
      <PropertiesHero />
      <PropertyFilters configs={filterConfigs} />

      <Reveal>
        <section
          id="properties-results"
          className="scroll-mt-24 bg-brand-ivory pb-16 lg:pb-24"
        >
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
                <div className="flex flex-wrap items-center gap-4">
                  <p
                    aria-live="polite"
                    className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green"
                  >
                    {filteredListings.length}{" "}
                    {filteredListings.length === 1 ? "property" : "properties"} found
                  </p>
                  {hasActiveFilters ? <ClearPropertyFilters /> : null}
                </div>
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

            {pageListings.length === 0 ? (
              <div className="mt-16 border-y border-brand-gold/40 py-16 text-center">
                <h3 className="font-heading text-3xl text-brand-green">
                  No matching properties.
                </h3>
                <p className="mt-3 text-brand-ink/70">
                  Try widening or clearing the filters above.
                </p>
              </div>
            ) : null}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hrefFor={(page) => {
                const params = new URLSearchParams();
                Object.entries(filters).forEach(([key, value]) => {
                  if (key !== "page" && value) params.set(key, value);
                });
                if (page > 1) params.set("page", String(page));
                return `/properties${params.size ? `?${params.toString()}` : ""}#properties-results`;
              }}
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
          description="Superior service anchored on technical training, market experience, and continuous professional development."
          primaryLabel="List your property"
          primaryHref="/list-property"
          secondaryLabel="View properties"
          secondaryHref="/properties#properties-results"
        />
      </Reveal>
    </>
  );
}

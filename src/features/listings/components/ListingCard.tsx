import { Icon } from "@iconify/react";
import type { Listing } from "../types/listing";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-neutral-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-2 p-4">
        <h3 className="font-heading text-lg text-brand-dark dark:text-brand-cream">
          {listing.title}
        </h3>
        <p className="flex items-center gap-1 text-sm text-neutral-500">
          <Icon icon="mdi:map-marker" className="text-base" />
          {listing.location}
        </p>
        <p className="text-xl font-bold text-brand">
          {formatPrice(listing.price)}
        </p>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span className="flex items-center gap-1">
            <Icon icon="mdi:bed" /> {listing.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Icon icon="mdi:shower" /> {listing.bathrooms}
          </span>
        </div>
      </div>
    </div>
  );
}

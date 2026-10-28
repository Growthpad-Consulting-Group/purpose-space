import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import type { Listing } from "../types/listing";

export function ListingCard({
  listing,
  index,
}: {
  listing: Listing;
  index: number;
}) {
  return (
    <Link
      href={`/properties/${listing.slug}`}
      aria-label={`View ${listing.title}`}
      className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-[220px] transition-[border-radius] duration-500 ease-out group-hover:rounded-t-none">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <p className="mt-4 text-xs font-semibold tracking-widest uppercase">
        <span className="text-brand-gold">
          {String(index + 1).padStart(2, "0")}
        </span>{" "}
        <span className="text-brand-green/60">
          {listing.status} · {listing.location}
        </span>
      </p>
      <h3 className="mt-1 font-heading text-3xl text-brand-green">
        {listing.title}
      </h3>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-brand-gold/30 pt-4">
        <p className="text-sm font-medium text-brand-green">
          {listing.priceDisplay}
        </p>
        <span className="flex items-center gap-1 text-sm font-medium text-brand-green">
          <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
            View property
          </span>
          <Icon icon="mdi:arrow-right" className="text-brand-gold" />
        </span>
      </div>
    </Link>
  );
}

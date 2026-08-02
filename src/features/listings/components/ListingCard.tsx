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
    <div className="group">
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
        <span className="text-brand-gold">{String(index + 1).padStart(2, "0")}</span>{" "}
        <span className="text-brand-green/60">
          {listing.status} · {listing.location}
        </span>
      </p>
      <h3 className="mt-1 font-heading text-3xl text-brand-green">
        {listing.title}
      </h3>
      <p className="mt-2 text-xs tracking-wide text-brand-green uppercase">
        {listing.specs.join(" · ")}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-medium text-brand-green">
          {listing.priceDisplay}
        </p>
        <Link
          href={`/properties/${listing.slug}`}
          className="flex items-center gap-1 text-sm font-medium text-brand-green"
        >
          <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
            View property
          </span>
          <Icon icon="mdi:arrow-right" className="text-brand-gold" />
        </Link>
      </div>
    </div>
  );
}

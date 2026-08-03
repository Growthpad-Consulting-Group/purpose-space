"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import type { Listing } from "@/features/listings/types/listing";

function pickNext(listing: Listing, listings: Listing[]): Listing | null {
  const sameCategory = listings.find(
    (item) => item.id !== listing.id && item.category === listing.category
  );
  const any = listings.find((item) => item.id !== listing.id);
  return sameCategory ?? any ?? null;
}

// Renders a sentinel near the end of the property page; once it scrolls into
// view (reader is close to the enquiry form), a floating card slides in
// suggesting another property to consider — surfaces cross-sell without
// competing with the enquiry form for attention.
export function NextUpProperty({
  listing,
  listings,
}: {
  listing: Listing;
  listings: Listing[];
}) {
  const next = pickNext(listing, listings);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !next) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [next]);

  if (!next) return null;

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px" />

      <div
        className={`fixed bottom-6 left-1/2 z-40 w-[calc(100%-3rem)] max-w-sm -translate-x-1/2 transition-all duration-500 ease-out sm:right-6 sm:left-auto sm:translate-x-0 ${
          visible && !dismissed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="relative flex items-center gap-4 rounded-sm border border-brand-gold/20 bg-white p-3 shadow-2xl shadow-brand-ink/20">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-green/40 shadow-sm transition-colors hover:bg-brand-green/5 hover:text-brand-green"
          >
            <Icon icon="mdi:close-circle" width={20} height={20} />
          </button>

          <Link
            href={`/properties/${next.slug}`}
            className="group flex flex-1 items-center gap-4"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
              <Image
                src={next.imageUrl}
                alt={next.title}
                fill
                sizes="64px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-1 overflow-hidden">
              <span className="text-[10px] font-bold tracking-wider text-brand-gold uppercase">
                Up next · {next.status}
              </span>
              <span className="font-heading text-sm leading-snug text-brand-green transition-colors group-hover:text-brand-gold">
                {next.title}
              </span>
              <span className="text-xs font-medium text-brand-green/70">
                {next.priceDisplay}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import type { Listing } from "@/features/listings/types/listing";
import { Modal } from "@/shared/ui/Modal";

export function PropertyOverview({ listing }: { listing: Listing }) {
  const priceLabel = listing.status === "For Sale" ? "Sale price" : "Monthly rent";
  const [viewingOpen, setViewingOpen] = useState(false);

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
            <button
              type="button"
              onClick={() => setViewingOpen(true)}
              className="rounded-md bg-brand-green px-6 py-3 text-sm font-medium text-brand-ivory transition-colors hover:bg-brand-green/90"
            >
              Schedule a viewing
            </button>
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("property-enquiry")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.replaceState(
                  null,
                  "",
                  `${window.location.pathname}${window.location.search}#property-enquiry`,
                );
              }}
              className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
            >
              Request details
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={viewingOpen}
        title={`Schedule a viewing for ${listing.title}`}
        onClose={() => setViewingOpen(false)}
        variant="dialog"
      >
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Private viewing
          </p>
          <h2 className="mt-4 pr-12 font-heading text-3xl leading-tight text-brand-green sm:text-4xl">
            Visit {listing.title}.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-ink/75">
            Tell us when you would like to visit. An advisor will confirm the
            property&apos;s availability and viewing details with you.
          </p>

          <form onSubmit={(event) => event.preventDefault()} className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <ViewingField label="Full name" placeholder="Your full name" />
              <ViewingField label="Phone number" placeholder="+254" type="tel" />
              <ViewingField label="Email address" placeholder="name@email.com" type="email" />
              <ViewingField label="Preferred date" type="date" />
            </div>
            <button
              type="submit"
              className="mt-8 rounded-md bg-brand-green px-6 py-3 text-sm font-medium text-brand-ivory transition-colors hover:bg-brand-green/90"
            >
              Request viewing
            </button>
          </form>
        </div>
      </Modal>
    </section>
  );
}

function ViewingField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-widest text-brand-green uppercase">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full border-b border-brand-gold/60 bg-transparent pb-3 text-base text-brand-green placeholder-brand-ink/45 outline-none transition-colors focus:border-brand-green"
      />
    </label>
  );
}

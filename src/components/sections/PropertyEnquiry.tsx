"use client";

import type { Listing } from "@/features/listings/types/listing";

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
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
        className="mt-3 w-full border-b border-brand-gold/60 bg-transparent pb-3 text-base text-brand-green placeholder-brand-ink/50 outline-none transition-colors focus:border-brand-green"
      />
    </label>
  );
}

export function PropertyEnquiry({ listing }: { listing: Listing }) {
  const isCommercial = listing.category === "Commercial";

  return (
    <section className="bg-white py-16">
      <div className="container-fluid grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
            {isCommercial ? "Commercial viewing" : "Property viewing"}
          </p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.1] text-brand-green sm:text-5xl">
            Interested in {listing.title}?
          </h2>
          <p className="mt-6 max-w-xl text-base text-brand-ink">
            Share your details and a Purpose Space advisor will contact you to
            arrange a {isCommercial ? "commercial viewing or provide leasing" : "viewing or provide further"}{" "}
            information.
          </p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="bg-brand-ivory px-8 py-6"
        >
          <h3 className="font-heading text-xl text-brand-green sm:text-2xl">
            Request {isCommercial ? "commercial" : "property"} details
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <Field label="Full name" placeholder="Your full name" />
            <Field
              label={isCommercial ? "Company name" : "Preferred contact"}
              placeholder={isCommercial ? "Your company" : "Email or phone"}
            />
            <Field
              label="Phone number"
              placeholder="+254"
              type="tel"
            />
            <Field
              label="Email address"
              placeholder="name@email.com"
              type="email"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-sm bg-brand-green px-6 py-3 text-sm font-medium text-brand-ivory transition-colors hover:bg-brand-green/90"
            >
              Send enquiry
            </button>
            <p className="text-sm text-brand-ink/70">
              By submitting, you agree to be contacted about this property.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

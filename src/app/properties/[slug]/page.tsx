import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyHero } from "@/components/sections/PropertyHero";
import { PropertyOverview } from "@/components/sections/PropertyOverview";
import { PropertyGallery } from "@/components/sections/PropertyGallery";
import { PropertyDetails } from "@/components/sections/PropertyDetails";
import { PropertyEnquiry } from "@/components/sections/PropertyEnquiry";
import { NextUpProperty } from "@/components/sections/NextUpProperty";
import { getListingBySlug, getListings } from "@/features/listings/api/get-listings";
import { Reveal } from "@/shared/ui/Reveal";

export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return { title: "Property | Purpose Space Realtors" };
  }

  return {
    title: `${listing.title} | Purpose Space Realtors`,
    description: listing.description,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [listing, listings] = await Promise.all([
    getListingBySlug(slug),
    getListings(),
  ]);

  if (!listing) {
    notFound();
  }

  return (
    <>
      <PropertyHero listing={listing} />

      <Reveal>
        <PropertyOverview listing={listing} />
      </Reveal>

      <Reveal>
        <PropertyGallery listing={listing} />
      </Reveal>

      <Reveal>
        <PropertyDetails listing={listing} />
      </Reveal>

      <NextUpProperty listing={listing} listings={listings} />

      <Reveal>
        <PropertyEnquiry listing={listing} />
      </Reveal>
    </>
  );
}

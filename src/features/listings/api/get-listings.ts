import { sanityClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import type { Listing } from "../types/listing";

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    slug: "the-garden-residence",
    title: "The Garden Residence",
    location: "Karen",
    status: "For Sale",
    specs: ["4 Bedrooms", "4.5 Bathrooms", "2 Parking"],
    priceDisplay: "KES 95,000,000",
    imageUrl: "/images/garden-residence.png",
  },
  {
    id: "2",
    slug: "the-courtyard-house",
    title: "The Courtyard House",
    location: "Loresho",
    status: "To Let",
    specs: ["3 Bedrooms", "3.5 Bathrooms", "2 Parking"],
    priceDisplay: "KES 420,000 / month",
    imageUrl: "/images/courtyard-house.png",
  },
  {
    id: "3",
    slug: "riverside-office-suite",
    title: "Riverside Office Suite",
    location: "Westlands",
    status: "To Let",
    specs: ["2,400 sq ft", "Fitted Office", "6 Parking"],
    priceDisplay: "KES 320K / month",
    imageUrl: "/images/riverside-office.png",
  },
  {
    id: "4",
    slug: "the-canopy-house",
    title: "The Canopy House",
    location: "Nairobi",
    status: "Private Listing",
    specs: ["4 Bedrooms", "4.5 Bathrooms", "2 Parking"],
    priceDisplay: "Price on request",
    imageUrl: "/images/canopy-house.png",
  },
  {
    id: "5",
    slug: "the-pool-courtyard",
    title: "The Pool Courtyard",
    location: "Nairobi",
    status: "Private Listing",
    specs: ["5 Bedrooms", "5 Bathrooms", "3 Parking"],
    priceDisplay: "Price on request",
    imageUrl: "/images/pool-courtyard.png",
  },
  {
    id: "6",
    slug: "the-veranda-house",
    title: "The Veranda House",
    location: "Nairobi",
    status: "Private Listing",
    specs: ["4 Bedrooms", "4 Bathrooms", "2 Parking"],
    priceDisplay: "Price on request",
    imageUrl: "/images/veranda-house.png",
  },
];

const PROPERTIES_QUERY = `*[_type == "property"] | order(_createdAt desc) {
  "id": _id,
  "slug": slug.current,
  title,
  location,
  status,
  specs,
  priceDisplay,
  image
}`;

interface SanityListing {
  id: string;
  slug: string;
  title: string;
  location: string;
  status: string;
  specs: string[];
  priceDisplay: string;
  image: Parameters<typeof urlForImage>[0] | null;
}

export async function getListings(): Promise<Listing[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return MOCK_LISTINGS;
  }

  try {
    const properties = await sanityClient.fetch<SanityListing[]>(PROPERTIES_QUERY);

    if (!properties || properties.length === 0) {
      return MOCK_LISTINGS;
    }

    return properties.map((property) => ({
      id: property.id,
      slug: property.slug,
      title: property.title,
      location: property.location,
      status: property.status,
      specs: property.specs ?? [],
      priceDisplay: property.priceDisplay,
      imageUrl: property.image
        ? urlForImage(property.image).width(900).height(1100).url()
        : "/images/hero.png",
    }));
  } catch (error) {
    console.error("Failed to fetch properties from Sanity, falling back to mock data:", error);
    return MOCK_LISTINGS;
  }
}

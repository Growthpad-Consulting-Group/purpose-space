import { sanityClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import type { Listing } from "../types/listing";

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    slug: "the-garden-residence",
    title: "The Garden Residence",
    category: "Residential",
    location: "Karen, Nairobi",
    status: "For Sale",
    specs: ["4 Bedrooms", "4.5 Bathrooms", "2 Parking"],
    priceDisplay: "KES 95,000,000",
    imageUrl: "/images/garden-residence.png",
    description:
      "A considered family home set within mature gardens, balancing generous living spaces with quiet, private outlooks.",
    tagline: "A quiet family home in Karen",
    overviewHeading: "A garden residence built for gathering and calm.",
    galleryHeading: "A home shaped by its garden setting.",
    detailsHeading: "The details that shape the home.",
    detailsDescription:
      "Residential specifications presented clearly for a confident buying decision.",
    detailRows: [
      { label: "Property type", value: "Detached house" },
      { label: "Status", value: "For sale" },
      { label: "Location", value: "Karen, Nairobi" },
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "4.5" },
      { label: "Parking", value: "2 bays" },
    ],
    detailsFootnote:
      "Title, service charge and viewing availability can be confirmed during enquiry.",
    locationDescription:
      "A leafy, established neighbourhood known for its schools, gardens and quiet streets.",
    locationNote:
      "Exact location and viewing instructions are shared after an enquiry is confirmed.",
  },
  {
    id: "2",
    slug: "the-courtyard-house",
    title: "The Courtyard House",
    category: "Residential",
    location: "Loresho, Nairobi",
    status: "To Let",
    specs: ["3 Bedrooms", "3.5 Bathrooms", "2 Parking"],
    priceDisplay: "KES 420,000 / month",
    imageUrl: "/images/courtyard-house.png",
    description:
      "An airy courtyard layout that draws natural light through every room, positioned within an established, leafy neighbourhood.",
    tagline: "A light-filled courtyard home in Loresho",
    overviewHeading: "A courtyard layout designed around natural light.",
    galleryHeading: "A home that opens onto its own courtyard.",
    detailsHeading: "The details that shape the home.",
    detailsDescription:
      "Residential specifications presented clearly for a confident letting decision.",
    detailRows: [
      { label: "Property type", value: "Courtyard house" },
      { label: "Status", value: "To let" },
      { label: "Location", value: "Loresho, Nairobi" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "3.5" },
      { label: "Parking", value: "2 bays" },
    ],
    detailsFootnote:
      "Lease term, deposit and availability can be confirmed during enquiry.",
    locationDescription:
      "An established, leafy neighbourhood with easy access to schools and the city.",
    locationNote:
      "Exact location and viewing instructions are shared after an enquiry is confirmed.",
  },
  {
    id: "3",
    slug: "riverside-office-suite",
    title: "Riverside Office Suite",
    category: "Commercial",
    location: "Westlands, Nairobi",
    status: "To Let",
    specs: ["2,400 sq ft", "Fitted Office", "6 Parking"],
    priceDisplay: "KES 320K / month",
    imageUrl: "/images/riverside-office.png",
    description:
      "A fitted office suite with river-facing views, finished to a considered standard and ready for immediate occupation.",
    tagline: "A well-connected office in Westlands",
    overviewHeading:
      "A fitted office suite designed for focused work and a confident client arrival.",
    galleryHeading: "A professional setting, ready for business.",
    detailsHeading: "The details that shape the lease.",
    detailsDescription:
      "Commercial specifications presented clearly for a confident leasing decision.",
    detailRows: [
      { label: "Property type", value: "Office suite" },
      { label: "Status", value: "To let" },
      { label: "Location", value: "Westlands, Nairobi" },
      { label: "Floor area", value: "2,400 sq ft" },
      { label: "Fit-out", value: "Fitted office" },
      { label: "Parking", value: "6 parking bays" },
    ],
    detailsFootnote:
      "Lease term, service charge, availability and permitted use can be confirmed during enquiry.",
    locationDescription:
      "A well-connected business district with access to offices, hospitality, retail and major transport routes.",
    locationNote:
      "Exact location and viewing instructions are shared after an enquiry is confirmed.",
  },
  {
    id: "4",
    slug: "the-canopy-house",
    title: "The Canopy House",
    category: "Residential",
    location: "Nairobi",
    status: "Private Listing",
    specs: ["4 Bedrooms", "4.5 Bathrooms", "2 Parking"],
    priceDisplay: "Price on request",
    imageUrl: "/images/canopy-house.png",
    description:
      "A private listing shaded by a mature tree canopy, offering a rare balance of seclusion and connection to the city.",
    tagline: "A private, tree-shaded residence",
    overviewHeading: "A canopy home built for seclusion and connection.",
    galleryHeading: "A home settled beneath its own canopy.",
    detailsHeading: "The details that shape the home.",
    detailsDescription:
      "Residential specifications presented clearly for a confident decision.",
    detailRows: [
      { label: "Property type", value: "Private residence" },
      { label: "Status", value: "Private listing" },
      { label: "Location", value: "Nairobi" },
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "4.5" },
      { label: "Parking", value: "2 bays" },
    ],
    detailsFootnote:
      "Price, availability and viewing terms can be confirmed during enquiry.",
    locationDescription:
      "A private, tree-lined setting offering seclusion while remaining close to the city.",
    locationNote:
      "Exact location and viewing instructions are shared after an enquiry is confirmed.",
  },
  {
    id: "5",
    slug: "the-pool-courtyard",
    title: "The Pool Courtyard",
    category: "Residential",
    location: "Nairobi",
    status: "Private Listing",
    specs: ["5 Bedrooms", "5 Bathrooms", "3 Parking"],
    priceDisplay: "Price on request",
    imageUrl: "/images/pool-courtyard.png",
    description:
      "A generous family residence arranged around a central pool courtyard, designed for both entertaining and everyday calm.",
    tagline: "A private residence built around water",
    overviewHeading: "A pool courtyard designed for entertaining and calm.",
    galleryHeading: "A home arranged around its own courtyard.",
    detailsHeading: "The details that shape the home.",
    detailsDescription:
      "Residential specifications presented clearly for a confident decision.",
    detailRows: [
      { label: "Property type", value: "Private residence" },
      { label: "Status", value: "Private listing" },
      { label: "Location", value: "Nairobi" },
      { label: "Bedrooms", value: "5" },
      { label: "Bathrooms", value: "5" },
      { label: "Parking", value: "3 bays" },
    ],
    detailsFootnote:
      "Price, availability and viewing terms can be confirmed during enquiry.",
    locationDescription:
      "A private residential setting arranged for entertaining, with easy access to the city.",
    locationNote:
      "Exact location and viewing instructions are shared after an enquiry is confirmed.",
  },
  {
    id: "6",
    slug: "the-veranda-house",
    title: "The Veranda House",
    category: "Residential",
    location: "Nairobi",
    status: "Private Listing",
    specs: ["4 Bedrooms", "4 Bathrooms", "2 Parking"],
    priceDisplay: "Price on request",
    imageUrl: "/images/veranda-house.png",
    description:
      "A veranda-wrapped home that extends living space outdoors, set within a quiet, considered plot.",
    tagline: "A quiet, veranda-wrapped home",
    overviewHeading: "A veranda home built to extend living outdoors.",
    galleryHeading: "A home wrapped in its own veranda.",
    detailsHeading: "The details that shape the home.",
    detailsDescription:
      "Residential specifications presented clearly for a confident decision.",
    detailRows: [
      { label: "Property type", value: "Private residence" },
      { label: "Status", value: "Private listing" },
      { label: "Location", value: "Nairobi" },
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "4" },
      { label: "Parking", value: "2 bays" },
    ],
    detailsFootnote:
      "Price, availability and viewing terms can be confirmed during enquiry.",
    locationDescription:
      "A quiet, considered plot with easy access to the surrounding neighbourhood.",
    locationNote:
      "Exact location and viewing instructions are shared after an enquiry is confirmed.",
  },
];

const PROPERTIES_QUERY = `*[_type == "property" && defined(slug.current)] | order(featured desc, sortOrder asc, title asc) {
  "id": _id,
  "slug": slug.current,
  title,
  category,
  location,
  status,
  specs,
  priceDisplay,
  description,
  tagline,
  overviewHeading,
  galleryHeading,
  detailsHeading,
  detailsDescription,
  detailRows,
  detailsFootnote,
  locationDescription,
  locationNote,
  image,
  gallery
}`;

interface SanityListing {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  status: string;
  specs: string[];
  priceDisplay: string;
  description?: string;
  tagline?: string;
  overviewHeading?: string;
  galleryHeading?: string;
  detailsHeading?: string;
  detailsDescription?: string;
  detailRows?: { label: string; value: string }[];
  detailsFootnote?: string;
  locationDescription?: string;
  locationNote?: string;
  image: Parameters<typeof urlForImage>[0] | null;
  gallery?: Parameters<typeof urlForImage>[0][];
}

function mapListing(property: SanityListing): Listing {
  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    category: property.category,
    location: property.location,
    status: property.status,
    specs: property.specs ?? [],
    priceDisplay: property.priceDisplay,
    description: property.description,
    tagline: property.tagline,
    overviewHeading: property.overviewHeading,
    galleryHeading: property.galleryHeading,
    detailsHeading: property.detailsHeading,
    detailsDescription: property.detailsDescription,
    detailRows: property.detailRows,
    detailsFootnote: property.detailsFootnote,
    locationDescription: property.locationDescription,
    locationNote: property.locationNote,
    imageUrl: property.image
      ? urlForImage(property.image).width(900).height(1100).url()
      : "/images/hero.png",
    gallery: property.gallery?.map((image) =>
      urlForImage(image).width(900).height(1100).url()
    ),
  };
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

    return properties.map(mapListing);
  } catch (error) {
    console.error("Failed to fetch properties from Sanity, falling back to mock data:", error);
    return MOCK_LISTINGS;
  }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return MOCK_LISTINGS.find((listing) => listing.slug === slug) ?? null;
  }

  try {
    const property = await sanityClient.fetch<SanityListing | null>(
      `*[_type == "property" && slug.current == $slug][0] {
        "id": _id,
        "slug": slug.current,
        title,
        category,
        location,
        status,
        specs,
        priceDisplay,
        description,
        tagline,
        overviewHeading,
        galleryHeading,
        detailsHeading,
        detailsDescription,
        detailRows,
        detailsFootnote,
        locationDescription,
        locationNote,
        image,
        gallery
      }`,
      { slug }
    );

    if (!property) {
      return MOCK_LISTINGS.find((listing) => listing.slug === slug) ?? null;
    }

    return mapListing(property);
  } catch (error) {
    console.error("Failed to fetch property from Sanity, falling back to mock data:", error);
    return MOCK_LISTINGS.find((listing) => listing.slug === slug) ?? null;
  }
}

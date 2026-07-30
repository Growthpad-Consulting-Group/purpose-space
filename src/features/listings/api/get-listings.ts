import type { Listing } from "../types/listing";

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern 4-Bedroom Villa",
    location: "East Legon, Accra",
    price: 850000,
    bedrooms: 4,
    bathrooms: 5,
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: "2",
    title: "Cozy 2-Bedroom Apartment",
    location: "Cantonments, Accra",
    price: 320000,
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: "3",
    title: "Executive Townhouse",
    location: "Airport Residential, Accra",
    price: 620000,
    bedrooms: 3,
    bathrooms: 4,
    imageUrl: "https://placehold.co/600x400",
  },
];

export async function getListings(): Promise<Listing[]> {
  return MOCK_LISTINGS;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  status: string;
  specs: string[];
  priceDisplay: string;
  imageUrl: string;
  description?: string;
  tagline?: string;
  overviewHeading?: string;
  galleryHeading?: string;
  gallery?: string[];
  detailsHeading?: string;
  detailsDescription?: string;
  detailRows?: { label: string; value: string }[];
  detailsFootnote?: string;
  locationDescription?: string;
  locationNote?: string;
}

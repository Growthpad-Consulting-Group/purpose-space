import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ListingCard } from "@/features/listings/components/ListingCard";
import { getListings } from "@/features/listings/api/get-listings";

export default async function Home() {
  const listings = await getListings();

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream">
      <Header />
      <Hero />
      <main className="container-fluid flex-1 pb-16">
        <div className="mb-8">
          <h2 className="font-heading text-3xl text-brand-dark">
            Featured Properties
          </h2>
          <p className="mt-2 text-brand-dark/60">
            Browse listings curated by Purpose Space Realtors.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

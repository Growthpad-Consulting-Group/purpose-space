import { Header } from "@/components/layout/Header";
import { ListingCard } from "@/features/listings/components/ListingCard";
import { getListings } from "@/features/listings/api/get-listings";

export default async function Home() {
  const listings = await getListings();

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream dark:bg-black">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="mb-8">
          <h1 className="font-heading text-3xl text-brand-dark dark:text-brand-cream">
            Find your next property
          </h1>
          <p className="mt-2 text-neutral-500">
            Browse listings curated by Purpose Space Realtors.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>
    </div>
  );
}

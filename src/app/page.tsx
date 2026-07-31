import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PurposeAccordion } from "@/components/sections/PurposeAccordion";
import { ExpertiseAccordion } from "@/components/sections/ExpertiseAccordion";
import { WhyPurposeSpace } from "@/components/sections/WhyPurposeSpace";
import { Manifesto } from "@/components/sections/Manifesto";
import { SenseOfPlace } from "@/components/sections/SenseOfPlace";
import { ListingCard } from "@/features/listings/components/ListingCard";
import { getListings } from "@/features/listings/api/get-listings";

export default async function Home() {
  const listings = await getListings();

  return (
    <div className="flex min-h-screen flex-col bg-brand-ivory">
      <Header />
      <Hero />
      <PurposeAccordion />
      <main className="container-fluid flex-1 py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
              Featured Properties
            </p>
            <h2 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
              Spaces with a
              <br />
              sense of place.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
            <p className="max-w-md text-base text-brand-green/70">
              A considered mix of homes, offices and investment properties
              chosen for character, setting and potential.
            </p>
            <a
              href="/properties"
              className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
            >
              View all properties
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} />
          ))}
        </div>
      </main>
      <Manifesto />
      <WhyPurposeSpace />
      <ExpertiseAccordion />
      <SenseOfPlace />
      <Footer />
    </div>
  );
}

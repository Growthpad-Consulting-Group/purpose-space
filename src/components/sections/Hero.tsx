import { Icon } from "@iconify/react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="container-fluid flex min-h-[calc(100vh-80px)] items-center py-8 lg:py-12">
      <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_30rem]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
            Property, with purpose
          </p>
          <h1 className="mt-6 font-heading text-6xl leading-[1.05] text-brand-green sm:text-8xl">
            Your next <br />
            space <br />
            starts here.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-brand-green">
            Whether you are searching, selling, letting or investing, Purpose
            Space brings considered guidance to every property decision.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#"
              className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:bg-brand-green hover:border-brand-green hover:text-brand-ivory"
            >
              Explore properties
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:bg-brand-green hover:border-brand-green hover:text-brand-ivory"
            >
              Speak to an advisor
              <Icon icon="mdi:arrow-right" className="text-base" />
            </a>
          </div>
        </div>

        <div className="relative aspect-652/872 w-full">
          <div
            aria-hidden
            className="absolute top-4 left-4 h-full w-full rounded-t-[326px] border border-brand-gold"
          />
          <div className="absolute inset-0 overflow-hidden rounded-t-[326px]">
            <Image
              src="/images/hero.png"
              alt="Purpose Space Realtors — entryway"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

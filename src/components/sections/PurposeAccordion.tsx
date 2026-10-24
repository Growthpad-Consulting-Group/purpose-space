"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface PurposeItem {
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  image: string;
}

const purposeItems: PurposeItem[] = [
  {
    title: "A place to call home",
    description: "Explore thoughtfully selected homes to buy or rent.",
    cta: "Explore homes",
    ctaHref: "/properties",
    image: "/images/place-to-call-home.jpg",
  },
  {
    title: "A space for business",
    description: "Find commercial spaces suited to your business needs.",
    cta: "Explore commercial spaces",
    ctaHref: "/properties",
    image: "/images/space-for-business.jpg",
  },
  {
    title: "A property to let or sell",
    description: "List your property with agents who understand the market.",
    cta: "List your property",
    ctaHref: "/list-property",
    image: "/images/property-to-let.jpg",
  },
  {
    title: "A property to care for",
    description: "Reliable, hands-on management for properties you already own.",
    cta: "Property management",
    ctaHref: "/services",
    image: "/images/property-to-care.jpg",
  },
];

export function PurposeAccordion() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-fluid grid gap-x-8 gap-y-4 border-brand-green/10 pb-12 lg:grid-cols-2">
        <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
          Start with your purpose
        </p>
        <div aria-hidden />
        <h2 className="font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
          Begin with what
          <br />
          matters.
        </h2>
        <div className="flex h-full flex-col justify-start border-l border-brand-green/20 pl-6">
          <p className="max-w-md text-base text-brand-green/70">
            Every property journey starts differently. Choose what brings you
            here, and we will help you move forward with clarity.
          </p>
        </div>
      </div>

      <div className="container-fluid" onMouseLeave={() => setOpenIndex(-1)}>
        {purposeItems.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <div
              key={item.title}
              onMouseEnter={() => setOpenIndex(index)}
              className={`border-t border-brand-green/60 transition-colors duration-300 ${
                isOpen ? "bg-brand-ivory" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 px-6 py-8 text-left lg:px-8"
              >
                <span className="flex items-center gap-6">
                  <span className="text-xs font-medium text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-3xl text-brand-green sm:text-4xl">
                    {item.title}
                  </span>
                </span>
                <Icon
                  icon="mdi:arrow-top-right"
                  className={`shrink-0 text-2xl text-brand-gold transition-transform duration-300 ${
                    isOpen ? "-rotate-45" : "rotate-45"
                  }`}
                />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-8 px-6 pb-10 lg:grid-cols-2 lg:items-center lg:px-8">
                    <div>
                      <p className="max-w-md text-base text-brand-green/70">
                        {item.description}
                      </p>
                      <Link
                        href={item.ctaHref}
                        className="mt-6 inline-block rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
                      >
                        {item.cta}
                      </Link>
                    </div>
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl lg:h-72">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

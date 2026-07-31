"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface ExpertiseItem {
  title: string;
  description: string;
  cta: string;
  image: string;
}

const expertiseItems: ExpertiseItem[] = [
  {
    title: "Property Management",
    description:
      "Considered property care that protects value, supports occupants and gives owners greater peace of mind.",
    cta: "Explore management",
    image: "/images/property-to-care.jpg",
  },
  {
    title: "Sales & Letting",
    description:
      "Guided sales and letting, matching the right people to the right spaces with clarity at every step.",
    cta: "Explore sales & letting",
    image: "/images/property-to-let.jpg",
  },
  {
    title: "Real Estate Advisory",
    description:
      "Independent advice on investment, valuation and strategy, grounded in local market understanding.",
    cta: "Explore advisory",
    image: "/images/place-to-call-home.jpg",
  },
];

export function ExpertiseAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-fluid grid gap-16 lg:grid-cols-[1fr_28rem]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
            Our Expertise
          </p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.15] text-brand-green sm:text-5xl">
            Support around every
            <br />
            property decision.
          </h2>
          <p className="mt-6 max-w-2xl text-base text-brand-green/70">
            Residential or commercial, we bring clarity to management, sales,
            letting and investment decisions.
          </p>

          <div
            className="mt-10 border-t border-brand-green"
            onMouseLeave={() => setActiveIndex(0)}
          >
            {expertiseItems.map((item, index) => {
              const isOpen = index === activeIndex;
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`border-b border-brand-green transition-colors duration-300 ${
                    isOpen ? "bg-brand-ivory" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left lg:px-8"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xs font-medium text-brand-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-3xl text-brand-green">
                        {item.title}
                      </span>
                    </span>
                    <Icon
                      icon="mdi:arrow-top-right"
                      className={`shrink-0 text-2xl text-brand-gold transition-transform duration-300 ${
                        isOpen ? "-rotate-45" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-8 lg:px-8">
                        <p className="max-w-md text-base text-brand-green/70">
                          {item.description}
                        </p>
                        <a
                          href="#"
                          className="mt-6 inline-block rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
                        >
                          {item.cta}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative h-full min-h-112 w-full overflow-hidden rounded-t-full">
          {expertiseItems.map((item, index) => (
            <Image
              key={item.title}
              src={item.image}
              alt={item.title}
              fill
              className={`object-cover transition-opacity duration-500 ease-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

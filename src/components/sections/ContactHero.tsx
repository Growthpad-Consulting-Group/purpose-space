"use client";

import { Icon } from "@iconify/react";
import { useContactTopic } from "./contact-topic-context";
import type { ContactTopic } from "./contact-topics";

interface StartingPoint {
  number: string;
  title: string;
  description: string;
  topic: ContactTopic;
}

const startingPoints: StartingPoint[] = [
  {
    number: "01",
    title: "Find a property",
    description: "Explore homes, offices and commercial spaces selected with care.",
    topic: "Property search",
  },
  {
    number: "02",
    title: "List a property",
    description: "Begin with valuation, preparation and a considered route to market.",
    topic: "Sales & letting",
  },
  {
    number: "03",
    title: "Property management",
    description: "Talk through the care, performance and day-to-day needs of your property.",
    topic: "Management",
  },
  {
    number: "04",
    title: "Real estate advisory",
    description: "Bring us the decision, opportunity or long-term question you are weighing.",
    topic: "Advisory",
  },
];

export function ContactHero() {
  const { selectTopic } = useContactTopic();

  return (
    <section className="bg-brand-green py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-2">
        <div className="animate-hero-text lg:border-r lg:border-brand-gold/70 lg:pr-12">
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Contact Purpose Space
          </p>
          <h1 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-ivory sm:text-6xl">
            Let&apos;s begin with
            <br />
            what matters.
          </h1>
          <p className="mt-6 max-w-md text-base text-brand-ivory/70">
            Whether you are searching for a home, office or commercial
            property, listing a space, or weighing a longer-term decision,
            begin with the context. We&apos;ll take it from there.
          </p>
        </div>

        <div className="animate-hero-image">
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Choose a starting point
          </p>
          <div className="mt-6">
            {startingPoints.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => selectTopic(item.topic)}
                className="group block w-full border-t border-brand-gold/60 py-6 text-left transition-colors hover:border-brand-gold"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-medium text-brand-gold">
                    {item.number}
                  </span>
                  <span className="flex items-center gap-3 font-heading text-3xl text-brand-ivory">
                    {item.title}
                    <Icon
                      icon="mdi:arrow-right"
                      className="text-2xl text-brand-ivory transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
                <p className="mt-2 max-w-md pl-9 text-sm text-brand-ivory/60">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

interface FilterConfig {
  label: string;
  options: string[];
}

const filterConfigs: FilterConfig[] = [
  {
    label: "Category",
    options: ["All properties", "Residential", "Commercial", "Land"],
  },
  {
    label: "Status",
    options: ["Any status", "For sale", "To let", "Short let"],
  },
  {
    label: "Location",
    options: [
      "All locations",
      "Karen",
      "Runda",
      "Loresho",
      "Westlands",
      "Nairobi",
    ],
  },
  {
    label: "Property Type",
    options: ["Any type", "House", "Apartment", "Office", "Retail", "Warehouse"],
  },
  {
    label: "Price",
    options: [
      "Any range",
      "Under KES 20M",
      "KES 20M-50M",
      "KES 50M-100M",
      "Above KES 100M",
    ],
  },
];

export function PropertyFilters() {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(filterConfigs.map((filter) => [filter.label, filter.options[0]])),
  );
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <section className="relative bg-brand-ivory pb-16 lg:pb-24">
      <div className="container-fluid">
        <div
          ref={containerRef}
          className="relative -mt-24 grid grid-cols-2 gap-x-6 gap-y-6 rounded-sm border border-brand-gold bg-white px-8 py-6 shadow-lg shadow-brand-ink/3  sm:-mt-20 sm:grid-cols-3 lg:-mt-10 lg:grid-cols-5"
        >
          {filterConfigs.map((filter) => {
            const isOpen = openFilter === filter.label;
            return (
              <div key={filter.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter(isOpen ? null : filter.label)}
                  className="flex w-full items-center justify-between gap-2 text-left"
                >
                  <span>
                    <span className="block text-xs font-semibold tracking-widest text-brand-green uppercase">
                      {filter.label}
                    </span>
                    <span className="mt-1 block text-sm text-brand-ink">
                      {selected[filter.label]}
                    </span>
                  </span>
                  <Icon
                    icon="mdi:chevron-down"
                    className={`shrink-0 text-lg text-brand-green transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className="absolute top-full left-0 z-20 mt-2 w-56 rounded-md border border-brand-gold/40 bg-white py-2 shadow-lg">
                    {filter.options.map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelected((prev) => ({
                              ...prev,
                              [filter.label]: option,
                            }));
                            setOpenFilter(null);
                          }}
                          className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-brand-ivory ${
                            option === selected[filter.label]
                              ? "font-semibold text-brand-green"
                              : "text-brand-green/80"
                          }`}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

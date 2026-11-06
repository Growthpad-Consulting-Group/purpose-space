"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface PropertyFilterConfig {
  label: string;
  param: string;
  defaultLabel: string;
  options: string[];
}

interface PropertyFiltersProps {
  configs: PropertyFilterConfig[];
}

export function PropertySearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeQuery = searchParams.get("q") ?? "";
  const [expanded, setExpanded] = useState(Boolean(activeQuery));
  const [query, setQuery] = useState(activeQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);

  const openSearch = () => {
    setExpanded(true);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const previewSearch = () => setExpanded(true);

  useEffect(() => {
    if (!hasInteractedRef.current) return;

    const timer = window.setTimeout(() => {
      const trimmedQuery = query.trim();
      if (trimmedQuery === activeQuery) return;

      const next = new URLSearchParams(searchParams.toString());
      if (trimmedQuery) next.set("q", trimmedQuery);
      else next.delete("q");
      next.delete("page");
      router.replace(
        `${pathname}${next.size ? `?${next.toString()}` : ""}`,
        { scroll: false },
      );
    }, 250);

    return () => window.clearTimeout(timer);
  }, [activeQuery, pathname, query, router, searchParams]);

  useEffect(() => {
    const clearFromFilters = () => {
      hasInteractedRef.current = false;
      setQuery("");
      setExpanded(false);
    };
    window.addEventListener("purpose-space:clear-property-search", clearFromFilters);
    return () =>
      window.removeEventListener(
        "purpose-space:clear-property-search",
        clearFromFilters,
      );
  }, []);

  const searchControl = (
    <div
      ref={controlRef}
      onFocus={previewSearch}
      onBlur={(event) => {
        if (
          !activeQuery &&
          !event.currentTarget.contains(event.relatedTarget as Node | null)
        ) {
          setExpanded(false);
        }
      }}
      className={`absolute top-0 left-0 flex h-11 items-center overflow-hidden rounded-md border border-brand-gold bg-transparent transition-[width,border-color,box-shadow] duration-500 ease-out hover:border-brand-green focus-within:border-brand-green focus-within:shadow-sm motion-reduce:transition-none ${
        expanded ? "w-[min(16rem,calc(100vw-2rem))]" : "w-11"
      }`}
    >
      <Icon
        icon="mdi:magnify"
        aria-hidden
        className="absolute left-3.5 z-10 text-lg text-brand-green"
      />
      <div
        className={`relative min-w-0 flex-1 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          expanded
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-3 opacity-0"
        }`}
      >
        <label htmlFor="property-search" className="sr-only">
          Search properties
        </label>
        <input
          ref={inputRef}
          id="property-search"
          type="search"
          value={query}
          onChange={(event) => {
            hasInteractedRef.current = true;
            setQuery(event.target.value);
          }}
          placeholder="Name, location or type"
          tabIndex={expanded ? 0 : -1}
          className="h-10 w-full bg-transparent pr-9 pl-11 text-sm text-brand-green outline-none placeholder:text-brand-ink/45"
        />
      </div>

      {!expanded ? (
        <button
          type="button"
          onClick={openSearch}
          aria-label="Open property search"
          aria-expanded="false"
          className="absolute inset-0"
        />
      ) : null}
    </div>
  );

  return (
    <div
      onMouseEnter={previewSearch}
      onMouseLeave={() => {
        if (
          !activeQuery &&
          !controlRef.current?.contains(document.activeElement)
        ) {
          setExpanded(false);
        }
      }}
      className={`relative z-20 h-11 shrink-0 ${
        activeQuery ? "w-full sm:w-64" : "w-11"
      }`}
    >
      {searchControl}
    </div>
  );
}

export function ClearPropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(
          new Event("purpose-space:clear-property-search"),
        );
        router.push(`${pathname}#properties-results`);
      }}
      className="flex items-center gap-1.5 text-sm font-medium text-brand-green transition-colors hover:text-brand-gold"
    >
      <Icon icon="mdi:close" />
      Clear filters
    </button>
  );
}

export function PropertyFilters({ configs }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  const updateFilter = (param: string, value?: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(param, value);
    else next.delete(param);
    next.delete("page");
    router.push(`${pathname}${next.size ? `?${next.toString()}` : ""}`, {
      scroll: false,
    });
    setOpenFilter(null);
  };

  return (
    <section className="relative bg-brand-ivory pb-16 lg:pb-24">
      <div className="container-fluid">
        <div
          ref={containerRef}
          className="relative -mt-24 rounded-sm border border-brand-gold bg-white px-8 py-6 shadow-lg shadow-brand-ink/3 sm:-mt-20 lg:-mt-10"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {configs.map((filter) => {
              const isOpen = openFilter === filter.param;
              const selected = searchParams.get(filter.param);
              return (
                <div key={filter.param} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenFilter(isOpen ? null : filter.param)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-2 text-left"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-widest text-brand-green uppercase">
                        {filter.label}
                      </span>
                      <span className="mt-1 block truncate text-sm text-brand-ink">
                        {selected ?? filter.defaultLabel}
                      </span>
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`shrink-0 text-lg text-brand-green transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen ? (
                    <ul className="absolute top-full left-0 z-20 mt-2 max-h-72 w-64 overflow-y-auto rounded-md border border-brand-gold/40 bg-white py-2 shadow-lg">
                      <li>
                        <button
                          type="button"
                          onClick={() => updateFilter(filter.param)}
                          className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-brand-ivory ${!selected ? "font-semibold text-brand-green" : "text-brand-green/80"}`}
                        >
                          {filter.defaultLabel}
                        </button>
                      </li>
                      {filter.options.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            onClick={() => updateFilter(filter.param, option)}
                            className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-brand-ivory ${option === selected ? "font-semibold text-brand-green" : "text-brand-green/80"}`}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

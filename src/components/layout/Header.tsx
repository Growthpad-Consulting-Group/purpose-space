"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GlassPanel from "@/shared/ui/GlassPanel";
import { navLinks } from "@/config/nav";

const navItems: { label: string; href: string; isCta?: boolean }[] = [
  ...navLinks,
  { label: "List your property", href: "#", isCta: true },
];

function NavLinks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hoverRect, setHoverRect] = useState<{ left: number; width: number } | null>(null);
  // Kept around after the mouse leaves so the pill has a position to fade
  // out from, instead of snapping to the left edge before disappearing.
  const [lastHoverRect, setLastHoverRect] = useState<{ left: number; width: number } | null>(null);

  const rect = hoverRect ?? lastHoverRect;

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => setHoverRect(null)}
      className="relative flex items-center gap-1"
    >
      <span
        aria-hidden
        style={{
          opacity: hoverRect ? 1 : 0,
          left: rect?.left ?? 0,
          width: rect?.width ?? 0,
        }}
        className="absolute top-0 h-full rounded-md bg-brand-green ring-1 ring-brand-gold/30 transition-[left,width,opacity] duration-300 ease-out"
      />
      {navItems.map(({ label, href, isCta }) => (
        <a
          key={label}
          href={href}
          ref={(el) => {
            linkRefs.current[label] = el;
          }}
          onMouseEnter={() => {
            const el = linkRefs.current[label];
            const container = containerRef.current;
            if (!el || !container) return;
            const elRect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const next = { left: elRect.left - containerRect.left, width: elRect.width };
            setHoverRect(next);
            setLastHoverRect(next);
          }}
          className={`relative z-10 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-white ${
            isCta
              ? "ml-4 border border-brand-gold text-brand-green hover:border-brand-green"
              : "text-brand-green"
          }`}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-500 ease-out ${
          scrolled ? "container-fluid pt-4" : "w-full px-0"
        }`}
      >
        <GlassPanel
          mode="light"
          borderRadius={24}
          active={scrolled}
          className={`flex items-center justify-between transition-all duration-500 ease-out ${
            scrolled
              ? "h-16 rounded-3xl bg-brand-ivory/0 px-6"
              : "h-20 rounded-none bg-brand-ivory px-6 lg:px-12"
          }`}
        >
          <Image
            src="/brand/logo.svg"
            alt="Purpose Space Realtors"
            width={260}
            height={0}
            priority
          />
          <div className="hidden md:block">
            <NavLinks />
          </div>
        </GlassPanel>
      </div>
    </header>
  );
}

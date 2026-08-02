"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import GlassPanel from "@/shared/ui/GlassPanel";
import { navLinks } from "@/config/nav";

const navItems: { label: string; href: string; isCta?: boolean }[] = [
  ...navLinks,
  { label: "List your property", href: "#", isCta: true },
];

function NavLinks() {
  const pathname = usePathname();
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
      {navItems.map(({ label, href, isCta }) => {
        const isActive = !isCta && href === pathname;
        return (
          <Link
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
            onClick={() => setHoverRect(null)}
            className={`relative z-10 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-white ${
              isCta
                ? "ml-4 border border-brand-gold text-brand-green hover:border-brand-green"
                : isActive
                  ? "text-brand-gold"
                  : "text-brand-green"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <nav className="container-fluid flex flex-col gap-1 border-t border-brand-green/10 py-4">
          {navItems.map(({ label, href, isCta }) => {
            const isActive = !isCta && href === pathname;
            return (
              <Link
                key={label}
                href={href}
                onClick={onClose}
                className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                  isCta
                    ? "mt-2 border border-brand-gold text-center text-brand-green"
                    : isActive
                      ? "text-brand-gold"
                      : "text-brand-green hover:bg-brand-green/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastYRef = useRef(0);
  const mobileOpenRef = useRef(false);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      // Body scroll is locked while the mobile menu is open, so scroll
      // position can't legitimately change then — skip the hide logic
      // entirely rather than risk it closing the menu right after opening.
      setHidden((prevHidden) => {
        if (mobileOpenRef.current) return prevHidden;
        const delta = y - lastYRef.current;
        if (y < 80) return false;
        if (delta > 4) return true;
        if (delta < -4) return false;
        return prevHidden;
      });
      lastYRef.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
      className="sticky top-0 z-50 transition-transform duration-500 ease-out"
    >
      <div
        className={`container-fluid transition-all duration-500 ease-out ${
          scrolled ? "pt-4" : ""
        }`}
      >
        <GlassPanel
          mode="light"
          borderRadius={24}
          active={scrolled}
          className={`flex flex-col transition-all duration-500 ease-out ${
            scrolled
              ? "rounded-xl bg-brand-ivory/0"
              : "rounded-none bg-brand-ivory"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-out ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/brand/logo.svg"
                alt="Purpose Space Realtors"
                width={260}
                height={0}
                priority
              />
            </Link>
            <div className="hidden md:block">
              <NavLinks />
            </div>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center text-brand-green md:hidden"
            >
              <Icon icon={mobileOpen ? "mdi:close" : "mdi:menu"} className="text-2xl" />
            </button>
          </div>

          <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        </GlassPanel>
      </div>
    </header>
  );
}

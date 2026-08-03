"use client";

import { useEffect, useRef } from "react";

export function PropertiesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // -1 when the section is fully below the viewport, 1 when fully above,
      // 0 when centered — drives how far the background shifts.
      const progress =
        (rect.top + rect.height / 2 - viewportHeight / 2) /
        (viewportHeight / 2 + rect.height / 2);

      bg.style.transform = `translate3d(0, ${progress * 60}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex aspect-square items-end overflow-hidden sm:aspect-video lg:aspect-[2.8/1]"
    >
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-x-0 inset-y-[-10%] bg-center bg-cover will-change-transform"
        style={{ backgroundImage: "url('/images/properties-hero.jpg')" }}
      />
      <div aria-hidden className="absolute inset-0 bg-brand-ink/20" />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-brand-ink/70 via-brand-ink/10 to-transparent"
      />
      <div className="container-fluid relative pb-24 lg:pb-28">
        <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
          Residential & Commercial
        </p>
        <h1 className="mt-4 font-heading text-4xl leading-[1.1] text-brand-ivory sm:text-6xl">
          Properties chosen
          <br />
          with purpose.
        </h1>
      </div>
    </section>
  );
}

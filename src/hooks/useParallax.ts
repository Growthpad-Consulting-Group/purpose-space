"use client";

import { useEffect, useRef } from "react";

/** Ties a background element's vertical offset to how far its section has scrolled through the viewport. */
export function useParallax<
  Section extends HTMLElement = HTMLElement,
  Background extends HTMLElement = HTMLDivElement,
>(strength = 60) {
  const sectionRef = useRef<Section>(null);
  const bgRef = useRef<Background>(null);

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

      bg.style.transform = `translate3d(0, ${progress * strength}px, 0)`;
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
  }, [strength]);

  return { sectionRef, bgRef };
}

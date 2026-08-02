"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const SIZE = 44;
const STROKE = 2.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let idleTimeout: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 600);
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      setIsScrolling(true);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => setIsScrolling(false), 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimeout);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group fixed right-6 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-brand-green transition-all duration-300 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        aria-hidden
        width={SIZE}
        height={SIZE}
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          className="stroke-brand-gold/25"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="stroke-brand-gold transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      <span className="absolute inset-1 rounded-full bg-brand-ivory shadow-md transition-colors duration-300 ease-out group-hover:bg-brand-green" />
      {isScrolling ? (
        <span className="relative text-sm font-semibold text-brand-green transition-colors duration-300 ease-out group-hover:text-brand-ivory">
          {Math.round(progress * 100)}%
        </span>
      ) : (
        <Icon
          icon="mdi:arrow-up"
          className="relative text-xl transition-colors duration-300 ease-out group-hover:text-brand-ivory"
        />
      )}
    </button>
  );
}

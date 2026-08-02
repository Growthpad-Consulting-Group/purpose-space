import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface ImageListSectionProps {
  eyebrow: string;
  heading: ReactNode;
  description: string;
  listLabel: string;
  listItems: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  background?: "white" | "ivory" | "ink";
}

export function ImageListSection({
  eyebrow,
  heading,
  description,
  listLabel,
  listItems,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  imagePosition = "left",
  background = "white",
}: ImageListSectionProps) {
  const isDark = background === "ink";
  const bgClass =
    background === "ink"
      ? "bg-brand-ink"
      : background === "ivory"
        ? "bg-brand-ivory"
        : "bg-white";
  const headingColor = isDark ? "text-brand-ivory" : "text-brand-green";
  const descriptionColor = isDark ? "text-brand-ivory/70" : "text-brand-ink";
  const listTextColor = isDark ? "text-brand-ivory" : "text-brand-green";
  const ctaColor = isDark
    ? "text-brand-ivory hover:border-brand-ivory hover:bg-brand-ivory hover:text-brand-green"
    : "text-brand-green hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory";

  const imageBlock = (
    <div
      className={`relative aspect-3/4 w-full max-w-md ${
        imagePosition === "right" ? "justify-self-end" : ""
      }`}
    >
      <div
        aria-hidden
        className="absolute top-4 left-4 h-full w-full rounded-t-full border border-brand-gold"
      />
      <div className="absolute inset-0 overflow-hidden rounded-t-full">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div>
    </div>
  );

  const contentBlock = (
    <div>
      <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
        {eyebrow}
      </p>
      <h2
        className={`mt-6 font-heading text-4xl leading-[1.15] sm:text-5xl ${headingColor}`}
      >
        {heading}
      </h2>
      <p className={`mt-6 max-w-lg text-base ${descriptionColor}`}>
        {description}
      </p>

      <p className="mt-10 text-xs font-semibold tracking-widest text-brand-gold uppercase">
        {listLabel}
      </p>
      <ul className="mt-4">
        {listItems.map((item, index) => (
          <li
            key={item}
            className="flex items-center gap-3 border-b border-brand-gold/40 py-4 first:pt-0"
          >
            <span className={`text-xs font-medium ${listTextColor}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`text-base ${listTextColor}`}>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={`mt-8 inline-block rounded-md border border-brand-gold px-6 py-3 text-sm font-medium transition-colors ${ctaColor}`}
      >
        {ctaLabel}
      </Link>
    </div>
  );

  return (
    <section className={`${bgClass} py-16 lg:py-24`}>
      <div
        className={`container-fluid grid gap-12 lg:items-center ${
          imagePosition === "right"
            ? "lg:grid-cols-[1fr_0.85fr]"
            : "lg:grid-cols-[0.85fr_1fr]"
        }`}
      >
        {imagePosition === "right" ? (
          <>
            {contentBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {contentBlock}
          </>
        )}
      </div>
    </section>
  );
}

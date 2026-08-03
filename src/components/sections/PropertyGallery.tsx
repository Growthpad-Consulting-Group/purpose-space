"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { Listing } from "@/features/listings/types/listing";

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (event.key === "ArrowLeft")
        onNavigate((index - 1 + images.length) % images.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, images.length, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal
      onClick={onClose}
      className="fixed inset-0 z-100 flex items-center justify-center bg-brand-ink/90 p-4 sm:p-10"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-brand-ivory transition-colors hover:text-brand-gold sm:top-6 sm:right-6"
      >
        <Icon icon="mdi:close" className="text-3xl" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            className="absolute left-2 flex h-12 w-12 items-center justify-center text-brand-ivory transition-colors hover:text-brand-gold sm:left-6"
          >
            <Icon icon="mdi:chevron-left" className="text-4xl" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
            className="absolute right-2 flex h-12 w-12 items-center justify-center text-brand-ivory transition-colors hover:text-brand-gold sm:right-6"
          >
            <Icon icon="mdi:chevron-right" className="text-4xl" />
          </button>
        </>
      )}

      <div
        onClick={(event) => event.stopPropagation()}
        className="relative h-full max-h-[80vh] w-full max-w-4xl"
      >
        <Image
          src={images[index]}
          alt=""
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function PropertyGallery({ listing }: { listing: Listing }) {
  const images = listing.gallery?.length
    ? listing.gallery
    : [
        listing.imageUrl,
        "/images/gallery-secondary-1.jpg",
        "/images/gallery-secondary-2.jpg",
      ];

  const [main, ...rest] = images;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="container-fluid">
        <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
          The workspace
        </p>
        <h2 className="mt-6 max-w-xl font-heading text-4xl leading-[1.15] text-brand-green sm:text-5xl">
          {listing.galleryHeading ?? "A closer look."}
        </h2>
        <div className="mt-8 border-t border-brand-gold" />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
          <button
            type="button"
            onClick={() => setOpenIndex(0)}
            className="group relative aspect-4/3 overflow-hidden rounded-sm"
          >
            <Image
              src={main}
              alt={listing.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </button>
          <div className="grid grid-rows-2 gap-4 max-sm:aspect-4/3">
            {rest.slice(0, 2).map((image, index) => (
              <button
                key={image + index}
                type="button"
                onClick={() => setOpenIndex(index + 1)}
                className="group relative overflow-hidden rounded-sm"
              >
                <Image
                  src={image}
                  alt={listing.title}
                  fill
                  sizes="(min-width: 640px) 25vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}

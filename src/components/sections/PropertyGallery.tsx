"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { Listing } from "@/features/listings/types/listing";
import { Modal } from "@/shared/ui/Modal";

export function PropertyGallery({ listing }: { listing: Listing }) {
  const images = listing.gallery?.length
    ? listing.gallery
    : [
        listing.imageUrl,
        "/images/gallery-secondary-1.jpg",
        "/images/gallery-secondary-2.jpg",
      ];

  const [main, ...rest] = images;
  const [openIndex, setOpenIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const hasMultipleImages = images.length > 1;

  const closeGallery = useCallback(() => setGalleryOpen(false), []);

  const openGallery = (index: number) => {
    setOpenIndex(index);
    setGalleryOpen(true);
  };

  const showPrevious = useCallback(() => {
    setOpenIndex((current) =>
      (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setOpenIndex((current) =>
      (current + 1) % images.length,
    );
  }, [images.length]);

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

        <div
          className={`mt-10 grid grid-cols-1 gap-4 ${
            rest.length > 0 ? "sm:grid-cols-[1.4fr_1fr]" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => openGallery(0)}
            className="group relative aspect-4/3 overflow-hidden rounded-sm"
          >
            <Image
              src={main}
              alt={listing.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full border border-white/25 bg-brand-ink/65 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md transition-colors group-hover:bg-brand-green">
              <Icon icon="mdi:fullscreen" className="text-lg" />
              View gallery
            </span>
          </button>
          {rest.length > 0 ? (
            <div className="grid grid-rows-2 gap-4 max-sm:aspect-4/3">
              {rest.slice(0, 2).map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={() => openGallery(index + 1)}
                  className="group relative overflow-hidden rounded-sm"
                >
                  <Image
                    src={image}
                    alt={`${listing.title} — image ${index + 2}`}
                    fill
                    sizes="(min-width: 640px) 25vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {index === 1 && images.length > 3 ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-brand-ink/45 font-heading text-3xl text-white backdrop-blur-[1px] transition-colors group-hover:bg-brand-ink/60">
                      +{images.length - 3}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <Modal
          open={galleryOpen}
          title={`${listing.title} gallery`}
          onClose={closeGallery}
          onPrevious={hasMultipleImages ? showPrevious : undefined}
          onNext={hasMultipleImages ? showNext : undefined}
        >
          <div className="relative h-full w-full">
            <div className="absolute top-5 left-5 z-10 max-w-[calc(100%-7rem)] rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-md sm:top-6 sm:left-6">
              <span className="font-medium">{listing.title}</span>
              <span className="mx-2 text-brand-gold">/</span>
              <span className="text-white/70">
                {openIndex + 1} of {images.length}
              </span>
            </div>

            <Image
              key={images[openIndex]}
              src={images[openIndex]}
              alt={`${listing.title} — image ${openIndex + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-contain px-3 py-20 sm:px-20 sm:py-16"
            />

            {hasMultipleImages ? (
              <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center bg-linear-to-t from-black/70 to-transparent px-4 pt-10 pb-4 sm:pb-6">
                <div className="flex max-w-full gap-2 overflow-x-auto rounded-xl border border-white/15 bg-black/25 p-2 backdrop-blur-md">
                  {images.map((image, index) => (
                    <button
                      key={image + index}
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-current={index === openIndex ? "true" : undefined}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md border transition-colors sm:h-14 sm:w-20 ${
                        index === openIndex
                          ? "border-brand-gold"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Modal>
    </section>
  );
}

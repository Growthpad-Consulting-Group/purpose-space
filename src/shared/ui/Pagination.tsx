import Link from "next/link";
import { Icon } from "@iconify/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Builds the href for a given page number */
  hrefFor: (page: number) => string;
}

export function Pagination({ currentPage, totalPages, hrefFor }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-center gap-2"
    >
      <Link
        href={hrefFor(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-md border border-brand-gold/60 text-brand-green transition-colors hover:border-brand-green ${
          currentPage === 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <Icon icon="mdi:chevron-left" className="text-lg" />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
            page === currentPage
              ? "border-brand-green bg-brand-green text-brand-ivory"
              : "border-brand-gold/60 text-brand-green hover:border-brand-green"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={hrefFor(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-md border border-brand-gold/60 text-brand-green transition-colors hover:border-brand-green ${
          currentPage === totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <Icon icon="mdi:chevron-right" className="text-lg" />
      </Link>
    </nav>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  variant?: "fullscreen" | "dialog";
  children: ReactNode;
}

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function Modal({
  open,
  title,
  onClose,
  onPrevious,
  onNext,
  variant = "fullscreen",
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const renderFrame = requestAnimationFrame(() => {
        setRendered(true);
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(renderFrame);
    }

    const hideFrame = requestAnimationFrame(() => setVisible(false));
    const removeTimer = window.setTimeout(() => setRendered(false), 320);
    return () => {
      cancelAnimationFrame(hideFrame);
      window.clearTimeout(removeTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!rendered) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && onPrevious) {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [rendered, onClose, onNext, onPrevious]);

  if (!rendered || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-200 flex h-dvh w-dvw overflow-hidden text-brand-ivory backdrop-blur-md transition-[opacity,background-color] duration-300 ease-out motion-reduce:transition-none ${
        variant === "dialog" ? "items-center justify-center p-4 sm:p-8" : ""
      } ${
        visible
          ? variant === "dialog"
            ? "bg-brand-ink/72 opacity-100"
            : "bg-brand-ink/96 opacity-100"
          : "bg-brand-ink/0 opacity-0"
      }`}
    >
      {onPrevious ? (
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous image"
          className="absolute top-1/2 left-3 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-brand-green sm:left-6"
        >
          <Icon icon="mdi:chevron-left" className="text-3xl" />
        </button>
      ) : null}

      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="absolute top-1/2 right-3 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-brand-green sm:right-6"
        >
          <Icon icon="mdi:chevron-right" className="text-3xl" />
        </button>
      ) : null}

      <div
        className={`transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          variant === "dialog"
            ? "relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-sm bg-brand-ivory text-brand-green shadow-2xl sm:max-h-[calc(100dvh-4rem)]"
            : "relative h-full w-full"
        } ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : variant === "dialog"
              ? "translate-y-5 scale-[0.97] opacity-0"
              : "scale-[0.985] opacity-0"
        }`}
      >
        <div className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className={`flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
              variant === "dialog"
                ? "border-brand-green/15 bg-white/70 text-brand-green hover:border-brand-gold hover:bg-brand-gold"
                : "border-white/20 bg-black/20 text-white hover:border-brand-gold hover:bg-brand-gold hover:text-brand-green"
            }`}
          >
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}

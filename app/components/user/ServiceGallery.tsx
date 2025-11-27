"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ServiceGalleryProps = {
  images: string[];
};

export default function ServiceGallery({ images }: ServiceGalleryProps) {
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
  if (validImages.length === 0) return null;

  const pageSize = 3;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(validImages.length / pageSize));
  const start = page * pageSize;
  const current = validImages.slice(start, start + pageSize);

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section className="py-12 sm:py-16 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          {totalPages > 1 && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-[var(--color-primary-soft)] flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-[var(--color-primary-soft)] flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              >
                ›
              </button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
          >
            {current.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="rounded-2xl overflow-hidden border border-[var(--color-primary-soft)] bg-[var(--color-surface)] group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={src}
                    alt={`service-gallery-${start + idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-full border border-[var(--color-primary-soft)] text-xs text-[var(--color-text)]"
            >
              ก่อนหน้า
            </button>
            <span className="text-xs text-[var(--color-text)]/60">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="px-3 py-1.5 rounded-full border border-[var(--color-primary-soft)] text-xs text-[var(--color-text)]"
            >
              ถัดไป
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

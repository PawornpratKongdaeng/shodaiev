"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type GalleryProps = {
  images: string[];
};

export default function ServiceGallery({ images }: GalleryProps) {
  const total = images.length;
  const perPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const totalPages = useMemo(
    () => (total === 0 ? 1 : Math.ceil(total / perPage)),
    [total]
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * perPage,
    [currentPage]
  );

  const currentSet = useMemo(
    () =>
      images
        .slice(startIndex, startIndex + perPage)
        .map((url, i) => ({ url, idx: startIndex + i })),
    [images, startIndex]
  );

  const goPrev = () => {
    setCurrentPage((prev) => (prev <= 1 ? totalPages : prev - 1));
  };

  const goNext = () => {
    setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
  };

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxIndex(null);
  };

  const currentImage =
    lightboxIndex !== null && images[lightboxIndex]
      ? images[lightboxIndex]
      : null;

  const prevImage = () => {
    if (lightboxIndex === null || total === 0) return;
    setLightboxIndex((prev) =>
      prev === null ? 0 : prev === 0 ? total - 1 : prev - 1
    );
  };

  const nextImage = () => {
    if (lightboxIndex === null || total === 0) return;
    setLightboxIndex((prev) =>
      prev === null ? 0 : prev === total - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-12 sm:py-16 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
            รูปผลงานตัวอย่าง
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            ดูผลงานการซ่อมที่เคยให้บริการลูกค้า
          </p>
        </div>

        <div className="relative flex items-center">
          {totalPages > 1 && (
            <button
              onClick={goPrev}
              type="button"
              className="hidden sm:flex mr-4 w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white text-lg transition z-10"
            >
              ‹
            </button>
          )}

          <div className="flex-1">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
              {currentSet.map(({ url, idx }) => (
                <button
                  key={`${url}-${idx}`}
                  type="button"
                  className="relative w-full aspect-[3/5] rounded-lg sm:rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition"
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={url}
                    alt={`gallery-${idx}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 720px) 33vw, 16vw"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <button
              onClick={goNext}
              type="button"
              className="hidden sm:flex ml-4 w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white text-lg transition z-10"
            >
              ›
            </button>
          )}
        </div>

        <div className="text-center mt-4 text-slate-500 text-xs sm:text-sm">
          หน้า {currentPage} / {totalPages}
        </div>
      </div>

      {isLightboxOpen && currentImage && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="absolute inset-0 z-0" onClick={closeLightbox} />

          <div className="relative z-10 w-[96vw] max-w-[480px] sm:max-w-4xl h-[82vh] max-h-[90vh] bg-black rounded-2xl shadow-xl border border-white/20 flex flex-col overflow-hidden">
            <button
              onClick={closeLightbox}
              type="button"
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-white text-base sm:text-lg"
            >
              ✕
            </button>

            {total > 1 && (
              <>
                <button
                  onClick={prevImage}
                  type="button"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-white text-lg sm:text-xl"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  type="button"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-white text-lg sm:text-xl"
                >
                  ›
                </button>
              </>
            )}

            <div className="flex-1 flex items-center justify-center px-3 sm:px-6 pb-3 pt-10 sm:pt-12">
              <div className="relative w-full h-full">
                <Image
                  src={currentImage}
                  alt="preview"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="pb-3 text-center text-white/70 text-xs sm:text-sm">
              {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {total}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

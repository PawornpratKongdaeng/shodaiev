"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (index === null) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white text-lg flex items-center justify-center"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={onPrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white text-2xl"
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white text-2xl"
      >
        ›
      </button>

      {/* Image Wrapper */}
      <div className="relative w-[90vw] max-w-5xl h-[85vh]">
        <Image
          src={images[index]}
          alt="lightbox"
          fill
          className="object-contain"
        />
      </div>

      {/* Counter */}
      <p className="absolute bottom-6 text-white/80 text-sm">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

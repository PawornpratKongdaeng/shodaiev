"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";

type HeroProps = {
  imageUrl: string | string[];
};

export default function Hero({ imageUrl }: HeroProps) {
  const imageUrls = useMemo(
    () =>
      (Array.isArray(imageUrl) ? imageUrl : imageUrl ? [imageUrl] : []).filter(
        Boolean
      ),
    [imageUrl]
  );

  if (imageUrls.length === 0) return null;

  const total = imageUrls.length;
  const [index, setIndex] = useState(0);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, total]);

  return (
    <section className="w-full bg-[var(--color-bg)] pt-6 sm:pt-10">
      <div className="w-full relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {imageUrls.map((src, i) => (
            <div key={src + i} className="w-full flex-shrink-0">
              <Image
                src={src}
                alt={`ShodaiEV banner ${i + 1}`}
                width={1920}
                height={700}
                priority={i === 0}
                className="w-full h-auto object-contain"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                         rounded-full bg-black/40 hover:bg-black/60 text-white text-xl"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                         rounded-full bg-black/40 hover:bg-black/60 text-white text-xl"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {imageUrls.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full border border-white/70 transition
                    ${index === i ? "bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

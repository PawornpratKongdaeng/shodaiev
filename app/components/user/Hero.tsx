"use client";

type HeroProps = {
  imageUrl?: string;
};

export default function Hero({ imageUrl }: HeroProps) {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
      {imageUrl ? (
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--color-primary-soft), var(--color-bg))",
          }}
        />
      )}

      <div className="relative z-10 w-full h-full" />
    </section>
  );
}

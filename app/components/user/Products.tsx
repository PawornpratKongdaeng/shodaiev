"use client";

import type { ProductItem } from "@/lib/server/siteData";

type ProductsSectionProps = {
  products: ProductItem[];
};

export default function ProductsSection({ products }: ProductsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section id="products" className="py-16 sm:py-20 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 sm:mb-8">
          สินค้าแนะนำ
        </h2>

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="card bg-white rounded-2xl border border-orange-200 hover:border-orange-500 shadow-sm hover:shadow-md transition-all"
            >
              {p.imageUrl && (
                <figure className="h-44 sm:h-52 overflow-hidden rounded-t-2xl">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}

              <div className="card-body p-4 sm:p-5">
                <h3 className="card-title text-slate-900 text-base sm:text-lg">
                  {p.name || "สินค้า"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {p.description || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// app/page.tsx
import Header from "./components/user/Header";
import Hero from "./components/user/Hero";
import ContactSection from "./components/user/Contact";
import ProductsSection from "./components/user/Products";
import ServiceGallery from "./components/user/ServiceGallery";
import { loadSiteData, type SiteConfig } from "@/lib/server/siteData";
import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shodaiev.com";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ShodaiEV | ซ่อมรถไฟฟ้า 2 ล้อ 3 ล้อ บริการถึงบ้าน",
  description:
    "ShodaiEV รับซ่อมมอเตอร์ไซค์ไฟฟ้า รถสามล้อไฟฟ้า สกู๊ตเตอร์ไฟฟ้า พร้อมบริการถึงบ้าน ติดต่อได้ทางโทรศัพท์ ไลน์ และเฟซบุ๊ก",
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function HomePage() {
  const data: SiteConfig = await loadSiteData();

  const businessName = data.businessName || "ShodaiEV";
  const businessAddress =
    data.businessAddress || "ตำแหน่งตามลิงก์ Google Maps ที่ให้ไว้";
  const telephone = data.phone || "";
  const mapUrl = data.mapUrl || "";
  const lat = data.businessGeoLat;
  const lng = data.businessGeoLng;
  const ogImage = data.heroImageUrl || "";

  // 🔹 ใช้ heroImages จาก Admin ถ้ามีหลายรูป
  // ถ้าไม่มี heroImages ให้ fallback เป็น heroImageUrl รูปเดียว
  const heroImages =
    Array.isArray((data as any).heroImages) && (data as any).heroImages.length > 0
      ? (data as any).heroImages
      : ogImage
      ? [ogImage]
      : [];

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    description:
      data.seoDescriptionHome ||
      "บริการซ่อมรถไฟฟ้า มอเตอร์ไซค์ไฟฟ้า และสามล้อไฟฟ้า",
    telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessAddress,
    },
    image: ogImage ? [ogImage] : undefined,
    url: SITE_URL,
    geo:
      lat && lng
        ? {
            "@type": "GeoCoordinates",
            latitude: lat,
            longitude: lng,
          }
        : undefined,
    sameAs: [
      data.facebook ? "https://www.facebook.com/shodaiev/" : undefined,
      data.lineUrl || undefined,
      mapUrl || undefined,
    ].filter(Boolean),
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Script
        id="ld-local-business"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdLocalBusiness),
        }}
      />

      <Header phone={data.phone ?? ""} line={data.line ?? ""} />

      <h1 className="sr-only">
        {data.seoTitleHome ||
          "ShodaiEV บริการซ่อมรถไฟฟ้า มอเตอร์ไซค์ไฟฟ้า และสามล้อไฟฟ้า บริการถึงบ้าน"}
      </h1>

      {/* ✅ ส่ง array heroImages เข้า Hero */}
      <Hero imageUrl={heroImages} />

      <ServiceGallery images={data.homeGallery ?? []} />

      <ProductsSection products={data.products ?? []} />
{/* ✨ ปรับปรุง Section บริการ */}
      <section className="py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200 shadow-sm">
              <span className="text-orange-600 font-semibold text-sm">🔧 บริการมาตรฐาน</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 bg-clip-text text-transparent leading-tight">
              บริการของเรา
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              เลือกบริการที่ตรงกับความต้องการของคุณ
              <br />
              <span className="text-amber-600 font-medium">พร้อมดูแลทุกปัญหาของรถคุณ</span>
            </p>
          </div>

          {/* CTA Card */}
          <div className="max-w-3xl mx-auto">
            <div className="group relative bg-white rounded-3xl shadow-2xl shadow-orange-200/50 overflow-hidden border border-orange-100 hover:shadow-orange-300/60 transition-all duration-300 hover:-translate-y-1">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-[2px] bg-white rounded-3xl"></div>

              {/* Content */}
              <div className="relative p-10 md:p-12">
                {/* Icon */}
                <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-orange-100 via-red-50 to-amber-100 flex items-center justify-center shadow-lg shadow-orange-200/50 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-5xl">⚡</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                  สำรวจบริการของเรา
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                  ดูรายละเอียดบริการทั้งหมดที่เรามีให้
                  <br />
                  <span className="text-orange-600 font-medium">พร้อมราคาและข้อมูลเพิ่มเติม</span>
                </p>

                {/* CTA Button */}
                <Link
                  href="/page/products"
                  className="group/btn inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 hover:from-orange-700 hover:via-red-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-orange-300/50 hover:shadow-2xl hover:shadow-orange-400/60 hover:scale-105 active:scale-100"
                >
                  <span>ดูบริการทั้งหมด</span>
                  <span className="text-2xl group-hover/btn:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>

                {/* Features */}
                <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">⚙️</span>
                    </div>
                    <span className="text-sm font-medium">ช่างมืออาชีพ</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">💯</span>
                    </div>
                    <span className="text-sm font-medium">รับประกันคุณภาพ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        {/* ... */}
      </section>

      <ContactSection
        phone={data.phone ?? ""}
        line={data.line ?? ""}
        lineUrl={data.lineUrl ?? ""}
        facebook={data.facebook ?? ""}
        mapUrl={data.mapUrl ?? ""}
      />
    </main>
  );
}

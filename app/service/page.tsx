import { loadSiteData } from "@/lib/server/siteData";
import ProductsSection from "../components/user/Products";
import Headers from "../components/user/Header";

export default async function ServicePage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {

  const data = await loadSiteData();

  const products = (data.products ?? []).filter(
    (p) => (p.page ?? 1) === currentPage
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
        <Headers/>
      <ProductsSection products={products} />
    </main>
  );
}

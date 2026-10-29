import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop-grid";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = { title: "كل العطور" };

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopGrid title="كل العطور" subtitle="All Fragrances" products={products} />;
}

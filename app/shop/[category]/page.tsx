import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopGrid } from "@/components/shop-grid";
import { categories } from "@/lib/config";
import { getProductsByCategory } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  return { title: cat ? `عطور ${cat.label}` : "العطور" };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const products = await getProductsByCategory(cat.slug);
  return <ShopGrid title={`عطور ${cat.label}`} subtitle={cat.labelEn} products={products} active={cat.slug} />;
}

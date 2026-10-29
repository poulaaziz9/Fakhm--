import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { publicClient } from "./supabase";
import { sampleProducts } from "./sample-products";
import type { Category, Product } from "./types";

type ProductRow = {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  tagline: string | null;
  description: string | null;
  notes: Product["notes"] | null;
  category: Category;
  variants: Product["variants"];
  images: string[] | null;
  featured: boolean;
  in_stock: boolean;
};

function fromRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    nameAr: row.name_ar,
    nameEn: row.name_en,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    notes: row.notes ?? { top: [], heart: [], base: [] },
    category: row.category,
    variants: [...row.variants].sort((a, b) => a.sizeMl - b.sizeMl),
    images: row.images ?? [],
    featured: row.featured,
    inStock: row.in_stock,
  };
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const supabase = publicClient();
  if (!supabase) return sampleProducts;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Failed to load products: ${error.message}`);
  return (data as ProductRow[]).map(fromRow);
}

export async function getProduct(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(category: Category) {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

export function startingPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}

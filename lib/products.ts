import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { publicClient } from "./supabase";
import { catalogue } from "./catalogue";
import type { Category, Product } from "./types";

type ProductRow = {
  id: string;
  slug: string;
  code: string;
  name_ar: string;
  name_en: string;
  family_ar: string | null;
  family_en: string | null;
  mood: string | null;
  inspired_by: string | null;
  description: string | null;
  notes: string[] | null;
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
    code: row.code,
    nameAr: row.name_ar,
    nameEn: row.name_en,
    family: { ar: row.family_ar ?? "", en: row.family_en ?? "" },
    mood: row.mood ?? "",
    inspiredBy: row.inspired_by ?? "",
    description: row.description ?? "",
    notes: row.notes ?? [],
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
  if (!supabase) return catalogue;

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

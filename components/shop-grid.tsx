import Link from "next/link";
import { ProductCard } from "./product-card";
import { categories } from "@/lib/config";
import type { Category, Product } from "@/lib/types";

export function ShopGrid({
  title,
  subtitle,
  products,
  active,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  active?: Category;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <p className="latin-label text-[11px] text-gold">{subtitle}</p>
        <h1 className="mt-3 text-3xl font-light">{title}</h1>
      </div>

      <nav className="mb-12 flex flex-wrap justify-center gap-3 text-sm">
        <Link
          href="/shop"
          className={`border px-5 py-2 ${!active ? "border-gold text-gold" : "hairline text-ivory/80 hover:text-gold"}`}
        >
          الكل
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className={`border px-5 py-2 ${active === c.slug ? "border-gold text-gold" : "hairline text-ivory/80 hover:text-gold"}`}
          >
            {c.label}
          </Link>
        ))}
      </nav>

      {products.length === 0 ? (
        <p className="text-center text-ivory/70">مفيش عطور في القسم ده دلوقتي.</p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

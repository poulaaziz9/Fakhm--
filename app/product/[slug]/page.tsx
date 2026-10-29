import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { Divider } from "@/components/brand";
import { ProductImage } from "@/components/product-card";
import { categories } from "@/lib/config";
import { getProduct, getProducts } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "غير موجود" };
  return {
    title: `${product.nameAr} · ${product.nameEn}`,
    description: product.tagline || product.description,
    openGraph: product.images[0] ? { images: [product.images[0]] } : undefined,
  };
}

const noteLabels = [
  { key: "top", label: "المقدمة", labelEn: "Top" },
  { key: "heart", label: "القلب", labelEn: "Heart" },
  { key: "base", label: "القاعدة", labelEn: "Base" },
] as const;

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category);

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:py-20">
      <div className="relative aspect-[4/5] overflow-hidden border hairline bg-emerald">
        <ProductImage product={product} priority />
      </div>

      <div>
        <p className="latin-label text-[11px] text-gold">
          {product.nameEn} · {category?.labelEn}
        </p>
        <h1 className="mt-3 text-4xl font-light">{product.nameAr}</h1>
        {product.tagline && <p className="mt-3 text-lg text-ivory/80">{product.tagline}</p>}

        <Divider className="my-8 justify-start" />

        <AddToCart product={product} />

        {product.description && <p className="mt-10 text-ivory/85">{product.description}</p>}

        <div className="mt-10 grid grid-cols-3 border-t hairline pt-6">
          {noteLabels.map((n) => (
            <div key={n.key}>
              <p className="latin-label text-[10px] text-gold">{n.labelEn}</p>
              <p className="mt-1 text-sm text-ivory/70">{n.label}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {product.notes[n.key].map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className="mt-10 space-y-2 border-t hairline pt-6 text-sm text-ivory/75">
          <li>✦ الدفع عند الاستلام</li>
          <li>✦ شحن لكل محافظات مصر خلال ٢–٥ أيام عمل</li>
        </ul>
      </div>
    </section>
  );
}

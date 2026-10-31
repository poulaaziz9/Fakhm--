import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { Divider } from "@/components/brand";
import { Stagger, StaggerItem } from "@/components/motion";
import { ProductStage } from "@/components/product-stage";
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
    title: `${product.nameEn} (${product.code})`,
    description: `${product.family.ar} · ${product.notes.join(" · ")}`,
    openGraph: product.images[0] ? { images: [product.images[0]] } : undefined,
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category);

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:py-20">
      <div className="md:sticky md:top-28 md:self-start">
        <ProductStage product={product} />
      </div>

      <Stagger gap={0.1}>
        <StaggerItem>
          <p className="latin-label text-[11px] text-gold">
            {product.code} · {category?.labelEn} · {product.family.en}
          </p>
          <h1 className="mt-3 font-subtitle text-5xl tracking-wide">{product.nameEn}</h1>
          <p className="mt-2 text-lg text-ivory/80">
            {product.nameAr} · {product.family.ar}
          </p>
          {product.inspiredBy && (
            <p className="mt-4 inline-block border hairline px-3 py-1 text-sm text-ivory/75">
              مستوحى من <span dir="ltr">{product.inspiredBy}</span>
            </p>
          )}
        </StaggerItem>

        <StaggerItem>
          <Divider className="my-8 justify-start" />
          <AddToCart product={product} />
        </StaggerItem>

        <StaggerItem>
          {product.description && <p className="mt-10 text-ivory/85">{product.description}</p>}

          <div className="mt-10 border-t hairline pt-6">
            <p className="latin-label text-[10px] text-gold">Key Notes</p>
            <p className="mt-1 text-sm text-ivory/70">النوتات الأساسية</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <li key={note} className="border hairline bg-emerald/40 px-4 py-1.5 text-sm">
                  {note}
                </li>
              ))}
            </ul>
            {product.mood && (
              <p className="mt-6 text-sm text-ivory/75">
                <span className="text-gold">الطابع:</span> {product.mood}
              </p>
            )}
          </div>

          <ul className="mt-10 space-y-2 border-t hairline pt-6 text-sm text-ivory/75">
            <li>✦ الدفع عند الاستلام</li>
            <li>✦ شحن لكل محافظات مصر خلال ٢–٥ أيام عمل</li>
          </ul>
        </StaggerItem>
      </Stagger>
    </section>
  );
}

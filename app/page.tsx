import Image from "next/image";
import Link from "next/link";
import { Divider, Logo, Seal } from "@/components/brand";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/lib/config";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const showcase = featured.length > 0 ? featured : products.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="lotus-pattern absolute inset-0 opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/80 to-night" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          {/* Solid panel behind the mark, per the pattern rules. */}
          <div className="flex flex-col items-center bg-night px-6 py-10 text-center">
            <Logo size="lg" priority />
            <p className="latin-label mt-6 text-xs text-ivory">Perfumes</p>
            <Divider className="mt-6" />
            <h1 className="mt-6 text-2xl font-light text-ivory md:text-3xl">عطر يليق بك</h1>
            <Link
              href="/shop"
              className="mt-10 border border-gold px-10 py-3 text-sm text-gold transition hover:bg-gold hover:text-night"
            >
              اكتشف المجموعة
            </Link>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border hairline">
            <Image
              src="/products/fakhm-bottle-50ml.jpg"
              alt="زجاجة عطر فَخْم"
              fill
              priority
              sizes="(min-width: 768px) 448px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <p className="latin-label text-[11px] text-gold">The Collection</p>
          <h2 className="mt-3 text-3xl font-light">المجموعة المختارة</h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/shop" className="text-sm text-gold underline-offset-8 hover:underline">
            شوف كل العطور ←
          </Link>
        </div>
      </section>

      {/* Story */}
      <section className="bg-emerald">
        <div className="nile-band" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald p-2">
              <Seal className="size-56 text-gold md:size-72" />
            </div>
          </div>
          <div>
            <p className="latin-label text-[11px] text-gold">The Name</p>
            <h2 className="mt-3 text-3xl font-light">فَخْم… من غير ما يعلّي صوته</h2>
            <p className="mt-6 text-ivory/85">
              في مصر القديمة كان الاسم الملكي بيتكتب جوه خرطوش، حبل ملفوف بيحميه. ومن هنا جه ختمنا.
              واللوتس الأزرق كان زهرة العطور والطقوس، بتفتح مع الشروق وتقفل مع الغروب.
            </p>
            <p className="mt-4 text-ivory/85">
              فَخْم يعني عظيم ومَهيب. عطورنا معمولة عشان تحس بالمعنى ده في كل رشّة.
            </p>
          </div>
        </div>
        <div className="nile-band" />
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop/${c.slug}`}
              className="group border hairline p-10 text-center transition hover:border-gold"
            >
              <p className="font-subtitle text-xl tracking-[0.2em] text-gold">{c.labelEn}</p>
              <p className="mt-2 text-2xl font-light group-hover:text-gold">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

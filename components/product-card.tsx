import Image from "next/image";
import Link from "next/link";
import { BottleArt } from "./brand";
import { formatPrice } from "@/lib/config";
import { startingPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductImage({ product, priority = false }: { product: Product; priority?: boolean }) {
  const src = product.images[0];
  if (src) {
    return (
      <Image
        src={src}
        alt={product.nameAr}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover"
        priority={priority}
      />
    );
  }
  return (
    <div className="lotus-pattern absolute inset-0 grid place-items-center">
      <div className="absolute inset-0 bg-emerald/70" />
      <BottleArt nameEn={product.nameEn} className="relative h-4/5" />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden border hairline bg-emerald">
        <ProductImage product={product} />
        {!product.inStock && (
          <span className="absolute top-3 start-3 bg-night/90 px-3 py-1 text-xs text-ivory">نفدت الكمية</span>
        )}
      </div>
      <div className="mt-4 text-center">
        <p className="latin-label text-[10px] text-gold/90">{product.nameEn}</p>
        <h3 className="mt-1 text-xl font-light text-ivory transition group-hover:text-gold">{product.nameAr}</h3>
        <p className="mt-1 text-sm text-ivory/70">
          {product.variants.length > 1 ? "يبدأ من " : ""}
          {formatPrice(startingPrice(product))}
        </p>
      </div>
    </Link>
  );
}

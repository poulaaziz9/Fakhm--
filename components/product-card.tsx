import Image from "next/image";
import Link from "next/link";
import { BottleArt } from "./brand";
import { formatPrice } from "@/lib/config";
import { startingPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductImage({ product, priority = false }: { product: Product; priority?: boolean }) {
  const src = product.images[0];
  // Product shots are transparent cut-outs, staged on emerald with the lotus
  // pattern and a soft glow behind the bottle.
  return (
    <div className="lotus-pattern absolute inset-0">
      <div className="absolute inset-0 bg-emerald/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(200,171,116,0.22),transparent_60%)]" />
      {src ? (
        <Image
          src={src}
          alt={product.nameAr}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-contain p-[10%] drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]"
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <BottleArt nameEn={product.nameEn} className="h-4/5" />
        </div>
      )}
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

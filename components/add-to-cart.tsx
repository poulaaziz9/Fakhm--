"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./cart";
import { formatPrice } from "@/lib/config";
import type { Product } from "@/lib/types";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.variants[0]?.sizeMl);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.sizeMl === size) ?? product.variants[0];

  if (!variant) return null;

  function onAdd() {
    add(
      {
        productId: product.id,
        slug: product.slug,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        sizeMl: variant.sizeMl,
        price: variant.price,
        image: product.images[0] ?? null,
      },
      qty,
    );
    setAdded(true);
  }

  return (
    <div className="space-y-6">
      <p className="text-3xl font-light text-gold">{formatPrice(variant.price)}</p>

      <div>
        <p className="mb-3 text-sm text-ivory/80">الحجم</p>
        <div className="flex flex-wrap gap-3">
          {product.variants.map((v) => (
            <button
              key={v.sizeMl}
              onClick={() => {
                setSize(v.sizeMl);
                setAdded(false);
              }}
              className={`min-w-24 border px-5 py-2 text-sm transition ${
                v.sizeMl === variant.sizeMl ? "border-gold text-gold" : "hairline text-ivory/80 hover:text-gold"
              }`}
            >
              {v.sizeMl.toLocaleString("ar-EG")} مل
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border hairline">
          <button className="px-4 py-2 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="أقل">
            −
          </button>
          <span className="w-8 text-center">{qty.toLocaleString("ar-EG")}</span>
          <button className="px-4 py-2 text-lg" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="أكتر">
            +
          </button>
        </div>
        <button
          disabled={!product.inStock}
          onClick={onAdd}
          className="btn-gold flex-1"
        >
          <span>{product.inStock ? "أضف للسلة" : "نفدت الكمية"}</span>
        </button>
      </div>

      <AnimatePresence>
        {added && (
          <motion.p
            className="flex items-center gap-3 border hairline bg-emerald/50 px-4 py-3 text-sm text-ivory/90"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-gold">✓</span> اتضاف للسلة
            <Link href="/cart" className="ms-auto text-gold underline underline-offset-4">
              كمّل الطلب
            </Link>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

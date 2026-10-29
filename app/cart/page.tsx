"use client";

import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatPrice } from "@/lib/config";

export default function CartPage() {
  const { items, subtotal, ready, setQty, remove } = useCart();

  if (!ready) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-light">السلة فاضية</h1>
        <Link href="/shop" className="mt-8 inline-block border border-gold px-8 py-3 text-sm text-gold hover:bg-gold hover:text-night">
          اكتشف العطور
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-10 text-3xl font-light">السلة</h1>
      <ul className="divide-y divide-gold/25 border-y hairline">
        {items.map((i) => (
          <li key={`${i.productId}-${i.sizeMl}`} className="flex items-center gap-4 py-5">
            <div className="flex-1">
              <Link href={`/product/${i.slug}`} className="text-lg hover:text-gold">{i.nameAr}</Link>
              <p className="text-sm text-ivory/70">
                {i.sizeMl.toLocaleString("ar-EG")} مل · {formatPrice(i.price)}
              </p>
            </div>
            <div className="flex items-center border hairline">
              <button className="px-3 py-1" onClick={() => setQty(i.productId, i.sizeMl, i.qty - 1)} aria-label="أقل">−</button>
              <span className="w-7 text-center text-sm">{i.qty.toLocaleString("ar-EG")}</span>
              <button className="px-3 py-1" onClick={() => setQty(i.productId, i.sizeMl, i.qty + 1)} aria-label="أكتر">+</button>
            </div>
            <p className="w-24 text-end text-sm">{formatPrice(i.price * i.qty)}</p>
            <button className="text-ivory/60 hover:text-gold" onClick={() => remove(i.productId, i.sizeMl)} aria-label="احذف">
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between text-lg">
        <span>الإجمالي (من غير الشحن)</span>
        <span className="text-gold">{formatPrice(subtotal)}</span>
      </div>
      <Link href="/checkout" className="mt-8 block bg-gold py-4 text-center font-medium text-night hover:bg-ivory">
        إتمام الطلب
      </Link>
    </section>
  );
}

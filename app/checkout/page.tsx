"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useCart } from "@/components/cart";
import { formatPrice, governorates, shippingFeeFor } from "@/lib/config";
import { submitOrder } from "./actions";

const field = "w-full border hairline bg-transparent px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none";

export default function CheckoutPage() {
  const { items, subtotal, ready, clear } = useCart();
  const router = useRouter();
  const [governorate, setGovernorate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!ready) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-light">السلة فاضية</h1>
        <Link href="/shop" className="mt-8 inline-block text-gold underline underline-offset-4">رجوع للعطور</Link>
      </section>
    );
  }

  const shipping = shippingFeeFor(governorate, subtotal);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "");
    setError(null);
    startTransition(async () => {
      const res = await submitOrder({
        customer: {
          name: get("name"),
          phone: get("phone"),
          email: get("email"),
          governorate: get("governorate"),
          city: get("city"),
          address: get("address"),
          notes: get("notes"),
        },
        items: items.map((i) => ({ productId: i.productId, sizeMl: i.sizeMl, qty: i.qty })),
      });
      if (res.ok) {
        clear();
        router.push(`/order/success?n=${encodeURIComponent(res.orderNumber)}`);
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-[1fr_340px]">
      <form onSubmit={onSubmit} className="space-y-5">
        <h1 className="mb-6 text-3xl font-light">بيانات التوصيل</h1>
        <input name="name" required placeholder="الاسم بالكامل" className={field} autoComplete="name" />
        <input name="phone" required placeholder="رقم الموبايل" className={field} inputMode="tel" autoComplete="tel" dir="ltr" style={{ textAlign: "right" }} />
        <input name="email" type="email" placeholder="الإيميل (اختياري)" className={field} autoComplete="email" dir="ltr" style={{ textAlign: "right" }} />
        <div className="grid gap-5 sm:grid-cols-2">
          <select
            name="governorate"
            required
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}
            className={`${field} bg-night`}
          >
            <option value="" disabled>المحافظة</option>
            {governorates.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <input name="city" required placeholder="المدينة / المنطقة" className={field} />
        </div>
        <textarea name="address" required rows={3} placeholder="العنوان بالتفصيل (الشارع، رقم العمارة، الدور، علامة مميزة)" className={field} />
        <textarea name="notes" rows={2} placeholder="ملاحظات (اختياري)" className={field} />

        <div className="border hairline p-4 text-sm">
          <p className="text-gold">طريقة الدفع</p>
          <p className="mt-1 text-ivory/85">الدفع كاش عند الاستلام</p>
        </div>

        {error && <p className="border border-red-400/50 bg-red-950/30 px-4 py-3 text-sm text-red-200">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-gold py-4 font-medium text-night transition hover:bg-ivory disabled:opacity-60"
        >
          {pending ? "جاري تأكيد الطلب…" : `تأكيد الطلب · ${formatPrice(subtotal + shipping)}`}
        </button>
      </form>

      <aside className="h-fit border hairline bg-emerald/40 p-6">
        <h2 className="mb-4 text-lg">ملخص الطلب</h2>
        <ul className="space-y-3 text-sm">
          {items.map((i) => (
            <li key={`${i.productId}-${i.sizeMl}`} className="flex justify-between gap-3">
              <span>
                {i.nameAr} · {i.sizeMl.toLocaleString("ar-EG")} مل × {i.qty.toLocaleString("ar-EG")}
              </span>
              <span className="shrink-0">{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-2 border-t hairline pt-4 text-sm">
          <div className="flex justify-between"><span>المنتجات</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between">
            <span>الشحن</span>
            <span>{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between pt-2 text-base text-gold">
            <span>الإجمالي</span><span>{formatPrice(subtotal + shipping)}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}

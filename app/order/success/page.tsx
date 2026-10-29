import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Seal } from "@/components/brand";

export const metadata: Metadata = { title: "تم استلام طلبك", robots: { index: false } };

async function OrderNumber({ searchParams }: { searchParams: PageProps<"/order/success">["searchParams"] }) {
  const { n } = await searchParams;
  if (typeof n !== "string") return null;
  return (
    <p className="mt-4 text-ivory/85">
      رقم الطلب: <span dir="ltr" className="font-body tracking-widest text-gold">{n}</span>
    </p>
  );
}

export default function SuccessPage({ searchParams }: PageProps<"/order/success">) {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <Seal className="mx-auto size-32 text-gold" withText={false} />
      <h1 className="mt-8 text-3xl font-light">شكراً، طلبك وصل</h1>
      <Suspense fallback={null}>
        <OrderNumber searchParams={searchParams} />
      </Suspense>
      <p className="mt-4 text-ivory/75">هنكلمك على الموبايل قريب عشان نأكد الطلب ومعاد التوصيل.</p>
      <Link href="/shop" className="mt-10 inline-block border border-gold px-8 py-3 text-sm text-gold hover:bg-gold hover:text-night">
        كمّل تسوّق
      </Link>
    </section>
  );
}

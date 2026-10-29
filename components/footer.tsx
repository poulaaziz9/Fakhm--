import Link from "next/link";
import { Seal } from "./brand";
import { categories, site } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-24 border-t hairline">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="flex items-center gap-4">
          <Seal className="size-20 text-gold" withText={false} />
          <div>
            <p className="font-arabic text-2xl font-extralight text-gold">فَخْم</p>
            <p className="latin-label text-[10px] text-ivory/70">Perfumes · Egypt</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm text-gold">تسوّق</p>
          <ul className="space-y-2 text-sm text-ivory/80">
            <li><Link href="/shop" className="hover:text-gold">كل العطور</Link></li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}`} className="hover:text-gold">{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm text-gold">تواصل معانا</p>
          <ul className="space-y-2 text-sm text-ivory/80">
            {site.whatsapp && (
              <li>
                <a href={`https://wa.me/${site.whatsapp}`} className="hover:text-gold" target="_blank" rel="noreferrer">
                  واتساب
                </a>
              </li>
            )}
            {site.instagram && (
              <li>
                <a href={site.instagram} className="hover:text-gold" target="_blank" rel="noreferrer">
                  إنستجرام
                </a>
              </li>
            )}
            <li>الدفع عند الاستلام · شحن لكل محافظات مصر</li>
          </ul>
        </div>
      </div>
      <div className="nile-band opacity-70" />
      <p className="py-4 text-center text-xs text-ivory/60">
        © FAKHM Perfumes
      </p>
    </footer>
  );
}

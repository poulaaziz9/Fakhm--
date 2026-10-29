"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./brand";
import { useCart } from "./cart";
import { categories } from "@/lib/config";

export function Header() {
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b hairline bg-night/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
        <button
          className="text-ivory md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="القائمة"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <nav className="hidden items-center gap-8 text-sm text-ivory/85 md:flex">
          <Link href="/shop" className="hover:text-gold">كل العطور</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/shop/${c.slug}`} className="hover:text-gold">
              {c.label}
            </Link>
          ))}
        </nav>

        <Link href="/" aria-label="الرئيسية" className="absolute left-1/2 -translate-x-1/2">
          <Logo size="sm" />
        </Link>

        <Link href="/cart" className="relative text-ivory hover:text-gold" aria-label="السلة">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 8h12l-1 12H7L6 8z" />
            <path d="M9 8V6a3 3 0 016 0v2" />
          </svg>
          {ready && count > 0 && (
            <span className="absolute -top-2 -end-2 grid size-5 place-items-center rounded-full bg-gold text-[11px] font-medium text-night">
              {count.toLocaleString("ar-EG")}
            </span>
          )}
        </Link>
      </div>

      {open && (
        <nav className="border-t hairline px-4 py-4 md:hidden">
          <ul className="space-y-3 text-ivory/90">
            <li>
              <Link href="/shop" onClick={() => setOpen(false)}>كل العطور</Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}`} onClick={() => setOpen(false)}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

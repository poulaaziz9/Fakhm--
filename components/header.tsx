"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "./brand";
import { useCart } from "./cart";
import { categories } from "@/lib/config";

export function Header() {
  const { count, ready } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(count);
  const { scrollY } = useScroll();

  // Solid once the page scrolls; tucks away while scrolling down.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > prev && !open);
  });

  // Pulse the cart badge whenever something is added.
  useEffect(() => {
    if (ready && count > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 500);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count, ready]);

  const overHero = pathname === "/" && !scrolled && !open;

  return (
    <motion.header
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        overHero ? "border-transparent bg-transparent" : "hairline bg-night/85 backdrop-blur-md"
      }`}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
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
          <Link href="/shop" className="nav-link hover:text-gold">كل العطور</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/shop/${c.slug}`} className="nav-link hover:text-gold">
              {c.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          aria-label="الرئيسية"
          className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-700 ${overHero ? "opacity-0" : "opacity-100"}`}
        >
          <Logo size="sm" priority />
        </Link>

        <Link href="/cart" className="relative text-ivory hover:text-gold" aria-label="السلة">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 8h12l-1 12H7L6 8z" />
            <path d="M9 8V6a3 3 0 016 0v2" />
          </svg>
          {ready && count > 0 && (
            <span
              className={`absolute -top-2 -end-2 grid size-5 place-items-center rounded-full bg-gold text-[11px] font-medium text-night ${bump ? "bump" : ""}`}
            >
              {count.toLocaleString("ar-EG")}
            </span>
          )}
        </Link>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="overflow-hidden border-t hairline bg-night md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="space-y-4 px-4 py-6 text-lg font-light text-ivory/90">
              {[{ href: "/shop", label: "كل العطور" }, ...categories.map((c) => ({ href: `/shop/${c.slug}`, label: c.label }))].map(
                (item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i + 0.1 }}
                  >
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

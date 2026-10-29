import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="latin-label text-xs text-gold">404</p>
      <h1 className="mt-4 text-3xl font-light">الصفحة دي مش موجودة</h1>
      <Link href="/" className="mt-8 inline-block text-gold underline underline-offset-4">
        رجوع للرئيسية
      </Link>
    </section>
  );
}

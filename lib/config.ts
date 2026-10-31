import type { Category, Product } from "./types";

export const site = {
  nameAr: "فَخْم",
  nameEn: "FAKHM",
  tagline: "Scent of Distinction",
  taglineAr: "عطر يليق بك",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: "201508990761", // international format without +
  instagram: "https://www.instagram.com/fakhm.perfume",
};

export const currency = "ج.م";

// Flat shipping fee for all governorates (EGP). Change per governorate in
// `shippingFeeFor` if needed.
export const SHIPPING_FEE = 75;
export const FREE_SHIPPING_OVER = 3000;

export function shippingFeeFor(_governorate: string, subtotal: number) {
  return subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
}

export const categories: { slug: Category; label: string; labelEn: string }[] = [
  { slug: "men", label: "رجالي", labelEn: "For Him" },
  { slug: "women", label: "حريمي", labelEn: "For Her" },
];

export const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الشرقية",
  "الدقهلية",
  "الغربية",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
];

export function formatPrice(value: number) {
  return `${value.toLocaleString("ar-EG")} ${currency}`;
}

// Null while the product has no price yet (ordered on WhatsApp).
export function startingPrice(product: Product) {
  return product.variants.length ? Math.min(...product.variants.map((v) => v.price)) : null;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

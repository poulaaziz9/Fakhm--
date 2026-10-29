import type { Category } from "./types";

export const site = {
  nameAr: "فَخْم",
  nameEn: "FAKHM",
  tagline: "Scent of Distinction",
  taglineAr: "عطر يليق بك",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO: replace with the brand's real contacts.
  whatsapp: "", // international format without +, e.g. 2010xxxxxxxx
  instagram: "", // full URL
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
  { slug: "unisex", label: "للجميع", labelEn: "Unisex" },
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

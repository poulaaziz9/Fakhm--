export type Category = "men" | "women";

export type Variant = {
  sizeMl: number;
  price: number; // EGP
};

export type Product = {
  id: string;
  slug: string;
  code: string; // catalogue code, e.g. "M01"
  nameAr: string; // Arabic spelling of the name
  nameEn: string;
  family: { ar: string; en: string };
  mood: string; // short Arabic "wear it for" line
  inspiredBy: string;
  description: string;
  notes: string[]; // key notes, Arabic
  category: Category;
  // Empty while the price isn't set: the product is then ordered on WhatsApp.
  variants: Variant[];
  images: string[];
  featured: boolean;
  inStock: boolean;
};

export type CartItem = {
  productId: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  sizeMl: number;
  price: number;
  image: string | null;
  qty: number;
};

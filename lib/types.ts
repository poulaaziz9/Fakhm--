export type Category = "men" | "women" | "unisex";

export type Variant = {
  sizeMl: number;
  price: number; // EGP
};

export type Product = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  tagline: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  category: Category;
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

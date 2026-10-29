import type { Product } from "./types";

// Placeholder catalogue used until Supabase is connected (and as the seed
// source in supabase/seed.sql). Replace with the real FAKHM line-up.
export const sampleProducts: Product[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    slug: "nile-night",
    nameAr: "ليل النيل",
    nameEn: "Nile Night",
    tagline: "عود دافي وجلد ناعم على ضفة النيل بالليل",
    description:
      "عطر شرقي خشبي بيبدأ بلمسة زعفران وهيل، ويستقر على قلب من العود والجلد، وقاعدة دافية من العنبر والمسك. للمساء والمناسبات.",
    notes: {
      top: ["زعفران", "هيل"],
      heart: ["عود", "جلد"],
      base: ["عنبر", "مسك", "خشب الصندل"],
    },
    category: "men",
    variants: [
      { sizeMl: 50, price: 1450 },
      { sizeMl: 100, price: 2350 },
    ],
    images: [],
    featured: true,
    inStock: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    slug: "blue-lotus",
    nameAr: "اللوتس الأزرق",
    nameEn: "Blue Lotus",
    tagline: "زهرة المعابد على أول ضوء",
    description:
      "عطر زهري مائي مستوحى من اللوتس الأزرق، زهرة العطور والطقوس في مصر القديمة. خفيف ومنعش وبيفضل معاكي طول اليوم.",
    notes: {
      top: ["برجموت", "كمثرى"],
      heart: ["لوتس", "ياسمين"],
      base: ["مسك أبيض", "خشب الأرز"],
    },
    category: "women",
    variants: [
      { sizeMl: 50, price: 1350 },
      { sizeMl: 100, price: 2150 },
    ],
    images: [],
    featured: true,
    inStock: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    slug: "cartouche",
    nameAr: "خرطوش",
    nameEn: "Cartouche",
    tagline: "توقيع ملكي في زجاجة",
    description:
      "عطر عنبري بلمسة بخور ولبان، متوازن بين الدفا والانتعاش. معمول للي عايز يسيب أثر من غير ما يعلّي صوته.",
    notes: {
      top: ["فلفل وردي", "ليمون"],
      heart: ["لبان", "بخور"],
      base: ["عنبر", "فانيليا", "باتشولي"],
    },
    category: "unisex",
    variants: [
      { sizeMl: 50, price: 1550 },
      { sizeMl: 100, price: 2490 },
    ],
    images: [],
    featured: true,
    inStock: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    slug: "golden-sand",
    nameAr: "رمال ذهبية",
    nameEn: "Golden Sand",
    tagline: "دفا الصحرا قبل الغروب",
    description:
      "عطر خشبي حلو بنوتات الكراميل والتبغ والفانيليا. مريح ودافي ومناسب لأيام الشتا.",
    notes: {
      top: ["قرفة", "برتقال"],
      heart: ["تبغ", "كراميل"],
      base: ["فانيليا", "خشب الصندل"],
    },
    category: "unisex",
    variants: [{ sizeMl: 100, price: 1990 }],
    images: [],
    featured: false,
    inStock: true,
  },
];

import type { Category, Product } from "./types";

// FAKHM catalogue (men's & women's lines). Used until Supabase is connected,
// and as the source for supabase/seed.sql.
// Every bottle is 50 ml at one price. A product with no variants is ordered on
// WhatsApp instead of through the cart.

type Entry = [
  code: string,
  nameEn: string,
  nameAr: string,
  inspiredBy: string,
  familyEn: string,
  familyAr: string,
  notes: string,
  mood: string,
];

const men: Entry[] = [
  ["M01", "White Desert", "وايت ديزرت", "Sauvage – Dior", "Fresh Spicy", "فريش سبايسي", "برغموت · فلفل · لافندر · عنبر", "يومي وجذاب"],
  ["M02", "Nile Noir", "نايل نوار", "Bleu de Chanel", "Aromatic Woody", "خشبي أروماتيك", "جريب فروت · بخور · أرز", "كلاسيك راقي"],
  ["M03", "Birch Regent", "بيرش ريجنت", "Aventus – Creed", "Fruity Woody", "فواكه خشبي", "أناناس · خشب البتولا · مسك", "حضور قوي"],
  ["M04", "Marine Compass", "مارين كومباس", "Acqua di Giò – Armani", "Fresh Aquatic", "مائي منعش", "نسمات بحرية · روزماري · مسك أبيض", "صيفي"],
  ["M05", "Brass Talisman", "براس تاليسمان", "1 Million – Rabanne", "Spicy Leather", "جلدي سبايسي", "قرفة · جلد · عنبر", "سهرات"],
  ["M06", "Coral Knight", "كورال نايت", "Invictus – Rabanne", "Aquatic Woody", "مائي خشبي", "جريب فروت · نوتات بحرية · جاياك", "رياضي"],
  ["M07", "Emerald Spear", "إميرالد سبير", "Eros – Versace", "Mint Vanilla", "نعناع فانيلا", "نعناع · تفاح أخضر · تونكا · فانيلا", "شبابي"],
  ["M08", "Chestnut Ember", "تشستنت إمبر", "Stronger With You – Armani", "Sweet Spicy", "حلو سبايسي", "هيل · كستناء · فانيلا", "دافي شتوي"],
  ["M09", "Oud Oracle", "عود أوراكل", "Oud Wood – Tom Ford", "Woody Oud", "عود خشبي", "عود · صندل · فيتيفر", "فخامة شرقية"],
  ["M10", "Tobacco Lantern", "توباكو لانترن", "Tobacco Vanille – Tom Ford", "Tobacco Vanilla", "تبغ فانيلا", "ورق تبغ · فانيلا · كاكاو · تونكا", "مسائي"],
  ["M11", "Flint Horizon", "فلينت هورايزن", "Terre d’Hermès", "Earthy Citrus", "حمضي ترابي", "برتقال · حجر · فيتيفر", "رجل أعمال"],
  ["M12", "Honey Crown", "هني كراون", "Le Male Elixir – J. P. Gaultier", "Amber Fougère", "عنبري فوجير", "لافندر · عسل · تونكا · تبغ", "سهرات شتوي"],
  ["M13", "Sage Summit", "سيج سميت", "Y EDP – YSL", "Fresh Aromatic", "فريش أروماتيك", "زنجبيل · مريمية · خشب العنبر", "يومي"],
  ["M14", "Orris Dusk", "أوريس داسك", "Dior Homme Intense", "Powdery Woody", "بودري خشبي", "أيريس · كاكاو · جلد", "أنيق مسائي"],
  ["M15", "Chili Monarch", "تشيلي مونارك", "Spicebomb – Viktor&Rolf", "Spicy Oriental", "شرقي حار", "فلفل حار · تبغ · جلد", "جريء"],
];

const women: Entry[] = [
  ["W01", "Saffron Silhouette", "سافرون سيلويت", "Baccarat Rouge 540 – MFK", "Amber Floral", "عنبري زهري", "زعفران · ياسمين · خشب العنبر · أرز", "توقيع فخم"],
  ["W02", "Tuberose Eclipse", "توبروز إكليبس", "Good Girl – Carolina Herrera", "Sweet Floral", "زهري حلو", "لوز · مسك الروم · كاكاو · تونكا", "مسائي جريء"],
  ["W03", "Sugar Lotus", "شوجر لوتس", "La Vie Est Belle – Lancôme", "Gourmand", "حلو جورماند", "أيريس · برالين · فانيلا · باتشولي", "أنثوي ناعم"],
  ["W04", "Black Scarab", "بلاك سكاراب", "Black Opium – YSL", "Coffee Vanilla", "قهوة فانيلا", "قهوة · فانيلا · ورود بيضا", "سهرات"],
  ["W05", "Nefertari", "نفرتاري", "Libre – YSL", "Floral Lavender", "لافندر زهري", "زهر برتقال · لافندر · فانيلا · مسك", "عصري"],
  ["W06", "Peony Ribbon", "بيوني ريبون", "Miss Dior", "Floral Chypre", "وردي شيبر", "ورد · فاوانيا · باتشولي", "رقيق"],
  ["W07", "Patchouli Pearl", "باتشولي بيرل", "Coco Mademoiselle – Chanel", "Oriental Chypre", "شيبر شرقي", "برتقال · ورد · باتشولي · فانيلا", "كلاسيك أنيق"],
  ["W08", "Ylang Promise", "يلانج بروميس", "J’adore – Dior", "White Floral", "زهري أبيض", "يلانج · ياسمين · ورد", "للعرايس"],
  ["W09", "Rose Mirage", "روز ميراج", "Delina – Parfums de Marly", "Fruity Floral", "فواكه زهري", "ليتشي · راوند · ورد تركي", "ناعم ومميز"],
  ["W10", "Orchid Blaze", "أوركيد بليز", "Flowerbomb – Viktor&Rolf", "Sweet Floral", "زهري حلو", "أوركيد · ورد · باتشولي · برالين", "للاحتفالات"],
  ["W11", "Cassis Dawn", "كاسيس داون", "Sì – Armani", "Fruity Chypre", "شيبر فواكه", "كشمش أسود · ورد · فانيلا", "يومي"],
  ["W12", "Rose Canvas", "روز كانفاس", "Idôle – Lancôme", "Rosy Musk", "ورد مسكي", "ورد · كمثرى · مسك أبيض", "نظيف ومنعش"],
  ["W13", "Citrus Serenade", "سيترس سيرينيد", "Chance – Chanel", "Fresh Floral", "زهري منعش", "حمضيات · ياسمين · مسك أبيض", "يومي ناعم"],
  ["W14", "Vanilla Hearth", "فانيلا هارث", "Vanilla 28 – Kayali", "Amber Vanilla", "عنبري فانيلا", "فانيلا · عنبر · مسك", "دافي ومريح"],
  ["W15", "Grenadine Sky", "جرينادين سكاي", "Bright Crystal – Versace", "Fresh Fruity", "فواكه منعش", "رمان · فاوانيا · لوتس · عنبر", "صيفي"],
];

const BOTTLE = { sizeMl: 50, price: 649 }; // EGP

const FEATURED = new Set(["M01", "M02", "M09", "W01", "W03", "W05"]);

function toProduct(e: Entry, category: Category, index: number): Product {
  const [code, nameEn, nameAr, inspiredBy, familyEn, familyAr, notes, mood] = e;
  const n = String(index + (category === "men" ? 1 : 101)).padStart(3, "0");
  return {
    id: `00000000-0000-4000-8000-000000000${n}`,
    slug: `${code.toLowerCase()}-${nameEn.toLowerCase().replace(/\s+/g, "-")}`,
    code,
    nameAr,
    nameEn,
    family: { ar: familyAr, en: familyEn },
    mood,
    inspiredBy,
    description: `عطر ${familyAr} بتركيز ٢٥٪ زيت عطري، معمول من زيوت خام سويسرية وفرنسية.`,
    notes: notes.split(" · "),
    category,
    variants: [BOTTLE],
    images: ["/products/fakhm-bottle-50ml.webp"],
    featured: FEATURED.has(code),
    inStock: true,
  };
}

export const catalogue: Product[] = [
  ...men.map((e, i) => toProduct(e, "men", i)),
  ...women.map((e, i) => toProduct(e, "women", i)),
];

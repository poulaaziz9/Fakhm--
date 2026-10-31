import Link from "next/link";
import { Seal } from "@/components/brand";
import { Hero } from "@/components/hero";
import { DrawLine, Marquee, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ParallaxImage } from "@/components/parallax-image";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/lib/config";
import { getProducts } from "@/lib/products";

const notesJourney = [
  { en: "Top", ar: "المقدمة", time: "أول ١٥ دقيقة", text: "أول انطباع: نوتات خفيفة ومنعشة بتفتح العطر." },
  { en: "Heart", ar: "القلب", time: "من ساعة لـ ٤ ساعات", text: "شخصية العطر الحقيقية، بتظهر لما المقدمة تهدى." },
  { en: "Base", ar: "القاعدة", time: "طول اليوم", text: "الأثر اللي بيفضل: خشب وعنبر ومسك على البشرة." },
];

const promises = [
  { title: "الدفع عند الاستلام", text: "ادفع لما الأوردر يوصلك" },
  { title: "شحن لكل المحافظات", text: "من إسكندرية لأسوان" },
  { title: "أو دو بارفان", text: "تركيز عطري أعلى" },
  { title: "هوية مصرية", text: "مستوحاة من حضارتنا" },
];

export default async function Home() {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const showcase = featured.length > 0 ? featured : products.slice(0, 3);

  return (
    <>
      <Hero />

      <Marquee
        className="border-y hairline bg-emerald/60 py-4 font-subtitle text-lg tracking-[0.25em] text-gold/90"
        items={["SCENT OF DISTINCTION", "فَخْم", "EAU DE PARFUM", "FAKHM PERFUMES", "عطر يليق بك", "EGYPT"]}
      />

      {/* Collection */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <Reveal className="mb-16 text-center">
          <p className="latin-label text-[11px] text-gold">The Collection</p>
          <h2 className="mt-4 text-3xl font-extralight md:text-5xl">المجموعة المختارة</h2>
          <DrawLine className="mx-auto mt-8 w-24" delay={0.3} />
        </Reveal>
        <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3" gap={0.15}>
          {showcase.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-16 text-center" delay={0.2}>
          <Link href="/shop" className="btn-ghost">
            شوف كل العطور
          </Link>
        </Reveal>
      </section>

      {/* Story */}
      <section id="story" className="relative scroll-mt-20 bg-emerald">
        <div className="nile-band" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-2 md:py-32">
          <Reveal>
            <p className="latin-label text-[11px] text-gold">The Name</p>
            <h2 className="mt-4 text-3xl font-extralight leading-snug md:text-5xl">
              فَخْم…
              <br />
              من غير ما يعلّي صوته
            </h2>
            <DrawLine className="mt-8 w-24 origin-right" delay={0.3} />
            <p className="mt-8 text-ivory/85">
              في مصر القديمة كان الاسم الملكي بيتكتب جوه خرطوش، حبل ملفوف بيحميه. ومن هنا جه ختمنا.
              واللوتس الأزرق كان زهرة العطور والطقوس، بتفتح مع الشروق وتقفل مع الغروب.
            </p>
            <p className="mt-4 text-ivory/85">فَخْم يعني عظيم ومَهيب. عطورنا معمولة عشان تحس بالمعنى ده في كل رشّة.</p>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <ParallaxImage src="/brand/hero.jpg" alt="زجاجة فَخْم بين المخمل والرخام" className="aspect-[4/5] border hairline" />
            {/* Seal on a solid disc, turning slowly */}
            <div className="absolute -bottom-10 -start-6 rounded-full bg-emerald p-2 md:-start-12">
              <Seal className="spin-slow size-32 text-gold md:size-40" />
            </div>
          </Reveal>
        </div>
        <div className="nile-band" />
      </section>

      {/* How a fragrance unfolds */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <Reveal className="mb-16 text-center">
          <p className="latin-label text-[11px] text-gold">The Journey</p>
          <h2 className="mt-4 text-3xl font-extralight md:text-5xl">رحلة العطر على بشرتك</h2>
        </Reveal>
        <Stagger className="grid gap-px overflow-hidden border hairline bg-gold/20 md:grid-cols-3" gap={0.2}>
          {notesJourney.map((n, i) => (
            <StaggerItem key={n.en} className="group relative h-full bg-night p-10 transition-colors duration-700 hover:bg-emerald/60">
              <span className="font-display text-6xl text-gold/20 transition-colors duration-700 group-hover:text-gold/40">
                0{i + 1}
              </span>
              <p className="latin-label mt-6 text-[11px] text-gold">{n.en} Notes</p>
              <h3 className="mt-2 text-2xl font-light">{n.ar}</h3>
              <p className="mt-1 text-sm text-gold/80">{n.time}</p>
              <p className="mt-4 text-ivory/75">{n.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 pb-24 md:pb-32">
        <Stagger className="grid gap-6 md:grid-cols-3" gap={0.12}>
          {categories.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/shop/${c.slug}`}
                className="group relative block overflow-hidden border hairline px-10 py-16 text-center transition-colors duration-700 hover:border-gold"
              >
                <div className="lotus-pattern absolute inset-0 scale-110 opacity-0 transition-all duration-1000 group-hover:scale-100 group-hover:opacity-40" />
                <div className="relative">
                  <p className="font-subtitle text-xl tracking-[0.25em] text-gold">{c.labelEn}</p>
                  <p className="mt-3 text-3xl font-extralight transition-colors duration-500 group-hover:text-gold">{c.label}</p>
                  <span className="mt-6 inline-block text-sm text-ivory/60 transition-all duration-500 group-hover:-translate-x-2 group-hover:text-gold">
                    تسوّق ←
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Promises */}
      <section className="border-y hairline bg-emerald/40">
        <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 md:grid-cols-4" gap={0.1}>
          {promises.map((p) => (
            <StaggerItem key={p.title} className="text-center">
              <span className="mx-auto mb-4 block size-2 rotate-45 bg-gold" />
              <p className="text-lg font-light text-ivory">{p.title}</p>
              <p className="mt-1 text-sm text-ivory/60">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

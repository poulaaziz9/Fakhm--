"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const BOTTLE = "/products/fakhm-bottle-50ml.webp";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden pt-16 md:-mt-20 md:pt-20">
      {/* Drifting lotus field and breathing gold light */}
      <div className="lotus-pattern lotus-drift absolute inset-0 opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_55%,transparent_0%,var(--color-night)_70%)]" aria-hidden />
      {/* Keep the pattern out of the logo's clear zone */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,var(--color-night)_30%,transparent_65%)] md:bg-[radial-gradient(ellipse_at_72%_48%,var(--color-night)_28%,transparent_60%)]"
        aria-hidden
      />
      <div className="glow-breathe absolute start-[8%] top-1/2 size-[70vmin] -translate-y-1/2 rounded-full bg-gold/15 blur-[90px] md:start-auto md:end-[12%]" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-4 py-10 md:grid-cols-2 md:gap-12">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 text-center md:order-1">
          <motion.p
            className="latin-label text-[11px] text-gold"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            Eau de Parfum · Egypt
          </motion.p>

          {/* Official lockup revealed with a soft wipe */}
          <motion.div
            className="mx-auto mt-6 w-[min(82vw,520px)] min-w-[200px] px-2 py-3"
            initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
          >
            <Image src="/brand/logo-gold.svg" alt="FAKHM فَخْم" width={520} height={91} priority className="h-auto w-full" />
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-3" aria-hidden>
            <motion.span className="h-px w-20 origin-left bg-gold/60" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: EASE, delay: 1.1 }} />
            <motion.span className="size-1.5 rotate-45 bg-gold" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 1.5 }} />
            <motion.span className="h-px w-20 origin-right bg-gold/60" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: EASE, delay: 1.1 }} />
          </div>

          <motion.h1
            className="mt-8 text-3xl font-extralight leading-snug text-ivory md:text-5xl"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.3 }}
          >
            عطر يليق بك
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-sm text-ivory/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.5 }}
          >
            عطور رجالي وحريمي بتركيز ٢٥٪ زيت عطري، بروح مصرية فاخرة.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.7 }}
          >
            <Link href="/shop" className="btn-gold">
              <span>تسوّق المجموعة</span>
            </Link>
            <Link href="#story" className="btn-ghost">
              حكايتنا
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottle: rises in, floats, and parallaxes on scroll */}
        <motion.div style={{ y: bottleY }} className="relative order-1 mx-auto h-[46svh] w-full md:order-2 md:h-[78svh]">
          <motion.div
            className="relative h-full"
            initial={{ opacity: 0, y: 80, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.1 }}
          >
            <div className="bottle-float relative h-full">
              <Image
                src={BOTTLE}
                alt="زجاجة عطر فَخْم"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 90vw"
                className="object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]"
              />
              {/* Light sweep clipped to the bottle silhouette */}
              <div className="bottle-shine absolute inset-0" style={{ maskImage: `url(${BOTTLE})`, WebkitMaskImage: `url(${BOTTLE})` }} aria-hidden />
            </div>
            {/* Reflection pool */}
            <div className="absolute -bottom-4 left-1/2 h-6 w-1/2 -translate-x-1/2 rounded-[50%] bg-black/50 blur-xl" aria-hidden />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/50 md:flex"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-hidden
      >
        <span className="latin-label text-[9px]">Scroll</span>
        <span className="scroll-cue h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}

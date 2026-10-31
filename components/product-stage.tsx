"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ProductImage } from "./product-card";
import type { Product } from "@/lib/types";

// Product image that tilts gently toward the pointer.
export function ProductStage({ product }: { product: Product }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });

  return (
    <motion.div
      className="relative aspect-[4/5] [perspective:1200px]"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY }} className="card-stage relative h-full overflow-hidden border hairline bg-emerald">
        <div className="bottle-float absolute inset-0">
          <ProductImage product={product} priority />
        </div>
      </motion.div>
    </motion.div>
  );
}

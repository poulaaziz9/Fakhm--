"use client";

import { MotionConfig, motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { ReactLenis } from "lenis/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Smooth scrolling + global motion settings. Reduced-motion users get
// instant transitions and native scrolling.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE, duration: 0.9 }}>
      {reduce ? children : <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>{children}</ReactLenis>}
    </MotionConfig>
  );
}

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

// Fades and lifts its children into place the first time they scroll into view.
export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Staggers direct `StaggerItem` children as the group enters the viewport.
export function Stagger({ children, className, gap = 0.12 }: { children: React.ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 36 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

// A hairline that draws itself from the centre outwards.
export function DrawLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-center bg-gold/60 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

// Endless horizontal ticker. Content is duplicated so the loop is seamless.
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-10 pe-10" aria-hidden={hidden}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span>{t}</span>
          <span className="size-1.5 rotate-45 bg-gold/70" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee flex overflow-hidden ${className}`} dir="ltr">
      <div className="marquee-track flex">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

// Brand marks. The wordmark here is a temporary stand-in: the guidelines say
// to always use the supplied artwork, so swap `Logo` for the official SVG
// (public/brand/logo.svg) once it is provided.

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const latin = { sm: "text-xl", md: "text-2xl", lg: "text-5xl md:text-7xl" }[size];
  const arabic = { sm: "text-2xl", md: "text-3xl", lg: "text-6xl md:text-8xl" }[size];
  const bar = { sm: "h-7", md: "h-9", lg: "h-20 md:h-28" }[size];
  return (
    <span dir="ltr" className="inline-flex items-center gap-3 text-gold select-none" aria-label="FAKHM فخم">
      <span className={`font-display ${latin} tracking-[0.3em] ps-[0.3em]`}>FΛKHM</span>
      <span className={`w-px ${bar} bg-gold/80`} />
      <span className={`font-arabic font-extralight ${arabic} leading-none`}>فَخْم</span>
    </span>
  );
}

// The cartouche seal: an F inside a cartouche, ringed by the sun's rays.
export function Seal({ className = "", withText = true }: { className?: string; withText?: boolean }) {
  const rays = Array.from({ length: 36 }, (_, i) => i * 10);
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="FAKHM seal" direction="ltr">
      <defs>
        <path id="seal-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <g fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="96" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="92" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="62" strokeWidth="0.8" />
        {rays.map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="42"
            x2="100"
            y2="48"
            strokeWidth="0.6"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
        <rect x="78" y="58" width="44" height="80" rx="22" strokeWidth="1.2" />
        <rect x="82" y="62" width="36" height="72" rx="18" strokeWidth="0.5" />
        <line x1="74" y1="144" x2="126" y2="144" strokeWidth="1.6" />
      </g>
      <text
        x="100"
        y="113"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: "var(--font-bodoni)", fontSize: 38 }}
      >
        F
      </text>
      {withText && (
        <text
          fill="currentColor"
          style={{ fontFamily: "var(--font-jost)", fontSize: 9.5, letterSpacing: 3.2 }}
        >
          <textPath href="#seal-ring" startOffset="2%">
            SCENT OF DISTINCTION · FAKHM PERFUMES · EGYPT ·
          </textPath>
        </text>
      )}
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gold/60" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px w-16 bg-gold/60" />
    </div>
  );
}

// Placeholder product shot, drawn after the bottle on guideline page 10.
// Used until real product photos are uploaded.
export function BottleArt({ nameEn, className = "" }: { nameEn: string; className?: string }) {
  return (
    <svg viewBox="0 0 240 300" className={className} role="img" aria-label={nameEn} direction="ltr">
      <rect x="98" y="18" width="44" height="40" rx="3" fill="#c8ab74" />
      <rect x="98" y="18" width="12" height="40" rx="3" fill="#d9c08f" />
      <rect x="106" y="56" width="28" height="14" fill="#b3965f" />
      <rect x="52" y="68" width="136" height="214" rx="14" fill="#e3cf98" fillOpacity="0.28" stroke="#f1eadb" strokeOpacity="0.5" />
      <rect x="58" y="120" width="124" height="156" rx="10" fill="#d9c08f" fillOpacity="0.45" />
      <rect x="80" y="130" width="80" height="106" fill="#0a1f1a" stroke="#c8ab74" strokeWidth="0.8" />
      <rect x="84" y="134" width="72" height="98" fill="none" stroke="#c8ab74" strokeWidth="0.4" />
      <circle cx="120" cy="158" r="12" fill="none" stroke="#c8ab74" strokeWidth="0.6" />
      <text x="120" y="162.5" textAnchor="middle" fill="#c8ab74" style={{ fontFamily: "var(--font-bodoni)", fontSize: 12 }}>
        F
      </text>
      <text x="120" y="190" textAnchor="middle" fill="#c8ab74" style={{ fontFamily: "var(--font-bodoni)", fontSize: 10, letterSpacing: 3 }}>
        FAKHM
      </text>
      <text x="120" y="210" textAnchor="middle" fill="#f1eadb" style={{ fontFamily: "var(--font-jost)", fontSize: 5.5, letterSpacing: 1.6 }}>
        {nameEn.toUpperCase()}
      </text>
      <path d="M84 224 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5" fill="none" stroke="#c8ab74" strokeWidth="0.5" />
      <rect x="62" y="78" width="6" height="190" rx="3" fill="#ffffff" fillOpacity="0.35" />
    </svg>
  );
}

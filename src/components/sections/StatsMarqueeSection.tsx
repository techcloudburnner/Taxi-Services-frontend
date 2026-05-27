import { motion } from "framer-motion";

const MARQUEE = [
  "Verified Drivers", "Transparent Pricing", "24×7 Support",
  "Pan-India Reach", "On-Time Promise", "Premium Fleet",
  "Safe Journeys", "Best Rates",
];

export function StatsMarqueeSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/40 py-6">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-glow-pulse" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 gap-12 pr-12 animate-marquee">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl tracking-[0.15em] text-foreground/80">
              {t}
              <span className="h-2 w-2 rotate-45 bg-primary" />
            </span>
          ))}
        </div>
        <div className="flex shrink-0 gap-12 pr-12 animate-marquee" aria-hidden>
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl tracking-[0.15em] text-foreground/80">
              {t}
              <span className="h-2 w-2 rotate-45 bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
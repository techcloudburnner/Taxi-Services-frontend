import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

const LOOP = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-primary opacity-15 blur-3xl animate-glow-pulse" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-gradient-primary opacity-10 blur-3xl" />

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary bg-primary/15 px-3 py-1.5 rounded-full">
            Testimonials
          </span>
          <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl leading-tight">
            What our <span className="text-gradient">riders</span> say
          </h2>
          <p className="mt-4 text-foreground/75">Real feedback from real customers who trust us with their journeys.</p>
        </div>
      </div>

      {/* Infinite looping carousel */}
      <div
        className="testimonial-marquee group relative mt-16 flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex shrink-0 gap-6 pr-6 animate-marquee-slow">
          {LOOP.map((t, i) => (
            <TiltTestimonial key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltTestimonial({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className="group relative w-[320px] shrink-0 rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-card/50 p-7 shadow-card transition-all hover:border-primary/50 hover:shadow-glow hover:from-card hover:to-card/30 sm:w-[360px]"
    >
      <Quote className="absolute right-4 top-4 h-10 w-10 text-primary/15 transition group-hover:text-primary/25" />
      <div className="flex gap-1" style={{ transform: "translateZ(30px)" }}>
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="mt-5 text-sm text-foreground/80 leading-relaxed font-medium" style={{ transform: "translateZ(20px)" }}>
        "{t.text}"
      </p>
      <div className="mt-6 border-t border-primary/10 pt-4" style={{ transform: "translateZ(30px)" }}>
        <div className="font-display font-bold text-foreground">{t.name}</div>
        <div className="text-xs text-primary/70 font-semibold uppercase tracking-wider">{t.city}</div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Target, Compass } from "lucide-react";

export function WhyChooseUsSection() {
  return (
    <section className="border-y border-border/50 bg-gradient-to-b from-surface/60 via-background to-background py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary bg-primary/15 px-3 py-1.5 rounded-full">
            Our Promise
          </span>
          <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl leading-tight">
            Driven by purpose, <span className="text-gradient">guided by vision</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card to-card/50 p-10 transition hover:border-primary/50 hover:shadow-glow"
          >
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-primary opacity-15 blur-3xl group-hover:opacity-25 transition" />
            <div className="absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-primary opacity-5 blur-2xl" />
            <Target className="relative h-10 w-10 text-primary transition group-hover:scale-110" />
            <h3 className="relative mt-6 font-display text-2xl tracking-wide font-bold">Our Mission</h3>
            <p className="relative mt-4 text-foreground/75 leading-relaxed">
              To redefine taxi travel in India by combining trusted drivers, modern fleet and
              transparent pricing — making every journey safe, comfortable and stress-free.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card to-card/50 p-10 transition hover:border-primary/50 hover:shadow-glow"
          >
            <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-gradient-primary opacity-15 blur-3xl group-hover:opacity-25 transition" />
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary opacity-5 blur-2xl" />
            <Compass className="relative h-10 w-10 text-primary transition group-hover:scale-110" />
            <h3 className="relative mt-6 font-display text-2xl tracking-wide font-bold">Our Vision</h3>
            <p className="relative mt-4 text-foreground/75 leading-relaxed">
              To be India's most loved taxi brand — a name that families, professionals and
              travellers reach for first, every single time they need to move.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

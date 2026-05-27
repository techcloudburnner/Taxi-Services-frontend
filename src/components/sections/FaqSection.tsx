import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/faqs";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-gradient-to-b from-surface/50 via-background to-background py-24">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.5fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary bg-primary/15 px-3 py-1.5 rounded-full">
            FAQ
          </span>
          <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl leading-tight">
            Got <span className="text-gradient">questions?</span>
          </h2>
          <p className="mt-6 text-foreground/75 leading-relaxed text-lg">
            Quick answers to the things travellers ask us most. Couldn't find what you need? Call us
            anytime.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          {FAQS.map((f, i) => {
            const active = open === i;
            return (
              <motion.div
                key={f.q}
                layout
                className={`rounded-2xl border transition-all ${active
                    ? "border-primary/50 bg-primary/8 shadow-glow"
                    : "border-primary/20 bg-card/50 hover:border-primary/30"
                  }`}
              >
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition"
                >
                  <span className="font-display font-bold text-foreground leading-tight">{f.q}</span>
                  <motion.div
                    animate={{ rotate: active ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold"
                  >
                    {active ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pt-2 text-sm text-foreground/80 leading-relaxed border-t border-primary/10">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function ContactSection() {
  return (
    <section className="py-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-primary p-12 text-primary-foreground sm:p-16 lg:p-20 transition hover:border-primary/60"
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl transition group-hover:bg-white/20" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-black/25 blur-3xl transition group-hover:bg-black/30" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl font-bold">
                Ready to hit the road?
              </h2>
              <p className="mt-6 max-w-xl text-primary-foreground/90 text-lg leading-relaxed">
                Book your next ride in under 2 minutes. Talk to us directly — we'll handle the rest.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <Link
                to="/booking"
                className="group/btn inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background transition hover:scale-105 shadow-lg"
              >
                Book Now <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1.5" />
              </Link>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-primary-foreground/40 bg-primary-foreground/12 px-8 py-4 text-sm font-bold backdrop-blur-sm transition hover:border-primary-foreground/60 hover:bg-primary-foreground/20"
              >
                <Phone className="h-4 w-4" /> Call {BRAND.phone}
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-primary-foreground/40 bg-primary-foreground/12 px-8 py-4 text-sm font-bold backdrop-blur-sm transition hover:border-primary-foreground/60 hover:bg-primary-foreground/20"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

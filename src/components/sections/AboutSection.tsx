import { motion } from "framer-motion";
import { Award, Users, Map, Headphones } from "lucide-react";
import innovaSide from "@/assets/innova-side.jpg";

const stats = [
  { icon: Users, value: "10K+", label: "Happy Travellers" },
  { icon: Map, value: "150+", label: "Destinations" },
  { icon: Award, value: "12+", label: "Years Experience" },
  { icon: Headphones, value: "24/7", label: "Support" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-primary opacity-30 blur-3xl" />
          <div className="absolute inset-0 -z-10 rounded-3xl border border-primary/20" />
          <img
            src={innovaSide}
            alt="Toyota Innova Crysta"
            loading="lazy"
            className="rounded-3xl shadow-card"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary bg-primary/15 px-3 py-1.5 rounded-full">
            About Us
          </span>
          <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl leading-tight">
            Driven by <span className="text-gradient">trust</span>, powered by experience.
          </h2>
          <p className="mt-6 text-foreground/75 leading-relaxed text-lg">
            Rudra Banna Taxi has been moving people across India for over a decade. From quick city
            rides to long outstation journeys, our verified drivers and immaculately maintained fleet
            ensure every trip is safe, comfortable and memorable.
          </p>
          <p className="mt-4 text-foreground/75 leading-relaxed text-lg">
            We believe in transparent pricing — no hidden charges, no surprises. Just honest service.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-primary/3 p-5 text-center transition hover:border-primary/50 hover:shadow-glow hover:from-primary/12 hover:to-primary/5"
              >
                <s.icon className="mx-auto h-6 w-6 text-primary transition group-hover:scale-110" />
                <div className="mt-3 font-display text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

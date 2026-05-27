import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Tilt } from "@/components/ui/tilt";
import jeenMataImg from "@/assets/temple-jeen-mata.jpg";
import harshParvatImg from "@/assets/temple-harsh-parvat.jpg";
import mandawaImg from "@/assets/haveli-mandawa.jpg";
import laxmangarhImg from "@/assets/fort-laxmangarh.jpg";

const packages = [
  {
    title: "Jeenmata Temple",
    location: "Sikar, Rajasthan",
    duration: "Half-day Trip",
    price: "₹ 2,999",
    image: jeenMataImg,
    tag: "Ancient Shrine",
  },
  {
    title: "Harshnath Temple",
    location: "Sikar, Rajasthan",
    duration: "Half-day Trip",
    price: "₹ 2,499",
    image: harshParvatImg,
    tag: "Mountain Temple",
  },
  {
    title: "Mandawa Havelis",
    location: "Mandawa, Rajasthan",
    duration: "Full-day Tour",
    price: "₹ 4,999",
    image: mandawaImg,
    tag: "Art & History",
  },
  {
    title: "Laxmangarh Fort",
    location: "Laxmangarh, Rajasthan",
    duration: "Half-day Trip",
    price: "₹ 3,499",
    image: laxmangarhImg,
    tag: "Panoramic Views",
  },
];

export function TourPackagesSection() {
  return (
    <section id="tour-packages" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-gradient-glow to-transparent opacity-40" />
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary bg-primary/15 px-3 py-1.5 rounded-full">
            <Sparkles className="h-4 w-4" /> Our Tour Packages
          </span>
          <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl leading-tight">
            Sacred journeys, <span className="text-gradient">unforgettable memories</span>
          </h2>
          <p className="mt-4 text-foreground/75 leading-relaxed">
            Curated pilgrimage packages to India's most revered temples — comfortable cars, experienced drivers and stress-free planning.
          </p>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 60, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              <Tilt
                intensity={10}
                className="group relative h-full overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-card transition-all duration-500 hover:border-primary/60 hover:shadow-glow"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  <span
                    style={{ transform: "translateZ(60px)" }}
                    className="absolute left-4 top-4 rounded-full bg-gradient-primary px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow"
                  >
                    {p.tag}
                  </span>
                  <div
                    style={{ transform: "translateZ(40px)" }}
                    className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white/95"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md border border-white/10">
                      <MapPin className="h-3 w-3" /> {p.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md border border-white/10">
                      <Clock className="h-3 w-3" /> {p.duration}
                    </span>
                  </div>
                </div>

                <div className="p-7" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="font-display text-xl tracking-wide font-bold">{p.title}</h3>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-primary/70 font-bold">Starting from</div>
                      <div className="font-display text-2xl font-bold text-gradient mt-1">{p.price}</div>
                    </div>
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:scale-105 shadow-glow"
                    >
                      Book <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="mt-6 h-1 w-12 bg-gradient-primary transition-all duration-500 group-hover:w-24 rounded-full" />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Car, Plane, Building2, Heart, Briefcase, MapPin, ArrowRight } from "lucide-react";
import { RevealHeading } from "@/components/ui/tilt";
import localImg from "@/assets/dzire.jpg";
import outstationImg from "@/assets/innova-side.jpg";
import airportImg from "@/assets/innova-front.jpg";
import weddingImg from "@/assets/kia-carens-decoration.jpg";
import corporateImg from "@/assets/audi-a4.jpg";
import groupTourImg from "@/assets/tempo-traveller.jpg";

const services = [
  { icon: Car, image: localImg, title: "Taxi & Car Rentals", desc: "Comfortable sedans & SUVs for in-city travel." },
  { icon: MapPin, image: outstationImg, title: "Outstation & All India Trips", desc: "One-way or round trip across India with experienced drivers." },
  { icon: Plane, image: airportImg, title: "Airport Transfers", desc: "On-time pickup & drop with flight tracking." },
  { icon: Heart, image: weddingImg, title: "Wedding & Events", desc: "Elegant decorated cars for your big day." },
  { icon: Briefcase, image: corporateImg, title: "Corporate & Business Travel", desc: "Reliable transport for meetings & employee commute." },
  { icon: Building2, image: groupTourImg, title: "Family & Group Tours", desc: "Tempo travellers & multi-seater rides for groups." },
];

const loop = [...services, ...services];

function ServiceCard({ s }: { s: (typeof services)[number] }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative flex w-full shrink-0 flex-col overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-card transition-all duration-400 hover:border-primary/60 hover:shadow-glow"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="absolute top-4 left-5 z-20 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow ring-4 ring-card transition-all duration-400 group-hover:-rotate-6 group-hover:scale-105">
        <s.icon className="h-7 w-7" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-10">
        <h3 className="font-display text-2xl tracking-wide font-bold">{s.title}</h3>
        <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
        <Link to="/booking" className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
        </Link>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-surface/50 via-background to-background py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-glow opacity-40" />
      <div className="container-x">
        <RevealHeading eyebrow="Our Services" className="mx-auto max-w-3xl text-center">
          Comfortable taxi & travel options <span className="text-gradient">for every journey</span>
        </RevealHeading>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-4 max-w-2xl text-center text-foreground/75 leading-relaxed text-lg"
        >
          Reliable taxis, tempo travellers & premium cars for local rides, outstation journeys and all-India trips.
        </motion.p>
      </div>

      {/* Grid of service cards */}
      <div className="container-x mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={`${s.title}-${i}`} s={s} />
        ))}
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            to="/booking"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-105"
          >
            View All Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
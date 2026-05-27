// src/components/fleet/CarCard.tsx
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users, Briefcase, Snowflake,Music2, ArrowRight } from "lucide-react";
import { Tilt } from "@/components/ui/tilt";
import type { Car } from "@/data/cars";

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tilt intensity={6} className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:border-primary/50 hover:shadow-glow">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <img
            src={car.image}
            alt={car.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-car.png';
            }}
          />
          <span className="absolute left-3 top-3 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
            {car.category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl tracking-wide">{car.name}</h3>
            <div className="text-right flex-shrink-0">
              <div className="font-display text-xl text-primary">₹{car.pricePerKm}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">per km</div>
            </div>
          </div>
          
          {/* DESCRIPTION ADDED HERE */}
          {/* {car.description && (
            <p className="mt-2 text-xs text-foreground/60 line-clamp-2 leading-relaxed">
              {car.description}
            </p>
          )} */}
          
          <div className="mt-3 flex gap-4 text-xs text-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" /> {car.seats} Seats
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-primary" /> {car.luggage} Bags
            </span>
            {car.ac && (
              <span className="inline-flex items-center gap-1.5">
<Music2 className="h-3.5 w-3.5 text-primary" /> Music              </span>
            )}
          </div>
          
          {/* FEATURES AS BADGES */}
{car.features && car.features.length > 0 && (
  <div className="mt-4">
    
    {/* Features Heading */}
  

    {/* Features Text */}
    <p className="text-[13px] leading-6 text-foreground/80 font-medium">
      {car.features.slice(0, 4).join(" • ")}
      
      {car.features.length > 4 && (
        <span className="text-primary font-semibold ml-1">
          +{car.features.length - 4} more
        </span>
      )}
    </p>
  </div>
)}
          
          <Link
            to="/booking"
            search={{ car: car.id }}
            className="group/btn mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition hover:bg-gradient-primary hover:text-primary-foreground"
          >
            Book this car <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </Tilt>
    </motion.div>
  );
}
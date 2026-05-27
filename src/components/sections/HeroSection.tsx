// src/components/HeroSection.tsx
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, Star, User, Phone, Calendar, Car, Briefcase, MapPin, ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import heroBg from "@/assets/temple-khatu-shyam1.jpg";
import { CARS, type Car as CarType, type APICar, transformAPICarToCar } from "@/data/cars";
import { API_ENDPOINTS } from "@/config/api/constants";

export function HeroSection() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarType[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    car: "",
    service: "",
    pickup: "",
  });

  // Fetch cars on mount
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoadingCars(true);
      
      // Fetch all cars from API
      const response = await axios.get(`${API_ENDPOINTS.CARS.BASE}?page=0&size=50`);
      
      let carsData: APICar[];
      if (response.data.content) {
        carsData = response.data.content;
      } else if (Array.isArray(response.data)) {
        carsData = response.data;
      } else {
        carsData = [];
      }
      
      if (carsData.length > 0) {
        const transformedCars = carsData.map(transformAPICarToCar);
        setCars(transformedCars);
      } else {
        // Fallback to static data
        setCars(CARS);
      }
    } catch (err) {
      console.error('Error fetching cars for hero:', err);
      // Fallback to static data
      setCars(CARS);
    } finally {
      setLoadingCars(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/booking", search: { car: form.car || undefined } });
  };

  // Prepare car options for select
  const carOptions = cars.map((c) => ({ value: c.id, label: c.name }));

  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroBg}
        alt="Highway sunset"
        className="absolute inset-0 -z-20 h-full w-full object-cover animate-kenburns"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 -z-10 bg-black/65" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-primary opacity-30 blur-3xl animate-glow-pulse" />
      <div className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-gradient-primary opacity-15 blur-3xl" />

<div className="container-x relative grid min-h-screen gap-8 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">        {/* Left: copy */}
        <div className="flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/50 bg-primary/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-primary backdrop-blur-sm"
          >
            <Star className="h-3.5 w-3.5 fill-primary" /> Trusted by 10,000+ Travellers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            Your Journey, <span className="text-gradient">Our Promise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-xl text-lg text-white/85 leading-relaxed"
          >
            Premium taxi service across India — verified drivers, well-maintained fleet, and
            transparent pricing. Experience comfort and reliability on every journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-105 hover:shadow-glow"
            >
              Book a Ride
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-primary hover:text-primary hover:bg-primary/10"
            >
              Explore Fleet
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-white/20 pt-6"
          >
            {[
              { icon: ShieldCheck, label: "Verified Drivers" },
              { icon: Clock, label: "24/7 Service" },
              { icon: Star, label: "4.9 Rated" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <f.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-white/80 sm:text-sm font-semibold">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: enquiry form */}
        {/* <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative rounded-3xl border border-white/10 bg-white/8 p-6 shadow-card backdrop-blur-2xl sm:p-8"
        >
          <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />

          <div className="text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/15 px-3 py-1 rounded-full">
              Quick Enquiry
            </span>
            <h3 className="mt-4 font-display text-2xl tracking-wide sm:text-3xl text-white">
              Any enquiry regarding <span className="text-gradient">taxi rides</span>
            </h3>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <HField 
              icon={User} 
              label="Name" 
              placeholder="Your Name"
              value={form.name} 
              onChange={(v) => setForm({ ...form, name: v })} 
              required 
            />
            <HField 
              icon={Phone} 
              label="Number" 
              type="tel" 
              placeholder="Your Number"
              value={form.phone} 
              onChange={(v) => setForm({ ...form, phone: v })} 
              required 
            />
            <HField 
              icon={Calendar} 
              label="Select Date" 
              type="date"
              value={form.date} 
              onChange={(v) => setForm({ ...form, date: v })} 
              required 
            />

            <HSelect 
              icon={loadingCars ? Loader2 : Car} 
              label="Car Type" 
              value={form.car}
              onChange={(v) => setForm({ ...form, car: v })} 
              required
              placeholder={loadingCars ? "Loading cars..." : "Select Car Type"}
              options={carOptions}
              disabled={loadingCars}
            />

            <HSelect 
              icon={Briefcase} 
              label="Service Type" 
              value={form.service}
              onChange={(v) => setForm({ ...form, service: v })} 
              required
              placeholder="Service Type"
              options={[
                { value: "oneway", label: "One Way" },
                { value: "roundtrip", label: "Round Trip" },
                { value: "local", label: "Local" },
                { value: "airport", label: "Airport Transfer" },
                { value: "wedding", label: "Wedding & Events" },
              ]} 
            />

            <HField 
              icon={MapPin} 
              label="Pick-Up Location" 
              placeholder="Pick-Up Location"
              value={form.pickup} 
              onChange={(v) => setForm({ ...form, pickup: v })} 
              required 
            />
          </div>

          <button
            type="submit"
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.02] hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingCars}
          >
            Submit Enquiry
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
          </button>
        </motion.form> */}
      </div>
    </section>
  );
}

function HField({
  icon: Icon, label, value, onChange, type = "text", required, placeholder,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-primary/90">
        {label}
      </label>
      <div className="relative group">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60 transition group-focus-within:text-primary" />
        <input
          type={type} value={value} required={required} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-white/8 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-primary/60 focus:bg-white/12 focus:ring-1 focus:ring-primary/30"
        />
      </div>
    </div>
  );
}

function HSelect({
  icon: Icon, label, value, onChange, options, required, placeholder, disabled,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean; placeholder?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-primary/90">
        {label}
      </label>
      <div className="relative group">
        <Icon className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60 transition group-focus-within:text-primary z-10 ${Icon === Loader2 ? 'animate-spin' : ''}`} />
        <select
          value={value} required={required} disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/20 bg-white/8 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-primary/60 focus:bg-white/12 focus:ring-1 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" disabled className="bg-gray-900 text-white">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-gray-900 text-white">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
      </div>
    </div>
  );
}
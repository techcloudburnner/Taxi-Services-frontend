// src/routes/index.tsx
import { useState, useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TourPackagesSection } from "@/components/sections/TourPackagesSection";
import { StatsMarqueeSection } from "@/components/sections/StatsMarqueeSection";
import { CarCard } from "@/components/fleet/CarCard";
import { CARS, type Car, type APICar, transformAPICarToCar } from "@/data/cars";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useCarTypes } from "@/hooks/useCarTypes";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Loader2, AlertCircle, Search, SlidersHorizontal } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sikar Taxi Service | Best Cab Service in Sikar Rajasthan — Rudra Banna" },
      { name: "description", content: "Rudra Banna Taxi — #1 Sikar taxi service & cab service in Sikar. Book taxi in Sikar for railway station, airport, outstation & local rides. 24/7 booking." },
      { property: "og:title", content: "Sikar Taxi Service | Rudra Banna Taxi" },
      { property: "og:description", content: "Best taxi & cab service in Sikar Rajasthan. Verified drivers, 24/7 booking, transparent pricing." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [displayCars, setDisplayCars] = useState<Car[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const { carTypes: apiCarTypes, loading: typesLoading } = useCarTypes();

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsingFallback(false);

      const response = await axios.get(`${API_ENDPOINTS.CARS.BASE}?page=0&size=50`);
      
      let carsData: APICar[] = [];
      if (response.data?.content) {
        carsData = response.data.content;
      } else if (Array.isArray(response.data)) {
        carsData = response.data;
      }
      
      if (carsData.length > 0) {
        const transformedCars = carsData
          .map(transformAPICarToCar)
          .filter(car => car && car.name);
        
        setAllCars(transformedCars);
        setDisplayCars(transformedCars.slice(0, 8)); // Show up to 8 on homepage
      } else {
        useFallback();
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
      useFallback();
    } finally {
      setLoading(false);
    }
  };

  const useFallback = () => {
    setUsingFallback(true);
    setAllCars(CARS);
    setDisplayCars(CARS.slice(0, 8));
  };

  // Get unique categories from cars
  const carCategories = useMemo(() => {
    const categories = [...new Set(allCars.map(car => car.category))];
    return categories.filter(Boolean);
  }, [allCars]);

  // Use API car types if available, otherwise use extracted categories
  const FILTERS = ["All", ...(apiCarTypes.length > 0 ? apiCarTypes : carCategories)];

  // Filter and search cars
  const filteredCars = useMemo(() => {
    let result = allCars;

    // Apply category filter
    if (filter !== "All") {
      result = result.filter(car => car.category === filter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(car => 
        car.name.toLowerCase().includes(query) ||
        car.category.toLowerCase().includes(query) ||
        car.features.some(f => f.toLowerCase().includes(query))
      );
    }

    return result;
  }, [allCars, filter, searchQuery]);

  // Update display cars when filter or search changes
  useEffect(() => {
    setDisplayCars(filteredCars.slice(0, 8));
  }, [filteredCars]);

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

  // Count cars per category for badge
  const getCategoryCount = (category: string) => {
    if (category === "All") return allCars.length;
    return allCars.filter(car => car.category === category).length;
  };

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsMarqueeSection />

      <section className="py-24 bg-gradient-to-b from-surface/30 to-background">
        <div className="container-x">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Fleet</span>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
                Pick your <span className="text-gradient">perfect ride</span>
              </h2>
              
            </div>
            <Link to="/fleet" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              View all <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Search Bar */}
          {!loading && allCars.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 relative max-w-md"
            >
             
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </motion.div>
          )}

          {/* Category Filters */}
          {!loading && FILTERS.length > 1 && (
            <LayoutGroup>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 flex flex-wrap gap-2 items-center"
              >
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-1" />
                {FILTERS.map((f) => {
                  const active = filter === f;
                  const count = getCategoryCount(f);
                  return (
                    <motion.button
                      key={f}
                      onClick={() => handleFilterChange(f)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 380, damping: 24 }}
                      className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        active
                          ? "border-transparent text-primary-foreground shadow-glow"
                          : "border-border text-foreground/70 hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="filter-pill-home"
                          className="absolute inset-0 -z-0 rounded-full bg-gradient-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {f}
                        {/* <span className={`text-xs ${active ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          ({count})
                        </span> */}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Cars Grid */}
              <motion.div
                layout
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {displayCars.length > 0 ? (
                    displayCars.map((c, i) => (
                      <motion.div
                        key={c.id}
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.92, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(6px)" }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <CarCard car={c} index={i} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full text-center py-16"
                    >
                      <div className="text-5xl mb-4">🔍</div>
                      <p className="text-lg text-foreground/70">
                        No cars found {filter !== "All" && `in "${filter}"`}
                        {searchQuery && ` matching "${searchQuery}"`}
                      </p>
                      <button
                        onClick={() => {
                          setFilter("All");
                          setSearchQuery("");
                        }}
                        className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition"
                      >
                        Clear Filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          )}

          {/* Loading State */}
          {loading && (
            <>
              <div className="mt-6 flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-muted" />
                ))}
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl border border-border bg-card">
                    <div className="aspect-[4/3] bg-muted rounded-t-2xl" />
                    <div className="p-5 space-y-3">
                      <div className="h-6 w-3/4 bg-muted rounded" />
                      <div className="h-4 w-1/2 bg-muted rounded" />
                      <div className="flex gap-3">
                        <div className="h-4 w-16 bg-muted rounded" />
                        <div className="h-4 w-16 bg-muted rounded" />
                      </div>
                      <div className="h-10 w-full bg-muted rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Error State */}
          {error && !loading && allCars.length === 0 && (
            <div className="mt-12 text-center py-16">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <p className="text-foreground/70 mb-4">{error}</p>
              <button
                onClick={fetchAllCars}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Fallback Indicator */}
          {usingFallback && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <span className="inline-flex items-center gap-2 text-xs text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                <AlertCircle className="h-3 w-3" />
                Showing default fleet
              </span>
            </motion.div>
          )}

          {/* View All Link */}
          {!loading && allCars.length > 8 && filter === "All" && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Showing 8 of {allCars.length} vehicles
              </p>
              <Link
                to="/fleet"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-105"
              >
                View All {allCars.length} Cars
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <TourPackagesSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
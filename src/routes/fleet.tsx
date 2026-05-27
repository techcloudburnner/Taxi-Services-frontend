// src/routes/fleet.tsx
import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { CarCard } from "@/components/fleet/CarCard";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { API_ENDPOINTS } from "@/config/api/constants";
import type { Car, APICar, APICarType } from "@/data/cars";
import { CARS, transformAPICarToCar } from "@/data/cars";
import { useCarTypes } from "@/hooks/useCarTypes"; // Import the hook

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Taxi Fleet in Sikar — Sedan, SUV & Innova | Rudra Banna Taxi" },
      { name: "description", content: "Cab service in Sikar with a wide fleet — Swift Dzire, Ertiga, Innova Crysta, Fortuner, Tempo Traveller. Best taxi service in Sikar Rajasthan." },
      { property: "og:title", content: "Taxi Fleet in Sikar — Rudra Banna Taxi" },
      { property: "og:description", content: "Pick from sedans, SUVs and Innovas for your Sikar taxi booking." },
      { property: "og:url", content: "/fleet" },
    ],
    links: [{ rel: "canonical", href: "/fleet" }],
  }),
  component: FleetPage,
});

function FleetPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [carTypes, setCarTypes] = useState<string[]>([]); // Add this state
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const { carTypes: apiCarTypes, loading: typesLoading } = useCarTypes();

  useEffect(() => {
    fetchFleetData();
  }, []);

  const fetchFleetData = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsingFallback(false);

      // Fetch cars from API
      const carsResponse = await axios.get(`${API_ENDPOINTS.CARS.BASE}?page=0&size=50`);
      
      let carsData: APICar[] = [];
      if (carsResponse.data?.content) {
        carsData = carsResponse.data.content;
      } else if (Array.isArray(carsResponse.data)) {
        carsData = carsResponse.data;
      }

      // Transform API cars
      const transformedCars = carsData.map(transformAPICarToCar);
      console.log('Fleet cars loaded:', transformedCars.length);

      if (transformedCars.length > 0) {
        setAllCars(transformedCars);
        setCars(transformedCars);
        
        // Extract unique categories from API data
        const categories = [...new Set(transformedCars.map(car => car.category))];
        setCarTypes(categories);
      } else {
        useFallbackData();
      }
    } catch (err) {
      console.error('Error fetching fleet data:', err);
      useFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const useFallbackData = () => {
    setUsingFallback(true);
    setAllCars(CARS);
    setCars(CARS);
    
    // Extract unique categories from static data
    const categories = [...new Set(CARS.map(car => car.category))];
    setCarTypes(categories);
  };

  const handleFilterChange = (category: string) => {
    setFilter(category);
    if (category === "All") {
      setCars(allCars);
    } else {
      setCars(allCars.filter(car => car.category === category));
    }
  };

  // Use API car types if available, otherwise use extracted categories
  const FILTERS = ["All", ...(apiCarTypes.length > 0 ? apiCarTypes : carTypes)];

  // Loading skeleton
  if (loading) {
    return (
      <div className="py-20">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Fleet</span>
            <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
              Choose your <span className="text-gradient">ride</span>
            </h1>
            <p className="mt-4 text-foreground/70">Loading our fleet...</p>
          </div>

          {/* Skeleton filters */}
          <div className="mt-10 flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-muted" />
            ))}
          </div>

          {/* Skeleton grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-border bg-card">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                  <div className="h-10 w-full bg-muted rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && allCars.length === 0) {
    return (
      <div className="py-20">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Fleet</span>
            <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
              Choose your <span className="text-gradient">ride</span>
            </h1>
          </div>
          <div className="mt-12 text-center py-20">
            <div className="text-6xl mb-4">🚗</div>
            <p className="text-xl text-foreground/70 mb-4">{error}</p>
            <button
              onClick={fetchFleetData}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Fleet</span>
          <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Choose your <span className="text-gradient">ride</span>
          </h1>
          <p className="mt-4 text-foreground/70">
            Every car in our fleet is well-maintained, sanitized and driven by verified professionals.
          </p>
          {usingFallback && (
            <p className="mt-2 text-sm text-yellow-600">
              Showing default fleet. Live data will load when available.
            </p>
          )}
        </motion.div>

        {FILTERS.length > 1 && (
          <LayoutGroup>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <motion.button
                    key={f}
                    onClick={() => handleFilterChange(f)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-transparent text-primary-foreground"
                        : "border-border text-foreground/80 hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 -z-0 rounded-full bg-gradient-primary shadow-glow"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{f}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            <motion.div
              layout
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {cars.length > 0 ? (
                  cars.map((c, i) => (
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
                      <CarCard car={c} index={0} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <p className="text-lg text-foreground/70">
                      No cars found in this category.
                    </p>
                    <button
                      onClick={() => handleFilterChange("All")}
                      className="mt-4 px-4 py-2 text-sm text-primary hover:underline"
                    >
                      Show all cars
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>
    </div>
  );
}
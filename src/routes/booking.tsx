// // src/routes/booking.tsx
// import { useState, useMemo, useEffect, useRef } from "react";
// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { motion, AnimatePresence } from "framer-motion";
// import { z } from "zod";
// import axios from "axios";
// import { MapPin, Calendar, User, Phone, Mail, ArrowRight, Check, Users, Loader2, ChevronDown, Car } from "lucide-react";
// import { API_ENDPOINTS } from "@/config/api/constants";
// import type { Car as CarType, APICar } from "@/data/cars";
// import { CARS, transformAPICarToCar } from "@/data/cars";
// import { BRAND } from "@/lib/constants";

// const searchSchema = z.object({
//   car: z.string().optional(),
// });

// export const Route = createFileRoute("/booking")({
//   validateSearch: searchSchema,
//   head: () => ({
//     meta: [
//       { title: "Cab Booking Sikar — Book Taxi in Sikar Online | Rudra Banna Taxi" },
//       { name: "description", content: "Cab booking in Sikar made simple — book taxi service in Sikar Rajasthan for outstation, airport & local trips. Instant confirmation, transparent pricing." },
//       { property: "og:title", content: "Book Taxi in Sikar — Rudra Banna Taxi" },
//       { property: "og:description", content: "Online cab booking for Sikar in under 2 minutes." },
//       { property: "og:url", content: "/booking" },
//     ],
//     links: [{ rel: "canonical", href: "/booking" }],
//   }),
//   component: BookingPage,
// });

// type TripType = "oneway" | "roundtrip" | "local";

// interface BookingFormData {
//   customerName: string;
//   customerPhone: string;
//   customerEmail?: string | null;
//   carId: number | null;
//   pickupLocation?: string | null;
//   dropLocation?: string | null;
//   pickupDate: string;
//   pickupTime: string;
//   passengerCount?: number | null;
//   specialNote?: string | null;
// }

// // Custom Scrollbar Styles
// const scrollbarStyles = `
//   .custom-scrollbar::-webkit-scrollbar {
//     width: 6px;
//   }
  
//   .custom-scrollbar::-webkit-scrollbar-track {
//     background: transparent;
//     border-radius: 10px;
//   }
  
//   .custom-scrollbar::-webkit-scrollbar-thumb {
//     background: rgba(0, 0, 0, 0.2);
//     border-radius: 10px;
//     transition: background 0.3s ease;
//   }
  
//   .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//     background: rgba(0, 0, 0, 0.35);
//   }
  
//   .custom-scrollbar {
//     scrollbar-width: thin;
//     scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
//     scroll-behavior: smooth;
//     -webkit-overflow-scrolling: touch;
//     overscroll-behavior: contain;
//   }
  
//   @media (prefers-color-scheme: dark) {
//     .custom-scrollbar::-webkit-scrollbar-thumb {
//       background: rgba(255, 255, 255, 0.2);
//     }
    
//     .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//       background: rgba(255, 255, 255, 0.35);
//     }
    
//     .custom-scrollbar {
//       scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
//     }
//   }
// `;

// // Custom Car Dropdown with Images
// function CarDropdown({
//   value,
//   onChange,
//   cars,
//   required,
// }: {
//   value: string;
//   onChange: (value: string) => void;
//   cars: CarType[];
//   required?: boolean;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<HTMLDivElement>(null);
  
//   const selectedCar = cars.find(c => c.id === value);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isOpen && selectedCar && listRef.current) {
//       const selectedElement = listRef.current.querySelector(`[data-car-id="${selectedCar.id}"]`);
//       if (selectedElement) {
//         selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
//       }
//     }
//   }, [isOpen, selectedCar]);

//   useEffect(() => {
//     if (!document.getElementById('custom-scrollbar-styles')) {
//       const styleSheet = document.createElement("style");
//       styleSheet.id = 'custom-scrollbar-styles';
//       styleSheet.textContent = scrollbarStyles;
//       document.head.appendChild(styleSheet);
//     }
//   }, []);

//   return (
//     <div>
//       <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
//         Choose Car {required && "*"}
//       </label>
//       <div className="relative" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full rounded-2xl border border-border/60 bg-card/70 py-3.5 pl-4 pr-10 text-sm text-foreground shadow-sm outline-none transition-all duration-300 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background text-left flex items-center gap-3 group"
//         >
//           {selectedCar ? (
//             <>
//               <img 
//                 src={selectedCar.image} 
//                 alt={selectedCar.name} 
//                 className="h-10 w-16 rounded-lg object-cover flex-shrink-0 transition-transform group-hover:scale-105"
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="text-sm font-semibold truncate">{selectedCar.name}</div>
//                 <div className="text-xs text-muted-foreground">
//                   {selectedCar.seats} seats · ₹{selectedCar.pricePerKm}/km
//                 </div>
//               </div>
//             </>
//           ) : (
//             <span className="text-muted-foreground/60">Select a car</span>
//           )}
//           <ChevronDown className={`h-4 w-4 text-primary flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:translate-y-0.5`} />
//         </button>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
//               animate={{ opacity: 1, y: 0, scaleY: 1 }}
//               exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
//               transition={{ duration: 0.2, ease: "easeOut" }}
//               className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden"
//               style={{ transformOrigin: 'top' }}
//             >
//               <div 
//                 ref={listRef}
//                 className="max-h-80 overflow-y-auto custom-scrollbar"
//                 style={{
//                   scrollBehavior: 'smooth',
//                   WebkitOverflowScrolling: 'touch',
//                 }}
//               >
//                 {cars.map((car, index) => (
//                   <motion.button
//                     key={car.id}
//                     data-car-id={car.id}
//                     type="button"
//                     onClick={() => {
//                       onChange(car.id);
//                       setIsOpen(false);
//                     }}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.03, duration: 0.2 }}
//                     className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-surface/80 active:bg-surface ${
//                       value === car.id ? 'bg-primary/10 border-l-2 border-primary shadow-sm' : 'border-l-2 border-transparent hover:border-primary/30'
//                     }`}
//                   >
//                     <div className="relative flex-shrink-0">
//                       <img 
//                         src={car.image} 
//                         alt={car.name} 
//                         className="h-12 w-20 rounded-lg object-cover transition-transform duration-200 hover:scale-105"
//                         loading="lazy"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="text-sm font-semibold truncate">{car.name}</div>
//                       <div className="text-xs text-muted-foreground flex items-center gap-2">
//                         <span>{car.seats} seats</span>
//                         <span>·</span>
//                         <span>₹{car.pricePerKm}/km</span>
//                       </div>
//                       {car.category && (
//                         <div className="text-xs text-primary/70 mt-0.5 font-medium">
//                           {car.category}
//                         </div>
//                       )}
//                     </div>
//                     {value === car.id && (
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                       >
//                         <Check className="h-5 w-5 text-primary flex-shrink-0" />
//                       </motion.div>
//                     )}
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// // Custom Dropdown Component (for Passengers)
// function CustomDropdown({
//   icon: Icon,
//   label,
//   value,
//   onChange,
//   options,
//   required,
//   placeholder = "Select...",
// }: {
//   icon?: React.ComponentType<{ className?: string }>;
//   label: string;
//   value: string | number;
//   onChange: (value: string) => void;
//   options: { value: string | number; label: string }[];
//   required?: boolean;
//   placeholder?: string;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<HTMLDivElement>(null);
  
//   const selectedOption = options.find(opt => opt.value === value);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isOpen && selectedOption && listRef.current) {
//       const selectedElement = listRef.current.querySelector(`[data-option-value="${selectedOption.value}"]`);
//       if (selectedElement) {
//         selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
//       }
//     }
//   }, [isOpen, selectedOption]);

//   useEffect(() => {
//     if (!document.getElementById('custom-scrollbar-styles')) {
//       const styleSheet = document.createElement("style");
//       styleSheet.id = 'custom-scrollbar-styles';
//       styleSheet.textContent = scrollbarStyles;
//       document.head.appendChild(styleSheet);
//     }
//   }, []);

//   return (
//     <div>
//       <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
//         {label}
//       </label>
//       <div className="relative" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full rounded-2xl border border-border/60 bg-card/70 py-3.5 pl-4 pr-10 text-sm text-foreground shadow-sm outline-none transition-all duration-300 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background text-left flex items-center gap-3 group"
//         >
//           {Icon && <Icon className="h-4 w-4 text-primary flex-shrink-0" />}
//           <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground/60'}>
//             {selectedOption ? selectedOption.label : placeholder}
//           </span>
//           <ChevronDown className={`h-4 w-4 text-primary flex-shrink-0 ml-auto transition-all duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:translate-y-0.5`} />
//         </button>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
//               animate={{ opacity: 1, y: 0, scaleY: 1 }}
//               exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
//               transition={{ duration: 0.2, ease: "easeOut" }}
//               className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden"
//               style={{ transformOrigin: 'top' }}
//             >
//               <div 
//                 ref={listRef}
//                 className="max-h-60 overflow-y-auto custom-scrollbar"
//                 style={{
//                   scrollBehavior: 'smooth',
//                   WebkitOverflowScrolling: 'touch',
//                 }}
//               >
//                 {options.map((option, index) => (
//                   <motion.button
//                     key={option.value}
//                     data-option-value={option.value}
//                     type="button"
//                     onClick={() => {
//                       onChange(String(option.value));
//                       setIsOpen(false);
//                     }}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.02, duration: 0.2 }}
//                     className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-surface/80 active:bg-surface ${
//                       value === option.value ? 'bg-primary/10 border-l-2 border-primary shadow-sm' : 'border-l-2 border-transparent hover:border-primary/30'
//                     }`}
//                   >
//                     {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
//                     <span className="text-sm">{option.label}</span>
//                     {value === option.value && (
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                         className="ml-auto"
//                       >
//                         <Check className="h-4 w-4 text-primary" />
//                       </motion.div>
//                     )}
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// // Floating Label Input Component
// function FloatingField({
//   icon: Icon,
//   label,
//   value,
//   onChange,
//   type = "text",
//   required,
//   className,
//   placeholder,
// }: {
//   icon: React.ComponentType<{ className?: string }>;
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   type?: string;
//   required?: boolean;
//   className?: string;
//   placeholder?: string;
// }) {
//   const [isFocused, setIsFocused] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const isActive = isFocused || value.length > 0;

//   return (
//     <div className={className}>
//       <div className="group relative">
//         {/* Floating Label */}
//         <label
//           className={`
//             pointer-events-none absolute left-11 z-10
//             transition-all duration-200 ease-out
//             ${isActive 
//               ? '-top-2.5 text-[10px] font-semibold text-primary bg-card px-1.5 rounded-md' 
//               : 'top-3.5 text-sm text-muted-foreground/60'
//             }
//           `}
//         >
//           {label}
//         </label>

//         {/* Icon */}
//         <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary transition-colors group-focus-within:text-primary z-10" />

//         {/* Input */}
//         <input
//           ref={inputRef}
//           type={type}
//           value={value}
//           required={required}
//           placeholder={isActive ? placeholder : ""}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           onChange={(e) => onChange(e.target.value)}
//           className="
//             w-full rounded-2xl
//             border border-border/60
//             bg-card/70
//             py-3.5 pl-11 pr-4
//             text-sm text-foreground
//             shadow-sm
//             outline-none
//             transition-all duration-300

//             placeholder:text-muted-foreground/40

//             hover:border-primary/40
//             focus:border-primary
//             focus:ring-4 focus:ring-primary/10
//             focus:bg-background
//           "
//         />
//       </div>
//     </div>
//   );
// }

// function BookingPage() {
//   const { car: preselected } = Route.useSearch();
//   const navigate = useNavigate();
  
//   const [cars, setCars] = useState<CarType[]>([]);
//   const [apiCars, setApiCars] = useState<APICar[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
//   const [tripType, setTripType] = useState<TripType>("oneway");
//   const [carId, setCarId] = useState(preselected ?? "");
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     pickup: "",
//     drop: "",
//     date: "",
//     time: "",
//     km: 100,
//     passengers: 2,
//     note: "",
//   });

//   useEffect(() => {
//     fetchCars();
//   }, []);


//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       let carsData: APICar[] = [];
      
//       const endpoints = [
//         `${API_ENDPOINTS.CARS.BASE}?page=0&size=50`,
//         API_ENDPOINTS.CARS.FEATURED,
//         `${API_ENDPOINTS.CARS.BASE}?page=0&size=10`,
//       ];
      
//       for (const endpoint of endpoints) {
//         try {
//           console.log('Trying endpoint:', endpoint);
//           const response = await axios.get(endpoint);
          
//           if (response.data.content) {
//             carsData = response.data.content;
//           } else if (Array.isArray(response.data)) {
//             carsData = response.data;
//           }
          
//           if (carsData.length > 0) {
//             console.log(`Success! Got ${carsData.length} cars from ${endpoint}`);
//             break;
//           }
//         } catch (err) {
//           console.warn(`Failed to fetch from ${endpoint}:`, err);
//           continue;
//         }
//       }
      
//       if (carsData.length > 0) {
//         setApiCars(carsData);
//         const transformedCars = carsData.map(transformAPICarToCar);
//         setCars(transformedCars);
        
//         if (!preselected || !transformedCars.find(c => c.id === preselected)) {
//           setCarId(transformedCars[0].id);
//         } else {
//           setCarId(preselected);
//         }
//       } else {
//         console.log('No cars from API, using static data');
//         setCars(CARS);
//         setCarId(preselected || CARS[0].id);
//       }
//     } catch (err) {
//       console.error('Error fetching cars:', err);
//       setCars(CARS);
//       setCarId(preselected || CARS[0].id);
//     } finally {
//       setLoading(false);
//     }
//   };

 
//   const car = useMemo(() => {
//     return cars.find((c) => c.id === carId) || cars[0];
//   }, [carId, cars]);

//   const estimate = useMemo(() => {
//     if (!car) return 0;
//     const baseEstimate = car.pricePerKm * form.km;
//     const minEstimate = car.pricePerKm * 50;
//     return Math.max(baseEstimate, minEstimate);
//   }, [car, form.km]);

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate
//     if (!car) { setError("Please select a car"); return; }
//     if (!form.name.trim()) { setError("Please enter your full name"); return; }
//     if (!form.phone.trim()) { setError("Please enter your phone number"); return; }
//     if (!form.pickup.trim()) { setError("Please enter pickup location"); return; }
//     if (!form.drop.trim()) { setError("Please enter drop location"); return; }
//     if (!form.date) { setError("Please select pickup date"); return; }
//     if (!form.time) { setError("Please select pickup time"); return; }

//     setSubmitting(true);
//     setError(null);

//     try {
//       // Prepare booking details FIRST (before API call)
//       const bookingDetails = {
//         bookingId: `BOOK-${Date.now()}`,
//         bookingNumber: `REF-${Date.now()}`,
//         carName: car?.name || 'Selected Car',
//         customerName: form.name.trim(),
//         customerPhone: form.phone.trim(),
//         customerEmail: form.email.trim() || '',
//         pickupLocation: form.pickup.trim(),
//         dropLocation: form.drop.trim(),
//         pickupDate: form.date,
//         pickupTime: form.time,
//         passengerCount: form.passengers,
//         tripType: tripType,
//         estimate: estimate,
//         timestamp: new Date().toISOString(),
//       };

//       // Try API call
//       try {
//         const selectedCarSlug = car.id;
//         const apiCar = apiCars.find(c => c.slug === selectedCarSlug);
//         const actualCarId = apiCar?.carId || null;

//         const formattedTime = form.time.includes(':') 
//           ? (form.time.split(':').length === 2 ? `${form.time}:00` : form.time)
//           : form.time;

//         const bookingData: BookingFormData = {
//           customerName: form.name.trim(),
//           customerPhone: form.phone.trim(),
//           customerEmail: form.email.trim() || null,
//           carId: actualCarId,
//           pickupLocation: form.pickup.trim() || null,
//           dropLocation: form.drop.trim() || null,
//           pickupDate: form.date,
//           pickupTime: formattedTime,
//           passengerCount: form.passengers || 1,
//           specialNote: `Trip Type: ${tripType}, Approx Distance: ${form.km}km${form.note ? ', Note: ' + form.note : ''}`,
//         };

//         const response = await axios.post(API_ENDPOINTS.BOOKINGS.BASE, bookingData, {
//           timeout: 10000,
//           headers: { 'Content-Type': 'application/json' }
//         });
        
//         // Update with real booking IDs if API succeeds
//         if (response.data) {
//           bookingDetails.bookingId = response.data.bookingId || bookingDetails.bookingId;
//           bookingDetails.bookingNumber = response.data.bookingNumber || bookingDetails.bookingNumber;
//           bookingDetails.carName = response.data.carName || bookingDetails.carName;
//         }
//       } catch (apiError) {
//         console.warn('API call failed, using local reference:', apiError);
//         // Continue with local booking reference
//       }

//       // ALWAYS store in sessionStorage and redirect
//       sessionStorage.setItem('lastBookingDetails', JSON.stringify(bookingDetails));
      
//       setSuccessMessage("Booking confirmed! Redirecting...");
      
//       // Force navigation after short delay
//       setTimeout(() => {
//         navigate({ to: "/booking/confirm" });
//       }, 1000);

//     } catch (err: any) {
//       console.error('Booking error:', err);
//       setError("Something went wrong. Please try again or call us directly.");
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   if (loading) {
//     return (
//       <div className="py-20">
//         <div className="container-x">
//           <div className="max-w-2xl">
//             <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Booking</span>
//             <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
//               Plan your <span className="text-gradient">journey</span>
//             </h1>
//           </div>
//           <div className="mt-12 flex justify-center items-center min-h-[400px]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
//               <p className="mt-4 text-foreground/70">Loading available cars...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!car && !loading) {
//     return (
//       <div className="py-20">
//         <div className="container-x">
//           <div className="text-center py-20">
//             <p className="text-xl text-foreground/70">No cars available for booking at the moment.</p>
//             <button onClick={fetchCars} className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-full">
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-20">
//       <div className="container-x">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
//           <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Booking</span>
//           <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
//             Plan your <span className="text-gradient">journey</span>
//           </h1>
//         </motion.div>

//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2"
//           >
//             <Check className="h-5 w-5 flex-shrink-0" />
//             <span>{successMessage}</span>
//           </motion.div>
//         )}

//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-2">
//               <span className="text-lg">⚠️</span>
//               <span>{error}</span>
//             </div>
//             <button onClick={() => setError(null)} className="ml-2 underline text-sm hover:no-underline">
//               Dismiss
//             </button>
//           </motion.div>
//         )}

//         <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
//           <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
//             <div className="flex flex-wrap gap-2 mb-6">
//               {(["oneway", "roundtrip", "local"] as TripType[]).map((t) => (
//                 <button type="button" key={t} onClick={() => setTripType(t)}
//                   className={`rounded-full border px-5 py-2 text-sm font-medium capitalize transition ${
//                     tripType === t ? "border-primary bg-gradient-primary text-primary-foreground" : "border-border text-foreground/80 hover:border-primary/50"
//                   }`}>
//                   {t === "oneway" ? "One Way" : t === "roundtrip" ? "Round Trip" : "Local"}
//                 </button>
//               ))}
//             </div>

//             {/* Form Fields with Floating Labels & Placeholders */}
//             <div className="grid gap-5 sm:grid-cols-2">
//               <FloatingField 
//                 icon={User} 
//                 label="Full Name *" 
//                 placeholder="Enter your full name"
//                 value={form.name} 
//                 onChange={(v) => setForm({ ...form, name: v })} 
//                 required 
//               />
//               <FloatingField 
//                 icon={Phone} 
//                 label="Contact Number *" 
//                 placeholder="Enter your contact number"
//                 type="tel" 
//                 value={form.phone} 
//                 onChange={(v) => setForm({ ...form, phone: v })} 
//                 required 
//               />
//               <FloatingField 
//                 icon={Mail} 
//                 label="Email Address" 
//                 placeholder="Enter your email address"
//                 type="email" 
//                 value={form.email} 
//                 onChange={(v) => setForm({ ...form, email: v })} 
//                 className="sm:col-span-2" 
//               />
//               <FloatingField 
//                 icon={MapPin} 
//                 label="Pickup Location *" 
//                 placeholder="Enter pickup location"
//                 value={form.pickup} 
//                 onChange={(v) => setForm({ ...form, pickup: v })} 
//                 required 
//               />
//               <FloatingField 
//                 icon={MapPin} 
//                 label="Drop Location *" 
//                 placeholder="Enter drop location"
//                 value={form.drop} 
//                 onChange={(v) => setForm({ ...form, drop: v })} 
//                 required 
//               />
//               <FloatingField 
//                 icon={Calendar} 
//                 label="Pickup Date *" 
//                 // placeholder="Select pickup date"
//                 type="date" 
//                 value={form.date} 
//                 onChange={(v) => setForm({ ...form, date: v })} 
//                 required 
//               />
//               <FloatingField 
//                 icon={Calendar} 
//                 label="Pickup Time *" 
//                 placeholder="Select pickup time"
//                 type="time" 
//                 value={form.time} 
//                 onChange={(v) => setForm({ ...form, time: v })} 
//                 required 
//               />
              
//               <CustomDropdown
//                 icon={Users}
//                 label="Passengers"
//                 value={form.passengers}
//                 onChange={(v) => setForm({ ...form, passengers: Number(v) })}
//                 options={[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => ({
//                   value: n,
//                   label: `${n} Passenger${n !== 1 ? 's' : ''}`
//                 }))}
//                 placeholder="Select passengers"
//               />

//               <CarDropdown
//                 value={carId}
//                 onChange={setCarId}
//                 cars={cars}
//                 required
//               />

//               <div className="sm:col-span-2">
//                 <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
//                   Special Notes
//                 </label>
//                 <textarea
//                   value={form.note}
//                   onChange={(e) => setForm({ ...form, note: e.target.value })}
//                   placeholder="Any special requirements, flight/train details, hotel name etc."
//                   rows={3}
//                   className="w-full rounded-2xl border border-border/60 bg-card/70 p-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 shadow-sm outline-none transition-all duration-300 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background resize-none"
//                 />
//               </div>
//             </div>

//             <button 
//               type="submit" 
//               disabled={submitting || !car}
//               className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//             >
//               {submitting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   Book Now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
//                 </>
//               )}
//             </button>
//           </form>

//           <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card sm:sticky sm:top-24">
//             <div className="overflow-hidden rounded-xl">
//               <img src={car?.image} alt={car?.name} className="aspect-[4/3] w-full object-cover" />
//             </div>
//             <h3 className="mt-4 font-display text-2xl tracking-wide">{car?.name}</h3>
//             <div className="mt-1 text-xs uppercase tracking-widest text-primary">{car?.category}</div>
//             <ul className="mt-4 space-y-2 text-sm text-foreground/80">
//               {car?.features.map((f) => (
//                 <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> {f}</li>
//               ))}
//             </ul>
//             <div className="mt-6 rounded-2xl bg-surface p-4">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">Rate</span>
//                 <span className="font-medium">₹{car?.pricePerKm} / km</span>
//               </div>
//               <div className="mt-2 flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">Distance</span>
//                 <span className="font-medium">{form.km} km</span>
//               </div>
//               <div className="mt-3 border-t border-border pt-3 flex items-center justify-between">
//                 <span className="font-display text-lg">Estimate</span>
//                 <span className="font-display text-2xl text-gradient">₹{estimate.toLocaleString("en-IN")}</span>
//               </div>
//               <p className="mt-2 text-[11px] text-muted-foreground">+ tolls, parking, state-tax at actuals</p>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/routes/booking.tsx
import { useState, useMemo, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import axios from "axios";
import { MapPin, Calendar, User, Phone, Mail, ArrowRight, Check, Users, Loader2, ChevronDown, Download, CheckCircle2, FileText } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api/constants";
import type { Car as CarType, APICar } from "@/data/cars";
import { CARS, transformAPICarToCar } from "@/data/cars";
import { BRAND } from "@/lib/constants";

const searchSchema = z.object({
  car: z.string().optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Cab Booking Sikar — Book Taxi in Sikar Online | Rudra Banna Taxi" },
      { name: "description", content: "Cab booking in Sikar made simple." },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: BookingPage,
});

type TripType = "oneway" | "roundtrip" | "local";

// Booking details interface
interface BookingDetails {
  bookingId: string;
  bookingNumber: string;
  carName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengerCount: number;
  tripType: string;
  estimate: number;
  timestamp: string;
}

// Scrollbar styles (keeping your existing)
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.35); }
  .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.2) transparent; }
`;

// ===== SUB-COMPONENTS (Keep your existing ones) =====

function CarDropdown({ value, onChange, cars, required }: { value: string; onChange: (v: string) => void; cars: CarType[]; required?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCar = cars.find(c => c.id === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Choose Car {required && "*"}</label>
      <div className="relative" ref={dropdownRef}>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full rounded-2xl border border-border/60 bg-card/70 py-3.5 pl-4 pr-10 text-sm outline-none hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 flex items-center gap-3">
          {selectedCar ? (
            <>
              <img src={selectedCar.image} alt={selectedCar.name} className="h-10 w-16 rounded-lg object-cover" />
              <div className="flex-1 text-left">
                <div className="font-semibold">{selectedCar.name}</div>
                <div className="text-xs text-muted-foreground">{selectedCar.seats} seats · ₹{selectedCar.pricePerKm}/km</div>
              </div>
            </>
          ) : <span className="text-muted-foreground/60">Select a car</span>}
          <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 mt-2 w-full rounded-xl border bg-card shadow-lg overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                {cars.map((car) => (
                  <button key={car.id} type="button" onClick={() => { onChange(car.id); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-surface/80 ${value === car.id ? 'bg-primary/10 border-l-2 border-primary' : ''}`}>
                    <img src={car.image} alt={car.name} className="h-12 w-20 rounded-lg object-cover" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{car.name}</div>
                      <div className="text-xs text-muted-foreground">{car.seats} seats · ₹{car.pricePerKm}/km</div>
                    </div>
                    {value === car.id && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CustomDropdown({ icon: Icon, label, value, onChange, options, placeholder = "Select..." }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt: any) => opt.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      <div className="relative" ref={dropdownRef}>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full rounded-2xl border border-border/60 bg-card/70 py-3.5 pl-4 pr-10 text-sm outline-none hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          <span className={selectedOption ? '' : 'text-muted-foreground/60'}>{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown className={`h-4 w-4 ml-auto transition ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 mt-2 w-full rounded-xl border bg-card shadow-lg overflow-hidden">
              <div className="max-h-60 overflow-y-auto">
                {options.map((option: any) => (
                  <button key={option.value} type="button" onClick={() => { onChange(String(option.value)); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-surface/80 ${value === option.value ? 'bg-primary/10 border-l-2 border-primary' : ''}`}>
                    {Icon && <Icon className="h-4 w-4" />}
                    <span className="text-sm">{option.label}</span>
                    {value === option.value && <Check className="h-4 w-4 text-primary ml-auto" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FloatingField({ icon: Icon, label, value, onChange, type = "text", required, className }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className={className}>
      <div className="group relative">
        <label className={`pointer-events-none absolute left-11 z-10 transition-all duration-200 ${isActive ? '-top-2.5 text-[10px] font-semibold text-primary bg-card px-1.5 rounded-md' : 'top-3.5 text-sm text-muted-foreground/60'}`}>{label}</label>
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary z-10" />
        <input type={type} value={value} required={required} placeholder={isActive ? `Enter ${label.toLowerCase().replace(' *', '')}` : ""} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-border/60 bg-card/70 py-3.5 pl-11 pr-4 text-sm outline-none hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background" />
      </div>
    </div>
  );
}

// ===== PDF DOWNLOAD FUNCTION =====
function generatePDFReceipt(booking: BookingDetails): string {
  const pickupDateFormatted = new Date(booking.pickupDate).toLocaleDateString('en-IN', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });
  
  const bookedDate = new Date(booking.timestamp).toLocaleString('en-IN');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Booking Receipt - ${BRAND.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
      background: #f0f2f5; 
      padding: 30px 20px; 
      color: #1a1a2e;
    }
    .receipt {
      max-width: 650px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      padding: 35px 30px;
      text-align: center;
      position: relative;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
    }
    .brand-name {
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      opacity: 0.9;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin: 8px 0;
    }
    .status-badge {
      display: inline-block;
      background: rgba(255,255,255,0.25);
      padding: 6px 20px;
      border-radius: 25px;
      font-size: 13px;
      font-weight: 500;
      backdrop-filter: blur(10px);
    }
    .content {
      padding: 40px 30px 30px;
    }
    .ref-section {
      background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
      border: 2px solid #fed7aa;
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ref-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #9a3412;
      font-weight: 600;
    }
    .ref-value {
      font-size: 20px;
      font-weight: 700;
      color: #ea580c;
      margin-top: 4px;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #ea580c;
      font-weight: 700;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 3px solid #fed7aa;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .info-item {
      padding: 12px 15px;
      background: #fafafa;
      border-radius: 10px;
      border: 1px solid #f0f0f0;
    }
    .info-item .label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #888;
      margin-bottom: 5px;
    }
    .info-item .value {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a2e;
    }
    .info-item.full-width {
      grid-column: 1 / -1;
    }
    .fare-box {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      padding: 22px 25px;
      border-radius: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    .fare-label {
      font-size: 15px;
      font-weight: 500;
      opacity: 0.95;
    }
    .fare-amount {
      font-size: 32px;
      font-weight: 700;
    }
    .disclaimer {
      text-align: center;
      font-size: 11px;
      color: #999;
      margin-top: 8px;
    }
    .alert-box {
      background: #fffbeb;
      border: 2px solid #fcd34d;
      border-radius: 12px;
      padding: 16px 20px;
      margin-top: 20px;
      text-align: center;
    }
    .alert-box .alert-title {
      font-weight: 700;
      color: #92400e;
      font-size: 13px;
      margin-bottom: 4px;
    }
    .alert-box .alert-text {
      font-size: 12px;
      color: #a16207;
    }
    .footer {
      background: #fafafa;
      padding: 20px 30px;
      text-align: center;
      border-top: 1px solid  #eee;
    }
    .footer .company {
      font-weight: 700;
      color: #1a1a2e;
      font-size: 14px;
    }
    .footer .contact {
      font-size: 12px;
      color: #888;
      margin-top: 4px;
    }
    @media print {
      body { background: white; padding: 0; }
      .receipt { box-shadow: none; border-radius: 0; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div class="brand-name">${BRAND.name}</div>
      <h1>Booking Receipt</h1>
     
    </div>
    
    <div class="content">
      <div class="ref-section">
        <div>
          <div class="ref-label">Booking Reference</div>
          <div class="ref-value">#${booking.bookingNumber}</div>
        </div>
        <div style="text-align:right;">
          <div class="ref-label">Booked On</div>
          <div style="font-weight:600;color:#333;font-size:13px;">${bookedDate}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">👤 Customer Information</div>
        <div class="info-grid">
          <div class="info-item full-width">
            <div class="label">Full Name</div>
            <div class="value">${booking.customerName}</div>
          </div>
          <div class="info-item">
            <div class="label">Phone Number</div>
            <div class="value">${booking.customerPhone}</div>
          </div>
          <div class="info-item">
            <div class="label">Email</div>
            <div class="value">${booking.customerEmail || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="label">Trip Type</div>
            <div class="value">${booking.tripType.charAt(0).toUpperCase() + booking.tripType.slice(1)}</div>
          </div>
          <div class="info-item">
            <div class="label">Passengers</div>
            <div class="value">${booking.passengerCount} Person(s)</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🚗 Trip Details</div>
        <div class="info-grid">
          <div class="info-item full-width">
            <div class="label">Vehicle</div>
            <div class="value">${booking.carName}</div>
          </div>
          <div class="info-item">
            <div class="label">Pickup Location</div>
            <div class="value">${booking.pickupLocation}</div>
          </div>
          <div class="info-item">
            <div class="label">Drop Location</div>
            <div class="value">${booking.dropLocation}</div>
          </div>
          <div class="info-item">
            <div class="label">Pickup Date</div>
            <div class="value">${pickupDateFormatted}</div>
          </div>
          <div class="info-item">
            <div class="label">Pickup Time</div>
            <div class="value">${booking.pickupTime}</div>
          </div>
        </div>
      </div>

    
      <div class="disclaimer">* Excluding tolls, parking & applicable taxes</div>

      <div class="alert-box">
        <div class="alert-title">📞 Important Information</div>
        <div class="alert-text">Our team will call you within 5 minutes to confirm your booking. For immediate assistance, call ${BRAND.phone}</div>
      </div>
    </div>

    <div class="footer">
      <div class="company">${BRAND.name}</div>
      <div class="contact">📞 ${BRAND.phone}</div>
      <div class="contact" style="margin-top:8px;">Thank you for choosing us! Have a safe journey.</div>
    </div>
  </div>
</body>
</html>`;
}

// ===== MAIN BOOKING PAGE COMPONENT =====
function BookingPage() {
  const { car: preselected } = Route.useSearch();
  
  const [cars, setCars] = useState<CarType[]>([]);
  const [apiCars, setApiCars] = useState<APICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // NEW: Booking confirmation state
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [tripType, setTripType] = useState<TripType>("oneway");
  const [carId, setCarId] = useState(preselected ?? "");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", pickup: "", drop: "", 
    date: "", time: "", km: 100, passengers: 2, note: "",
  });

  useEffect(() => { fetchCars(); }, []);
   const fetchCars = async () => {
    try {
      setLoading(true);
      let carsData: APICar[] = [];
      try {
        const response = await axios.get(`${API_ENDPOINTS.CARS.BASE}?page=0&size=50`);
        if (response.data.content) carsData = response.data.content;
        else if (Array.isArray(response.data)) carsData = response.data;
      } catch (err) { console.warn('API fetch failed, using static data'); }
      
      if (carsData.length > 0) {
        setApiCars(carsData);
        // ✅ Transform AND filter ONLY ACTIVE cars
        const transformed = carsData
          .map(transformAPICarToCar)
          .filter(car => car.status && car.status.toLowerCase() === "active");
        setCars(transformed);
        setCarId(preselected && transformed.find(c => c.id === preselected) ? preselected : transformed[0]?.id || "");
      } else {
        // ✅ Filter static data too
        const activeStaticCars = CARS.filter(car => car.status && car.status.toLowerCase() === "active");
        const carsToUse = activeStaticCars.length > 0 ? activeStaticCars : CARS;
        setCars(carsToUse);
        setCarId(preselected || carsToUse[0]?.id || "");
      }
    } catch (err) {
      const activeStaticCars = CARS.filter(car => car.status && car.status.toLowerCase() === "active");
      const carsToUse = activeStaticCars.length > 0 ? activeStaticCars : CARS;
      setCars(carsToUse);
      setCarId(preselected || carsToUse[0]?.id || "");
    } finally { setLoading(false); }
  };

  // const fetchCars = async () => {
  //   try {
  //     setLoading(true);
  //     let carsData: APICar[] = [];
  //     try {
  //       const response = await axios.get(`${API_ENDPOINTS.CARS.BASE}?page=0&size=50`);
  //       if (response.data.content) carsData = response.data.content;
  //       else if (Array.isArray(response.data)) carsData = response.data;
  //     } catch (err) { console.warn('API fetch failed, using static data'); }
      
  //     if (carsData.length > 0) {
  //       setApiCars(carsData);
  //       const transformed = carsData.map(transformAPICarToCar);
  //       setCars(transformed);
  //       setCarId(preselected && transformed.find(c => c.id === preselected) ? preselected : transformed[0]?.id || "");
  //     } else {
  //       setCars(CARS);
  //       setCarId(preselected || CARS[0]?.id || "");
  //     }
  //   } catch (err) {
  //     setCars(CARS);
  //     setCarId(preselected || CARS[0]?.id || "");
  //   } finally { setLoading(false); }
  // };

  const car = useMemo(() => cars.find((c) => c.id === carId) || cars[0], [carId, cars]);
  const estimate = useMemo(() => car ? Math.max(car.pricePerKm * form.km, car.pricePerKm * 50) : 0, [car, form.km]);

  // NEW: Handle PDF Download
  const handleDownloadPDF = () => {
    if (!confirmedBooking) return;
    setIsDownloading(true);
    
    try {
      const receiptHTML = generatePDFReceipt(confirmedBooking);
      const blob = new Blob([receiptHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Download as HTML file (can be opened in browser and printed as PDF)
      const link = document.createElement('a');
      link.href = url;
      link.download = `RudraBanna-Booking-${confirmedBooking.bookingNumber}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Also open in new tab for immediate viewing/printing
      setTimeout(() => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(receiptHTML);
          printWindow.document.close();
          // Auto-trigger print dialog
          setTimeout(() => printWindow.print(), 500);
        }
      }, 300);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // NEW: Handle new booking (reset form)
  const handleNewBooking = () => {
    setBookingConfirmed(false);
    setConfirmedBooking(null);
    setForm({
      name: "", phone: "", email: "", pickup: "", drop: "",
      date: "", time: "", km: 100, passengers: 2, note: "",
    });
    setTripType("oneway");
    setError(null);
  };

  // UPDATED: Submit booking - shows confirmation on same page
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!car) { setError("Please select a car"); return; }
    if (!form.name.trim()) { setError("Please enter your full name"); return; }
    if (!form.phone.trim()) { setError("Please enter your phone number"); return; }
    if (!form.pickup.trim()) { setError("Please enter pickup location"); return; }
    if (!form.drop.trim()) { setError("Please enter drop location"); return; }
    if (!form.date) { setError("Please select pickup date"); return; }
    if (!form.time) { setError("Please select pickup time"); return; }

    setSubmitting(true);
    setError(null);

    // Create booking details
    const bookingDetails: BookingDetails = {
      bookingId: `BOOK-${Date.now()}`,
      bookingNumber: `RBT-${Math.floor(Math.random() * 90000) + 10000}`,
      carName: car.name,
      customerName: form.name.trim(),
      customerPhone: form.phone.trim(),
      customerEmail: form.email.trim(),
      pickupLocation: form.pickup.trim(),
      dropLocation: form.drop.trim(),
      pickupDate: form.date,
      pickupTime: form.time,
      passengerCount: form.passengers,
      tripType: tripType,
      estimate: estimate,
      timestamp: new Date().toISOString(),
    };

    // Try API call in background
    try {
      const apiCar = apiCars.find(c => c.slug === car.id);
      const formattedTime = form.time.includes(':') && form.time.split(':').length === 2 
        ? `${form.time}:00` : form.time;

      const response = await axios.post(API_ENDPOINTS.BOOKINGS.BASE, {
        customerName: form.name.trim(),
        customerPhone: form.phone.trim(),
        customerEmail: form.email.trim() || null,
        carId: apiCar?.carId || null,
        pickupLocation: form.pickup.trim(),
        dropLocation: form.drop.trim(),
        pickupDate: form.date,
        pickupTime: formattedTime,
        passengerCount: form.passengers,
        specialNote: `Trip: ${tripType}${form.note ? ', ' + form.note : ''}`,
      }, { timeout: 8000 });
      
      if (response.data) {
        bookingDetails.bookingId = response.data.bookingId || bookingDetails.bookingId;
        bookingDetails.bookingNumber = response.data.bookingNumber || bookingDetails.bookingNumber;
      }
    } catch (apiError) {
      console.warn('API call failed, using local reference');
    }

    // Store in sessionStorage
    sessionStorage.setItem('lastBookingDetails', JSON.stringify(bookingDetails));

    // Show confirmation on SAME PAGE
    setConfirmedBooking(bookingDetails);
    setBookingConfirmed(true);
    setSubmitting(false);

    // Scroll to top to show confirmation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-20">
        <div className="container-x text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-foreground/70">Loading available cars...</p>
        </div>
      </div>
    );
  }

  // ===== BOOKING CONFIRMATION VIEW (SAME PAGE) =====
  if (bookingConfirmed && confirmedBooking) {
    return (
      <div className="py-20">
        <div className="container-x">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            {/* Success Header */}
            <div className="text-center mb-10">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mx-auto mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
              >
                <CheckCircle2 className="h-14 w-14 text-green-600" />
              </motion.div>
              
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight">
                Booking <span className="text-gradient">STATUS!</span>
              </h1>
              <p className="mt-3 text-foreground/70 max-w-md mx-auto">
                Thank you for choosing {BRAND.name}. Your booking has been received successfully.
              </p>
            </div>

            {/* Booking Reference Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 mb-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-700">Booking Reference</p>
                  <p className="text-2xl font-bold text-primary mt-1">#{confirmedBooking.bookingNumber}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-4">
                📞 Our team will call you at {confirmedBooking.customerPhone} within 5 minutes
              </p>
            </motion.div>

            {/* Booking Details Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Trip Details
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Vehicle</p>
                  <p className="font-semibold mt-1">{confirmedBooking.carName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Trip Type</p>
                  <p className="font-semibold mt-1 capitalize">{confirmedBooking.tripType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Pickup Location</p>
                  <p className="font-semibold mt-1">{confirmedBooking.pickupLocation}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Drop Location</p>
                  <p className="font-semibold mt-1">{confirmedBooking.dropLocation}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Pickup Date</p>
                  <p className="font-semibold mt-1">
                    {new Date(confirmedBooking.pickupDate).toLocaleDateString('en-IN', { 
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Pickup Time</p>
                  <p className="font-semibold mt-1">{confirmedBooking.pickupTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Passengers</p>
                  <p className="font-semibold mt-1">{confirmedBooking.passengerCount} Person(s)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Customer Name</p>
                  <p className="font-semibold mt-1">{confirmedBooking.customerName}</p>
                </div>
              </div>

              {/* Fare Estimate */} 
              {/* <div className="mt-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Estimated Fare</span>
                  <span className="text-3xl font-bold">₹{confirmedBooking.estimate.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs opacity-75 mt-1">* Excluding tolls, parking & state tax</p>
              </div> */}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isDownloading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Generating PDF...</>
                ) : (
                  <><Download className="h-4 w-4" /> Download Receipt (PDF)</>
                )}
              </button>
              
              <a 
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-8 py-4 text-sm font-semibold text-primary hover:bg-primary/5 transition-all"
              >
                <Phone className="h-4 w-4" /> Call {BRAND.phone}
              </a>
              
              <button
                onClick={handleNewBooking}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold hover:border-primary transition-all"
              >
                <ArrowRight className="h-4 w-4" /> Book Another Ride
              </button>
            </motion.div>

            {/* Info Alert */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl"
            >
              <p className="text-sm font-semibold text-amber-800 mb-1">📞 Important Information</p>
              <p className="text-sm text-amber-700">
                If you don't receive a confirmation call within 5 minutes, please contact us at{' '}
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="font-bold underline">
                  {BRAND.phone}
                </a>
                . Keep your booking reference <strong>#{confirmedBooking.bookingNumber}</strong> handy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ===== BOOKING FORM VIEW =====
  if (!car && !loading) {
    return (
      <div className="py-20">
        <div className="container-x text-center py-20">
          <p className="text-xl text-foreground/70">No cars available at the moment.</p>
          <button onClick={fetchCars} className="mt-4 px-6 py-3 bg-primary text-white rounded-full">Refresh</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container-x">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Booking</span>
          <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Plan your <span className="text-gradient">journey</span>
          </h1>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex justify-between">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="underline text-sm">Dismiss</button>
          </motion.div>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {(["oneway", "roundtrip", "local"] as TripType[]).map((t) => (
                <button key={t} type="button" onClick={() => setTripType(t)} className={`rounded-full border px-5 py-2 text-sm font-medium capitalize transition ${tripType === t ? "border-primary bg-gradient-primary text-primary-foreground" : "border-border hover:border-primary/50"}`}>
                  {t === "oneway" ? "One Way" : t === "roundtrip" ? "Round Trip" : "Local"}
                </button>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FloatingField icon={User} label="Full Name *" value={form.name} onChange={(v: string) => setForm({ ...form, name: v })} required />
              <FloatingField icon={Phone} label="Contact Number *" type="tel" value={form.phone} onChange={(v: string) => setForm({ ...form, phone: v })} required />
              <FloatingField icon={Mail} label="Email Address" type="email" value={form.email} onChange={(v: string) => setForm({ ...form, email: v })} className="sm:col-span-2" />
              <FloatingField icon={MapPin} label="Pickup Location *" value={form.pickup} onChange={(v: string) => setForm({ ...form, pickup: v })} required />
              <FloatingField icon={MapPin} label="Drop Location *" value={form.drop} onChange={(v: string) => setForm({ ...form, drop: v })} required />
              <FloatingField icon={Calendar} label="Pickup Date *" type="date" value={form.date} onChange={(v: string) => setForm({ ...form, date: v })} required />
              <FloatingField icon={Calendar} label="Pickup Time *" type="time" value={form.time} onChange={(v: string) => setForm({ ...form, time: v })} required />
              
              <CustomDropdown icon={Users} label="Passengers" value={form.passengers} onChange={(v: string) => setForm({ ...form, passengers: Number(v) })} options={[1,2,3,4,5,6,7,8,10,12].map(n => ({ value: n, label: `${n} Passenger${n !== 1 ? 's' : ''}` }))} />
              <CarDropdown value={carId} onChange={setCarId} cars={cars} required />

              <div className="sm:col-span-2">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Special Notes</label>
                <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} placeholder="Any special requirements..." className="w-full rounded-2xl border border-border/60 bg-card/70 p-3.5 text-sm outline-none hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none" />
              </div>
            </div>

            <button type="submit" disabled={submitting || !car} className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : <>Book Now <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card sm:sticky sm:top-24">
            {car && (
              <>
                <div className="overflow-hidden rounded-xl">
                  <img src={car.image} alt={car.name} className="aspect-[4/3] w-full object-cover" />
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-wide">{car.name}</h3>
                <div className="mt-1 text-xs uppercase tracking-widest text-primary">{car.category}</div>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  {car.features.map((f: string) => <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> {f}</li>)}
                </ul>
                <div className="mt-6 rounded-2xl bg-surface p-4">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Rate</span><span className="font-medium">₹{car.pricePerKm} / km</span></div>
                  {/* <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Distance</span><span className="font-medium">{form.km} km</span></div>
                  <div className="mt-3 border-t border-border pt-3 flex justify-between"><span className="font-display text-lg">Estimate</span><span className="font-display text-2xl text-gradient">₹{estimate.toLocaleString("en-IN")}</span></div>
                  <p className="mt-2 text-[11px] text-muted-foreground">+ tolls, parking, state-tax at actuals</p> */}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
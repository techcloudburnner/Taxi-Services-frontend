// src/routes/gallery.tsx (with fallback)
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api/constants";
// Keep your static imports as fallback
import innovaFront from "@/assets/innova-front.jpg";
import innovaSide from "@/assets/innova-side.jpg";
import innovaRear from "@/assets/innova-rear.jpg";
import fortunerFront from "@/assets/fortuner-front.jpg";
import fortunerRear from "@/assets/fortuner-rear.jpg";
import audiA4 from "@/assets/audi-a4.jpg";
import kiaCarens from "@/assets/kia-carens.jpg";
import kiaCarensDecor from "@/assets/kia-carens-decoration.jpg";
import kiaCarensNight from "@/assets/kia-carens-night.jpg";
import kiaCarensPink from "@/assets/kia-carens-pink.jpg";
import kiaClavis from "@/assets/kia-clavis.jpg";
import kiaSonet from "@/assets/kia-sonet.jpg";
import defender from "@/assets/defender.jpg";
import tempoTraveller from "@/assets/tempo-traveller.jpg";
import tempoTravellerSide from "@/assets/tempo-traveller-side.jpg";

// Static images as fallback
const FALLBACK_IMAGES = [
  { src: kiaCarensDecor, label: "Wedding Decoration — Kia Carens" },
  { src: defender, label: "Land Rover Defender" },
  { src: audiA4, label: "Audi A4 — Wedding Ready" },
  { src: fortunerFront, label: "Fortuner Legender" },
  { src: kiaCarensPink, label: "Pink Floral Decoration" },
  { src: innovaFront, label: "Innova Crysta" },
  { src: kiaSonet, label: "Kia Sonet" },
  { src: tempoTraveller, label: "Tempo Traveller — Front" },
  { src: kiaCarensNight, label: "Outstation Trip — Loaded" },
  { src: kiaClavis, label: "Kia Clavis" },
  { src: tempoTravellerSide, label: "Tempo Traveller — Side" },
  { src: kiaCarens, label: "Kia Carens" },
  { src: innovaSide, label: "Innova — Side" },
  { src: fortunerRear, label: "Fortuner — Rear" },
  { src: innovaRear, label: "Innova — Rear" },
];

interface GalleryImage {
  id: number;
  imagePath: string;
  caption: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Sikar Taxi Service Fleet | Rudra Banna Taxi" },
      { name: "description", content: "Photo gallery of our Sikar taxi & cab service fleet — wedding cars, luxury sedans, SUVs and tempo travellers." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [images, setImages] = useState<Array<{ src: string; label: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get<GalleryImage[]>(API_ENDPOINTS.GALLERY.ACTIVE);
      
      if (response.data && response.data.length > 0) {
        const apiImages = response.data.map((img) => ({
          src: img.imagePath.startsWith('http') 
            ? img.imagePath 
            : `https://customlogicinnovation.com/rudrabannataxiservices/${img.imagePath.replace(/^\/+/, '')}`,
          label: img.caption || 'Gallery Image',
        }));
        setImages(apiImages);
      } else {
        // Fallback to static images if API returns empty
        setImages(FALLBACK_IMAGES);
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      // Fallback to static images on error
      setImages(FALLBACK_IMAGES);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Gallery</span>
            <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
              Moments from <span className="text-gradient">the road</span>
            </h1>
          </div>
          <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl border border-border bg-surface animate-pulse ${i === 0 ? "row-span-2 col-span-2" : ""}`}>
                <div className="h-full w-full bg-muted"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container-x">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Gallery</span>
          <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Moments from <span className="text-gradient">the road</span>
          </h1>
          <p className="mt-4 text-foreground/70">Wedding cars, luxury rides and tempo travellers — see our fleet in action.</p>
        </motion.div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-surface ${
                i === 0 ? "row-span-2 col-span-2" : i === 3 ? "row-span-2" : i === 7 ? "col-span-2" : ""
              }`}
            >
              <img 
                src={img.src} 
                alt={img.label} 
                loading="lazy" 
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 translate-y-2 text-sm font-medium text-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {img.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
// // src/routes/gallery.tsx
// import { createFileRoute } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { API_ENDPOINTS } from "@/config/api/constants";

// interface GalleryImage {
//   id: number;
//   imagePath: string;
//   caption: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export const Route = createFileRoute("/gallery")({
//   head: () => ({
//     meta: [
//       { title: "Gallery — Sikar Taxi Service Fleet | Rudra Banna Taxi" },
//       { name: "description", content: "Photo gallery of our Sikar taxi & cab service fleet — wedding cars, luxury sedans, SUVs and tempo travellers." },
//       { property: "og:url", content: "/gallery" },
//     ],
//     links: [{ rel: "canonical", href: "/gallery" }],
//   }),
//   component: GalleryPage,
// });

// function GalleryPage() {
//   const [images, setImages] = useState<GalleryImage[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchGalleryImages();
//   }, []);

//   const fetchGalleryImages = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Fetch only active gallery images
//       const response = await axios.get<GalleryImage[]>(API_ENDPOINTS.GALLERY.ACTIVE);
      
//       if (response.data && response.data.length > 0) {
//         setImages(response.data);
//       } else {
//         setError("No images found in gallery");
//       }
//     } catch (err) {
//       console.error('Error fetching gallery images:', err);
//       setError("Failed to load gallery images. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to get full image URL
//   const getImageUrl = (imagePath: string): string => {
//     if (!imagePath) return '/placeholder-image.png';
//     if (imagePath.startsWith('http')) return imagePath;
//     return `https://customlogicinnovation.com/rudrabannataxiservices/${imagePath.replace(/^\/+/, '')}`;
//   };

//   // Determine grid layout based on index
//   const getGridClass = (index: number, total: number) => {
//     // Create a dynamic layout pattern
//     if (index === 0) return "row-span-2 col-span-2";
//     if (index === 3 && total > 5) return "row-span-2";
//     if (index === 7 && total > 8) return "col-span-2";
//     if (total <= 4 && index === total - 1) return "col-span-2";
//     return "";
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="py-20">
//         <div className="container-x">
//           <div className="max-w-2xl">
//             <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Gallery</span>
//             <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
//               Moments from <span className="text-gradient">the road</span>
//             </h1>
//             <p className="mt-4 text-foreground/70">Loading our fleet gallery...</p>
//           </div>
//           <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`relative overflow-hidden rounded-2xl border border-border bg-surface animate-pulse ${
//                   i === 0 ? "row-span-2 col-span-2" : ""
//                 }`}
//               >
//                 <div className="h-full w-full bg-muted"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="py-20">
//         <div className="container-x">
//           <div className="max-w-2xl">
//             <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Gallery</span>
//             <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
//               Moments from <span className="text-gradient">the road</span>
//             </h1>
//           </div>
//           <div className="mt-12 text-center py-20">
//             <div className="text-6xl mb-4">📷</div>
//             <p className="text-xl text-foreground/70 mb-4">{error}</p>
//             <button
//               onClick={fetchGalleryImages}
//               className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (images.length === 0) {
//     return (
//       <div className="py-20">
//         <div className="container-x">
//           <div className="max-w-2xl">
//             <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Gallery</span>
//             <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
//               Moments from <span className="text-gradient">the road</span>
//             </h1>
//           </div>
//           <div className="mt-12 text-center py-20">
//             <div className="text-6xl mb-4">🖼️</div>
//             <p className="text-xl text-foreground/70">Gallery images coming soon!</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-20">
//       <div className="container-x">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.6 }} 
//           className="max-w-2xl"
//         >
//           <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Gallery</span>
//           <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
//             Moments from <span className="text-gradient">the road</span>
//           </h1>
//           <p className="mt-4 text-foreground/70">
//             Wedding cars, luxury rides and tempo travellers — see our fleet in action.
//           </p>
//         </motion.div>

//         <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
//           {images.map((image, i) => (
//             <motion.div
//               key={image.id}
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.04 }}
//               className={`group relative overflow-hidden rounded-2xl border border-border bg-surface ${getGridClass(i, images.length)}`}
//             >
//               <img 
//                 src={getImageUrl(image.imagePath)} 
//                 alt={image.caption || `Gallery image ${i + 1}`}
//                 loading="lazy" 
//                 className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = '/placeholder-image.png';
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
//               {image.caption && (
//                 <div className="absolute bottom-3 left-3 right-3 translate-y-2 text-sm font-medium text-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
//                   {image.caption}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>

//         {/* Optional: Add a lightbox or modal for full-size image viewing */}
//         <div className="mt-12 text-center">
//           <p className="text-sm text-foreground/50">
//             Showing {images.length} image{images.length !== 1 ? 's' : ''} from our gallery
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { createFileRoute } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import innovaFront from "@/assets/innova-front.jpg";
// import innovaSide from "@/assets/innova-side.jpg";
// import innovaRear from "@/assets/innova-rear.jpg";
// import fortunerFront from "@/assets/fortuner-front.jpg";
// import fortunerRear from "@/assets/fortuner-rear.jpg";
// import audiA4 from "@/assets/audi-a4.jpg";
// import kiaCarens from "@/assets/kia-carens.jpg";
// import kiaCarensDecor from "@/assets/kia-carens-decoration.jpg";
// import kiaCarensNight from "@/assets/kia-carens-night.jpg";
// import kiaCarensPink from "@/assets/kia-carens-pink.jpg";
// import kiaClavis from "@/assets/kia-clavis.jpg";
// import kiaSonet from "@/assets/kia-sonet.jpg";
// import defender from "@/assets/defender.jpg";
// import tempoTraveller from "@/assets/tempo-traveller.jpg";
// import tempoTravellerSide from "@/assets/tempo-traveller-side.jpg";

// const IMAGES = [
//   { src: kiaCarensDecor, label: "Wedding Decoration — Kia Carens" },
//   { src: defender, label: "Land Rover Defender" },
//   { src: audiA4, label: "Audi A4 — Wedding Ready" },
//   { src: fortunerFront, label: "Fortuner Legender" },
//   { src: kiaCarensPink, label: "Pink Floral Decoration" },
//   { src: innovaFront, label: "Innova Crysta" },
//   { src: kiaSonet, label: "Kia Sonet" },
//   { src: tempoTraveller, label: "Tempo Traveller — Front" },
//   { src: kiaCarensNight, label: "Outstation Trip — Loaded" },
//   { src: kiaClavis, label: "Kia Clavis" },
//   { src: tempoTravellerSide, label: "Tempo Traveller — Side" },
//   { src: kiaCarens, label: "Kia Carens" },
//   { src: innovaSide, label: "Innova — Side" },
//   { src: fortunerRear, label: "Fortuner — Rear" },
//   { src: innovaRear, label: "Innova — Rear" },
// ];

// export const Route = createFileRoute("/gallery")({
//   head: () => ({
//     meta: [
//       { title: "Gallery — Sikar Taxi Service Fleet | Rudra Banna Taxi" },
//       { name: "description", content: "Photo gallery of our Sikar taxi & cab service fleet — wedding cars, luxury sedans, SUVs and tempo travellers." },
//       { property: "og:url", content: "/gallery" },
//     ],
//     links: [{ rel: "canonical", href: "/gallery" }],
//   }),
//   component: GalleryPage,
// });

// function GalleryPage() {
//   return (
//     <div className="py-20">
//       <div className="container-x">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
//           <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Gallery</span>
//           <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
//             Moments from <span className="text-gradient">the road</span>
//           </h1>
//           <p className="mt-4 text-foreground/70">Wedding cars, luxury rides and tempo travellers — see our fleet in action.</p>
//         </motion.div>

//         <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
//           {IMAGES.map((img, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.04 }}
//               className={`group relative overflow-hidden rounded-2xl border border-border bg-surface ${
//                 i === 0 ? "row-span-2 col-span-2" : i === 3 ? "row-span-2" : i === 7 ? "col-span-2" : ""
//               }`}
//             >
//               <img src={img.src} alt={img.label} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
//               <div className="absolute bottom-3 left-3 translate-y-2 text-sm font-medium text-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
//                 {img.label}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

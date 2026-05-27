// src/data/cars.ts
import dzire from "@/assets/dzire.jpg";
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

// Dynamic type - no longer hardcoded
export type CarCategory = string;

export interface Car {
  id: string;
  name: string;
  category: CarCategory;
  seats: number;
  luggage: number;
  ac: boolean;
  pricePerKm: number;
  image: string;
  gallery: string[];
  features: string[];
 description?: string; // Add description field

}

// API Response Types
export interface APICar {
  carId: number;
  carTypeId: number;
  carTypeName: string;
  name: string;
  slug: string;
  imagePath: string;
  seatingCapacity: number;
  luggageCapacity: number;
  perKmRate: number;
  description: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface APICarType {
  carTypeId: number;
  carCategoryName: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

// Cache for car types fetched from API
let cachedCarTypes: string[] = [];
let carTypesLoaded = false;

// Function to fetch car types from API and cache them
export const fetchCarTypes = async (): Promise<string[]> => {
  if (carTypesLoaded && cachedCarTypes.length > 0) {
    return cachedCarTypes;
  }

  try {
    const API_BASE_URL = 'https://customlogicinnovation.com/rudrabannataxiservices/api';
    const response = await fetch(`${API_BASE_URL}/car-types/active`);
    const data = await response.json();
    
    let types: APICarType[] = [];
    if (data?.content) {
      types = data.content;
    } else if (Array.isArray(data)) {
      types = data;
    }

    cachedCarTypes = types
      .filter(type => type.isActive)
      .map(type => type.carCategoryName);
    
    carTypesLoaded = true;
    console.log('Fetched car types:', cachedCarTypes);
    return cachedCarTypes;
  } catch (error) {
    console.error('Error fetching car types:', error);
    return [];
  }
};

// Get cached car types (synchronous)
export const getCarTypes = (): string[] => {
  return cachedCarTypes;
};

// Static fallback data
export const CARS: Car[] = [
  {
    id: "swift-dzire",
    name: "Swift Dzire",
    category: "Sedan",
    seats: 4,
    luggage: 2,
    ac: true,
    pricePerKm: 11,
    image: dzire,
    gallery: [dzire],
    features: ["AC", "Music System", "GPS", "First-aid"],
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    category: "MPV",
    seats: 6,
    luggage: 3,
    ac: true,
    pricePerKm: 14,
    image: "/assets/ertiga.jpg",
    gallery: ["/assets/ertiga.jpg"],
    features: ["AC", "Spacious", "Music System", "GPS"],
  },
  {
    id: "kia-carens",
    name: "Kia Carens",
    category: "MPV",
    seats: 6,
    luggage: 3,
    ac: true,
    pricePerKm: 15,
    image: kiaCarens,
    gallery: [kiaCarens, kiaCarensNight, kiaCarensDecor, kiaCarensPink],
    features: ["Premium AC", "Touchscreen", "Captain Seats", "Roof Carrier"],
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "MPV",
    seats: 7,
    luggage: 4,
    ac: true,
    pricePerKm: 17,
    image: innovaFront,
    gallery: [innovaFront, innovaSide, innovaRear],
    features: ["Premium AC", "Captain Seats", "Roof Carrier", "Charging Ports"],
  },
  {
    id: "kia-sonet",
    name: "Kia Sonet",
    category: "SUV",
    seats: 5,
    luggage: 3,
    ac: true,
    pricePerKm: 14,
    image: kiaSonet,
    gallery: [kiaSonet],
    features: ["AC", "Touchscreen", "Music System", "GPS"],
  },
  {
    id: "kia-clavis",
    name: "Kia Clavis",
    category: "SUV",
    seats: 5,
    luggage: 3,
    ac: true,
    pricePerKm: 16,
    image: kiaClavis,
    gallery: [kiaClavis],
    features: ["Premium AC", "Sunroof", "Touchscreen", "Premium Sound"],
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner Legender",
    category: "SUV",
    seats: 7,
    luggage: 4,
    ac: true,
    pricePerKm: 28,
    image: fortunerFront,
    gallery: [fortunerFront, fortunerRear],
    features: ["Leather Seats", "Premium Sound", "Sunroof", "4x4"],
  },
  {
    id: "audi-a4",
    name: "Audi A4",
    category: "Luxury",
    seats: 4,
    luggage: 2,
    ac: true,
    pricePerKm: 45,
    image: audiA4,
    gallery: [audiA4],
    features: ["Leather Seats", "Sunroof", "Premium Sound", "Wedding Ready"],
  },
  {
    id: "defender",
    name: "Land Rover Defender",
    category: "Luxury",
    seats: 5,
    luggage: 4,
    ac: true,
    pricePerKm: 80,
    image: defender,
    gallery: [defender],
    features: ["4x4", "Panoramic Roof", "Premium Leather", "Off-road"],
  },
  {
    id: "tempo-traveller",
    name: "Force Tempo Traveller",
    category: "Tempo Traveller",
    seats: 12,
    luggage: 8,
    ac: true,
    pricePerKm: 22,
    image: tempoTraveller,
    gallery: [tempoTraveller, tempoTravellerSide],
    features: ["AC", "Pushback Seats", "Group Travel", "Luggage Carrier"],
  },
];

// Helper functions for API integration
export const getImageUrl = (imagePath: string | null): string => {
  if (!imagePath) return '/placeholder-car.png';
  if (imagePath.startsWith('http')) return imagePath;
  return `https://customlogicinnovation.com/rudrabannataxiservices/${imagePath.replace(/^\/+/, '')}`;
};

export const extractFeatures = (description: string | null): string[] => {
  if (!description) return [];
  return description
    .split(/[,,\n]/)
    .map(f => f.trim())
    .filter(f => f.length > 0)
    .slice(0, 4);
};

export const transformAPICarToCar = (apiCar: APICar): Car => {
  // Use carId for unique ID, trim slug
  const id = apiCar.slug?.trim() || `car-${apiCar.carId}`;
  
  return {
    id: id,
    name: apiCar.name?.trim() || 'Unknown Car',
    category: apiCar.carTypeName?.trim() || 'SUV', // Dynamic from API
    seats: apiCar.seatingCapacity || 4,
    luggage: apiCar.luggageCapacity || 2,
    ac: true,
    pricePerKm: apiCar.perKmRate || 15,
    image: getImageUrl(apiCar.imagePath),
    gallery: [getImageUrl(apiCar.imagePath)],
    features: extractFeatures(apiCar.description),
     description: apiCar.description?.trim() || '', // Add description from API

    
  };
};
// // src/data/cars.ts
// import dzire from "@/assets/dzire.jpg";
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

// export type CarCategory = "Sedan" | "SUV" | "MPV" | "Luxury" | "Tempo Traveller";

// export interface Car {
//   id: string;
//   name: string;
//   category: CarCategory;
//   seats: number;
//   luggage: number;
//   ac: boolean;
//   pricePerKm: number;
//   image: string;
//   gallery: string[];
//   features: string[];
// }

// // API Response Types
// export interface APICar {
//   carId: number;
//   carTypeId: number;
//   carTypeName: string;
//   name: string;
//   slug: string;
//   imagePath: string;
//   seatingCapacity: number;
//   luggageCapacity: number;
//   perKmRate: number;
//   description: string;
//   isFeatured: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface APICarType {
//   carTypeId: number;
//   carCategoryName: string;
//   slug: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string | null;
// }

// // Static fallback data
// export const CARS: Car[] = [
//   {
//     id: "swift-dzire",
//     name: "Swift Dzire",
//     category: "Sedan",
//     seats: 4,
//     luggage: 2,
//     ac: true,
//     pricePerKm: 11,
//     image: dzire,
//     gallery: [dzire],
//     features: ["AC", "Music System", "GPS", "First-aid"],
//   },
//   {
//     id: "ertiga",
//     name: "Maruti Ertiga",
//     category: "MPV",
//     seats: 6,
//     luggage: 3,
//     ac: true,
//     pricePerKm: 14,
//     image: "/assets/ertiga.jpg",
//     gallery: ["/assets/ertiga.jpg"],
//     features: ["AC", "Spacious", "Music System", "GPS"],
//   },
//   {
//     id: "kia-carens",
//     name: "Kia Carens",
//     category: "MPV",
//     seats: 6,
//     luggage: 3,
//     ac: true,
//     pricePerKm: 15,
//     image: kiaCarens,
//     gallery: [kiaCarens, kiaCarensNight, kiaCarensDecor, kiaCarensPink],
//     features: ["Premium AC", "Touchscreen", "Captain Seats", "Roof Carrier"],
//   },
//   {
//     id: "innova-crysta",
//     name: "Toyota Innova Crysta",
//     category: "MPV",
//     seats: 7,
//     luggage: 4,
//     ac: true,
//     pricePerKm: 17,
//     image: innovaFront,
//     gallery: [innovaFront, innovaSide, innovaRear],
//     features: ["Premium AC", "Captain Seats", "Roof Carrier", "Charging Ports"],
//   },
//   {
//     id: "kia-sonet",
//     name: "Kia Sonet",
//     category: "SUV",
//     seats: 5,
//     luggage: 3,
//     ac: true,
//     pricePerKm: 14,
//     image: kiaSonet,
//     gallery: [kiaSonet],
//     features: ["AC", "Touchscreen", "Music System", "GPS"],
//   },
//   {
//     id: "kia-clavis",
//     name: "Kia Clavis",
//     category: "SUV",
//     seats: 5,
//     luggage: 3,
//     ac: true,
//     pricePerKm: 16,
//     image: kiaClavis,
//     gallery: [kiaClavis],
//     features: ["Premium AC", "Sunroof", "Touchscreen", "Premium Sound"],
//   },
//   {
//     id: "fortuner",
//     name: "Toyota Fortuner Legender",
//     category: "SUV",
//     seats: 7,
//     luggage: 4,
//     ac: true,
//     pricePerKm: 28,
//     image: fortunerFront,
//     gallery: [fortunerFront, fortunerRear],
//     features: ["Leather Seats", "Premium Sound", "Sunroof", "4x4"],
//   },
//   {
//     id: "audi-a4",
//     name: "Audi A4",
//     category: "Luxury",
//     seats: 4,
//     luggage: 2,
//     ac: true,
//     pricePerKm: 45,
//     image: audiA4,
//     gallery: [audiA4],
//     features: ["Leather Seats", "Sunroof", "Premium Sound", "Wedding Ready"],
//   },
//   {
//     id: "defender",
//     name: "Land Rover Defender",
//     category: "Luxury",
//     seats: 5,
//     luggage: 4,
//     ac: true,
//     pricePerKm: 80,
//     image: defender,
//     gallery: [defender],
//     features: ["4x4", "Panoramic Roof", "Premium Leather", "Off-road"],
//   },
//   {
//     id: "tempo-traveller",
//     name: "Force Tempo Traveller",
//     category: "Tempo Traveller",
//     seats: 12,
//     luggage: 8,
//     ac: true,
//     pricePerKm: 22,
//     image: tempoTraveller,
//     gallery: [tempoTraveller, tempoTravellerSide],
//     features: ["AC", "Pushback Seats", "Group Travel", "Luggage Carrier"],
//   },
// ];

// // Helper functions for API integration
// export const getImageUrl = (imagePath: string | null): string => {
//   if (!imagePath) return '/placeholder-car.png';
//   if (imagePath.startsWith('http')) return imagePath;
//   return `https://customlogicinnovation.com/rudrabannataxiservices/${imagePath.replace(/^\/+/, '')}`;
// };

// export const extractFeatures = (description: string | null): string[] => {
//   if (!description) return [];
//   return description
//     .split(/[,,\n]/)
//     .map(f => f.trim())
//     .filter(f => f.length > 0)
//     .slice(0, 4);
// };

// export const transformAPICarToCar = (apiCar: APICar): Car => {
//   console.log('Transforming car:', apiCar); // Debug log
  
//   return {
//     id: apiCar.slug || `car-${apiCar.carId}`, // Fallback if slug is empty
//     name: apiCar.name || 'Unknown Car',
//     category: (apiCar.carTypeName || 'SUV') as CarCategory,
//     seats: apiCar.seatingCapacity || 4,
//     luggage: apiCar.luggageCapacity || 2,
//     ac: true,
//     pricePerKm: apiCar.perKmRate || 15,
//     image: getImageUrl(apiCar.imagePath),
//     gallery: [getImageUrl(apiCar.imagePath)],
//     features: extractFeatures(apiCar.description),
//   };
// };
// // import dzire from "@/assets/dzire.jpg";
// // import innovaFront from "@/assets/innova-front.jpg";
// // import innovaSide from "@/assets/innova-side.jpg";
// // import innovaRear from "@/assets/innova-rear.jpg";
// // import fortunerFront from "@/assets/fortuner-front.jpg";
// // import fortunerRear from "@/assets/fortuner-rear.jpg";
// // import audiA4 from "@/assets/audi-a4.jpg";
// // import kiaCarens from "@/assets/kia-carens.jpg";
// // import kiaCarensDecor from "@/assets/kia-carens-decoration.jpg";
// // import kiaCarensNight from "@/assets/kia-carens-night.jpg";
// // import kiaCarensPink from "@/assets/kia-carens-pink.jpg";
// // import kiaClavis from "@/assets/kia-clavis.jpg";
// // import kiaSonet from "@/assets/kia-sonet.jpg";
// // import defender from "@/assets/defender.jpg";
// // import tempoTraveller from "@/assets/tempo-traveller.jpg";
// // import tempoTravellerSide from "@/assets/tempo-traveller-side.jpg";

// // export type CarCategory = "Sedan" | "SUV" | "MPV" | "Luxury" | "Tempo Traveller";

// // export interface Car {
// //   id: string;
// //   name: string;
// //   category: CarCategory;
// //   seats: number;
// //   luggage: number;
// //   ac: boolean;
// //   pricePerKm: number;
// //   image: string;
// //   gallery: string[];
// //   features: string[];
// // }

// // export const CARS: Car[] = [
// //   {
// //     id: "swift-dzire",
// //     name: "Swift Dzire",
// //     category: "Sedan",
// //     seats: 4,
// //     luggage: 2,
// //     ac: true,
// //     pricePerKm: 11,
// //     image: dzire,
// //     gallery: [dzire],
// //     features: ["AC", "Music System", "GPS", "First-aid"],
// //   },
// //   {
// //     id: "ertiga",
// //     name: "Maruti Ertiga",
// //     category: "MPV",
// //     seats: 6,
// //     luggage: 3,
// //     ac: true,
// //     pricePerKm: 14,
// //     image: "/assets/ertiga.jpg",
// //     gallery: ["/assets/ertiga.jpg"],
// //     features: ["AC", "Spacious", "Music System", "GPS"],
// //   },
// //   {
// //     id: "kia-carens",
// //     name: "Kia Carens",
// //     category: "MPV",
// //     seats: 6,
// //     luggage: 3,
// //     ac: true,
// //     pricePerKm: 15,
// //     image: kiaCarens,
// //     gallery: [kiaCarens, kiaCarensNight, kiaCarensDecor, kiaCarensPink],
// //     features: ["Premium AC", "Touchscreen", "Captain Seats", "Roof Carrier"],
// //   },
// //   {
// //     id: "innova-crysta",
// //     name: "Toyota Innova Crysta",
// //     category: "MPV",
// //     seats: 7,
// //     luggage: 4,
// //     ac: true,
// //     pricePerKm: 17,
// //     image: innovaFront,
// //     gallery: [innovaFront, innovaSide, innovaRear],
// //     features: ["Premium AC", "Captain Seats", "Roof Carrier", "Charging Ports"],
// //   },
// //   {
// //     id: "kia-sonet",
// //     name: "Kia Sonet",
// //     category: "SUV",
// //     seats: 5,
// //     luggage: 3,
// //     ac: true,
// //     pricePerKm: 14,
// //     image: kiaSonet,
// //     gallery: [kiaSonet],
// //     features: ["AC", "Touchscreen", "Music System", "GPS"],
// //   },
// //   {
// //     id: "kia-clavis",
// //     name: "Kia Clavis",
// //     category: "SUV",
// //     seats: 5,
// //     luggage: 3,
// //     ac: true,
// //     pricePerKm: 16,
// //     image: kiaClavis,
// //     gallery: [kiaClavis],
// //     features: ["Premium AC", "Sunroof", "Touchscreen", "Premium Sound"],
// //   },
// //   {
// //     id: "fortuner",
// //     name: "Toyota Fortuner Legender",
// //     category: "SUV",
// //     seats: 7,
// //     luggage: 4,
// //     ac: true,
// //     pricePerKm: 28,
// //     image: fortunerFront,
// //     gallery: [fortunerFront, fortunerRear],
// //     features: ["Leather Seats", "Premium Sound", "Sunroof", "4x4"],
// //   },
// //   {
// //     id: "audi-a4",
// //     name: "Audi A4",
// //     category: "Luxury",
// //     seats: 4,
// //     luggage: 2,
// //     ac: true,
// //     pricePerKm: 45,
// //     image: audiA4,
// //     gallery: [audiA4],
// //     features: ["Leather Seats", "Sunroof", "Premium Sound", "Wedding Ready"],
// //   },
// //   {
// //     id: "defender",
// //     name: "Land Rover Defender",
// //     category: "Luxury",
// //     seats: 5,
// //     luggage: 4,
// //     ac: true,
// //     pricePerKm: 80,
// //     image: defender,
// //     gallery: [defender],
// //     features: ["4x4", "Panoramic Roof", "Premium Leather", "Off-road"],
// //   },
// //   {
// //     id: "tempo-traveller",
// //     name: "Force Tempo Traveller",
// //     category: "Tempo Traveller",
// //     seats: 12,
// //     luggage: 8,
// //     ac: true,
// //     pricePerKm: 22,
// //     image: tempoTraveller,
// //     gallery: [tempoTraveller, tempoTravellerSide],
// //     features: ["AC", "Pushback Seats", "Group Travel", "Luggage Carrier"],
// //   },
// // ];
// src/hooks/useCarTypes.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api/constants';

interface APICarType {
  carTypeId: number;
  carCategoryName: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export function useCarTypes() {
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCarTypes();
  }, []);

  const fetchCarTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(API_ENDPOINTS.CAR_TYPES.ACTIVE);
      
      let types: APICarType[] = [];
      if (response.data?.content) {
        types = response.data.content;
      } else if (Array.isArray(response.data)) {
        types = response.data;
      }

      const activeTypes = types
        .filter(type => type.isActive)
        .map(type => type.carCategoryName);
      
      console.log('Fetched car types:', activeTypes);
      setCarTypes(activeTypes);
    } catch (err) {
      console.error('Error fetching car types:', err);
      setError('Failed to load car categories');
      // Fallback to default types
      setCarTypes(["Sedan", "SUV", "MPV", "Luxury", "Tempo Traveller", "Hatchback"]);
    } finally {
      setLoading(false);
    }
  };

  return { carTypes, loading, error, refetch: fetchCarTypes };
}

// // src/hooks/useCars.ts
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_ENDPOINTS } from '../config/api/constants';

// interface APICar {
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

// // Transform API car to your CarCard format
// export interface CarCardData {
//   id: string;
//   name: string;
//   category: string;
//   seats: number;
//   luggage: number;
//   ac: boolean;
//   pricePerKm: number;
//   image: string;
//   gallery: string[];
//   features: string[];
// }

// export function useCars() {
//   const [cars, setCars] = useState<CarCardData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const getImageUrl = (imagePath: string | null): string => {
//     if (!imagePath) return '/placeholder-car.png';
//     if (imagePath.startsWith('http')) return imagePath;
//     return `https://customlogicinnovation.com/rudrabannataxiservices/${imagePath.replace(/^\/+/, '')}`;
//   };

//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Fetch featured cars or all cars based on your needs
//       const response = await axios.get<APICar[]>(API_ENDPOINTS.CARS.FEATURED);
      
//       // Transform API data to CarCard format
//       const transformedCars: CarCardData[] = response.data.map((apiCar) => ({
//         id: apiCar.slug, // or apiCar.carId.toString()
//         name: apiCar.name,
//         category: apiCar.carTypeName,
//         seats: apiCar.seatingCapacity,
//         luggage: apiCar.luggageCapacity,
//         ac: true, // Default to true or add logic if your API has this field
//         pricePerKm: apiCar.perKmRate,
//         image: getImageUrl(apiCar.imagePath),
//         gallery: [getImageUrl(apiCar.imagePath)],
//         features: extractFeatures(apiCar.description),
//       }));
      
//       setCars(transformedCars);
//     } catch (err) {
//       setError('Failed to load cars');
//       console.error('Error fetching cars:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to extract features from description
//   const extractFeatures = (description: string | null): string[] => {
//     if (!description) return [];
//     // Split description by comma or new line
//     return description
//       .split(/[,,\n]/)
//       .map(feature => feature.trim())
//       .filter(feature => feature.length > 0)
//       .slice(0, 4); // Limit to 4 features
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   return { cars, loading, error, refetch: fetchCars };
// }
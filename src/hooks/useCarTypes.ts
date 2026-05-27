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
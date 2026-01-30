'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { City } from '@/lib/types';
import { getAllCities } from '@/services/locationService';

interface LocationContextType {
  selectedLocation: City | null;
  setSelectedLocation: (city: City | null) => void;
  loading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [selectedLocation, setSelectedLocationState] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial location from localStorage only on the client side
  useEffect(() => {
    setLoading(true);
    try {
      const storedLocation = localStorage.getItem('selectedLocation');
      if (storedLocation) {
        setSelectedLocationState(JSON.parse(storedLocation));
      }
    } catch (e) {
      console.error("Could not parse location from localStorage", e);
    } finally {
        setLoading(false);
    }
  }, []);

  const setSelectedLocation = (city: City | null) => {
    setSelectedLocationState(city);
    try {
      if (city) {
        localStorage.setItem('selectedLocation', JSON.stringify(city));
      } else {
        localStorage.removeItem('selectedLocation');
      }
    } catch(e) {
      console.error("Could not save location to localStorage", e);
    }
  };

  const value = useMemo(() => ({
    selectedLocation,
    setSelectedLocation,
    loading,
    error,
  }), [selectedLocation, loading, error]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

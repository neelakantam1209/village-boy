'use client';

import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormEvent, useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocation } from '@/hooks/use-location';
import { getAllCities } from '@/services/locationService';
import type { City } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { useFirestore } from '@/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

export function LocationSearch() {
  const { setSelectedLocation } = useLocation();
  const firestore = useFirestore();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const serviceQuery = searchParams.get('q') || '';

  useEffect(() => {
    if (debouncedQuery && isFocused) {
      const fetchSuggestions = async () => {
        if (!firestore) return;
        setLoadingSuggestions(true);
        try {
          const allCities = await getAllCities(firestore);
          const filtered = allCities.filter(city =>
            city.name.toLowerCase().includes(debouncedQuery.toLowerCase())
          );
          setSuggestions(filtered);
        } catch (err) {
          console.error("Failed to fetch city suggestions", err);
        } finally {
          setLoadingSuggestions(false);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, isFocused, firestore]);

  const handleSelect = (city: City) => {
    setSelectedLocation(city);
    setQuery(city.name);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const params = new URLSearchParams();
    if (query) {
      params.set('location', query);
    }
    if (serviceQuery) {
        params.set('q', serviceQuery);
    }
    router.push(`/search?${params.toString()}`);
    setIsFocused(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
        const form = e.currentTarget.form;
        if(form){
            form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="relative w-full">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          name="location"
          placeholder="Search by location or city"
          className="pl-10 w-full h-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>

      {isFocused && (query.length > 0 || loadingSuggestions) && (
        <div className="absolute z-10 top-full mt-2 w-full rounded-md bg-card border shadow-lg">
          {loadingSuggestions ? (
            <div className="p-2 space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-1">
              {suggestions.map((city) => (
                <li
                  key={city.id}
                  className="px-4 py-2 hover:bg-accent cursor-pointer text-sm"
                  onMouseDown={() => handleSelect(city)}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          ) : (
            debouncedQuery && <p className="p-4 text-sm text-muted-foreground">No locations found.</p>
          )}
        </div>
      )}
    </form>
  );
}

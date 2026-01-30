'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormEvent, useState, useEffect, useMemo } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocation } from '@/hooks/use-location';
import { SERVICES } from '@/lib/data';

export function ServiceSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const locationQuery = searchParams.get('location') || '';

  const workerTypes = useMemo(() => SERVICES.map(s => s.name), []);

  useEffect(() => {
    if (debouncedQuery && isFocused) {
      const lowerCaseQuery = debouncedQuery.toLowerCase();
      const filtered = workerTypes.filter(type =>
        type.toLowerCase().includes(lowerCaseQuery)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, isFocused, workerTypes]);

  const handleSelect = (serviceType: string) => {
    setQuery(serviceType);
    setSuggestions([]);
    setIsFocused(false);
    
    const params = new URLSearchParams();
    params.set('q', serviceType);
    if (locationQuery) {
        params.set('location', locationQuery);
    }
    router.push(`/search?${params.toString()}`);
  };
  
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) {
        // If query is empty, but location is present, search by location only
        if (locationQuery) {
            const params = new URLSearchParams();
            params.set('location', locationQuery);
            router.push(`/search?${params.toString()}`);
        }
        return;
    };
    
    const params = new URLSearchParams();
    params.set('q', query);
    if(locationQuery) {
        params.set('location', locationQuery);
    }
    router.push(`/search?${params.toString()}`);
    setIsFocused(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      } else {
        const form = e.currentTarget.form;
        if(form){
            form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
        <Input
            type="search"
            name="query"
            placeholder="Search worker type (Plumber, Electrician, etc.)"
            className="pl-10 w-full h-8 placeholder:text-gray-500/80"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
        />
      </div>

      {isFocused && (query.length > 0) && (
        <div className="absolute z-10 top-full mt-2 w-full rounded-md bg-card border shadow-lg">
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 px-4 py-2 hover:bg-accent cursor-pointer text-sm"
                    onMouseDown={() => handleSelect(item)}
                  >
                    {item}
                  </li>
              ))}
            </ul>
          ) : (
            debouncedQuery && <p className="p-4 text-sm text-muted-foreground">No results found.</p>
          )}
        </div>
      )}
    </form>
  );
}

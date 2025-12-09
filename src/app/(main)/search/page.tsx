'use client';

import { useSearchParams } from 'next/navigation';
import { SERVICES } from '@/lib/data';
import { ServiceCard } from '@/components/shared/service-card';
import { useEffect, useState } from 'react';
import type { Service } from '@/lib/types';
import { SearchX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

function SearchPageComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const results = SERVICES.filter(
        service =>
          service.name.toLowerCase().includes(lowerCaseQuery) ||
          service.category.toLowerCase().includes(lowerCaseQuery) ||
          service.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredServices(results);
    } else {
      setFilteredServices([]);
    }
  }, [query]);

  if (!query) {
    return (
        <div className="container py-8 md:py-12 text-center">
            <h1 className="text-2xl font-bold">Search for a service</h1>
            <p className="text-muted-foreground mt-2">Enter a term in the search bar to find what you're looking for.</p>
        </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold">
        Search results for "{query}"
      </h1>
      <p className="text-muted-foreground mt-2">{filteredServices.length} services found.</p>
      
      <div className="mt-8">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-20">
            <CardContent>
                <SearchX className="mx-auto h-24 w-24 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mt-4">No Results Found</h2>
                <p className="text-muted-foreground mt-2">We couldn't find any services matching your search. Try a different term.</p>
                <Button asChild className="mt-6">
                    <Link href="/">Back to Home</Link>
                </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense>
            <SearchPageComponent />
        </Suspense>
    )
}

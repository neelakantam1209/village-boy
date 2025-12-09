'use client';

import { useEffect, useState } from 'react';
import { PROFESSIONALS } from '@/lib/data';
import type { Professional } from '@/lib/types';
import { SearchX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ProfessionalCard } from '@/components/shared/professional-card';

interface SearchResultsProps {
    query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const [filteredWorkers, setFilteredWorkers] = useState<Professional[]>([]);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      // Filter workers by location
      const results = PROFESSIONALS.filter(
        worker => worker.location.toLowerCase() === lowerCaseQuery
      );
      setFilteredWorkers(results);
    } else {
      setFilteredWorkers([]);
    }
  }, [query]);

  return (
    <section className="container py-8 md:py-12">
      <h2 className="text-3xl font-bold">
        Results for "{query}"
      </h2>
      
      <div className="mt-8">
        {filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkers.map(worker => (
              <ProfessionalCard key={worker.id} worker={worker} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-20 col-span-full">
            <CardContent>
                <SearchX className="mx-auto h-24 w-24 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mt-4">No Professionals Found</h2>
                <p className="text-muted-foreground mt-2">We couldn't find any professionals in "{query}". Try a different location.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

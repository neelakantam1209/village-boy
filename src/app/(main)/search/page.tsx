'use client';

import { useSearchParams } from 'next/navigation';
import { ServiceCard } from '@/components/shared/service-card';
import { useEffect, useState, Suspense } from 'react';
import type { Service, Professional } from '@/lib/types';
import { SearchX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProfessionalCard } from '@/components/shared/professional-card';
import { Skeleton } from '@/components/ui/skeleton';
import { searchServicesAndWorkers } from '@/services/searchService';
import { useLocation } from '@/hooks/use-location';
import { useFirestore } from '@/firebase';

function SearchPageComponent() {
  const searchParams = useSearchParams();
  const { selectedLocation } = useLocation();
  const firestore = useFirestore();
  
  const serviceQuery = searchParams.get('q');
  const locationQuery = searchParams.get('location');

  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  // Use the location from the URL param first, then from context.
  const finalLocationQuery = locationQuery || selectedLocation?.name || null;

  useEffect(() => {
    const performSearch = async () => {
        if (!firestore) return;
        setLoading(true);
        const { services, workers } = await searchServicesAndWorkers(firestore, serviceQuery, finalLocationQuery);
        setFilteredServices(services);
        setFilteredWorkers(workers);
        setLoading(false);
    };

    performSearch();
  }, [serviceQuery, finalLocationQuery, firestore]);

  const noResults = !loading && filteredServices.length === 0 && filteredWorkers.length === 0;

  if (!serviceQuery && !finalLocationQuery) {
    return (
        <div className="container py-8 md:py-12 text-center">
            <h1 className="text-2xl font-bold">Search for services or professionals</h1>
            <p className="text-muted-foreground mt-2">Enter a term in the search bars above to find what you're looking for.</p>
        </div>
    )
  }

  const noWorkersMessage = "No workers available for this service.";
  const noServicesMessage = "We couldn't find anything matching your search. Try different keywords.";

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-black">
        Search results
      </h1>
      <p className="text-muted-foreground mt-2">
        {`Showing results for `}
        {serviceQuery && <span className='font-semibold text-black'>"{serviceQuery}"</span>}
        {serviceQuery && finalLocationQuery && ` in `}
        {finalLocationQuery && <span className='font-semibold text-black'>"{finalLocationQuery}"</span>}
      </p>
      
      {loading ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
        </div>
      ) : noResults ? (
        <Card className="text-center py-20 mt-8">
            <CardContent>
                <SearchX className="mx-auto h-24 w-24 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mt-4">No Results Found</h2>
                <p className="text-muted-foreground mt-2">{filteredWorkers.length === 0 && filteredServices.length > 0 ? noWorkersMessage : noServicesMessage}</p>
                <Button asChild className="mt-6">
                    <Link href="/">Back to Home</Link>
                </Button>
            </CardContent>
        </Card>
      ) : (
        <div className="mt-8 space-y-12">
            {filteredServices.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-black">Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredServices.map(service => (
                        <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
            )}
             {filteredWorkers.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-black">Professionals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredWorkers.map(worker => (
                        <ProfessionalCard key={worker.id} worker={worker} />
                        ))}
                    </div>
                </div>
            )}
            {filteredWorkers.length === 0 && serviceQuery && (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">{noWorkersMessage}</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container py-8 md:py-12"><h1 className="text-3xl font-bold text-black">Loading...</h1></div>}>
            <SearchPageComponent />
        </Suspense>
    )
}

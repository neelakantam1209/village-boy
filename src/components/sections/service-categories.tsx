'use client';

import { ServiceCard } from '@/components/shared/service-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, limit, query } from 'firebase/firestore';
import type { Service } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export function ServiceCategories() {
  const firestore = useFirestore();
  // Fetch services to display in the carousel
  const servicesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'services'), limit(8));
  }, [firestore]);

  const { data: services, isLoading } = useCollection<Service>(servicesQuery);

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-black">Our Services</h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore a wide range of services to meet all your home needs, delivered by trusted professionals.
        </p>
        
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full mt-10"
        >
          <CarouselContent className="-ml-4">
            {isLoading && Array.from({length: 4}).map((_, i) => (
                <CarouselItem key={i} className="pl-4 basis-auto">
                    <div className="w-[280px]">
                        <Skeleton className="w-full h-[320px] rounded-lg" />
                    </div>
              </CarouselItem>
            ))}
            {services && services.map((service) => (
              <CarouselItem key={service.id} className="pl-4 basis-auto">
                 <div className="w-[280px]">
                  <ServiceCard service={service} variant="horizontal-scroll" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}

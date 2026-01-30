
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
import { collection, limit, query, where } from 'firebase/firestore';
import type { Service } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export default function MostBookedServices() {
  const firestore = useFirestore();
  // Fetch services that are explicitly tagged as 'popular' or 'instant'
  const servicesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'services'), where('tags', '!=', null), limit(6));
  }, [firestore]);

  const { data: services, isLoading } = useCollection<Service>(servicesQuery);

  if (isLoading) {
    return (
        <section className="py-12 md:py-20 bg-gray-50">
            <div className="container">
                <h2 className="text-2xl font-bold text-black mb-6">Most booked services</h2>
                <div className="flex gap-4">
                    {Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="w-[280px] h-[320px] rounded-lg" />)}
                </div>
            </div>
        </section>
    )
  }

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-2xl font-bold text-black mb-6">Most booked services</h2>
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={`${service.id}-${index}`} className="pl-4 basis-auto">
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

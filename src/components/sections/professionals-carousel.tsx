
'use client';

import { ProfessionalCard } from '@/components/shared/professional-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Professional } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';

// Fisher-Yates (aka Knuth) Shuffle
function shuffle<T>(array: T[]): T[] {
  if (!array) return [];
  const newArray = [...array];
  let currentIndex = newArray.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}

export function ProfessionalsCarousel() {
  const firestore = useFirestore();
  const workersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'workers'));
  }, [firestore]);

  const { data: allWorkers, isLoading } = useCollection<Professional>(workersQuery);

  const randomProfessionals = useMemo(() => {
    if (!allWorkers || allWorkers.length === 0) return [];
    
    // Take 6 random professionals
    const selected = shuffle(allWorkers).slice(0, 6);

    // If we have fewer than 6, it's fine, the carousel will just have fewer items.
    // For a smooth loop, embla works best when you have more items than can be displayed at once.
    // We duplicate the array to ensure the loop is seamless.
    let loopedItems = [...selected];
    if (loopedItems.length > 0) {
      while (loopedItems.length < 12) { // Ensure at least 12 items for smooth looping on large screens
        loopedItems.push(...selected);
      }
    }
    return loopedItems.slice(0,12); // Cap at 12 items
  }, [allWorkers]);

  if (!isLoading && (!randomProfessionals || randomProfessionals.length === 0)) {
    return null; // Don't render the section if there are no workers to show
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center text-black">
            Meet Our Professionals
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            A selection of our top-rated, verified experts ready to help.
          </p>
        </div>
        
         <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
           plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {isLoading && Array.from({length: 6}).map((_, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Skeleton className="h-[450px] w-full" />
                </CarouselItem>
            ))}
            {!isLoading && randomProfessionals.map((worker, index) => (
              <CarouselItem key={`${worker.id}-${index}`} className="pl-4 basis-auto">
                 <div className="w-[300px]">
                  <ProfessionalCard worker={worker} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

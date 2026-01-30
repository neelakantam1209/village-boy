
'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/shared/image-with-fallback';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Professional } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { getLocalImageByName } from '@/lib/image-utils';

function shuffle<T>(array: T[]): T[] {
  if (!array) return [];
  const newArray = [...array];
  let currentIndex = newArray.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}

export function CircularProfessionalsShowcase() {
  const firestore = useFirestore();
  const workersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'workers'));
  }, [firestore]);

  const { data: allWorkers, isLoading } = useCollection<Professional>(workersQuery);

  const randomProfessionals = useMemo(() => {
    if (!allWorkers || allWorkers.length === 0) return [];
    return shuffle(allWorkers).slice(0, 6);
  }, [allWorkers]);

  if (!isLoading && (!randomProfessionals || randomProfessionals.length === 0)) {
    return null;
  }

  const numItems = 6;
  const items = isLoading ? Array(numItems).fill(null) : randomProfessionals;

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container flex flex-col items-center justify-center">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Meet Our Top Professionals
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            A showcase of our top-rated, verified experts ready to help.
          </p>
        </div>

        <div className="w-[calc(100vw-2rem)] h-[calc(100vw-2rem)] sm:w-[32rem] sm:h-[32rem] md:w-[42rem] md:h-[42rem] relative flex items-center justify-center group/container">
            {/* Center element */}
            <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white/30 backdrop-blur-sm rounded-full shadow-inner border border-white/30 flex items-center justify-center text-center p-4">
                <h3 className="text-lg md:text-2xl font-bold text-primary">Top-Rated Experts</h3>
            </div>
            {/* Rotating container */}
            <div className="absolute w-full h-full animate-rotate-circle-slow group-hover/container:[animation-play-state:paused]">
                {items.map((worker, index) => {
                    const angle = (index / numItems) * 360;
                    const imageSrc = worker ? getLocalImageByName(worker.image || worker.name) : '';
                    
                    return (
                        <div
                            key={worker?.id || index}
                            className="absolute top-1/2 left-1/2 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 -translate-x-1/2 -translate-y-1/2"
                            style={{ 
                                transform: `rotate(${angle}deg) translateY(calc(-50vw + 5rem)) rotate(-${angle}deg) sm:translateY(-15rem) md:translateY(-20rem)`,
                            }}
                        >
                            <div className="w-full h-full transition-transform duration-300 hover:scale-110">
                            {worker && imageSrc ? (
                                <Link href={`/professionals/${worker.id}`} className="block w-full h-full group/card">
                                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg hover:shadow-xl">
                                        <ImageWithFallback
                                            src={imageSrc}
                                            alt={worker.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-2 text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                            <p className="font-bold text-white text-xs md:text-sm leading-tight">{worker.name}</p>
                                            <p className="text-xs text-gray-200 hidden sm:block">{worker.specialization}</p>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <Skeleton className="w-full h-full rounded-full" />
                            )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    </section>
  );
}

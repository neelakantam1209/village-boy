'use client';

import { useEffect, useRef } from 'react';
import { SERVICES } from '@/lib/data';
import { ServiceCard } from '@/components/shared/service-card';
import { Wand2 } from 'lucide-react';

export function RecommendedServices() {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Display 6 services, and duplicate for infinite scroll effect
  const recommendedServices = [...SERVICES, ...SERVICES].slice(0, 12);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollAmount = 0;
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (carousel) {
            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0;
                scrollAmount = 0;
            } else {
                scrollAmount += 1;
                carousel.scrollLeft = scrollAmount;
            }
        }
      }, 25);
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    carousel.addEventListener('mouseenter', stopScrolling);
    carousel.addEventListener('mouseleave', startScrolling);

    startScrolling();

    return () => {
      if(carousel) {
        stopScrolling();
        carousel.removeEventListener('mouseenter', stopScrolling);
        carousel.removeEventListener('mouseleave', startScrolling);
      }
    };
  }, []);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold flex items-center gap-2 text-black">
              <Wand2 className="text-primary"/> Recommended For You
            </h2>
            <p className="text-gray-600 mt-2">
              AI-powered suggestions based on your preferences.
            </p>
          </div>
        </div>
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide"
        >
          {recommendedServices.map((service, index) => (
             <div key={`${service.id}-${index}`} className="flex-shrink-0 w-[300px]">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

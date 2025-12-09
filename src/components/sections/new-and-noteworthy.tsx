'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

const noteworthyItems = [
  {
    name: 'Wood Polish',
    imageUrl: 'https://picsum.photos/seed/noteworthy1/300/200',
    aiHint: 'wood polish',
    tag: null,
  },
  {
    name: 'Wall makeover by Revamp',
    imageUrl: 'https://picsum.photos/seed/noteworthy2/300/200',
    aiHint: 'wall makeover',
    tag: { text: 'NEW', color: 'bg-purple-600' },
  },
  {
    name: 'Native Water Purifier',
    imageUrl: 'https://picsum.photos/seed/noteworthy3/300/200',
    aiHint: 'water purifier',
    tag: null,
  },
  {
    name: 'Full Home Painting',
    imageUrl: 'https://picsum.photos/seed/noteworthy4/300/200',
    aiHint: 'home painting',
    tag: null,
  },
  {
    name: 'Native Smart Locks',
    imageUrl: 'https://picsum.photos/seed/noteworthy5/300/200',
    aiHint: 'smart lock',
    tag: null,
  },
    {
    name: 'Wood Polish',
    imageUrl: 'https://picsum.photos/seed/noteworthy1/300/200',
    aiHint: 'wood polish',
    tag: null,
  },
  {
    name: 'Wall makeover by Revamp',
    imageUrl: 'https://picsum.photos/seed/noteworthy2/300/200',
    aiHint: 'wall makeover',
    tag: { text: 'NEW', color: 'bg-purple-600' },
  },
  {
    name: 'Native Water Purifier',
    imageUrl: 'https://picsum.photos/seed/noteworthy3/300/200',
    aiHint: 'water purifier',
    tag: null,
  },
  {
    name: 'Full Home Painting',
    imageUrl: 'https://picsum.photos/seed/noteworthy4/300/200',
    aiHint: 'home painting',
    tag: null,
  },
  {
    name: 'Native Smart Locks',
    imageUrl: 'https://picsum.photos/seed/noteworthy5/300/200',
    aiHint: 'smart lock',
    tag: null,
  },
];

export default function NewAndNoteworthy() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollAmount = 0;
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (carousel) {
            // If scrolled to the end of the original content, reset to the beginning
            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0; // Reset smoothly
            } else {
                carousel.scrollLeft += 1; // Adjust speed as needed
            }
        }
      }, 25); // Adjust interval for speed
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    carousel.addEventListener('mouseenter', stopScrolling);
    carousel.addEventListener('mouseleave', startScrolling);

    startScrolling();

    return () => {
      if (carousel) {
        stopScrolling();
        carousel.removeEventListener('mouseenter', stopScrolling);
        carousel.removeEventListener('mouseleave', startScrolling);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container overflow-hidden">
        <h2 className="text-3xl font-bold mb-8 text-black">New and noteworthy</h2>
        <div 
          ref={carouselRef}
          className="flex space-x-6 py-4 scrollbar-hide"
        >
          {noteworthyItems.map((item, index) => (
             <div key={index} className="flex-shrink-0 w-[240px]">
              <Card className="rounded-xl overflow-hidden shadow-sm border-gray-200 bg-transparent">
                <CardContent className="p-0 relative">
                  <div className="relative h-40 w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      data-ai-hint={item.aiHint}
                      fill
                      className="object-cover rounded-xl"
                    />
                    {item.tag && (
                      <div className={`absolute top-2 left-2 text-xs font-bold text-white px-2 py-0.5 rounded-full ${item.tag.color}`}>
                        {item.tag.text}
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-base text-black mt-3">{item.name}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

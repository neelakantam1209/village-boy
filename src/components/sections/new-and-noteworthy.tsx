
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { getLocalImageByName } from '@/lib/image-utils';
import ImageWithFallback from '../shared/image-with-fallback';

const noteworthyItems = [
  {
    name: 'Wood Polish',
    imageId: 'noteworthy-wood-polish',
    tag: null,
  },
  {
    name: 'Wall makeover by Revamp',
    imageId: 'noteworthy-wall-makeover',
    tag: { text: 'NEW', color: 'bg-purple-600' },
  },
  {
    name: 'Native Water Purifier',
    imageId: 'noteworthy-water-purifier',
    tag: null,
  },
  {
    name: 'Full Home Painting',
    imageId: 'noteworthy-home-painting',
    tag: null,
  },
  {
    name: 'Native Smart Locks',
    imageId: 'noteworthy-smart-lock',
    tag: null,
  },
    {
    name: 'Wood Polish',
    imageId: 'noteworthy-wood-polish',
    tag: null,
  },
  {
    name: 'Wall makeover by Revamp',
    imageId: 'noteworthy-wall-makeover',
    tag: { text: 'NEW', color: 'bg-purple-600' },
  },
  {
    name: 'Native Water Purifier',
    imageId: 'noteworthy-water-purifier',
    tag: null,
  },
  {
    name: 'Full Home Painting',
    imageId: 'noteworthy-home-painting',
    tag: null,
  },
  {
    name: 'Native Smart Locks',
    imageId: 'noteworthy-smart-lock',
    tag: null,
  },
];

export default function NewAndNoteworthy() {

  return (
    <section className="py-12 bg-gray-50">
      <div className="container overflow-hidden">
        <h2 className="text-3xl font-bold mb-8 text-black">New and noteworthy</h2>
         <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
           plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {noteworthyItems.map((item, index) => {
              const imageSrc = getLocalImageByName(item.imageId || item.name);
              return (
              <CarouselItem key={index} className="pl-4 basis-auto">
                 <div className="w-[240px]">
                  <Card className="rounded-xl overflow-hidden shadow-sm border-gray-200 bg-transparent">
                    <CardContent className="p-0 relative">
                      <div className="relative h-40 w-full">
                        <ImageWithFallback
                          src={imageSrc}
                          alt={item.name}
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
              </CarouselItem>
            )})}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

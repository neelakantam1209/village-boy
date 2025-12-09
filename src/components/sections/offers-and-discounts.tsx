'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const offers = [
  {
    title: 'Entrance wall makeover',
    subtitle: 'Starts at ₹6,999',
    buttonText: 'Explore',
    imageUrl: 'https://picsum.photos/seed/offer1/400/300',
    aiHint: 'wall makeover',
    tag: null,
  },
  {
    title: 'Sofa deep cleaning starting at ₹569',
    subtitle: '',
    buttonText: 'Book now',
    imageUrl: 'https://picsum.photos/seed/offer2/400/300',
    aiHint: 'sofa cleaning',
    tag: null,
  },
  {
    title: 'Wedding-ready packages upto 25% off',
    subtitle: '',
    buttonText: 'Book now',
    imageUrl: 'https://picsum.photos/seed/offer3/400/300',
    aiHint: 'wedding spa',
    tag: { text: 'Price drop', color: 'bg-green-500' },
  },
   {
    title: 'Entrance wall makeover',
    subtitle: 'Starts at ₹6,999',
    buttonText: 'Explore',
    imageUrl: 'https://picsum.photos/seed/offer4/400/300',
    aiHint: 'wall makeover',
    tag: null,
  },
];

export default function OffersAndDiscounts() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-black">Offers &amp; discounts</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {offers.map((offer, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="rounded-xl overflow-hidden shadow-sm border-gray-200">
                    <CardContent className="p-0 relative">
                      <div className="relative h-56 w-full">
                        <Image
                          src={offer.imageUrl}
                          alt={offer.title}
                          data-ai-hint={offer.aiHint}
                          fill
                          className="object-cover"
                        />
                         {offer.tag && (
                          <div className={`absolute top-3 left-3 text-xs font-semibold text-white px-2 py-1 rounded-full ${offer.tag.color}`}>
                            {offer.tag.text}
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-semibold text-lg text-black">{offer.title}</h3>
                        {offer.subtitle && <p className="text-sm text-gray-600 mt-1">{offer.subtitle}</p>}
                        <Button className="mt-4 rounded-lg w-auto">{offer.buttonText}</Button>
                      </div>
                    </CardContent>
                  </Card>
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

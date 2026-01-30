
'use client';

import ImageWithFallback from '@/components/shared/image-with-fallback';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getLocalImageByName } from '@/lib/image-utils';
import Link from 'next/link';

const offers = [
  {
    title: 'Up to 25% Off',
    subtitle: 'On professional painting',
    serviceName: 'Painter',
    image: 'offer-painting-professional',
    buttonText: 'Explore',
    href: '/services/painting'
  },
  {
    title: 'Sofa Cleaning',
    subtitle: 'Starting at just ₹569',
    serviceName: 'Sofa Cleaning',
    image: 'offer-sofa-cleaning',
    buttonText: 'Book now',
    href: '/service/deep-home-cleaning'
  },
  {
    title: 'AC Service & Repair',
    subtitle: 'Save up to 30%',
    serviceName: 'AC Repair',
    image: 'offer-ac-repair-professional',
    buttonText: 'Book now',
    href: '/service/electrician-services'
  },
   {
    title: 'Waterproofing',
    subtitle: 'Starts at ₹8/sq.ft',
    serviceName: 'Plumber',
    image: 'offer-plumbing-professional',
    buttonText: 'Explore',
    href: '/service/plumber-services'
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
            {offers.map((offer, index) => {
               const imageSrc = getLocalImageByName(offer.image || offer.serviceName);
               return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <Link href={offer.href}>
                      <CardContent className="p-0 relative">
                        <div className="relative h-64 w-full">
                          <ImageWithFallback
                            src={imageSrc}
                            alt={offer.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-5 w-full text-white">
                          <p className="text-sm font-medium">{offer.subtitle}</p>
                          <h3 className="font-bold text-xl mt-1 leading-tight">{offer.title}</h3>
                          <Button variant="secondary" className="mt-4 rounded-lg w-auto bg-white/20 text-white backdrop-blur-sm border-white/30 hover:bg-white/30">
                            {offer.buttonText}
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              </CarouselItem>
            )})}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}

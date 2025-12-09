'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RatingStars } from '@/components/shared/rating-stars';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import type { Service } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart } = useCart();
  const image = getPlaceholderImage(service.image);

  return (
    <Card 
      className="overflow-hidden group h-full flex flex-col border-2 border-transparent hover:border-primary transition-all duration-300"
    >
      <Link href={`/service/${service.slug}`} className='flex flex-col flex-grow'>
        <div className="overflow-hidden relative h-48 w-full">
          <Image
            src={image.imageUrl}
            alt={service.name}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <p className="text-sm text-gray-600">{service.location}</p>
          <h3 className="font-semibold text-lg mt-1 truncate text-black">{service.name}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{service.shortDescription}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RatingStars rating={service.rating} />
              <span className="text-sm text-gray-600">({service.reviewsCount})</span>
            </div>
            <p className="font-bold text-lg text-black">${service.price}</p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
         <Button asChild className="w-full">
            <Link href={`/service/${service.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}


'use client';

import ImageWithFallback from '@/components/shared/image-with-fallback';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RatingStars } from '@/components/shared/rating-stars';
import { getLocalImageByName } from '@/lib/image-utils';
import type { Service } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'horizontal-scroll';
}

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const imageSrc = getLocalImageByName(service.image || service.name);

  if (variant === 'horizontal-scroll') {
    return (
       <Card 
        className="overflow-hidden group h-full flex flex-col bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <Link href={`/service/${service.slug}`} className='flex flex-col flex-grow'>
          <div className="overflow-hidden relative h-40 w-full">
            <ImageWithFallback
              src={imageSrc}
              alt={service.name}
              fill
              className="object-cover"
            />
            {service.tags && service.tags.length > 0 && (
                <div className="absolute top-2 left-2 flex gap-1">
                    {service.tags.map(tag => (
                        <Badge key={tag} className={cn(
                            tag.toLowerCase() === 'instant' ? 'bg-blue-500' : 'bg-green-500',
                            'text-white'
                        )}>{tag}</Badge>
                    ))}
                </div>
            )}
          </div>
          <CardContent className="p-3 flex-grow flex flex-col space-y-1">
            <h3 className="font-semibold text-base truncate text-black">{service.name}</h3>
            <div className="flex items-center gap-2">
                <RatingStars rating={service.rating} starClassName='w-3.5 h-3.5' />
                <span className="text-xs text-gray-600">({service.reviewsCount})</span>
            </div>
            <p className="font-bold text-base text-green-600">${service.price}</p>
          </CardContent>
        </Link>
      </Card>
    )
  }

  // Default variant
  return (
    <Card 
      className="overflow-hidden group h-full flex flex-col border-2 border-transparent hover:border-primary transition-all duration-300"
    >
      <Link href={`/service/${service.slug}`} className='flex flex-col flex-grow'>
        <div className="overflow-hidden relative h-48 w-full">
          <ImageWithFallback
            src={imageSrc}
            alt={service.name}
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

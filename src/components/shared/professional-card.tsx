'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RatingStars } from '@/components/shared/rating-stars';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import type { Professional } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';

interface ProfessionalCardProps {
  worker: Professional;
}

export function ProfessionalCard({ worker }: ProfessionalCardProps) {
  const { addToCart } = useCart();
  
  const image = getPlaceholderImage(worker.image);

  return (
    <Card 
      className="overflow-hidden group h-full flex flex-col border-2 border-transparent hover:border-primary transition-all duration-300"
    >
      <Link href={`/professionals/${worker.id}`} className="flex flex-col flex-grow">
        <div className="relative h-56 w-full">
          <Image
            src={image.imageUrl}
            alt={worker.name}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-bold text-lg text-black">{worker.name}</h3>
          <p className="text-sm text-primary font-medium">{worker.specialization}</p>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
            <RatingStars rating={worker.rating} />
            <span>{worker.location}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{worker.experience} years experience</p>
           <p className="font-bold text-lg mt-2 text-black">${worker.price}/hr</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2 items-stretch">
        <Button asChild className="w-full">
          <Link href={`/professionals/${worker.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={() => addToCart(worker as any)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

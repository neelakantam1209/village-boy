import { Star, StarHalf, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  className?: string;
  starClassName?: string;
}

export function RatingStars({ rating, className, starClassName }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className={cn("h-4 w-4 text-yellow-400 fill-yellow-400", starClassName)} />
        ))}
      {halfStar && <StarHalf className={cn("h-4 w-4 text-yellow-400 fill-yellow-400", starClassName)} />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} className={cn("h-4 w-4 text-gray-300 fill-gray-300", starClassName)} />
        ))}
    </div>
  );
}

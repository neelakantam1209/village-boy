import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black">
            All Services
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Explore a wide range of services to meet all your home and personal needs, delivered by trusted professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {CATEGORIES.map(category => {
            const image = getPlaceholderImage(category.image);
            return (
              <Link key={category.id} href={`/services/${category.slug}`}>
                <Card className="h-full group hover:border-primary transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48 w-full">
                     <Image
                      src={image.imageUrl}
                      alt={category.name}
                      data-ai-hint={image.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-black">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                     <div className="mt-4 text-sm font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Services <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}

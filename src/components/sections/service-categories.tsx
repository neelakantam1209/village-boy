import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export function ServiceCategories() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-black">Our Services</h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore a wide range of services to meet all your home needs, delivered by trusted professionals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {CATEGORIES.slice(0, 12).map(category => {
            const image = getPlaceholderImage(category.image);
            return (
              <Link key={category.id} href={`/services/${category.slug}`}>
                <Card className="h-full group hover:border-primary transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-40 w-full">
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
    </section>
  );
}

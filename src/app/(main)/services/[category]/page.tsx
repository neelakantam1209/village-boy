
'use client';
import { notFound } from 'next/navigation';
import { ServiceCard } from '@/components/shared/service-card';
import { Separator } from '@/components/ui/separator';
import ImageWithFallback from '@/components/shared/image-with-fallback';
import { getLocalImageByName } from '@/lib/image-utils';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Service, Category } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const firestore = useFirestore();
  
  const categoryQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'categories'), where('slug', '==', params.category));
  }, [firestore, params.category]);

  const { data: categoryData, isLoading: isCategoryLoading } = useCollection<Category>(categoryQuery);
  
  const servicesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'services'), where('category', '==', params.category));
  }, [firestore, params.category]);

  const { data: services, isLoading: areServicesLoading } = useCollection<Service>(servicesQuery);

  const category = categoryData?.[0] || null;

  const isLoading = isCategoryLoading || areServicesLoading;

  if (!isLoading && !category) {
    notFound();
  }
  
  const imageSrc = getLocalImageByName(category?.image || category?.name);

  return (
    <div className="container py-8 md:py-12">
        {isLoading ? (
            <>
                <div className="flex items-center gap-6">
                    <Skeleton className="w-24 h-24 rounded-lg shrink-0" />
                    <div>
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-5 w-96 mt-2" />
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
                </div>
            </>
        ) : category && (
            <>
                <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <ImageWithFallback
                        src={imageSrc}
                        alt={category.name}
                        fill
                        className="object-cover"
                    />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
                        <p className="text-muted-foreground mt-1">{category.description}</p>
                    </div>
                </div>
                <Separator className="my-8" />
                
                {services && services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold">No Services Found</h2>
                    <p className="text-muted-foreground mt-2">There are no services available in this category yet.</p>
                    </div>
                )}
            </>
        )}
    </div>
  );
}

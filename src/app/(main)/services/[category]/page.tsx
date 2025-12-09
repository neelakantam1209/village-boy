import { notFound } from 'next/navigation';
import { CATEGORIES, SERVICES } from '@/lib/data';
import { ServiceCard } from '@/components/shared/service-card';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  return CATEGORIES.map(category => ({
    category: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = CATEGORIES.find(c => c.slug === params.category);
  if (!category) {
    notFound();
  }

  const services = SERVICES.filter(s => s.category === params.category);

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
          <category.icon className="w-8 h-8" />
        </div>
        <div>
            <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground mt-1">{category.description}</p>
        </div>
      </div>
      <Separator className="my-8" />
      
      {services.length > 0 ? (
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
    </div>
  );
}

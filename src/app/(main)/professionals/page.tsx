import { PROFESSIONALS } from '@/lib/data';
import { ProfessionalCard } from '@/components/shared/professional-card';

export default function ProfessionalsPage() {
  return (
    <div className="bg-white">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black">
            Our Professionals
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Browse our network of skilled, verified, and trusted professionals ready to serve you in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {PROFESSIONALS.map((worker) => (
            <ProfessionalCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </div>
  );
}

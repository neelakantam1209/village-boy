
'use client';

import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import Link from "next/link";

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
          {services.slice(0, 6).map(service => (
             <Link href={`/service/${service.slug}`} key={service.id}>
                <ServiceCard 
                    title={service.title}
                    image={service.image}
                    rating={service.rating}
                    price={service.price}
                    instant={service.instant}
                />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

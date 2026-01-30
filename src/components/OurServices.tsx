
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";
import Link from "next/link";

export default function OurServices() {
  // Duplicate services for a seamless loop
  const displayServices = [...services, ...services];

  return (
    <section className="py-12 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-black">Our Services</h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore a wide range of services to meet all your home needs, delivered by trusted professionals.
        </p>

        <div className="mt-10 group flex flex-nowrap">
          <div className="flex gap-4 animate-scroll-loop [animation-play-state:running] group-hover:[animation-play-state:paused]">
            {displayServices.map((service, index) => (
               <Link href={`/service/${service.slug}`} key={`${service.id}-${index}`} className="block">
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
    </section>
  );
}


'use client';

import ImageWithFallback from '@/components/shared/image-with-fallback';
import Link from 'next/link';
import { getLocalImageByName } from '@/lib/image-utils';

export function Hero() {
  const services = [
    { name: 'Electrician' },
    { name: 'Plumber' },
    { name: 'Painter' },
    { name: 'Trees Work' },
    { name: 'Coconut Climber' },
    { name: 'Courtyard Cleaning' },
    { name: 'Scrap Collection' },
    { name: 'AC Repair' },
  ];

  return (
    <section className="bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left Side: Service Category Box */}
          <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col">
            <div className="bg-background p-4 rounded-md flex-grow flex flex-col">
              <h2 className="text-lg font-semibold mb-4 text-black">What are you looking for?</h2>
              <div className="grid grid-cols-4 gap-4 flex-grow">
                {services.map((service) => {
                  const imageSrc = getLocalImageByName(service.name);
                  return (
                    <Link href={`/search?q=${encodeURIComponent(service.name)}`} key={service.name} className="flex flex-col items-center text-center group">
                      <div className="w-full aspect-square bg-card rounded-lg flex items-center justify-center shadow-md group-hover:bg-primary/10 transition-colors overflow-hidden relative">
                        <ImageWithFallback
                          src={imageSrc}
                          alt={service.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium mt-2 leading-tight text-black">{service.name}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Image Grid */}
          <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full min-h-[450px]">
            <div className="relative rounded-lg overflow-hidden col-span-4 row-span-1">
              <ImageWithFallback 
                src={getLocalImageByName('hero-image-1')} 
                alt="Plumber service" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="relative rounded-lg overflow-hidden col-span-2 row-span-1">
                 <ImageWithFallback 
                  src={getLocalImageByName('hero-image-3')} 
                  alt="Cleaning service" 
                  fill 
                  className="object-cover" 
                />
            </div>
             <div className="relative rounded-lg overflow-hidden col-span-2 row-span-1">
                <ImageWithFallback 
                  src={getLocalImageByName('hero-image-2')} 
                  alt="AC repairman service" 
                  fill 
                  className="object-cover" 
                />
            </div>
             <div className="relative rounded-lg overflow-hidden col-span-1 row-span-1">
                <ImageWithFallback 
                  src={getLocalImageByName('hero-image-4')} 
                  alt="Worker" 
                  fill 
                  className="object-cover" 
                />
            </div>
             <div className="relative rounded-lg overflow-hidden col-span-2 row-span-1">
                <ImageWithFallback 
                  src={getLocalImageByName('hero-image-5')} 
                  alt="Worker" 
                  fill 
                  className="object-cover" 
                />
            </div>
            <div className="relative rounded-lg overflow-hidden col-span-1 row-span-1">
                <ImageWithFallback 
                  src={getLocalImageByName('hero-image-6')} 
                  alt="Worker" 
                  fill 
                  className="object-cover" 
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

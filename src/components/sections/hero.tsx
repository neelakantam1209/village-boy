import Image from 'next/image';
import Link from 'next/link';
import { heroServices } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { ServiceSearch } from '@/components/shared/service-search';
import { LocationSearch } from '@/components/shared/location-search';

export function Hero() {
  return (
    <section className="bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left Side: Service Category Box */}
          <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col">
            <h1 className="text-xl font-bold mb-4 text-foreground">Home services at your doorstep</h1>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <ServiceSearch />
              <LocationSearch />
            </div>
            <div className="bg-background p-4 rounded-md flex-grow flex flex-col">
              <h2 className="text-lg font-semibold mb-4 text-foreground">What are you looking for?</h2>
              <div className="grid grid-cols-4 gap-4 flex-grow">
                {heroServices.map((service) => (
                  <Link href={service.href} key={service.name} className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center shadow-md group-hover:bg-primary/10 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-xs font-medium mt-2 leading-tight text-foreground">{service.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Image Grid */}
          <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full min-h-[450px]">
            <div className="relative rounded-lg overflow-hidden col-span-4 row-span-1">
              <Image 
                src={getPlaceholderImage('hero-image-1').imageUrl} 
                alt="Facial mask service" 
                data-ai-hint={getPlaceholderImage('hero-image-1').imageHint} 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="relative rounded-lg overflow-hidden col-span-2 row-span-1">
                 <Image 
                  src={getPlaceholderImage('hero-image-3').imageUrl} 
                  alt="Cleaning service" 
                  data-ai-hint={getPlaceholderImage('hero-image-3').imageHint} 
                  fill 
                  className="object-cover" 
                />
            </div>
             <div className="relative rounded-lg overflow-hidden col-span-2 row-span-1">
                <Image 
                  src={getPlaceholderImage('hero-image-2').imageUrl} 
                  alt="AC repairman service" 
                  data-ai-hint={getPlaceholderImage('hero-image-2').imageHint} 
                  fill 
                  className="object-cover" 
                />
            </div>
             <div className="relative rounded-lg overflow-hidden col-span-1 row-span-1">
                <Image 
                  src={getPlaceholderImage('hero-image-4').imageUrl} 
                  alt="Worker" 
                  data-ai-hint={getPlaceholderImage('hero-image-4').imageHint} 
                  fill 
                  className="object-cover" 
                />
            </div>
             <div className="relative rounded-lg overflow-hidden col-span-2 row-span-1">
                <Image 
                  src={getPlaceholderImage('hero-image-5').imageUrl} 
                  alt="Worker" 
                  data-ai-hint={getPlaceholderImage('hero-image-5').imageHint} 
                  fill 
                  className="object-cover" 
                />
            </div>
            <div className="relative rounded-lg overflow-hidden col-span-1 row-span-1">
                <Image 
                  src={getPlaceholderImage('hero-image-6').imageUrl} 
                  alt="Worker" 
                  data-ai-hint={getPlaceholderImage('hero-image-6').imageHint} 
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

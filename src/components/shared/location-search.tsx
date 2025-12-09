'use client';

import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function LocationSearch() {
  const router = useRouter();
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
       router.push(`/`);
    }
  }

  return (
     <form onSubmit={handleFormSubmit} className="relative w-full">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
            type="search"
            name="query"
            placeholder="Search for a location..."
            className="pl-10 w-full"
        />
    </form>
  );
}

'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { RecommendedServices } from '@/components/sections/recommended-services';
import { ServiceCategories } from '@/components/sections/service-categories';
import { SearchResults } from '@/components/sections/search-results';
import OffersAndDiscounts from '@/components/sections/offers-and-discounts';
import NewAndNoteworthy from '@/components/sections/new-and-noteworthy';

function PageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <>
      <Hero />
      {query ? <SearchResults query={query} /> : <ServiceCategories />}
      <OffersAndDiscounts />
      <NewAndNoteworthy />
      <HowItWorks />
      <RecommendedServices />
    </>
  );
}

export default function Home() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </React.Suspense>
  );
}

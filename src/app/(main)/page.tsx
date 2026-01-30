'use client';

import React from 'react';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import OurServices from '@/components/OurServices';
import OffersAndDiscounts from '@/components/sections/offers-and-discounts';

export default function Home() {
  return (
    <>
      <Hero />
      <OurServices />
      <OffersAndDiscounts />
      <HowItWorks />
    </>
  );
}

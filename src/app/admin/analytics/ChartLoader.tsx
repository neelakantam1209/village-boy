'use client'; 

import dynamic from 'next/dynamic';

const AnalyticsChart = dynamic(
  () => import('./AnalyticsChart.tsx'), // <--- UPDATED: Added .tsx extension
  { 
    ssr: false, 
    loading: () => <div className="h-[350px] flex items-center justify-center">Loading Chart...</div>
  }
);

export default function ChartLoader() {
  return <AnalyticsChart />;
}
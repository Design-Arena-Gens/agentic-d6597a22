"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-amber-100 to-orange-200">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 mb-4">Loading Leo's Dream...</div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </main>
  );
}

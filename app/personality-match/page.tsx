'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to ensure this component is only rendered on the client
const MBTIMatchContent = dynamic(() => import('./MBTIMatchContent'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading MBTI Match...</div>,
});

export default function MBTIMatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading MBTI Match content... Please wait.</div>}>
      <MBTIMatchContent />
    </Suspense>
  );
} 
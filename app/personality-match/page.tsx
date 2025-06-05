import { Suspense } from 'react';
import MBTIMatchContent from './MBTIMatchContent';

export default function MBTIMatchPage() {
  return (
    <Suspense fallback={<div>Loading MBTI Match content...</div>}>
      <MBTIMatchContent />
    </Suspense>
  );
} 
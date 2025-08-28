
'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useQuality } from '@/hooks/useQuality';

export default function ThreeCanvas({ children }: { children: React.ReactNode }) {
  const quality = useQuality((s) => s.quality);
  const antialias = quality !== 'basic';
  const dpr: [number, number] = quality === 'cinematic' ? [1.5, 2] : [1, 1.5];

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias, powerPreference: 'high-performance' }}
      shadows={quality !== 'basic'}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

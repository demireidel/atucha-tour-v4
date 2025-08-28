
'use client';
import { useQuality } from '@/hooks/useQuality';
import { EffectComposer, Bloom, SMAA, SSAO, DepthOfField } from '@react-three/postprocessing';

export default function PostFX() {
  const quality = useQuality((s) => s.quality);
  if (quality === 'basic') return null;

  return (
    <EffectComposer>
      {quality !== 'cinematic' && <SMAA />}
      <SSAO
        intensity={quality === 'cinematic' ? 0.7 : 0.35}
        radius={quality === 'cinematic' ? 0.25 : 0.15}
      />
      <Bloom
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
        intensity={quality === 'cinematic' ? 1.2 : 0.6}
      />
      {quality === 'cinematic' && (
        <DepthOfField focusDistance={0.02} focalLength={0.035} bokehScale={1.5} />
      )}
    </EffectComposer>
  );
}

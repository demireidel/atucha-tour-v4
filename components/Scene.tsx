
'use client';
import { OrbitControls, Environment } from '@react-three/drei';
import PostFX from './PostFX';
import LoadModel from './loaders/LoadModel';

export default function Scene({ modelUrl }: { modelUrl: string }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight castShadow position={[5, 8, 5]} intensity={1.2} />
      <Environment preset="city" />
      <LoadModel url={modelUrl} />
      <OrbitControls makeDefault enableDamping />
      <PostFX />
    </>
  );
}

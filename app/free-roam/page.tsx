
'use client';
import dynamic from 'next/dynamic';
import ThreeCanvas from '@/components/ThreeCanvas';
import Scene from '@/components/Scene';

const ClientOnlyCanvas = dynamic(() => Promise.resolve(ThreeCanvas), { ssr: false });

export default function FreeRoam() {
  return (
    <div className="h-[calc(100dvh)] bg-black">
      <ClientOnlyCanvas>
        <Scene modelUrl="/models/atucha-ii.glb" />
      </ClientOnlyCanvas>
    </div>
  );
}

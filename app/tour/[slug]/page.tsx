
'use client';
import dynamic from 'next/dynamic';
import ThreeCanvas from '@/components/ThreeCanvas';
import Scene from '@/components/Scene';
import TourPlayer from '@/components/TourPlayer';
import Recorder from '@/components/Recorder';
import ControlBar from '@/components/ui/ControlBar';
import { useEffect } from 'react';
import { useTour } from '@/hooks/useTour';
import { demoTour } from '@/lib/tours';

const ClientOnlyCanvas = dynamic(() => Promise.resolve(ThreeCanvas), { ssr: false });

export default function TourPage({ params }: { params: { slug: string } }) {
  const setKeyframes = useTour((s) => s.setKeyframes);

  useEffect(() => {
    setKeyframes(demoTour);
  }, [setKeyframes]);

  return (
    <div className="h-[calc(100dvh)] bg-black">
      <ClientOnlyCanvas>
        <Scene modelUrl="/models/atucha-ii.glb" />
        <TourPlayer />
        <Recorder />
      </ClientOnlyCanvas>
      <ControlBar />
    </div>
  );
}

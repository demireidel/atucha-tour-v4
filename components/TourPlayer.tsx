
'use client';
import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTour } from '@/hooks/useTour';

/** Interpolates camera along keyframes and disables OrbitControls while playing. */
export default function TourPlayer() {
  const { keyframes, playing, time, duration, seek, pause } = useTour();
  const { camera, controls } = useThree() as any;

  const timeline = useMemo(() => {
    let t = 0;
    return keyframes.map((k) => {
      const start = t;
      t += Math.max(0, k.duration);
      return { ...k, start, end: t };
    });
  }, [keyframes]);

  useEffect(() => {
    if (controls) controls.enabled = !playing;
    return () => { if (controls) controls.enabled = true; };
  }, [controls, playing]);

  const tmpPos = new THREE.Vector3();
  const tmpTgt = new THREE.Vector3();
  const fromPos = new THREE.Vector3();
  const toPos = new THREE.Vector3();
  const fromTgt = new THREE.Vector3();
  const toTgt = new THREE.Vector3();

  useFrame((_, dt) => {
    if (!playing || duration <= 0) return;

    const newTime = Math.min(time + dt, duration);
    seek(newTime);

    const seg = timeline.find(s => newTime >= s.start && newTime <= s.end);
    if (!seg) { pause(); return; }
    const segT = (newTime - seg.start) / Math.max(0.0001, (seg.end - seg.start));

    const idx = timeline.indexOf(seg);
    const k0 = timeline[Math.max(0, idx - 1)] ?? seg;
    const k1 = seg;

    fromPos.set(...k0.position);
    toPos.set(...k1.position);
    fromTgt.set(...k0.target);
    toTgt.set(...k1.target);

    tmpPos.lerpVectors(fromPos, toPos, segT);
    tmpTgt.lerpVectors(fromTgt, toTgt, segT);

    camera.position.copy(tmpPos);
    camera.lookAt(tmpTgt);
    camera.updateProjectionMatrix();
  });

  return null;
}

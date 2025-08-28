
import { create } from 'zustand';

export type Keyframe = {
  position: [number, number, number];
  target: [number, number, number];
  duration: number; // seconds
};

type TourState = {
  keyframes: Keyframe[];
  playing: boolean;
  time: number;
  duration: number;
  setKeyframes: (k: Keyframe[]) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (t: number) => void;
};

export const useTour = create<TourState>((set, get) => ({
  keyframes: [],
  playing: false,
  time: 0,
  duration: 0,
  setKeyframes: (keyframes) => {
    const duration = keyframes.reduce((acc, k) => acc + Math.max(0, k.duration), 0);
    set({ keyframes, duration, time: 0 });
  },
  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  stop: () => set({ playing: false, time: 0 }),
  seek: (t) => set({ time: Math.max(0, Math.min(t, get().duration)) }),
}));

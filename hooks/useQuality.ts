
import { create } from 'zustand';

export type Quality = 'basic' | 'pro' | 'cinematic';

type Store = {
  quality: Quality;
  setQuality: (q: Quality) => void;
};

export const useQuality = create<Store>((set) => ({
  quality: 'basic',
  setQuality: (quality) => set({ quality })
}));

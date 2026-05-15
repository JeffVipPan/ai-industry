import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ViewMode } from '../types/common';

type AppState = {
  mode: ViewMode;
  hoveredId: string | null;
  selectedId: string | null;
  soundEnabled: boolean;
  exploredIds: string[];
  setMode: (mode: ViewMode) => void;
  setHoveredId: (id: string | null) => void;
  setSelectedId: (id: string | null) => void;
  toggleSound: () => void;
  markExplored: (id: string) => void;
  resetExploration: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      mode: 'global',
      hoveredId: null,
      selectedId: null,
      soundEnabled: false,
      exploredIds: [],
      setMode: (mode) => set({ mode }),
      setHoveredId: (hoveredId) => set({ hoveredId }),
      setSelectedId: (selectedId) => set({ selectedId }),
      toggleSound: () =>
        set((state) => {
          if (!state.soundEnabled && typeof window !== 'undefined') {
            type AudioContextConstructor = new () => AudioContext;
            const AudioContextCtor: AudioContextConstructor | undefined =
              window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
            if (AudioContextCtor) {
              const context = new AudioContextCtor();
              const oscillator = context.createOscillator();
              const gain = context.createGain();
              oscillator.frequency.value = 120;
              gain.gain.value = 0.03;
              oscillator.connect(gain);
              gain.connect(context.destination);
              oscillator.start();
              oscillator.stop(context.currentTime + 0.16);
            }
          }
          return { soundEnabled: !state.soundEnabled };
        }),
      markExplored: (id) =>
        set((state) => ({
          exploredIds: state.exploredIds.includes(id) ? state.exploredIds : [...state.exploredIds, id],
          selectedId: id,
        })),
      resetExploration: () => set({ exploredIds: [], selectedId: null, hoveredId: null }),
    }),
    {
      name: 'ai-industry-terminal-state',
      partialize: (state) => ({
        mode: state.mode,
        soundEnabled: state.soundEnabled,
        exploredIds: state.exploredIds,
      }),
    },
  ),
);

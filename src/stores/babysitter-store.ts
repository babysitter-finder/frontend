import { create } from 'zustand';
import { babysittersApi } from '@/lib/api';
import type { Babysitter, BabysitterLocation } from '@/types';

interface BabysitterState {
  babysitters: Babysitter[];
  locations: BabysitterLocation[];
  selectedBabysitter: Babysitter | null;
  loading: boolean;
  error: string | null;

  // Actions
  getBabysitters: () => Promise<void>;
  selectBabysitter: (username: string) => Promise<void>;
  clearSelection: () => void;
  setLocations: (locations: BabysitterLocation[]) => void;
}

export const useBabysitterStore = create<BabysitterState>((set, get) => ({
  babysitters: [],
  locations: [],
  selectedBabysitter: null,
  loading: false,
  error: null,

  getBabysitters: async () => {
    const { babysitters } = get();
    if (babysitters.length > 0) return;

    set({ loading: true, error: null });
    try {
      const { data } = await babysittersApi.getAll(30);
      set({ babysitters: data.results, loading: false });
    } catch {
      set({ error: 'Error al obtener nineras', loading: false });
    }
  },

  selectBabysitter: async (username) => {
    const { babysitters } = get();

    // Try to find in existing list first
    const existing = babysitters.find(b => b.username === username);
    if (existing) {
      set({ selectedBabysitter: existing });
      return;
    }

    set({ loading: true, error: null });
    try {
      const { data } = await babysittersApi.getOne(username);
      set({ selectedBabysitter: data, loading: false });
    } catch {
      set({ error: 'Error al obtener datos de la ninera', loading: false });
    }
  },

  clearSelection: () => set({ selectedBabysitter: null }),

  setLocations: (locations) => set({ locations }),
}));

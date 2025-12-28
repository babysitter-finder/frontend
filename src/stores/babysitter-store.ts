import { create } from 'zustand';
import { babysittersApi } from '@/lib/api';
import type { Babysitter, BabysitterLocation, BabysitterApiResponse } from '@/types';

// Normalize API response to flat Babysitter structure
function normalizeBabysitter(data: BabysitterApiResponse): Babysitter {
  return {
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    picture: data.picture,
    address: data.address,
    lat: data.lat,
    long: data.long,
    // Handle nested user_bbs (public serializer) or flat fields (private/list)
    about_me: data.user_bbs?.about_me || data.about_me,
    education_degree: data.user_bbs?.education_degree || data.education_degree,
    cost_of_service: data.user_bbs?.cost_of_service
      ? parseFloat(data.user_bbs.cost_of_service)
      : data.cost_of_service,
    availabilities: data.user_bbs?.availabilities || data.availabilities,
    // Map reputation to rating
    rating: data.reputation ? parseFloat(data.reputation) : undefined,
    reviews_count: data.reviews_count,
  };
}

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
      // Normalize API response to handle both public and private serializer formats
      const normalized = normalizeBabysitter(data as unknown as BabysitterApiResponse);
      set({ selectedBabysitter: normalized, loading: false });
    } catch {
      set({ error: 'Error al obtener datos de la ninera', loading: false });
    }
  },

  clearSelection: () => set({ selectedBabysitter: null }),

  setLocations: (locations) => set({ locations }),
}));

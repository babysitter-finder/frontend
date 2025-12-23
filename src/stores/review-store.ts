import { create } from 'zustand';
import { reviewsApi } from '@/lib/api';
import type { ReviewForm } from '@/types';

interface ReviewState {
  loading: boolean;
  error: string | null;

  // Actions
  registerReview: (serviceId: string, form: ReviewForm) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set) => ({
  loading: false,
  error: null,

  registerReview: async (serviceId, form) => {
    set({ loading: true, error: null });
    try {
      await reviewsApi.create(serviceId, form);
      set({ loading: false });
      window.location.href = '/';
    } catch {
      set({ error: 'Error al registrar resena', loading: false });
    }
  },
}));

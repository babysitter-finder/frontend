import apiClient from './client';
import type { Review, ReviewForm } from '@/types';

export const reviewsApi = {
  create: (serviceId: string, data: ReviewForm) =>
    apiClient.post<Review>(`/reviews/${serviceId}/service/`, data),
};

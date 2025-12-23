import apiClient from './client';
import type { Babysitter } from '@/types';

export const babysittersApi = {
  getAll: (limit: number = 30) =>
    apiClient.get<{ results: Babysitter[] }>('/users/', { params: { limit } }),

  getOne: (username: string) =>
    apiClient.get<Babysitter>(`/users/${username}/babysitter_data/`),
};

import apiClient from './client';
import type { Babysitter } from '@/types';

export interface UpdateBabysitterForm {
  about_me?: string;
  education_degree?: string;
}

export const babysittersApi = {
  getAll: (limit: number = 30) =>
    apiClient.get<{ results: Babysitter[] }>('/users/', { params: { limit } }),

  getOne: (username: string) =>
    apiClient.get<Babysitter>(`/users/${username}/babysitter_data/`),

  update: (username: string, form: UpdateBabysitterForm) =>
    apiClient.patch(`/users/${username}/babysitter_data/`, form),
};

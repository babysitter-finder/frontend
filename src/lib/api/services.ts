import apiClient from './client';
import type { Service, CreateServiceRequest } from '@/types';

export const servicesApi = {
  getAll: () =>
    apiClient.get<Service[]>('/services/'),

  create: (babysitterUsername: string, data: CreateServiceRequest) =>
    apiClient.post<Service>(`/services/create/${babysitterUsername}/`, data),

  getOne: (id: string) =>
    apiClient.get<Service>(`/services/${id}/`),

  update: (id: string, data: Partial<CreateServiceRequest>) =>
    apiClient.patch<Service>(`/services/${id}/`, data),

  start: (id: string) =>
    apiClient.patch<Service>(`/services/${id}/start`),

  end: (id: string) =>
    apiClient.patch<Service>(`/services/${id}/end`),

  onMyWay: (id: string) =>
    apiClient.patch<Service>(`/services/${id}/on_my_way/`),
};

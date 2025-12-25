import apiClient from './client';
import type { LoginForm, LoginResponse, RegisterForm, UpdateUserForm, User } from '@/types';

export const usersApi = {
  login: (credentials: LoginForm) =>
    apiClient.post<LoginResponse>('/users/login/', credentials),

  signup: (form: RegisterForm) => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });
    return apiClient.post('/users/signup/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getUser: (username: string) =>
    apiClient.get<User & { services: unknown[] }>(`/users/${username}/`),

  updateUser: (username: string, form: UpdateUserForm) => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });
    return apiClient.patch(`/users/${username}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteUser: (username: string) =>
    apiClient.delete(`/users/${username}/`),
};

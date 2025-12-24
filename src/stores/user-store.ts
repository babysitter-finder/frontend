import { create } from 'zustand';
import { usersApi } from '@/lib/api';
import { setAuth, clearAuth, getAuthData } from '@/lib/utils/storage';
import type { User, LoginForm, RegisterForm, UpdateUserForm } from '@/types';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  popUp: boolean;

  // Actions
  login: (credentials: LoginForm) => Promise<void>;
  logout: () => void;
  register: (form: RegisterForm) => Promise<void>;
  getUserData: () => Promise<void>;
  updateUserData: (form: UpdateUserForm) => Promise<void>;
  closePopUp: () => void;
  setError: (error: string | null) => void;
  hydrate: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  popUp: false,

  hydrate: () => {
    const authData = getAuthData();
    if (authData.token && authData.username) {
      set({
        user: {
          username: authData.username,
          first_name: authData.name || '',
          last_name: '',
          email: '',
          birthdate: '',
          genre: 'male',
          phone_number: '',
          address: '',
          picture: authData.picture || undefined,
          user_bbs: authData.user_bbs,
        },
      });
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const { data } = await usersApi.login(credentials);
      setAuth({
        token: data.access_token,
        username: data.user.username,
        name: data.user.first_name,
        picture: data.user.picture,
        user_bbs: data.user.user_bbs,
      });
      set({
        user: {
          username: data.user.username,
          first_name: data.user.first_name,
          last_name: '',
          email: '',
          birthdate: '',
          genre: 'male',
          phone_number: '',
          address: '',
          picture: data.user.picture,
          user_bbs: data.user.user_bbs,
        },
        loading: false,
      });
      window.location.href = '/';
    } catch {
      set({ error: 'Error al iniciar sesion', loading: false });
    }
  },

  logout: () => {
    clearAuth();
    set({ user: null });
    window.location.href = '/login';
  },

  register: async (form) => {
    set({ loading: true, error: null });
    try {
      await usersApi.signup(form);
      set({ loading: false, popUp: true });
    } catch {
      set({ error: 'Error al registrarse', loading: false });
    }
  },

  getUserData: async () => {
    const { user } = get();
    const authData = getAuthData();

    if (!authData.username) return;

    // If user already has full data, skip
    if (user && user.email) return;

    set({ loading: true });
    try {
      const { data } = await usersApi.getUser(authData.username);
      // Preserve user_bbs from auth data if not in API response
      set({
        user: {
          ...data,
          user_bbs: data.user_bbs ?? authData.user_bbs
        },
        loading: false
      });
    } catch {
      set({ error: 'Error al obtener datos del usuario', loading: false });
    }
  },

  updateUserData: async (form) => {
    const { user } = get();
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const { data } = await usersApi.updateUser(user.username, form);
      set({ user: { ...user, ...data }, loading: false });
      window.location.href = '/';
    } catch {
      set({ error: 'Error al actualizar datos', loading: false });
    }
  },

  closePopUp: () => set({ popUp: false }),
  setError: (error) => set({ error }),
}));

import { create } from 'zustand';
import { servicesApi } from '@/lib/api';
import type { Service, ServiceForm } from '@/types';

interface ServiceState {
  serviceForm: Partial<ServiceForm>;
  editForm: Service | null;
  services: Service[];
  loading: boolean;
  error: string | null;

  // Actions
  setServiceForm: (form: Partial<ServiceForm>) => void;
  clearServiceForm: () => void;
  fetchServices: () => Promise<void>;
  registerService: (babysitterUsername: string) => Promise<void>;
  updateService: (id: string, form: Partial<ServiceForm>) => Promise<void>;
  getService: (id: string) => Promise<void>;
  startService: (id: string) => Promise<void>;
  endService: (id: string) => Promise<void>;
  onMyWay: (id: string) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  acceptService: (id: string) => Promise<void>;
  rejectService: (id: string) => Promise<void>;
  setServices: (services: Service[]) => void;
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  serviceForm: {},
  editForm: null,
  services: [],
  loading: false,
  error: null,

  setServiceForm: (form) => {
    const { serviceForm } = get();
    set({ serviceForm: { ...serviceForm, ...form } });
  },

  clearServiceForm: () => set({ serviceForm: {} }),

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await servicesApi.getAll();
      // Handle both array and paginated response formats
      const services = Array.isArray(data) ? data : (data as { results?: Service[] }).results || [];
      set({ services, loading: false });
    } catch {
      set({ error: 'Error al cargar servicios', loading: false });
    }
  },

  registerService: async (babysitterUsername) => {
    const { serviceForm } = get();

    set({ loading: true, error: null });
    try {
      const { data } = await servicesApi.create(babysitterUsername, {
        date: serviceForm.date || '',
        count_children: serviceForm.count_children || 1,
        shift: serviceForm.shift || 'morning',
        address: serviceForm.address || '',
        special_cares: serviceForm.special_cares || '',
        lat: serviceForm.lat || '',
        long: serviceForm.long || '',
      });
      set({ loading: false, serviceForm: {}, editForm: data });
      window.location.href = `/service/resume/${data.id}`;
    } catch {
      set({ error: 'Error al crear servicio', loading: false });
    }
  },

  updateService: async (id, form) => {
    set({ loading: true, error: null });
    try {
      await servicesApi.update(id, {
        date: form.date,
        count_children: form.count_children,
        shift: form.shift,
        address: form.address,
        special_cares: form.special_cares,
        lat: form.lat,
        long: form.long,
      });
      set({ loading: false });
      window.location.href = '/';
    } catch {
      set({ error: 'Error al actualizar servicio', loading: false });
    }
  },

  getService: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await servicesApi.getOne(id);
      set({ editForm: data, loading: false });
    } catch {
      set({ error: 'Error al obtener servicio', loading: false });
    }
  },

  startService: async (id) => {
    set({ loading: true, error: null });
    try {
      await servicesApi.start(id);
      set({ loading: false });
      window.location.href = '/';
    } catch {
      set({ error: 'Error al iniciar servicio', loading: false });
    }
  },

  endService: async (id) => {
    set({ loading: true, error: null });
    try {
      await servicesApi.end(id);
      set({ loading: false });
      window.location.href = '/';
    } catch {
      set({ error: 'Error al finalizar servicio', loading: false });
    }
  },

  onMyWay: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await servicesApi.onMyWay(id);
      set({ editForm: data, loading: false });
    } catch {
      set({ error: 'Error al actualizar estado', loading: false });
    }
  },

  deleteService: async (id) => {
    const { services } = get();
    set({ loading: true, error: null });
    try {
      await servicesApi.delete(id);
      set({
        services: services.filter((s) => s.id !== id),
        loading: false,
      });
    } catch {
      set({ error: 'Error al eliminar cita', loading: false });
    }
  },

  acceptService: async (id) => {
    const { services } = get();
    set({ loading: true, error: null });
    try {
      const { data } = await servicesApi.accept(id);
      set({
        services: services.map((s) => (s.id === id ? data : s)),
        loading: false,
      });
    } catch {
      set({ error: 'Error al aceptar servicio', loading: false });
    }
  },

  rejectService: async (id) => {
    const { services } = get();
    set({ loading: true, error: null });
    try {
      const { data } = await servicesApi.reject(id);
      set({
        services: services.map((s) => (s.id === id ? data : s)),
        loading: false,
      });
    } catch {
      set({ error: 'Error al rechazar servicio', loading: false });
    }
  },

  setServices: (services) => set({ services }),
}));

import { User } from './user';
import { Babysitter } from './babysitter';

export type ServiceStatus = 'pending' | 'accepted' | 'on_my_way' | 'in_progress' | 'completed' | 'cancelled';

export type Shift = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Service {
  id: string;
  date: string;
  count_children: number;
  shift: Shift;
  address: string;
  special_cares: string;
  lat: string;
  long: string;
  status?: ServiceStatus;
  babysitter?: Babysitter;
  client?: User;
  user_client?: User;
  cost?: number;
  created_at?: string;
  scheduled_start?: string;
  on_my_way?: string | null;
  service_start?: string | null;
  service_end?: string | null;
  is_active?: boolean;
}

export interface ServiceForm {
  date: string;
  count_children: number;
  shift: Shift;
  address: string;
  special_cares: string;
  lat: string;
  long: string;
}

export interface CreateServiceRequest {
  date: string;
  count_children: number;
  shift: string;
  address: string;
  special_cares: string;
  lat: string;
  long: string;
}

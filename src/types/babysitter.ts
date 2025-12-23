import { Availability } from './user';

export interface Babysitter {
  username: string;
  first_name: string;
  last_name: string;
  picture?: string;
  address: string;
  lat: string;
  long: string;
  about_me: string;
  education_degree: string;
  cost_of_service: number;
  availabilities: Availability[];
  rating?: number;
  reviews_count?: number;
}

export interface BabysitterLocation {
  username: string;
  lat: number;
  lng: number;
  name: string;
  picture?: string;
}

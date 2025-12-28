import { Availability } from './user';

export interface Babysitter {
  username: string;
  first_name: string;
  last_name: string;
  picture?: string;
  address?: string;
  lat?: string;
  long?: string;
  about_me?: string;
  education_degree?: string;
  cost_of_service?: number;
  availabilities?: Availability[];
  rating?: number;
  reviews_count?: number;
}

// API response format from public serializer
export interface BabysitterApiResponse {
  username: string;
  first_name: string;
  last_name: string;
  fullname?: string;
  reputation?: string;
  genre?: string;
  picture?: string;
  // Private fields (only for owner)
  address?: string;
  lat?: string;
  long?: string;
  // Nested babysitter data (public serializer)
  user_bbs?: {
    education_degree?: string;
    about_me?: string;
    cost_of_service?: string;
    availabilities?: Availability[];
  };
  // Flat fields (private serializer / list response)
  about_me?: string;
  education_degree?: string;
  cost_of_service?: number;
  availabilities?: Availability[];
}

export interface BabysitterLocation {
  username: string;
  lat: number;
  lng: number;
  name: string;
  picture?: string;
}

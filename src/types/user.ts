export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  picture?: string;
  birthdate: string;
  genre: 'male' | 'female';
  phone_number: string;
  address: string;
  lat?: string;
  long?: string;
  user_bbs?: boolean;
}

export interface BabysitterProfile {
  about_me: string;
  education_degree: string;
  cost_of_service: number;
  availabilities: Availability[];
}

export interface Availability {
  day: string;
  start: string;
  end: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birthdate: string;
  genre: 'male' | 'female';
  phone_number: string;
  address: string;
  picture?: File;
  user_bbs?: boolean;
}

export interface UpdateUserForm {
  first_name?: string;
  last_name?: string;
  email?: string;
  birthdate?: string;
  genre?: 'male' | 'female';
  phone_number?: string;
  address?: string;
  picture?: File;
}

export interface LoginResponse {
  access_token: string;
  user: {
    username: string;
    first_name: string;
    picture?: string;
    user_bbs: boolean;
  };
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'DRIVER' | 'PASSENGER' | 'ADMIN';
  profilePicture: string;
  rating: number;
}

export interface Trip {
  id: number;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  price: number;
  availableSeats: number;
  driver?: User;
}
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'DRIVER' | 'PASSENGER' | 'ADMIN';
  profilePicture: string;
  rating: number;
  phoneNumber?: string;
  bio?: string;
  preferences?: {
    smoking: boolean;
    animals: boolean;
    music: boolean;
  };
}

export interface Trip {
  id: number;
  departureCity: string;
  arrivalCity: string;
  departureAddress: string;
  arrivalAddress: string;
  departureDate: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  description?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  carModel: string;
  carColor: string;
  driver?: User;
  createdAt: string;
}
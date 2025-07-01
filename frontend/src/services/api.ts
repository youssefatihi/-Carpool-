import axios from 'axios';
import { Trip, User } from '../types';

// Configuration de base d'axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types pour les réponses
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Services API
export const tripService = {
  // Récupérer tous les trajets avec pagination
  getTrips: async (page = 0, size = 10) => {
    const response = await api.get<PageResponse<Trip>>('/trips', {
      params: { page, size, sort: 'departureDate,asc' }
    });
    return response.data;
  },
  
  // Rechercher des trajets
  searchTrips: async (params: {
    departureCity?: string;
    arrivalCity?: string;
    date?: string;
    minPrice?: number;
    maxPrice?: number;
    availableSeats?: number;
  }) => {
    const response = await api.get<Trip[]>('/trips/search', { params });
    return response.data;
  },
  
  // Récupérer un trajet par ID
  getTripById: async (id: number) => {
    const response = await api.get<Trip>(`/trips/${id}`);
    return response.data;
  },
  
  // Créer un trajet
  createTrip: async (trip: Omit<Trip, 'id' | 'driver' | 'createdAt'>) => {
    const response = await api.post<Trip>('/trips', trip);
    return response.data;
  }
};

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password
    });
    return response.data;
  },
  
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'DRIVER' | 'PASSENGER';
  }) => {
    const response = await api.post<LoginResponse>('/auth/register', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
};

export default api;
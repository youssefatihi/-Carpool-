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
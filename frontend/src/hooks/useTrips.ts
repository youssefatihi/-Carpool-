import { useState, useEffect } from 'react';
import { Trip } from '../types';
import { tripService } from '../services/api';

interface UseTripsResult {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  refresh: () => void;
}

export function useTrips(page = 0, size = 10): UseTripsResult {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  
  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await tripService.getTrips(page, size);
      
      setTrips(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      console.error('Erreur fetch trips:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTrips();
  }, [page, size]); // Re-fetch si la page ou la taille change
  
  return {
    trips,
    loading,
    error,
    totalPages,
    currentPage: page,
    refresh: fetchTrips
  };
}

// Hook pour la recherche
export function useTripSearch() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchTrips = async (filters: Parameters<typeof tripService.searchTrips>[0]) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await tripService.searchTrips(filters);
      setTrips(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche');
      console.error('Erreur search trips:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    trips,
    loading,
    error,
    searchTrips
  };
}
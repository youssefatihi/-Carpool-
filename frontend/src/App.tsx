import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TripCard from './components/TripCard';
import SearchBar, { SearchFilters } from './components/SearchBar';
import { Trip } from './types';

// Liste des villes pour l'autocomplétion
const CITIES = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes',
  'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Grenoble', 'Montpellier'
];
// Données mockées
const mockTrips: Trip[] = [
  {
    id: 1,
    departureCity: 'Paris',
    arrivalCity: 'Lyon',
    departureAddress: 'Gare de Lyon, Paris',
    arrivalAddress: 'Gare Part-Dieu, Lyon',
    departureDate: '2025-07-15T08:00:00',
    price: 25,
    availableSeats: 2,
    totalSeats: 4,
    description: 'Trajet direct sur autoroute. Musique douce, pauses possibles.',
    status: 'ACTIVE',
    carModel: 'Peugeot 308',
    carColor: 'Gris métallisé',
    driver: {
      id: 1,
      email: 'jean.dupont@example.com',
      firstName: 'Jean',
      lastName: 'Dupont',
      role: 'DRIVER',
      profilePicture: 'https://i.pravatar.cc/150?u=jean.dupont',
      rating: 4.7,
      preferences: {
        smoking: false,
        animals: true,
        music: true
      }
    },
    createdAt: '2025-07-01T10:00:00'
  },
  {
    id: 2,
    departureCity: 'Lyon',
    arrivalCity: 'Marseille',
    departureAddress: 'Bellecour, Lyon',
    arrivalAddress: 'Vieux-Port, Marseille',
    departureDate: '2025-07-16T14:30:00',
    price: 35,
    availableSeats: 0,
    totalSeats: 3,
    description: 'Départ de Bellecour. Non-fumeur uniquement.',
    status: 'ACTIVE',
    carModel: 'Renault Clio',
    carColor: 'Rouge',
    driver: {
      id: 2,
      email: 'marie.martin@example.com',
      firstName: 'Marie',
      lastName: 'Martin',
      role: 'DRIVER',
      profilePicture: 'https://i.pravatar.cc/150?u=marie.martin',
      rating: 4.9,
      preferences: {
        smoking: false,
        animals: false,
        music: true
      }
    },
    createdAt: '2025-07-01T11:00:00'
  },
  {
    id: 3,
    departureCity: 'Paris',
    arrivalCity: 'Bordeaux',
    departureAddress: 'Porte d\'Orléans, Paris',
    arrivalAddress: 'Gare Saint-Jean, Bordeaux',
    departureDate: '2025-07-20T07:00:00',
    price: 45,
    availableSeats: 3,
    totalSeats: 3,
    description: 'Voyage confortable, plusieurs pauses prévues. Bagages bienvenus.',
    status: 'ACTIVE',
    carModel: 'Volkswagen Passat',
    carColor: 'Noir',
    driver: {
      id: 3,
      email: 'pierre.bernard@example.com',
      firstName: 'Pierre',
      lastName: 'Bernard',
      role: 'DRIVER',
      profilePicture: 'https://i.pravatar.cc/150?u=pierre.bernard',
      rating: 4.5,
      preferences: {
        smoking: false,
        animals: true,
        music: false
      }
    },
    createdAt: '2025-07-01T12:00:00'
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(mockTrips);
  const [activeFilters, setActiveFilters] = useState<SearchFilters | null>(null);
  
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  
  const handleBookTrip = (tripId: number) => {
    alert(`Réservation pour le trajet ${tripId} (fonctionnalité à implémenter)`);
  };
  
  const handleSearch = (filters: SearchFilters) => {
    setActiveFilters(filters);
    
    // Filtrer les trajets
    const filtered = mockTrips.filter(trip => {
      // Filtre par ville de départ
      if (filters.departure && 
          !trip.departureCity.toLowerCase().includes(filters.departure.toLowerCase())) {
        return false;
      }
      
      // Filtre par ville d'arrivée
      if (filters.arrival && 
          !trip.arrivalCity.toLowerCase().includes(filters.arrival.toLowerCase())) {
        return false;
      }
      
      // Filtre par date
      if (filters.date) {
        const tripDate = new Date(trip.departureDate).toISOString().split('T')[0];
        if (tripDate !== filters.date) {
          return false;
        }
      }
      
      // Filtre par prix
      if (trip.price < filters.minPrice || trip.price > filters.maxPrice) {
        return false;
      }
      
      // Filtre par places disponibles
      if (trip.availableSeats < filters.availableSeats) {
        return false;
      }
      
      return true;
    });
    
    setFilteredTrips(filtered);
  };
  
  return (
    <div className="app">
      <Header 
        isLoggedIn={isLoggedIn}
        userName="Jean Dupont"
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <main>
        <div className="hero-section">
          <h1>Trouvez votre prochain trajet</h1>
          <p>Voyagez ensemble, économisez plus</p>
        </div>
        
        <SearchBar onSearch={handleSearch} cities={CITIES} />
        
        <div className="results-section">
          <h2>
            {activeFilters 
              ? `${filteredTrips.length} trajet${filteredTrips.length > 1 ? 's' : ''} trouvé${filteredTrips.length > 1 ? 's' : ''}`
              : 'Trajets disponibles'
            }
          </h2>
          
          {filteredTrips.length === 0 ? (
            <div className="no-results">
              <p>😕 Aucun trajet ne correspond à vos critères.</p>
              <p>Essayez de modifier vos filtres ou de rechercher d'autres villes.</p>
            </div>
          ) : (
            <div className="trips-list">
              {filteredTrips.map(trip => (
                <TripCard 
                  key={trip.id}
                  trip={trip}
                  onBook={handleBookTrip}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
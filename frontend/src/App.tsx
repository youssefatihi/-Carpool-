import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TripCard from './components/TripCard';
import SearchBar, { SearchFilters } from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useTrips, useTripSearch } from './hooks/useTrips';

const CITIES = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes',
  'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Grenoble', 'Montpellier'
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  // Hook pour charger tous les trajets
  const { 
    trips: allTrips, 
    loading: loadingAll, 
    error: errorAll, 
    totalPages,
    refresh 
  } = useTrips(currentPage, 9);
  
  // Hook pour la recherche
  const { 
    trips: searchResults, 
    loading: loadingSearch, 
    error: errorSearch, 
    searchTrips 
  } = useTripSearch();
  
  // Déterminer quels trajets afficher
  const displayedTrips = isSearchMode ? searchResults : allTrips;
  const loading = isSearchMode ? loadingSearch : loadingAll;
  const error = isSearchMode ? errorSearch : errorAll;
  
  // Vérifier si l'utilisateur est connecté au montage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };
  
  const handleBookTrip = (tripId: number) => {
    if (!isLoggedIn) {
      alert('Veuillez vous connecter pour réserver un trajet');
      return;
    }
    alert(`Réservation pour le trajet ${tripId} (fonctionnalité à implémenter)`);
  };
  
  const handleSearch = async (filters: SearchFilters) => {
    setIsSearchMode(true);
    setCurrentPage(0); // Reset page
    
    // Convertir les filtres pour l'API
    const apiFilters = {
      departureCity: filters.departure || undefined,
      arrivalCity: filters.arrival || undefined,
      date: filters.date || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      availableSeats: filters.availableSeats || undefined
    };
    
    await searchTrips(apiFilters);
  };
  
  const handleResetSearch = () => {
    setIsSearchMode(false);
    setCurrentPage(0);
  };
  
  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSearchMode) {
        refresh();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isSearchMode, refresh]);
  
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
          <div className="results-header">
            <h2>
              {isSearchMode 
                ? `${displayedTrips.length} résultat${displayedTrips.length > 1 ? 's' : ''} trouvé${displayedTrips.length > 1 ? 's' : ''}`
                : 'Tous les trajets'
              }
            </h2>
            {isSearchMode && (
              <button onClick={handleResetSearch} className="btn-clear-search">
                ❌ Effacer la recherche
              </button>
            )}
          </div>
          
          {loading ? (
            <LoadingSpinner message="Chargement des trajets..." />
          ) : error ? (
            <ErrorMessage 
              error={error} 
              onRetry={isSearchMode ? undefined : refresh} 
            />
          ) : displayedTrips.length === 0 ? (
            <div className="no-results">
              <p>😕 Aucun trajet disponible.</p>
              {isSearchMode && (
                <p>Essayez de modifier vos critères de recherche.</p>
              )}
            </div>
          ) : (
            <>
              <div className="trips-list">
                {displayedTrips.map(trip => (
                  <TripCard 
                    key={trip.id}
                    trip={trip}
                    onBook={handleBookTrip}
                  />
                ))}
              </div>
              
              {/* Pagination pour tous les trajets */}
              {!isSearchMode && totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="btn-pagination"
                  >
                    ← Précédent
                  </button>
                  
                  <span className="page-info">
                    Page {currentPage + 1} sur {totalPages}
                  </span>
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="btn-pagination"
                  >
                    Suivant →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
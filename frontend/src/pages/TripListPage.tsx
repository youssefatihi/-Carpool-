import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar, { SearchFilters } from '../components/SearchBar';
import TripCard from '../components/TripCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useTrips, useTripSearch } from '../hooks/useTrips';

const CITIES = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes',
  'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Grenoble', 'Montpellier'
];

function TripListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  // Récupérer les filtres depuis l'URL si présents
  useEffect(() => {
    const departure = searchParams.get('from');
    const arrival = searchParams.get('to');
    if (departure || arrival) {
      setIsSearchMode(true);
      // Déclencher une recherche avec ces params
    }
  }, [searchParams]);
  
  const { trips: allTrips, loading: loadingAll, error: errorAll, totalPages, refresh } = useTrips(currentPage, 9);
  const { trips: searchResults, loading: loadingSearch, error: errorSearch, searchTrips } = useTripSearch();
  
  const displayedTrips = isSearchMode ? searchResults : allTrips;
  const loading = isSearchMode ? loadingSearch : loadingAll;
  const error = isSearchMode ? errorSearch : errorAll;
  
  // Navigation vers le détail d'un trajet
  const handleTripClick = (tripId: number) => {
    navigate(`/trips/${tripId}`);
  };
  
  const handleSearch = async (filters: SearchFilters) => {
    setIsSearchMode(true);
    setCurrentPage(0);
    
    // Mettre à jour l'URL avec les params de recherche
    const params = new URLSearchParams();
    if (filters.departure) params.set('from', filters.departure);
    if (filters.arrival) params.set('to', filters.arrival);
    if (filters.date) params.set('date', filters.date);
    
    navigate(`/trips?${params.toString()}`);
    
    // Lancer la recherche
    await searchTrips({
      departureCity: filters.departure,
      arrivalCity: filters.arrival,
      date: filters.date,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      availableSeats: filters.availableSeats
    });
  };
  
  return (
    <div className="trip-list-page">
      <div className="page-header">
        <h1>Tous les trajets</h1>
        <p>Trouvez le trajet parfait pour votre voyage</p>
      </div>
      
      {/* Barre de recherche */}
      <SearchBar onSearch={handleSearch} cities={CITIES} />
      
      {/* Résultats */}
      <div className="results-section">
        {loading ? (
          <LoadingSpinner message="Chargement des trajets..." />
        ) : error ? (
          <ErrorMessage error={error} onRetry={refresh} />
        ) : (
          <>
            <h2>
              {isSearchMode 
                ? `${displayedTrips.length} résultat${displayedTrips.length !== 1 ? 's' : ''}`
                : `${displayedTrips.length} trajets disponibles`
              }
            </h2>
            
            <div className="trips-grid">
              {displayedTrips.map(trip => (
                <TripCard 
                  key={trip.id}
                  trip={trip}
                  onBook={() => handleTripClick(trip.id)}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {!isSearchMode && totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                >
                  ← Précédent
                </button>
                <span>Page {currentPage + 1} sur {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  Suivant →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TripListPage;
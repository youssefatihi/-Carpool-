import { useState } from 'react';

export interface SearchFilters {
  departure: string;
  arrival: string;
  date: string;
  minPrice: number;
  maxPrice: number;
  availableSeats: number;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  cities?: string[]; // Liste des villes pour l'autocomplétion
}

function SearchBar({ onSearch, cities = [] }: SearchBarProps) {
  // State pour chaque champ
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [availableSeats, setAvailableSeats] = useState(1);
  
  // State pour les suggestions d'autocomplétion
  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
  const [showArrivalSuggestions, setShowArrivalSuggestions] = useState(false);
  
  // Filtrer les villes pour l'autocomplétion
  const getDepartureSuggestions = () => {
    return cities.filter(city => 
      city.toLowerCase().includes(departure.toLowerCase()) && city !== departure
    );
  };
  
  const getArrivalSuggestions = () => {
    return cities.filter(city => 
      city.toLowerCase().includes(arrival.toLowerCase()) && city !== arrival
    );
  };
  
  // Gérer la soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!departure || !arrival) {
      alert('Veuillez renseigner les villes de départ et d\'arrivée');
      return;
    }
    
    onSearch({
      departure,
      arrival,
      date,
      minPrice,
      maxPrice,
      availableSeats
    });
  };
  
  // Réinitialiser les filtres
  const handleReset = () => {
    setDeparture('');
    setArrival('');
    setDate('');
    setMinPrice(0);
    setMaxPrice(100);
    setAvailableSeats(1);
    setShowAdvanced(false);
  };
  
  // Obtenir la date minimale (aujourd'hui)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-main">
        {/* Champ départ avec autocomplétion */}
        <div className="search-field">
          <label htmlFor="departure">🚗 Départ</label>
          <div className="autocomplete-wrapper">
            <input
              id="departure"
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              onFocus={() => setShowDepartureSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDepartureSuggestions(false), 200)}
              placeholder="D'où partez-vous ?"
              className="search-input"
              autoComplete="off"
            />
            {showDepartureSuggestions && getDepartureSuggestions().length > 0 && (
              <ul className="suggestions">
                {getDepartureSuggestions().map(city => (
                  <li 
                    key={city}
                    onClick={() => {
                      setDeparture(city);
                      setShowDepartureSuggestions(false);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Champ arrivée avec autocomplétion */}
        <div className="search-field">
          <label htmlFor="arrival">📍 Arrivée</label>
          <div className="autocomplete-wrapper">
            <input
              id="arrival"
              type="text"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              onFocus={() => setShowArrivalSuggestions(true)}
              onBlur={() => setTimeout(() => setShowArrivalSuggestions(false), 200)}
              placeholder="Où allez-vous ?"
              className="search-input"
              autoComplete="off"
            />
            {showArrivalSuggestions && getArrivalSuggestions().length > 0 && (
              <ul className="suggestions">
                {getArrivalSuggestions().map(city => (
                  <li 
                    key={city}
                    onClick={() => {
                      setArrival(city);
                      setShowArrivalSuggestions(false);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Champ date */}
        <div className="search-field">
          <label htmlFor="date">📅 Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getMinDate()}
            className="search-input"
          />
        </div>
        
        {/* Boutons d'action */}
        <div className="search-actions">
          <button type="submit" className="btn-search">
            🔍 Rechercher
          </button>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn-advanced"
          >
            ⚙️ {showAdvanced ? 'Moins' : 'Plus'} d'options
          </button>
        </div>
      </div>
      
      {/* Filtres avancés */}
      {showAdvanced && (
        <div className="search-advanced">
          <div className="advanced-field">
            <label>💰 Prix (€)</label>
            <div className="price-range">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                min="0"
                placeholder="Min"
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                min="0"
                placeholder="Max"
                className="price-input"
              />
            </div>
          </div>
          
          <div className="advanced-field">
            <label htmlFor="seats">💺 Places minimum</label>
            <input
              id="seats"
              type="number"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(Number(e.target.value))}
              min="1"
              max="8"
              className="seats-input"
            />
          </div>
          
          <button
            type="button"
            onClick={handleReset}
            className="btn-reset"
          >
            🔄 Réinitialiser
          </button>
        </div>
      )}
    </form>
  );
}

export default SearchBar;
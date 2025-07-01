import { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onBook?: (tripId: number) => void;
  showDriver?: boolean;
  className?: string;
}

function TripCard({ 
  trip, 
  onBook, 
  showDriver = true,
  className = '' 
}: TripCardProps) {
  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calculer le pourcentage de places restantes
  const availabilityPercentage = (trip.availableSeats / trip.totalSeats) * 100;
  
  // Déterminer la couleur selon la disponibilité
  const getAvailabilityColor = () => {
    if (availabilityPercentage === 0) return 'text-red-600';
    if (availabilityPercentage <= 25) return 'text-orange-600';
    return 'text-green-600';
  };

  const handleBookClick = () => {
    if (onBook && trip.availableSeats > 0) {
      onBook(trip.id);
    }
  };

  return (
    <div className={`trip-card ${className}`}>
      {/* En-tête avec les villes */}
      <div className="trip-header">
        <h3 className="trip-route">
          <span className="city">{trip.departureCity}</span>
          <span className="arrow">→</span>
          <span className="city">{trip.arrivalCity}</span>
        </h3>
        <div className="trip-price">
          <span className="price-amount">{trip.price}€</span>
          <span className="price-label">/ place</span>
        </div>
      </div>

      {/* Détails du trajet */}
      <div className="trip-details">
        <div className="detail-item">
          <span className="icon">📅</span>
          <span>{formatDate(trip.departureDate)}</span>
        </div>
        
        <div className="detail-item">
          <span className="icon">📍</span>
          <span>{trip.departureAddress}</span>
        </div>

        <div className="detail-item">
          <span className="icon">🚗</span>
          <span>{trip.carModel} • {trip.carColor}</span>
        </div>

        <div className={`detail-item ${getAvailabilityColor()}`}>
          <span className="icon">💺</span>
          <span>
            {trip.availableSeats} / {trip.totalSeats} places disponibles
          </span>
        </div>
      </div>

      {/* Info conducteur */}
      {showDriver && trip.driver && (
        <div className="driver-info">
          <img 
            src={trip.driver.profilePicture} 
            alt={`${trip.driver.firstName} ${trip.driver.lastName}`}
            className="driver-avatar"
          />
          <div className="driver-details">
            <span className="driver-name">
              {trip.driver.firstName} {trip.driver.lastName}
            </span>
            <div className="driver-rating">
              <span className="star">⭐</span>
              <span>{trip.driver.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      {trip.description && (
        <p className="trip-description">{trip.description}</p>
      )}

      {/* Action */}
      <div className="trip-actions">
        <button 
          className="btn-book"
          onClick={handleBookClick}
          disabled={trip.availableSeats === 0}
        >
          {trip.availableSeats === 0 ? 'Complet' : 'Réserver'}
        </button>
      </div>
    </div>
  );
}

export default TripCard;
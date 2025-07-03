import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Trip } from '../types';
import { tripService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function TripDetailPage() {
  const { id } = useParams<{ id: string }>(); // id vient de l'URL
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Charger les détails du trajet
    const loadTrip = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await tripService.getTripById(parseInt(id));
        setTrip(data);
      } catch (err) {
        setError('Impossible de charger le trajet');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTrip();
  }, [id]); // Se recharge si l'ID change
  
  const handleBook = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Rediriger vers login avec l'URL de retour
      navigate('/login', { state: { from: `/trips/${id}` } });
      return;
    }
    
    // TODO: Implémenter la réservation
    alert('Réservation à implémenter');
  };
  
  if (loading) return <LoadingSpinner message="Chargement du trajet..." />;
  if (error || !trip) return <ErrorMessage error={error || 'Trajet non trouvé'} />;
  
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };
  
  return (
    <div className="trip-detail-page">
      {/* Breadcrumb pour la navigation */}
      <nav className="breadcrumb">
        <Link to="/">Accueil</Link>
        <span> / </span>
        <Link to="/trips">Trajets</Link>
        <span> / </span>
        <span>{trip.departureCity} → {trip.arrivalCity}</span>
      </nav>
      
      <div className="trip-detail-container">
        {/* Info principale */}
        <div className="trip-main-info">
          <h1>
            {trip.departureCity} → {trip.arrivalCity}
          </h1>
          
          <div className="trip-datetime">
            📅 {formatDate(trip.departureDate)}
          </div>
          
          <div className="trip-price-booking">
            <div className="price">
              <span className="amount">{trip.price}€</span>
              <span className="label">par place</span>
            </div>
            
            <div className="seats-info">
              <span className={`seats-count ${trip.availableSeats === 0 ? 'full' : ''}`}>
                {trip.availableSeats} / {trip.totalSeats} places disponibles
              </span>
            </div>
            
            <button 
              className="btn-book-large"
              onClick={handleBook}
              disabled={trip.availableSeats === 0}
            >
              {trip.availableSeats === 0 ? 'Complet' : 'Réserver'}
            </button>
          </div>
        </div>
        
        {/* Détails du trajet */}
        <div className="trip-details-grid">
          <section className="detail-section">
            <h2>Itinéraire</h2>
            <div className="itinerary">
              <div className="location">
                <span className="icon">🚗</span>
                <div>
                  <strong>Départ</strong>
                  <p>{trip.departureAddress}</p>
                  <p>{trip.departureCity}</p>
                </div>
              </div>
              
              <div className="location">
                <span className="icon">📍</span>
                <div>
                  <strong>Arrivée</strong>
                  <p>{trip.arrivalAddress}</p>
                  <p>{trip.arrivalCity}</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="detail-section">
            <h2>Véhicule</h2>
            <p>🚗 {trip.carModel}</p>
            <p>🎨 {trip.carColor}</p>
          </section>
          
          {trip.description && (
            <section className="detail-section">
              <h2>Description</h2>
              <p>{trip.description}</p>
            </section>
          )}
          
          {/* Info conducteur */}
          {trip.driver && (
            <section className="detail-section driver-section">
              <h2>Votre conducteur</h2>
              <div className="driver-card">
                <img 
                  src={trip.driver.profilePicture} 
                  alt={`${trip.driver.firstName} ${trip.driver.lastName}`}
                  className="driver-photo"
                />
                <div className="driver-info">
                  <h3>{trip.driver.firstName} {trip.driver.lastName}</h3>
                  <div className="rating">
                    ⭐ {trip.driver.rating.toFixed(1)} / 5
                  </div>
                  {trip.driver.bio && <p>{trip.driver.bio}</p>}
                  
                  {/* Préférences */}
                  {trip.driver.preferences && (
                    <div className="preferences">
                      {trip.driver.preferences.smoking === false && <span>🚭 Non-fumeur</span>}
                      {trip.driver.preferences.animals && <span>🐕 Animaux OK</span>}
                      {trip.driver.preferences.music && <span>🎵 Musique</span>}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
        
        {/* Actions en bas */}
        <div className="detail-actions">
          <button onClick={() => navigate(-1)} className="btn-back">
            ← Retour
          </button>
          <button className="btn-share">
            📤 Partager
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripDetailPage;
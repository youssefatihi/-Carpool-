import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';
import { Trip } from '../types';
import { tripService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function HomePage() {
  const [featuredTrips, setFeaturedTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Charger quelques trajets pour la page d'accueil
    const loadFeaturedTrips = async () => {
      try {
        const response = await tripService.getTrips(0, 3);
        setFeaturedTrips(response.content);
      } catch (error) {
        console.error('Erreur chargement trajets:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedTrips();
  }, []);
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Voyagez ensemble, économisez plus</h1>
        <p>Trouvez votre prochain trajet parmi des milliers d'offres</p>
        
        {/* Boutons d'action principaux */}
        <div className="hero-actions">
          <Link to="/trips" className="btn btn-primary">
            🔍 Rechercher un trajet
          </Link>
          <Link to="/trips/new" className="btn btn-secondary">
            🚗 Proposer un trajet
          </Link>
        </div>
      </section>
      
      {/* Section des trajets populaires */}
      <section className="featured-trips">
        <h2>Trajets populaires</h2>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="trips-grid">
            {featuredTrips.map(trip => (
              <TripCard 
                key={trip.id} 
                trip={trip}
                // Navigation programmatique vers le détail
                onBook={(tripId) => {
                  // On utilisera navigate dans TripCard
                  console.log('Réserver:', tripId);
                }}
              />
            ))}
          </div>
        )}
        
        {/* Lien vers tous les trajets */}
        <div className="see-more">
          <Link to="/trips" className="link-see-more">
            Voir tous les trajets →
          </Link>
        </div>
      </section>
      
      {/* Section comment ça marche */}
      <section className="how-it-works">
        <h2>Comment ça marche ?</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Recherchez</h3>
            <p>Trouvez le trajet qui vous convient</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>Réservez</h3>
            <p>Réservez votre place en ligne</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Voyagez</h3>
            <p>Profitez du trajet ensemble</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
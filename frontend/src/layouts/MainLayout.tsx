import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Layout principal de l'application
 * Outlet est un placeholder où React Router injectera le composant
 * de la route active
 */
function MainLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Vérifier l'auth au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    // La vraie navigation se fera dans LoginPage
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
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
        {/* C'est ici que le contenu des pages sera affiché */}
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default MainLayout;
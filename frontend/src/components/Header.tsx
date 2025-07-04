// src/components/Header.tsx (version améliorée)
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

function Header({ 
  isLoggedIn = false, 
  onLogout, 
  showMenuButton = false,
  onMenuClick 
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Déterminer si on est sur une page spéciale
  const isHomePage = location.pathname === '/';
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  return (
    <header className={`header ${isDashboard ? 'header-dashboard' : ''}`}>
      <div className="header-container">
        {/* Menu button pour mobile */}
        {showMenuButton && (
          <button 
            className="menu-button"
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <span className="menu-icon">☰</span>
          </button>
        )}
        
        {/* Logo */}
        <NavLink to="/" className="header-brand">
          <h1>🚗 Covoiturage</h1>
        </NavLink>
        
        {/* Navigation principale - cachée si sidebar active */}
        {!showMenuButton && (
          <nav className="header-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Accueil
            </NavLink>
            <NavLink 
              to="/trips" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Trajets
            </NavLink>
            <NavLink 
              to="/how-it-works" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Comment ça marche
            </NavLink>
          </nav>
        )}
        
        {/* Actions utilisateur */}
        <div className="header-actions">
          {isLoggedIn ? (
            <>
              {/* Bouton publier un trajet - visible sauf sur dashboard */}
              {!isDashboard && (
                <button 
                  onClick={() => navigate('/trips/new')}
                  className="btn-publish"
                >
                  + Publier un trajet
                </button>
              )}
              
              {/* Menu utilisateur */}
              <div className="user-menu">
                <button className="user-menu-trigger">
                  <img 
                    src="https://i.pravatar.cc/150?u=user" 
                    alt="Avatar"
                    className="user-avatar"
                  />
                </button>
                
                {/* Dropdown menu (à implémenter) */}
              </div>
              
              <button onClick={onLogout} className="btn-logout">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="btn-text"
              >
                Connexion
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="btn-primary"
              >
                Inscription
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
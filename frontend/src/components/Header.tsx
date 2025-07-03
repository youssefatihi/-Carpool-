import { NavLink, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

function Header({ isLoggedIn = false, userName, onLogin, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    if (onLogin) onLogin();
    navigate('/login');
  };
  
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo avec lien vers accueil */}
        <NavLink to="/" className="header-brand">
          <h1>🚗 Covoiturage</h1>
        </NavLink>
        
        {/* Navigation avec NavLink pour le style actif */}
        <nav className="header-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end // exact match pour la route "/"
          >
            Accueil
          </NavLink>
          <NavLink 
            to="/trips" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Trajets
          </NavLink>
          {isLoggedIn && (
            <NavLink 
              to="/my-trips" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Mes trajets
            </NavLink>
          )}
        </nav>
        
        {/* Actions utilisateur */}
        <div className="header-actions">
          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-name">👤 {userName}</span>
              <button onClick={onLogout} className="btn-logout">
                Déconnexion
              </button>
            </div>
          ) : (
            <button onClick={handleLoginClick} className="btn-login">
              Connexion
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
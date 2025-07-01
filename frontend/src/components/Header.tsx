
interface HeaderProps {
    isLoggedIn?: boolean;
    userName?: string;
    onLogin?: () => void;
    onLogout?: () => void;
}

function Header({isLoggedIn=false,userName,onLogin,onLogout}: HeaderProps) {
      return (
    <header className="header">
      <div className="header-container">
        {/* Logo / Titre */}
        <div className="header-brand">
          <h1>🚗 Covoiturage</h1>
        </div>
        
        {/* Navigation */}
        <nav className="header-nav">
          <a href="/" className="nav-link">Accueil</a>
          <a href="/trips" className="nav-link">Trajets</a>
          {isLoggedIn && (
            <a href="/my-trips" className="nav-link">Mes trajets</a>
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
            <button onClick={onLogin} className="btn-login">
              Connexion
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
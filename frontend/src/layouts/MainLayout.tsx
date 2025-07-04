// src/layouts/MainLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';

interface LayoutConfig {
  showSidebar?: boolean;
  fullWidth?: boolean;
  theme?: 'default' | 'minimal' | 'dashboard';
}

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Déterminer la configuration du layout selon la route
  const getLayoutConfig = (): LayoutConfig => {
    const path = location.pathname;
    
    // Pages avec sidebar
    if (path.startsWith('/dashboard') || path.startsWith('/my-')) {
      return { showSidebar: true, theme: 'dashboard' };
    }
    
    // Pages pleine largeur
    if (path === '/' || path.startsWith('/trips/')) {
      return { fullWidth: true, theme: 'default' };
    }
    
    // Configuration par défaut
    return { theme: 'default' };
  };
  
  const layoutConfig = getLayoutConfig();
  
  // Vérifier l'authentification au montage et à chaque changement de route
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    // Fermer la sidebar mobile lors du changement de route
    setIsSidebarOpen(false);
  }, [location]);
  
  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/');
  };
  
  return (
    <div className={`app-layout theme-${layoutConfig.theme}`}>
      {/* Header adaptatif selon le contexte */}
      <Header 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        showMenuButton={layoutConfig.showSidebar}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="layout-body">
        {/* Sidebar conditionnelle */}
        {layoutConfig.showSidebar && (
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isLoggedIn={isLoggedIn}
          />
        )}
        
        {/* Contenu principal avec classes conditionnelles */}
        <main className={`
          main-content 
          ${layoutConfig.fullWidth ? 'full-width' : 'container'}
          ${layoutConfig.showSidebar ? 'with-sidebar' : ''}
        `}>
          {/* Breadcrumb dynamique */}
          <Breadcrumb />
          
          {/* Le contenu de la page active est rendu ici */}
          <Outlet context={{ isLoggedIn, layoutConfig }} />
        </main>
      </div>
      
      {/* Footer adaptatif */}
      {layoutConfig.theme !== 'minimal' && <Footer />}
    </div>
  );
}

export default MainLayout;
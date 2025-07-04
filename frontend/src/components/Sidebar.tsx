// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

function Sidebar({ isOpen, onClose, isLoggedIn }: SidebarProps) {
  // Fermer la sidebar quand on clique en dehors (mobile)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar');
      const target = e.target as HTMLElement;
      
      if (isOpen && sidebar && !sidebar.contains(target) && 
          !target.closest('.menu-button')) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  const menuItems = [
    {
      label: 'Tableau de bord',
      path: '/dashboard',
      icon: '📊',
      requireAuth: true
    },
    {
      label: 'Rechercher un trajet',
      path: '/trips',
      icon: '🔍',
      requireAuth: false
    },
    {
      label: 'Publier un trajet',
      path: '/trips/new',
      icon: '➕',
      requireAuth: true
    },
    {
      label: 'Mes trajets',
      path: '/my-trips',
      icon: '🚗',
      requireAuth: true
    },
    {
      label: 'Mes réservations',
      path: '/my-bookings',
      icon: '🎫',
      requireAuth: true
    },
    {
      label: 'Messages',
      path: '/messages',
      icon: '💬',
      requireAuth: true,
      badge: 3  // Nombre de messages non lus
    },
    {
      label: 'Mon profil',
      path: '/profile',
      icon: '👤',
      requireAuth: true
    },
    {
      label: 'Paramètres',
      path: '/settings',
      icon: '⚙️',
      requireAuth: true
    }
  ];
  
  // Filtrer les items selon l'état de connexion
  const visibleItems = menuItems.filter(
    item => !item.requireAuth || (item.requireAuth && isLoggedIn)
  );
  
  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul>
            {visibleItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => {
                    // Fermer la sidebar sur mobile après navigation
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                  {item.badge && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Section utilisateur en bas de la sidebar */}
        {isLoggedIn && (
          <div className="sidebar-user">
            <img 
              src="https://i.pravatar.cc/150?u=user" 
              alt="Avatar"
              className="sidebar-user-avatar"
            />
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">Jean Dupont</p>
              <p className="sidebar-user-role">Conducteur vérifié ✓</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
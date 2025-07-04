// src/components/Breadcrumb.tsx
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

function Breadcrumb() {
  const location = useLocation();
  
  // Générer le breadcrumb basé sur l'URL actuelle
  const breadcrumbItems = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [
      { label: 'Accueil', path: '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Transformer le segment en label lisible
      let label = segment;
      
      // Cas spéciaux pour certaines routes
      const labelMap: Record<string, string> = {
        'trips': 'Trajets',
        'my-trips': 'Mes trajets',
        'dashboard': 'Tableau de bord',
        'profile': 'Profil',
        'settings': 'Paramètres'
      };
      
      // Si c'est un ID numérique, on le traite différemment
      if (/^\d+$/.test(segment)) {
        label = `Trajet #${segment}`;
      } else {
        label = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      }
      
      items.push({ label, path: currentPath });
    });
    
    return items;
  }, [location.pathname]);
  
  // Ne pas afficher sur la page d'accueil
  if (location.pathname === '/') return null;
  
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {breadcrumbItems.map((item, index) => (
          <li key={item.path}>
            {index < breadcrumbItems.length - 1 ? (
              <>
                <Link to={item.path}>{item.label}</Link>
                <span className="separator" aria-hidden="true">/</span>
              </>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
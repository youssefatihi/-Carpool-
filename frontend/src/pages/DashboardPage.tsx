// src/pages/DashboardPage.tsx
import { useOutletContext } from 'react-router-dom';

interface LayoutContext {
  isLoggedIn: boolean;
  layoutConfig: {
    showSidebar?: boolean;
    fullWidth?: boolean;
    theme?: string;
  };
}

function DashboardPage() {
  // Récupérer le contexte fourni par le layout
  const { isLoggedIn, layoutConfig } = useOutletContext<LayoutContext>();
  
  return (
    <div className="dashboard-page">
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur votre espace personnel</p>
      
      {/* Le contenu peut s'adapter selon le contexte */}
      {layoutConfig.showSidebar && (
        <p>Navigation disponible dans la sidebar</p>
      )}
    </div>
  );
}
export default DashboardPage;
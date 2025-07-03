import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFoundPage;
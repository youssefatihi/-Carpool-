interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Oups ! Une erreur est survenue</h3>
      <p>{error}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-retry">
          🔄 Réessayer
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
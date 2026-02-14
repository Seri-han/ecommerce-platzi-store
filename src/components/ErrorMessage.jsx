import '../styles/components/error.scss';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <p className="error-icon">⚠️</p>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="btn-retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
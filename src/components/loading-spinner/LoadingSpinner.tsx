import '@/components/loading-spinner/LoadingSpinner.css';

export function LoadingSpinner() {
    return (
        <div className="loading-spinner-container">
            <svg
                className="loading-spinner-svg"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="loading-spinner-circle"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="loading-spinner-path"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
            </svg>
        </div>
    );
}

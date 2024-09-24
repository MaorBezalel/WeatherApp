import { useGeolocationAPI } from '@/features/weather-form/hooks/useGeolocationAPI';
import { CoordinatesInputField } from '../coordinates-input-field/CoordinatesInputField';

interface CurrentLocationInputFieldProps {
    onSuccessfulLocationFetch: (position: GeolocationPosition) => void;
}

export function CurrentLocationInputField({ onSuccessfulLocationFetch }: CurrentLocationInputFieldProps) {
    const status = useGeolocationAPI(onSuccessfulLocationFetch);

    switch (status) {
        case 'prompt':
            return <p className="current-location-input-field__prompt-message">Waiting for user's permission...</p>;
        case 'granted':
            return <CoordinatesInputField />;
        case 'denied':
            return (
                <p className="current-location-input-field__error-message">
                    Geolocation is disabled. Please enable it in your browser settings.
                </p>
            );
        case 'unsupported':
            return (
                <p className="current-location-input-field__error-message">
                    Geolocation is not supported in this browser.
                </p>
            );
    }
}

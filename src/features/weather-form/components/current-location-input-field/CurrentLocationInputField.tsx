import '@/features/weather-form/components/current-location-input-field/CurrentLocationInputField.css';

import { useGeolocationAPI } from '@/features/weather-form/hooks/useGeolocationAPI';
import { CoordinatesInputField } from '../coordinates-input-field/CoordinatesInputField';
import { GeolocationStatus, eGeolocationStatus, Coordinates } from '@/types/data.types';

interface CurrentLocationInputFieldProps {
    previousCoordinates: Coordinates;
    geolocationStatus: GeolocationStatus;
}

export function CurrentLocationInputField({ previousCoordinates, geolocationStatus }: CurrentLocationInputFieldProps) {
    useGeolocationAPI();

    switch (geolocationStatus) {
        case eGeolocationStatus.Prompt:
            return <p className="current-location-input-field__prompt-message">Waiting for user's permission...</p>;
        case eGeolocationStatus.Granted:
            return <CoordinatesInputField previousCoordinates={previousCoordinates} />;
        case eGeolocationStatus.Denied:
            return (
                <p className="current-location-input-field__error-message">
                    Geolocation is disabled. Please enable it in your browser settings.
                </p>
            );
        case eGeolocationStatus.Unsupported:
            return (
                <p className="current-location-input-field__error-message">
                    Geolocation is not supported in this browser.
                </p>
            );
    }
}

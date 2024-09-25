import '@/features/weather-form/components/coordinates-input-field/CoordinatesInputField.css';

import { Coordinates } from '@/types/data.types';

interface CoordinatesInputFieldProps {
    previousCoordinates: Coordinates;
}

export function CoordinatesInputField({ previousCoordinates }: CoordinatesInputFieldProps) {
    const LATITUDE_REGEX_PATTERN = '^(\\+|-)?(?:90(?:(?:\\.0{1,7})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,7})?))$';
    const LONGITUDE_REGEX_PATTERN =
        '^(\\+|-)?(?:180(?:(?:\\.0{1,7})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,7})?))$';

    return (
        <div className="coordinates-input-field">
            <label
                className="coordinates-input-field__label"
                htmlFor="latitude-input"
            >
                Latitude:{' '}
                <input
                    name="latitude"
                    id="latitude-input"
                    className="coordinates-input-field__input"
                    type="text"
                    inputMode="numeric"
                    required
                    pattern={LATITUDE_REGEX_PATTERN}
                    title="Latitude must be a number between -90 and 90"
                    defaultValue={previousCoordinates.latitude}
                />
            </label>
            <label
                className="coordinates-input-field__label"
                htmlFor="longitude-input"
            >
                Longitude:{' '}
                <input
                    name="longitude"
                    id="longitude-input"
                    className="coordinates-input-field__input"
                    type="text"
                    inputMode="numeric"
                    required
                    pattern={LONGITUDE_REGEX_PATTERN}
                    title="Longitude must be a number between -180 and 180"
                    defaultValue={previousCoordinates.longitude}
                />
            </label>
        </div>
    );
}

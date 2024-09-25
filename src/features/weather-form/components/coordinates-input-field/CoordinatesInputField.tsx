import '@/features/weather-form/components/coordinates-input-field/CoordinatesInputField.css';

import { Coordinates } from '@/types/data.types';
import {
    LATITUDE_REGEX_PATTERN,
    LONGITUDE_REGEX_PATTERN,
    LATITUDE_INPUT_REQUIREMENTS_MESSAGE,
    LONGITUDE_INPUT_REQUIREMENTS_MESSAGE,
} from '@/features/weather-form/utils/constants';

interface CoordinatesInputFieldProps {
    previousCoordinates: Coordinates;
}

export function CoordinatesInputField({ previousCoordinates }: CoordinatesInputFieldProps) {
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
                    title={LATITUDE_INPUT_REQUIREMENTS_MESSAGE}
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
                    title={LONGITUDE_INPUT_REQUIREMENTS_MESSAGE}
                    defaultValue={previousCoordinates.longitude}
                />
            </label>
        </div>
    );
}

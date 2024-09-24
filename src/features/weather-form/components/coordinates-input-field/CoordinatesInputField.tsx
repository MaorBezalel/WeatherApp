import '@/features/weather-form/components/coordinates-input-field/CoordinatesInputField.css';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Coordinates } from '@/types/data.types';

export function CoordinatesInputField() {
    const coordinates = useSelector((state: RootState) => state.weatherForm.value) as Coordinates;

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
                    pattern={LATITUDE_REGEX_PATTERN}
                    defaultValue={coordinates.latitude}
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
                    pattern={LONGITUDE_REGEX_PATTERN}
                    defaultValue={coordinates.longitude}
                />
            </label>
        </div>
    );
}

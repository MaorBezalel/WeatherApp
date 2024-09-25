import '@/features/weather-form/components/city-input-field/CityInputField.css';

import { CITY_NAME_REGEX_PATTERN, CITY_NAME_INPUT_REQUIREMENTS_MESSAGE } from '@/features/weather-form/utils/constants';

interface CityInputFieldProps {
    previousCityName: string;
}

export function CityInputField({ previousCityName }: CityInputFieldProps) {
    return (
        <div className="city-input-field">
            <label
                className="city-input-field__label"
                htmlFor="city-name-input"
            >
                City Name:{' '}
                <input
                    name="city"
                    id="city-name-input"
                    className="city-input-field__input"
                    type="text"
                    pattern={CITY_NAME_REGEX_PATTERN}
                    title={CITY_NAME_INPUT_REQUIREMENTS_MESSAGE}
                    autoComplete="off"
                    required
                    defaultValue={previousCityName}
                />
            </label>
        </div>
    );
}

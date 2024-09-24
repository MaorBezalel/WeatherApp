import '@/features/weather-form/components/city-input-field/CityInputField.css';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function CityInputField() {
    const cityName = useSelector((state: RootState) => state.weatherForm.value) as string;

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
                    required
                    defaultValue={cityName}
                />
            </label>
        </div>
    );
}

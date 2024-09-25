import '@/features/weather-form/components/city-input-field/CityInputField.css';

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
                    required
                    defaultValue={previousCityName}
                />
            </label>
        </div>
    );
}

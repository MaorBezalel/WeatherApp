import '@/features/weather-form/WeatherForm.css';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchWeatherData } from '@/features/weather-data/weatherDataSlice';
import { setWeatherFormValue, setWeatherFormSearchType } from '@/features/weather-form/weatherFormSlice';

import { CityInputField } from '@/features/weather-form/components/city-input-field/CityInputField';
import { CoordinatesInputField } from '@/features/weather-form/components/coordinates-input-field/CoordinatesInputField';
import { CurrentLocationInputField } from '@/features/weather-form/components/current-location-input-field/CurrentLocationInputField';
import { SubmitButton } from '@/features/weather-form/components/submit-button/SubmitButton';
import { TabLayout } from '@/components/tab-layout/TabLayout';

import { FormEventHandler, PropsWithChildren } from 'react';
import { Coordinates, WeatherFormSearchType } from '@/types/data.types';

export function WeatherFormContainer({ children }: PropsWithChildren) {
    return (
        <div
            role="presentation"
            className="weather-form-container"
        >
            {children}
        </div>
    );
}

export function WeatherForm() {
    const formState = useSelector((state: RootState) => state.weatherForm);
    const dispatch = useDispatch<AppDispatch>();
    const tabs = [
        { label: 'City Name', value: 'city', defaultChecked: formState.searchType === 'city' },
        { label: 'Coordinates', value: 'coordinates', defaultChecked: formState.searchType === 'coordinates' },
        {
            label: 'Your Location',
            value: 'current-location',
            defaultChecked: formState.searchType === 'current-location',
        },
    ];

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        // Extract the city name or coordinates from the form
        let value: string | Coordinates = '';
        switch (formState.searchType) {
            case 'city':
                value = (event.currentTarget.elements.namedItem('city') as HTMLInputElement).value;
                break;
            case 'coordinates':
            case 'current-location':
                const latitude = (event.currentTarget.elements.namedItem('latitude') as HTMLInputElement)
                    .value as Coordinates['latitude'];
                const longitude = (event.currentTarget.elements.namedItem('longitude') as HTMLInputElement)
                    .value as Coordinates['longitude'];
                value = { latitude, longitude };
                break;
        }

        // Dispatch the setWeatherFormValue to update the form state and save it to localStorage
        dispatch(setWeatherFormValue(value));

        // Dispatch the fetchWeatherData to fetch the weather data
        dispatch(fetchWeatherData(value));
    };

    return (
        <form
            className="weather-form"
            onSubmit={handleFormSubmit}
        >
            <h2 className="weather-form__title">The Only Weather Forecast You Need</h2>

            <TabLayout
                tabs={tabs}
                tabGroupName="search-type"
                onTabSelect={({ target: { value } }) =>
                    dispatch(setWeatherFormSearchType(value as WeatherFormSearchType))
                }
            />

            {formState.searchType === 'city' && <CityInputField previousCityName={formState.value} />}
            {formState.searchType === 'coordinates' && <CoordinatesInputField previousCoordinates={formState.value} />}
            {formState.searchType === 'current-location' && (
                <CurrentLocationInputField
                    previousCoordinates={formState.value}
                    geolocationStatus={formState.geolocationStatus}
                />
            )}

            <SubmitButton />
        </form>
    );
}

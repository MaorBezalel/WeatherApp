import '@/features/weather-form/WeatherForm.css';

import { useWeatherFormState } from '@/features/weather-form/hooks';

import { CityInputField } from '@/features/weather-form/components/city-input-field/CityInputField';
import { CoordinatesInputField } from '@/features/weather-form/components/coordinates-input-field/CoordinatesInputField';
import { CurrentLocationInputField } from '@/features/weather-form/components/current-location-input-field/CurrentLocationInputField';
import { SubmitButton } from '@/features/weather-form/components/submit-button/SubmitButton';
import { TabLayout } from '@/components/tab-layout/TabLayout';

import { PropsWithChildren } from 'react';

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
    const { formState, handleFormSubmit, handleTabChange } = useWeatherFormState();
    const tabs = [
        { label: 'City Name', value: 'city', defaultChecked: formState.searchType === 'city' },
        { label: 'Coordinates', value: 'coordinates', defaultChecked: formState.searchType === 'coordinates' },
        {
            label: 'Your Location',
            value: 'current-location',
            defaultChecked: formState.searchType === 'current-location',
        },
    ];

    return (
        <form
            className="weather-form"
            onSubmit={handleFormSubmit}
        >
            <h2 className="weather-form__title">The Only Weather Forecast You Need</h2>

            <TabLayout
                tabs={tabs}
                tabGroupName="search-type"
                onTabSelect={handleTabChange}
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

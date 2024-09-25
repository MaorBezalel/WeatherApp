import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchWeatherData } from '@/features/weather-data/weatherDataSlice';
import { setWeatherFormValue, setWeatherFormSearchType } from '@/features/weather-form/weatherFormSlice';
import { Coordinates, WeatherFormSearchType } from '@/types/data.types';
import { ChangeEventHandler } from 'react';

export function useWeatherFormState() {
    const formState = useSelector((state: RootState) => state.weatherForm);
    const dispatch = useDispatch<AppDispatch>();

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        dispatch(fetchWeatherData(value));
    };

    const handleTabChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        dispatch(setWeatherFormSearchType(value as WeatherFormSearchType));
    };

    return { formState, handleFormSubmit, handleTabChange };
}

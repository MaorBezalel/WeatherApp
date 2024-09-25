import { WeatherAPIResponse } from '@/types/api.types';
import {
    eWeatherFormSearchType,
    City,
    Coordinates,
    GeolocationStatus,
    WeatherDataForecastDaysCountToDisplay,
} from '@/types/data.types';

export type WeatherFormByCityState = {
    searchType: typeof eWeatherFormSearchType.City;
    value: City;
    geolocationStatus: GeolocationStatus;
};
export type WeatherFormByCoordinatesState = {
    searchType: typeof eWeatherFormSearchType.Coordinates | typeof eWeatherFormSearchType.CurrentLocation;
    value: Coordinates;
    geolocationStatus: GeolocationStatus;
};
export type WeatherFormState = WeatherFormByCityState | WeatherFormByCoordinatesState;

export type WeatherDataState = {
    data: WeatherAPIResponse | null;
    isLoading: boolean;
    errorMessage: string | null;
    selectedDayForecastIndex: number;
    forecastDaysCountToDisplay: WeatherDataForecastDaysCountToDisplay;
};

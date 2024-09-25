import { Coordinates } from '@/types/data.types';

export const WEATHER_DATA_CACHE_NAME = 'weather-data';

export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const WEATHER_API_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';

export const WEATHER_API_URL_WITH_DEFAULTS = `${WEATHER_API_URL}?days=7&key=${WEATHER_API_KEY}`;

export const WEATHER_API_URL_WITH_DEFAULTS_AND_CITY = (city: string) => `${WEATHER_API_URL_WITH_DEFAULTS}&city=${city}`;

export const WEATHER_API_URL_WITH_DEFAULTS_AND_COORDINATES = (coordinates: Coordinates) =>
    `${WEATHER_API_URL_WITH_DEFAULTS}&lat=${coordinates.latitude}&lon=${coordinates.longitude}`;

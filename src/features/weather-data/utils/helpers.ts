import { WeatherAPIResponse, WeatherAPIErrorResponse } from '@/types/api.types';
import { City, Coordinates } from '@/types/data.types';
import {
    WEATHER_API_URL_WITH_DEFAULTS_AND_CITY,
    WEATHER_API_URL_WITH_DEFAULTS_AND_COORDINATES,
    WEATHER_DATA_POLLING_INTERVAL,
} from '@/features/weather-data/utils/constants';

export const getRequestUrl = (cityOrCoordinates: City | Coordinates): string => {
    return typeof cityOrCoordinates === 'string'
        ? WEATHER_API_URL_WITH_DEFAULTS_AND_CITY(cityOrCoordinates)
        : WEATHER_API_URL_WITH_DEFAULTS_AND_COORDINATES(cityOrCoordinates);
};

export const getCachedData = async (cache: Cache, requestUrl: string): Promise<WeatherAPIResponse | null> => {
    const cachedResponse = await cache.match(requestUrl);
    if (cachedResponse) {
        const cachedData = (await cachedResponse.json()) as WeatherAPIResponse;
        const isDataStale = Date.now() >= cachedData.staleTimestamp;
        if (!isDataStale) {
            return cachedData;
        }
    }
    return null;
};

export const getWeatherData = async (requestUrl: string): Promise<WeatherAPIResponse> => {
    let response: Response;

    // Fetch the data - handle network errors
    try {
        response = await fetch(requestUrl);
    } catch (error) {
        throw new Error('Failed to fetch weather data due to network error');
    }

    // Handle API response - throw errors for non-2xx status codes or empty responses (a.k.a. city not found)
    if (!response.ok) {
        const errorJson = (await response.json()) as WeatherAPIErrorResponse;
        throw new Error(errorJson.error);
    }
    if (response.status === 204) {
        // This means that the city is not found
        throw new Error('City not found');
    }

    // Parse the response JSON and return it
    return response.json();
};

export const recordStaleTimestamp = (data: WeatherAPIResponse): WeatherAPIResponse => {
    data.staleTimestamp = Date.now() + WEATHER_DATA_POLLING_INTERVAL; // the timestamp when the data will be stale
    return data;
};

export const cacheWeatherData = async (cache: Cache, requestUrl: string, data: WeatherAPIResponse): Promise<void> => {
    const responseToCache = new Response(JSON.stringify(data));
    await cache.put(requestUrl, responseToCache);
};

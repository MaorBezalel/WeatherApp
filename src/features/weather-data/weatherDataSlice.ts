import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { City, Coordinates } from '@/types/data.types';
import { WeatherAPIErrorResponse, WeatherAPIResponse } from '@/types/api.types';

const WEATHER_DATA_CACHE_NAME = 'weather-data';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const WEATHER_API_URL_WITH_DEFAULTS = `${WEATHER_API_URL}?days=7&key=${WEATHER_API_KEY}`;
const WEATHER_API_URL_WITH_DEFAULTS_AND_CITY = (city: string) => `${WEATHER_API_URL_WITH_DEFAULTS}&city=${city}`;
const WEATHER_API_URL_WITH_DEFAULTS_AND_COORDINATES = (coordinates: Coordinates) =>
    `${WEATHER_API_URL_WITH_DEFAULTS}&lat=${coordinates.latitude}&lon=${coordinates.longitude}`;

const getRequestUrl = (cityOrCoordinates: City | Coordinates): string => {
    return typeof cityOrCoordinates === 'string'
        ? WEATHER_API_URL_WITH_DEFAULTS_AND_CITY(cityOrCoordinates)
        : WEATHER_API_URL_WITH_DEFAULTS_AND_COORDINATES(cityOrCoordinates);
};

const getCachedData = async (cache: Cache, requestUrl: string): Promise<WeatherAPIResponse | null> => {
    const cachedResponse = await cache.match(requestUrl);
    if (cachedResponse) {
        const cachedData = (await cachedResponse.json()) as WeatherAPIResponse;
        const fetchTimestamp = cachedData.fetchTimestamp;
        const isDataStale = Date.now() - fetchTimestamp > 1000 * 60 * 5; // 5 minutes
        if (!isDataStale) {
            return cachedData;
        }
    }
    return null;
};

const handleAPIResponse = async (response: Response): Promise<WeatherAPIResponse> => {
    if (!response.ok) {
        const errorJson = (await response.json()) as WeatherAPIErrorResponse;
        throw new Error(errorJson.error);
    }
    if (response.status === 204) {
        // This means that the city is not found
        throw new Error('City not found');
    }
    return response.json();
};

const fetchAndCacheData = async (cache: Cache, requestUrl: string): Promise<WeatherAPIResponse> => {
    let response: Response;

    try {
        response = await fetch(requestUrl);
    } catch (error) {
        throw new Error('Failed to fetch weather data due to network error');
    }

    const data = await handleAPIResponse(response);
    data.fetchTimestamp = Date.now();
    const responseToCache = new Response(JSON.stringify(data));
    await cache.put(requestUrl, responseToCache);
    return data;
};

export const fetchWeatherData = createAsyncThunk(
    'weatherData/fetchWeatherData',
    async (cityOrCoordinates: City | Coordinates): Promise<WeatherAPIResponse> => {
        const cache = await caches.open(WEATHER_DATA_CACHE_NAME);
        const requestUrl = getRequestUrl(cityOrCoordinates);

        const cachedData = await getCachedData(cache, requestUrl);
        if (cachedData) {
            return cachedData;
        }

        return fetchAndCacheData(cache, requestUrl);
    }
);

// ------------------------------------

type WeatherDataState = {
    data: WeatherAPIResponse | null;
    isLoading: boolean;
    errorMessage: string | null;
    selectedDayForecastIndex: number;
    forecastDaysCountToDisplay: 3 | 7;
};

const initialState: WeatherDataState = {
    data: null,
    isLoading: false,
    errorMessage: null,
    selectedDayForecastIndex: 0,
    forecastDaysCountToDisplay: 3,
};

const weatherDataSlice = createSlice({
    name: 'weatherData',
    initialState,
    reducers: {
        setSelectedDayForecastIndex(state, action: PayloadAction<number>) {
            state.selectedDayForecastIndex = action.payload;
        },
        setForecastDaysCountToDisplay(state, action: PayloadAction<3 | 7>) {
            state.forecastDaysCountToDisplay = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.data = null;
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message ?? 'Failed to fetch weather data for unknown reason';
                console.error(action.error);
            });
    },
});

export const { setSelectedDayForecastIndex, setForecastDaysCountToDisplay } = weatherDataSlice.actions;
export default weatherDataSlice.reducer;

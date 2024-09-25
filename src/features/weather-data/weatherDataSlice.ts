import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { WeatherDataState } from '@/types/state.types';
import { WeatherAPIResponse } from '@/types/api.types';
import { City, Coordinates, WeatherDataForecastDaysCountToDisplay } from '@/types/data.types';

import { WEATHER_DATA_CACHE_NAME } from '@/features/weather-data/utils/constants';
import {
    getRequestUrl,
    getCachedData,
    getWeatherData,
    recordFetchTimestamp,
    cacheWeatherData,
} from '@/features/weather-data/utils/helpers';

export const fetchWeatherData = createAsyncThunk(
    'weatherData/fetchWeatherData',
    async (cityOrCoordinates: City | Coordinates): Promise<WeatherAPIResponse> => {
        const cache = await caches.open(WEATHER_DATA_CACHE_NAME);
        const requestUrl = getRequestUrl(cityOrCoordinates);

        // Check if the data is cached and not stale - return the cached data if it's fresh
        const cachedData = await getCachedData(cache, requestUrl);
        if (cachedData) return cachedData;

        // Otherwise, fetch the data, record its fetch timestamp, cache it, and return it
        const data = await getWeatherData(requestUrl);
        recordFetchTimestamp(data);
        await cacheWeatherData(cache, requestUrl, data);
        return data;
    }
);

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
        setForecastDaysCountToDisplay(state, action: PayloadAction<WeatherDataForecastDaysCountToDisplay>) {
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

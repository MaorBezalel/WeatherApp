import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    City,
    Coordinates,
    eWeatherFormSearchType,
    WeatherFormSearchType,
    GeolocationStatus,
} from '@/types/data.types';
import { WeatherFormState } from '@/types/state.types';

import {
    WEATHER_FORM_LAST_STATE_KEY,
    WEATHER_FORM_CITY_NAME_DEFAULT_VALUE,
    WEATHER_FORM_LATITUDE_LONGITUDE_DEFAULT_VALUE,
} from '@/features/weather-form/utils/constants';
import { retrieveLastState } from '@/features/weather-form/utils/helpers';

const initialState: WeatherFormState = retrieveLastState();

const weatherFormSlice = createSlice({
    name: 'weatherForm',
    initialState,
    reducers: {
        setWeatherFormSearchType(state, action: PayloadAction<WeatherFormSearchType>) {
            state.searchType = action.payload;

            // reset the state value
            switch (action.payload) {
                case eWeatherFormSearchType.City:
                    state.value = WEATHER_FORM_CITY_NAME_DEFAULT_VALUE;
                    break;
                case eWeatherFormSearchType.Coordinates:
                case eWeatherFormSearchType.CurrentLocation:
                    state.value = WEATHER_FORM_LATITUDE_LONGITUDE_DEFAULT_VALUE;
                    break;
            }

            localStorage.setItem(WEATHER_FORM_LAST_STATE_KEY, JSON.stringify(state));
        },

        setWeatherFormValue(state, action: PayloadAction<City | Coordinates>) {
            if (typeof action.payload === 'string' && state.searchType !== eWeatherFormSearchType.City) {
                throw new Error('Invalid value type for search type');
            }
            state.value = action.payload;
            localStorage.setItem(WEATHER_FORM_LAST_STATE_KEY, JSON.stringify(state));
        },

        setGeolocationStatus(state, action: PayloadAction<GeolocationStatus>) {
            state.geolocationStatus = action.payload;
        },
    },
});

export const { setWeatherFormSearchType, setWeatherFormValue, setGeolocationStatus } = weatherFormSlice.actions;
export default weatherFormSlice.reducer;

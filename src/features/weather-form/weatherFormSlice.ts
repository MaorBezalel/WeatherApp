import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Coordinates, eWeatherFormSearchType, WeatherFormSearchType } from '@/types/data.types';

type WeatherFormByCityState = {
    searchType: typeof eWeatherFormSearchType.City;
    value: City;
};
type WeatherFormByCoordinatesState = {
    searchType: typeof eWeatherFormSearchType.Coordinates | typeof eWeatherFormSearchType.CurrentLocation;
    value: Coordinates;
};
type WeatherFormState = WeatherFormByCityState | WeatherFormByCoordinatesState;

const WEATHER_FORM_LAST_STATE_KEY = 'weather-app--weather-form-last-state';
const WEATHER_FORM_CITY_NAME_DEFAULT_VALUE = '';
const WEATHER_FORM_LATITUDE_LONGITUDE_DEFAULT_VALUE: Coordinates = { latitude: '', longitude: '' };

const retrieveLastState = (): WeatherFormState => {
    const lastState = localStorage.getItem(WEATHER_FORM_LAST_STATE_KEY);
    if (!lastState) {
        return {
            searchType: eWeatherFormSearchType.City,
            value: WEATHER_FORM_CITY_NAME_DEFAULT_VALUE,
        };
    }

    // TODO: Validate that the parsed last state is a valid WeatherFormState
    return JSON.parse(lastState);
};

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
        setWeatherFormValueBeforeSubmit(state, action: PayloadAction<City | Coordinates>) {
            if (typeof action.payload === 'string' && state.searchType !== eWeatherFormSearchType.City) {
                throw new Error('Invalid value type for search type');
            }
            state.value = action.payload;
        },
        setWeatherFormValueAfterSubmit(state) {
            localStorage.setItem(WEATHER_FORM_LAST_STATE_KEY, JSON.stringify(state));
        },
    },
});

export const {
    setWeatherFormSearchType,
    setWeatherFormValue,
    setWeatherFormValueBeforeSubmit,
    setWeatherFormValueAfterSubmit,
} = weatherFormSlice.actions;
export default weatherFormSlice.reducer;

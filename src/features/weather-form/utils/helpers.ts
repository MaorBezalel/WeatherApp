import { WeatherFormState, WeatherFormByCityState, WeatherFormByCoordinatesState } from '@/types/state.types';
import { eWeatherFormSearchType, eGeolocationStatus, Coordinates } from '@/types/data.types';
import {
    WEATHER_FORM_LAST_STATE_KEY,
    WEATHER_FORM_CITY_NAME_DEFAULT_VALUE,
} from '@/features/weather-form/utils/constants';

export const isWeatherFormByCityState = (state: WeatherFormState): state is WeatherFormByCityState => {
    return state.searchType === eWeatherFormSearchType.City && typeof state.value === 'string';
};

export const isWeatherFormByCoordinatesState = (state: WeatherFormState): state is WeatherFormByCoordinatesState => {
    const isSearchTypeValid = (
        searchType: unknown
    ): searchType is typeof eWeatherFormSearchType.Coordinates | typeof eWeatherFormSearchType.CurrentLocation => {
        return (
            searchType === eWeatherFormSearchType.Coordinates || searchType === eWeatherFormSearchType.CurrentLocation
        );
    };
    const isValueValidObject = (value: unknown): value is object => {
        return typeof value === 'object';
    };
    const doesValueHaveLatitudeAndLongitudeOfValidTypes = (value: object): value is Coordinates => {
        return (
            'latitude' in value &&
            'longitude' in value &&
            typeof value.latitude === 'string' &&
            typeof value.longitude === 'string'
        );
    };
    const isLatitudeOfValidRange = (latitude: string): boolean => {
        return parseFloat(latitude) >= -90 && parseFloat(latitude) <= 90;
    };
    const isLongitudeOfValidRange = (longitude: string): boolean => {
        return parseFloat(longitude) >= -180 && parseFloat(longitude) <= 180;
    };

    return (
        isSearchTypeValid(state.searchType) &&
        isValueValidObject(state.value) &&
        doesValueHaveLatitudeAndLongitudeOfValidTypes(state.value) &&
        isLatitudeOfValidRange(state.value.latitude) &&
        isLongitudeOfValidRange(state.value.longitude)
    );
};

export const isWeatherFormState = (state: WeatherFormState): state is WeatherFormState => {
    return isWeatherFormByCityState(state) || isWeatherFormByCoordinatesState(state);
};

export const isJSONString = (value: unknown): boolean => {
    if (typeof value !== 'string') return false;
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
};

export const retrieveLastState = (): WeatherFormState => {
    const defaultState: WeatherFormState = {
        searchType: eWeatherFormSearchType.City,
        value: WEATHER_FORM_CITY_NAME_DEFAULT_VALUE,
        geolocationStatus: eGeolocationStatus.Prompt,
    };
    const lastState = localStorage.getItem(WEATHER_FORM_LAST_STATE_KEY);

    if (!lastState || !isJSONString(lastState)) {
        return defaultState;
    } else {
        const parsedLastState = JSON.parse(lastState);

        if (!isWeatherFormState(parsedLastState)) {
            return defaultState;
        }

        parsedLastState.geolocationStatus = eGeolocationStatus.Prompt;
        return parsedLastState;
    }
};

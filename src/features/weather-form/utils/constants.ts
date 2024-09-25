import { Coordinates } from '@/types/data.types';

export const WEATHER_FORM_LAST_STATE_KEY = 'weather-app--weather-form-last-state';

export const WEATHER_FORM_CITY_NAME_DEFAULT_VALUE = '';

export const WEATHER_FORM_LATITUDE_LONGITUDE_DEFAULT_VALUE: Coordinates = { latitude: '', longitude: '' };

export const LATITUDE_REGEX_PATTERN = '^(\\+|-)?(?:90(?:(?:\\.0{1,7})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,7})?))$'; // between -90 and 90
export const LATITUDE_INPUT_REQUIREMENTS_MESSAGE = 'Latitude must be a number between -90 and 90';

export const LONGITUDE_REGEX_PATTERN =
    '^(\\+|-)?(?:180(?:(?:\\.0{1,7})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,7})?))$'; // between -180 and 180
export const LONGITUDE_INPUT_REQUIREMENTS_MESSAGE = 'Longitude must be a number between -180 and 180';

export const CITY_NAME_REGEX_PATTERN = '^[a-zA-Z\\s]*$'; // only english letters and spaces
export const CITY_NAME_INPUT_REQUIREMENTS_MESSAGE = 'City name must only contain English letters and spaces';

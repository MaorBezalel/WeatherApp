export type City = string;

export type Coordinates = {
    latitude: `${number}` | '';
    longitude: `${number}` | '';
};

export const eWeatherFormSearchType = {
    City: 'city',
    Coordinates: 'coordinates',
    CurrentLocation: 'current-location',
} as const;
export type WeatherFormSearchType = (typeof eWeatherFormSearchType)[keyof typeof eWeatherFormSearchType];

export const eGeolocationStatus = {
    Granted: 'granted',
    Denied: 'denied',
    Prompt: 'prompt',
    Unsupported: 'unsupported',
} as const;
export type GeolocationStatus = (typeof eGeolocationStatus)[keyof typeof eGeolocationStatus];

export const eWeatherDataForecastDaysCountToDisplay = {
    Three: 3,
    Seven: 7,
} as const;
export type WeatherDataForecastDaysCountToDisplay =
    (typeof eWeatherDataForecastDaysCountToDisplay)[keyof typeof eWeatherDataForecastDaysCountToDisplay];

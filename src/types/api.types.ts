import { Coordinates } from '@/types/data.types';

export type WeatherAPIResponse = {
    city_name: string;
    country_code: string;
    data: WeatherForecastData[];
    lat: Coordinates['latitude'];
    lon: Coordinates['longitude'];
    state_code: string;

    /** A property stored by us which reserved for caching */
    fetchTimestamp: number;
};

export type WeatherAPIErrorResponse = {
    error: string;
};

export type WeatherForecastData = {
    /** Formatted as: YYYY-MM-DD */
    valid_date: string;

    /** Timestamp */
    ts: number;

    /** Contain icon code and description that describe the weather */
    weather: {
        icon: string;
        description: string;
    };

    /** Humidity */
    rh: number;

    /** Temperature (Celsius) */
    temp: number;

    /** Wind speed (m/s) */
    wind_spd: number;
};

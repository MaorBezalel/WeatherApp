import '@/features/weather-data/components/selected-day-forecast-display/SelectedDayForecastDisplay.css';

import { WeatherForecastData } from '@/types/api.types';
import { PropsWithChildren } from 'react';

export function SelectedDayForecastDisplayContainer({ children }: PropsWithChildren) {
    return <section className="weather-data__selected-day-forecast">{children}</section>;
}

interface SelectedDayForecastDisplayTitleProps {
    city: string;
    country: string;
}
export function SelectedDayForecastDisplayTitle({ city, country }: SelectedDayForecastDisplayTitleProps) {
    return <h2 className="weather-data__selected-day-forecast__title">{`${city}, ${country}`}</h2>;
}

interface SelectedDayForecastDisplayProps {
    selectedDayForecastData: WeatherForecastData;
}
export function SelectedDayForecastDisplay({ selectedDayForecastData }: SelectedDayForecastDisplayProps) {
    const {
        temp,
        weather: { icon, description: condition },
        rh,
        wind_spd,
        valid_date,
        ts,
    } = selectedDayForecastData;

    return (
        <article className="weather-data__selected-day-forecast-display">
            <div
                role="presentation"
                className="weather-data__selected-day-forecast-display-leftside"
            >
                <h3 className="weather-data__selected-day-forecast-display-leftside__title">
                    <img
                        className="weather-data__selected-day-forecast-display-leftside__title--icon"
                        src={`https://cdn.weatherbit.io/static/img/icons/${icon}.png`}
                        alt=""
                    />
                    <span className="weather-data__selected-day-forecast-display-leftside__title--temperature">
                        {temp}°C
                    </span>
                </h3>
                <time
                    className="weather-data__selected-day-forecast-display-leftside__date"
                    dateTime={valid_date}
                >
                    {new Date(ts * 1000).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
            </div>

            <div
                role="presentation"
                className="weather-data__selected-day-forecast-display-rightside"
            >
                <p className="weather-data__selected-day-forecast-display-rightside__item">{`Humidity: ${rh}%`}</p>
                <p className="weather-data__selected-day-forecast-display-rightside__item">{`Wind Speed: ${wind_spd} m/s`}</p>
                <p className="weather-data__selected-day-forecast-display-rightside__item">{`Weather Condition: ${condition}`}</p>
            </div>
        </article>
    );
}

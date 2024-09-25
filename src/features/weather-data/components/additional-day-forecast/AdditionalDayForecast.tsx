import '@/features/weather-data/components/additional-day-forecast/AdditionalDayForecast.css';

import { ItemList } from '@/components/item-list/ItemList';

import { WeatherForecastData } from '@/types/api.types';
import { ComponentProps, PropsWithChildren } from 'react';

export function AdditionaDaylForecastContainer({ children }: PropsWithChildren) {
    return <section className="weather-data__additional-forecast">{children}</section>;
}

interface AdditionaDaylForecastTitleProps {
    city: string;
    country: string;
}
export function AdditionaDaylForecastTitle({ city, country }: AdditionaDaylForecastTitleProps) {
    return <h3 className="weather-data__additional-forecast__title">{`More On ${city}, ${country}`}</h3>;
}

export function DayForecastCardsGrid<TItem>({
    items,
    renderItem,
    className,
    styles,
}: ComponentProps<typeof ItemList<TItem>>) {
    return (
        <ItemList
            className={`weather-data__additional-forecast__cards ${className ?? ''}`}
            styles={styles}
            items={items}
            renderItem={renderItem}
        />
    );
}

interface DayForecastCardProps {
    dayForecastData: WeatherForecastData;
    isSelected: boolean;
    onSelect: React.MouseEventHandler;
}
export function DayForecastCard({ dayForecastData, isSelected, onSelect }: DayForecastCardProps) {
    const {
        temp,
        weather: { icon, description: condition },
        valid_date,
        ts,
    } = dayForecastData;

    return (
        <article
            className="weather-data__additional-forecast__card"
            data-selected={isSelected}
            onClick={onSelect}
        >
            <h4 className="weather-data__additional-forecast__card--title">
                <img
                    className="weather-data__additional-forecast__card--icon"
                    src={`https://cdn.weatherbit.io/static/img/icons/${icon}.png`}
                    alt={condition}
                />
                <span className="weather-data__additional-forecast__card--temperature">{temp}°C</span>
            </h4>
            <p className="weather-data__additional-forecast__card--condition">{condition}</p>
            <time
                className="weather-data__additional-forecast__card--date"
                dateTime={valid_date}
            >
                {new Date(ts * 1000).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: '2-digit',
                })}
            </time>
        </article>
    );
}

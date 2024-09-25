import '@/features/weather-data/WeatherData.css';

import { useWeatherDataState } from '@/features/weather-data/hooks/useWeatherDataState';
import { WeatherDataForecastDaysCountToDisplay } from '@/types/data.types';

import { LoadingSpinner } from '@/components/loading-spinner/LoadingSpinner';
import { TabLayout } from '@/components/tab-layout/TabLayout';
import {
    SelectedDayForecastDisplay,
    SelectedDayForecastDisplayContainer,
    SelectedDayForecastDisplayTitle,
} from '@/features/weather-data/components/selected-day-forecast-display/SelectedDayForecastDisplay';
import {
    AdditionaDaylForecastContainer,
    AdditionaDaylForecastTitle,
    DayForecastCard,
    DayForecastCardsGrid,
} from '@/features/weather-data/components/additional-day-forecast/AdditionalDayForecast';

export function WeatherData() {
    const {
        weatherDataState: { data, isLoading, errorMessage, selectedDayForecastIndex, forecastDaysCountToDisplay },
        handleForecastDaysCountToDisplayChange,
        handleSelectedDayForecastIndexChange,
    } = useWeatherDataState();
    const hasntSearchedYet = !isLoading && !data && !errorMessage;
    const forecastTabs = [
        { label: '3 Days Forecast', value: 3, defaultChecked: forecastDaysCountToDisplay === 3 },
        { label: '7 Days Forecast', value: 7, defaultChecked: forecastDaysCountToDisplay === 7 },
    ];

    if (hasntSearchedYet) {
        return (
            <div className="weather-data">
                <h2 className="weather-data__message weather-data__message--no-data">No Data Yet</h2>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="weather-data">
                <LoadingSpinner />
                <h2 className="weather-data__message">Loading...</h2>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="weather-data">
                <h2 className="weather-data__message weather-data__message--error">Error: {errorMessage}</h2>
            </div>
        );
    }

    return (
        <div
            role="presentation"
            className="weather-data"
        >
            <SelectedDayForecastDisplayContainer>
                <SelectedDayForecastDisplayTitle
                    city={data!.city_name}
                    country={data!.country_code}
                />
                <SelectedDayForecastDisplay selectedDayForecastData={data!.data[selectedDayForecastIndex]} />
            </SelectedDayForecastDisplayContainer>

            <AdditionaDaylForecastContainer>
                <AdditionaDaylForecastTitle
                    city={data!.city_name}
                    country={data!.country_code}
                />

                <TabLayout
                    tabs={forecastTabs}
                    tabGroupName="forecast-tabs"
                    onTabSelect={({ target: { value } }) =>
                        handleForecastDaysCountToDisplayChange(Number(value) as WeatherDataForecastDaysCountToDisplay)
                    }
                />

                <DayForecastCardsGrid
                    items={data!.data.slice(0, forecastDaysCountToDisplay)}
                    renderItem={(dayForecastData, index) => (
                        <DayForecastCard
                            key={dayForecastData.ts}
                            dayForecastData={dayForecastData}
                            isSelected={index === selectedDayForecastIndex}
                            onSelect={() => handleSelectedDayForecastIndexChange(index)}
                        />
                    )}
                />
            </AdditionaDaylForecastContainer>
        </div>
    );
}

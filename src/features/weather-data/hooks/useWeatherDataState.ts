import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchWeatherData } from '@/features/weather-data/weatherDataSlice';
import { setSelectedDayForecastIndex, setForecastDaysCountToDisplay } from '@/features/weather-data/weatherDataSlice';
import { WeatherDataForecastDaysCountToDisplay } from '@/types/data.types';

export function useWeatherDataState() {
    const weatherDataState = useSelector((state: RootState) => state.weatherData);
    const dispatch = useDispatch<AppDispatch>();

    // data pooling
    useEffect(() => {
        if (weatherDataState.data) {
            const timeout = setTimeout(() => {
                if (weatherDataState.data) {
                    dispatch(fetchWeatherData(weatherDataState.data.city_name));
                }
            }, weatherDataState.data.staleTimestamp - Date.now());

            return () => clearTimeout(timeout);
        }
    }, [weatherDataState.data]);

    const handleSelectedDayForecastIndexChange = (index: number) => {
        dispatch(setSelectedDayForecastIndex(index));
    };

    const handleForecastDaysCountToDisplayChange = (daysCount: number) => {
        dispatch(setForecastDaysCountToDisplay(daysCount as WeatherDataForecastDaysCountToDisplay));
    };

    return {
        weatherDataState,
        handleSelectedDayForecastIndexChange,
        handleForecastDaysCountToDisplayChange,
    };
}

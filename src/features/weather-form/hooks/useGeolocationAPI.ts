import { useLayoutEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setWeatherFormValue, setGeolocationStatus } from '@/features/weather-form/weatherFormSlice';

import { eGeolocationStatus, Coordinates } from '@/types/data.types';

export function useGeolocationAPI() {
    const dispatch = useDispatch<AppDispatch>();
    const { geolocation } = navigator;

    useLayoutEffect(() => {
        if (!geolocation) {
            dispatch(setGeolocationStatus(eGeolocationStatus.Unsupported));
            console.error('Geolocation is not supported in this browser');
        }

        geolocation.getCurrentPosition(
            (position) => {
                const coordinates: Coordinates = {
                    latitude: position.coords.latitude.toString() as Coordinates['latitude'],
                    longitude: position.coords.longitude.toString() as Coordinates['longitude'],
                };
                dispatch(setWeatherFormValue(coordinates));
                dispatch(setGeolocationStatus(eGeolocationStatus.Granted));
            },
            (error) => {
                dispatch(setGeolocationStatus(eGeolocationStatus.Denied));
                console.error(error);
            }
        );
    }, []);
}

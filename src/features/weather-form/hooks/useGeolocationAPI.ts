import { useState, useLayoutEffect } from 'react';
import { GeolocationStatus, eGeolocationStatus } from '@/types/data.types';

export function useGeolocationAPI(successCallback: PositionCallback) {
    const [geolocationStatus, setGeolocationStatus] = useState<GeolocationStatus>(eGeolocationStatus.Prompt);
    const { geolocation } = navigator;

    useLayoutEffect(() => {
        if (!geolocation) {
            setGeolocationStatus(eGeolocationStatus.Unsupported);
            console.error('Geolocation is not supported in this browser'); // TODO: disable the current location tab if geolocation is not supported in the browser
        }

        geolocation.getCurrentPosition(
            (position) => {
                setGeolocationStatus(eGeolocationStatus.Granted);
                successCallback(position);
            },
            (error) => {
                setGeolocationStatus(eGeolocationStatus.Denied);
                console.error(error);
            }
        );
    }, []);

    return geolocationStatus;
}

import '@/features/weather-form/components/submit-button/SubmitButton.css';

import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

const selectWeatherDataLoading = (state: RootState) => state.weatherData.isLoading;
const selectGeolocationStatus = (state: RootState) => state.weatherForm.geolocationStatus;
const selectSearchType = (state: RootState) => state.weatherForm.searchType;

const selectSubmitButtonState = createSelector(
    [selectWeatherDataLoading, selectGeolocationStatus, selectSearchType],
    (isDataLoading, geolocationStatus, searchType) => ({
        isDataLoading,
        isGeolocationNotGranted: searchType === 'current-location' && geolocationStatus !== 'granted',
    })
);

export function SubmitButton() {
    const { isDataLoading, isGeolocationNotGranted } = useSelector(selectSubmitButtonState);

    return (
        <button
            type="submit"
            className="weather-form__submit-button"
            disabled={isDataLoading || isGeolocationNotGranted}
        >
            Get Weather
        </button>
    );
}

import '@/features/weather-form/components/submit-button/SubmitButton.css';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setWeatherFormValueAfterSubmit } from '@/features/weather-form/weatherFormSlice';

export function SubmitButton() {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <button
            type="submit"
            className="weather-form__submit-button"
            onClick={() => dispatch(setWeatherFormValueAfterSubmit())}
        >
            Get Weather
        </button>
    );
}

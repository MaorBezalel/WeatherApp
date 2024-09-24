import { configureStore } from '@reduxjs/toolkit';

import themeToggleReducer from '@/features/theme-toggle/themeToggleSlice';
import weatherFormReducer from '@/features/weather-form/weatherFormSlice';
import weatherDataReducer from '@/features/weather-data/weatherDataSlice';

const store = configureStore({
    reducer: {
        themeToggle: themeToggleReducer,
        weatherForm: weatherFormReducer,
        weatherData: weatherDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

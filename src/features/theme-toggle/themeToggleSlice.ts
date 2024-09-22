import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeToggleState {
    value: 'light' | 'dark';
}

const THEME_PREFERENCE_KEY = 'weather-app--theme-preference';

const initialState: ThemeToggleState = {
    value: localStorage.getItem(THEME_PREFERENCE_KEY) === 'dark' ? 'dark' : 'light',
};

const themeToggleSlice = createSlice({
    name: 'themeToggle',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.value = state.value === 'light' ? 'dark' : 'light';
            localStorage.setItem(THEME_PREFERENCE_KEY, state.value);
        },
        setTheme(state, action: PayloadAction<'light' | 'dark'>) {
            state.value = action.payload;
            localStorage.setItem(THEME_PREFERENCE_KEY, state.value);
        },
    },
});

export const { toggleTheme, setTheme } = themeToggleSlice.actions;
export default themeToggleSlice.reducer;

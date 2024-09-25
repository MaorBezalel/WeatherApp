import { Wrapper } from '@/layouts/wrapper/Wrapper';
import { Header } from '@/layouts/header/Header';
import { Main } from '@/layouts/main/Main';

import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import { RootState } from '@/store';

import { WeatherForm, WeatherFormContainer } from '@/features/weather-form/WeatherForm';
import { WeatherData } from '@/features/weather-data/WeatherData';

export default function App() {
    const theme = useSelector((state: RootState) => state.themeToggle.value);

    useLayoutEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return (
        <Wrapper>
            <Main>
                <WeatherFormContainer>
                    <Header />
                    <WeatherForm />
                </WeatherFormContainer>

                <WeatherData />
            </Main>
        </Wrapper>
    );
}

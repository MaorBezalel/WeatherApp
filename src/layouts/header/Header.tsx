import '@/layouts/header/Header.css';
import { ThemeToggle } from '@/features/theme-toggle/ThemeToggle';

export function Header() {
    return (
        <header className="header">
            <h1 className="header__title">Weather App</h1>
            <ThemeToggle />
        </header>
    );
}

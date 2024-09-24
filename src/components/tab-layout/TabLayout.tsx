import '@/components/tab-layout/TabLayout.css';
import { ChangeEventHandler, InputHTMLAttributes } from 'react';

interface Tab {
    label: string;
    value: InputHTMLAttributes<HTMLInputElement>['value'];
    readonly defaultChecked?: boolean;
}

interface TabLayoutProps {
    tabs: Tab[];
    tabGroupName: string;
    onTabSelect: ChangeEventHandler<HTMLInputElement>;
}

export function TabLayout({ tabs, tabGroupName, onTabSelect }: TabLayoutProps) {
    return (
        <menu
            className="tab-layout"
            aria-label={tabGroupName}
        >
            {tabs.map((tab) => (
                <li
                    key={tab.label}
                    style={{ display: 'contents' }}
                >
                    <label
                        htmlFor={`${tabGroupName}-tab-${tab.value}`}
                        className="tab-button"
                    >
                        {tab.label}
                        <input
                            name={tabGroupName}
                            id={`${tabGroupName}-tab-${tab.value}`}
                            type="radio"
                            value={tab.value}
                            defaultChecked={tab.defaultChecked}
                            onChange={onTabSelect}
                        />
                    </label>
                </li>
            ))}
        </menu>
    );
}

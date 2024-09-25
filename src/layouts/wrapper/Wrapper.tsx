import '@/layouts/wrapper/Wrapper.css';

import { PropsWithChildren } from 'react';

export function Wrapper({ children }: PropsWithChildren) {
    return <div className="layout-wrapper">{children}</div>;
}

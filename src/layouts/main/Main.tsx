import '@/layouts/main/Main.css';

import { PropsWithChildren } from 'react';

export function Main({ children }: PropsWithChildren) {
    return <main className="main container">{children}</main>;
}

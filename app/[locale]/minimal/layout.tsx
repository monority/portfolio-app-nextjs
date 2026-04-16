import { ReactNode } from 'react';
export type MinimalLayoutProps = {
    children: ReactNode;
};
export default function MinimalLayout({ children }: MinimalLayoutProps) {
    return (
        <main className="main-shell">
            {children}
        </main>
    );
}
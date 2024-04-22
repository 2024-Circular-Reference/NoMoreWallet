import { ReactNode } from 'react';
import NoMoreHeader from '@pages/popup/components/NoMoreHeader';

type MainLayoutProps = {
    children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <main className="relative h-600 bg-primary text-secondary scroll-hidden">
            <NoMoreHeader />
            <div className="h-32" />
            {children}
        </main>
    );
}

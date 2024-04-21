import { ReactNode } from 'react';
import Footer from '../components/Footer';
import NoMoreHeader from '@pages/popup/components/NoMoreHeader';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="relative h-600 overflow-y-auto bg-primary text-secondary">
      <NoMoreHeader />
      <div className="h-32" />
      {children}
    </main>
  );
}

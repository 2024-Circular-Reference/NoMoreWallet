import { ReactNode } from 'react';
import Footer from '../components/Footer';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="relative h-600 overflow-y-auto">
      <header className="h-32 text-center text-white bg-gray-900 flex items-center justify-center noscroll rounded-b-xl absolute top-0 left-0 right-0 m-auto">
        Wallet
      </header>
      <div className="h-32" />
      {children}
    </main>
  );
}

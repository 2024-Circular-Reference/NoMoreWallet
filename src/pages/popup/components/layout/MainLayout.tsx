import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main>
      <header className="h-8 text-center text-white bg-gray-900 flex items-center justify-center noscroll">
        Test용 니어 지갑
      </header>
      {children}
    </main>
  );
}

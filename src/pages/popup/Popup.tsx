import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import MainLayout from '@root/src/pages/popup/layouts/MainLayout';
import { useRouter } from '@src/stores/useRouter';
import InitSection from '@root/src/pages/popup/app/init/index';
import LoginWalletSection from '@root/src/pages/popup/app/login-wallet/index';
import CreateWalletSection from '@root/src/pages/popup/app/create-wallet/index';
import ImportWalletSection from '@root/src/pages/popup/app/import-wallet/index';
import HomeSection from '@root/src/pages/popup/app/home/index';
import TestSection from './app/test';
import LoadingModal from './components/LoadingModal';
import Toast from '@pages/popup/components/Toast';

function Popup() {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      {pathname === '/' && <InitSection />}
      {pathname === '/login-wallet' && <LoginWalletSection />}
      {pathname === '/create-wallet' && <CreateWalletSection />}
      {pathname === '/import-wallet' && <ImportWalletSection />}
      {pathname === '/home' && <HomeSection />}
      {pathname === '/test' && <TestSection />}
      <LoadingModal />
      <Toast />
    </MainLayout>
  );
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);

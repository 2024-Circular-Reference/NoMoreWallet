import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import MainLayout from '@root/src/pages/popup/layouts/MainLayout';
import { useRouter } from '@src/stores/useRouter';
import InitSection from '@pages/popup/app';
import LoadingModal from './components/LoadingModal';
import Toast from '@pages/popup/components/Toast';
import ViewModal from '@pages/popup/components/ViewModal';

function Popup() {
    const { pathname } = useRouter();

    return (
        <MainLayout>
            {pathname === '/' && <InitSection />}
            <ViewModal />
            <LoadingModal />
            <Toast />
        </MainLayout>
    );
}

export default withErrorBoundary(
    withSuspense(Popup, <div> Loading ... </div>),
    <div> Error Occur </div>
);

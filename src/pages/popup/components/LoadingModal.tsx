import { useLoading } from '@root/src/stores/useLoading';
import Portal from './Portal';
import { BounceLoader } from 'react-spinners';

export default function LoadingModal() {
    const isLoading = useLoading((state) => state.isLoading);

    if (!isLoading) {
        return null;
    }

    return (
        <Portal>
            <BounceLoader
                color="#3B5F6E"
                loading={isLoading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Portal>
    );
}

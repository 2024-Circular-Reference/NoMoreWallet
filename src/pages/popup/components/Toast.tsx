import { useToast } from '@src/stores/useToast';
import { cls } from '@root/utils/util';
import { useEffect } from 'react';

export default function Toast() {
    const { isOpen, type, message, closeToast } = useToast();

    useEffect(
        function closeToastEffect() {
            if (isOpen) {
                setTimeout(() => {
                    closeToast();
                }, 3000);
            }
        },
        [isOpen]
    );

    return (
        <div
            className={cls(
                `fixed bottom-8 left-8 right-8 z-50 flex justify-center p-4 bg-white border-t border-primary h-40 rounded-12 justify-center items-center`,
                'transition-all duration-300 ease-in-out',
                isOpen ? '' : 'translate-y-60',
                type === 'success' ? 'text-green-500' : 'text-red-500'
            )}
        >
            <span>{message}</span>
        </div>
    );
}

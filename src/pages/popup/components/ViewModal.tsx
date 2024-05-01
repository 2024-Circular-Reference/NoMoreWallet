import { useViewModalStore } from '@src/stores/useViewModal';
import Portal from '@pages/popup/components/Portal';

export default function ViewModal() {
    const { isOpen, data, closeModal } = useViewModalStore((state) => state);

    if (!isOpen) {
        return null;
    }

    const jsonData = JSON.stringify(data?.value, null, 2);

    return (
        <Portal>
            <div
                className="w-240 h-480 flex flex-col bg-white rounded-8 items-center gap-y-16"
                style={{ padding: '24px', height: '360px' }}
            >
                <div className="flex flex-col h-full items-center gap-y-12">
                    <p className="text-20">{data?.label}</p>
                    <textarea
                        disabled={true}
                        className="w-full h-full focus:outline-none bg-white border border-gray-300"
                        value={jsonData}
                    />
                </div>
                <div className="flex gap-x-8 w-full">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(jsonData);
                        }}
                        className="w-full h-fit p-2 bg-secondary text-white text-18"
                    >
                        복사
                    </button>
                    <button
                        onClick={closeModal}
                        className="w-full h-fit p-2 bg-secondary text-white text-18"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </Portal>
    );
}

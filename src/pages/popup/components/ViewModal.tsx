import { useViewModalStore } from '@src/stores/useViewModal';
import Portal from '@pages/popup/components/Portal';

export default function ViewModal() {
    const { isOpen, data, closeModal } = useViewModalStore((state) => state);

    if (!isOpen) {
        return null;
    }

    const jsonData = JSON.stringify(data?.value, null, 2);

    const onDownloadJsonFile = () => {
        const blob = new Blob([jsonData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${data?.label}-data.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

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
                        onClick={onDownloadJsonFile}
                        className="w-full h-fit p-2 bg-secondary text-white text-18"
                    >
                        다운로드
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

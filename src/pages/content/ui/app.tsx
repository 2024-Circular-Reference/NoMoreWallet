import { useEffect } from 'react';

export default function App() {
    useEffect(() => {
        console.log('content view loaded');
    }, []);

    return (
        <div
            className=""
            id="2024-pnu-no-more-wallet"
            style={{ display: 'none' }}
        >
            2024 순환참조의 NoMoreWallet이 설치되어 있다는 흔적입니다.
        </div>
    );
}

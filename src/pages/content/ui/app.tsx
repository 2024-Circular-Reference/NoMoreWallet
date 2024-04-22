import { useEffect } from 'react';

export default function App() {
    useEffect(() => {
        console.log('content view loaded');
    }, []);

    return (
        <div className="" id="2024-pnu-wallet">
            2024 순환참조 지갑 흔적
        </div>
    );
}

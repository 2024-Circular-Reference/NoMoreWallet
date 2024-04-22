import { useState } from 'react';

async function getDidList() {
    return 'did:list';
}

async function registerDid() {
    return 'did:register';
}

export default function HomeSection() {
    const [myDid, setMyDid] = useState('');
    const [result, setResult] = useState('');

    const onGetDid = async () => {
        const res = await getDidList();
        setResult(res);
    };

    const onRegisterDid = async () => {
        const res = await registerDid();
        setMyDid(res);
    };

    return (
        <section className="flex flex-col w-full items-center justify-center noscroll gap-y-8 px-16">
            <p>hello, this is home!!</p>
            <button
                onClick={onGetDid}
                className="w-full h-32 bg-gray-900 text-white rounded-xl"
            >
                Did 가져오기
            </button>
            <button
                onClick={onRegisterDid}
                className="w-full h-32 bg-gray-900 text-white rounded-xl"
            >
                Did 등록하기
            </button>
            <p>did: {myDid}</p>
            <p>result: {result}</p>
        </section>
    );
}

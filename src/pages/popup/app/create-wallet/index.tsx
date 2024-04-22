import { useState, useEffect } from 'react';
import { sendMessageToBackgroundAsync } from '@root/src/chrome/message';

const totalSteps = 3;

export default function Creating() {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep((prevStep) => Math.min(prevStep + 1, totalSteps - 1));
    };

    const handlePrevious = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
            <div className="relative w-full overflow-hidden h-full">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${step * 100}vw)` }}
                >
                    <Step1Section />
                    <Step2Section />
                    <Step3Section />
                </div>
            </div>
            <div className="mt-4">
                <button
                    className="mr-4 px-4 py-2 bg-blue-500 text-white"
                    onClick={handlePrevious}
                    disabled={step === 0}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white"
                    onClick={handleNext}
                    disabled={step === totalSteps - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

const getPhrase = async (id: string, pw: string) => {
    console.log('get phrage');
    const res = await sendMessageToBackgroundAsync({
        type: 'GetPhrase',
    });
    console.log(res.seedPhrase);
    return res.seedPhrase;
};

function Step1Section() {
    const [phrase, setPhrase] = useState('');

    useEffect(() => {
        getPhrase('id', 'pw').then(setPhrase);
    }, []);

    return (
        <section className="flex-none w-screen h-full flex flex-col p-8 gap-y-12">
            <h1 className="text-xl font-bold ">Secret Recovery Phrase</h1>
            <p className="text-sm text-gray-500">
                Please save this phrase in a secure place.
            </p>
            <div className="relative p-8 border">
                <p className="text-white">{phrase}</p>
            </div>
        </section>
    );
}

function Step2Section() {
    return (
        <section className="flex-none w-screen h-full">
            <p>step2</p>
        </section>
    );
}

function Step3Section() {
    return (
        <section className="flex-none w-screen h-full">
            <p>step3</p>
        </section>
    );
}

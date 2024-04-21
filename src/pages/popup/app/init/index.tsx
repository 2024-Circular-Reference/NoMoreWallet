import { useState } from 'react';
import CreateAccountSection from '@pages/popup/app/init/create-account';
import CreateProofSection from '@pages/popup/app/init/create-proof';
import VerifyProofSection from '@pages/popup/app/init/verify-proof';
import LandingSection from '@pages/popup/app/init/landing';

const TOTAL_STEP = 4;

export default function InitSection() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(prevStep => Math.min(prevStep + 1, TOTAL_STEP - 1));
  };

  const handlePrevious = () => {
    setStep(prevStep => Math.max(prevStep - 1, 0));
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
      <div className="relative w-full overflow-hidden h-full">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${step * 100}vw)` }}>
          <LandingSection onNextStep={handleNext} />
          <CreateAccountSection onNextStep={handleNext} />
          <CreateProofSection />
          <VerifyProofSection />
        </div>
      </div>
      <div className="flex gap-x-4 mt-4">
        <button className="px-4 py-2" onClick={handlePrevious} disabled={step === 0}>
          Previous
        </button>
        <button className="px-4 py-2" onClick={handleNext} disabled={step === TOTAL_STEP - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

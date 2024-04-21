import NoMoreWalletLogo from '@assets/img/no-more-wallet-logo.png';

interface Props {
  onNextStep: () => void;
}

export default function LandingSection({ onNextStep }: Props) {
  return (
    <section className="flex-none flex flex-col items-center gap-y-24 px-24 w-screen h-screen">
      <div className="flex flex-col items-center mt-12">
        <img src={NoMoreWalletLogo} alt="near protocol" width={200} />
        <p
          className="text-20 font-bold w-full text-center leading-48 opacity-0 animate-fadeIn"
          style={{ animationDelay: '0.5s' }}>
          세상에 하나 뿐인
        </p>
        <p
          className="text-20 font-bold w-full text-center leading-48 opacity-0 animate-fadeIn"
          style={{ animationDelay: '1.5s' }}>
          당신만의 증거를
        </p>
        <p
          className="text-20 font-bold w-full text-center leading-48 opacity-0 animate-fadeIn"
          style={{ animationDelay: '2.5s' }}>
          만들어보세요!
        </p>
      </div>
      <div className="animate-springAlways" style={{ animationDelay: '3.5s' }}>
        <button
          onClick={onNextStep}
          className="flex items-center justify-center w-fit px-12 py-8 h-32 bg-secondary text-base text-white rounded-full opacity-0 animate-fadeIn"
          style={{ animationDelay: '3.5s' }}>
          증거 만들러가기
        </button>
      </div>
    </section>
  );
}

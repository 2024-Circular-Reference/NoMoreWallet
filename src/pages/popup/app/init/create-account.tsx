import { FormEvent, useRef, useState } from 'react';
import { cls } from '@root/utils/util';
import { sendMessageToBackgroundAsync } from '@src/chrome/message';
import { useLoading } from '@src/stores/useLoading';
import { useAuth } from '@src/stores/useAuth';
import Toast from '@pages/popup/components/Toast';
import { useToast } from '@src/stores/useToast';

const createAccount = async (id: string) => {
  console.log('create account');
  const res = await sendMessageToBackgroundAsync({
    type: 'CreateAccount',
    input: {
      id,
    },
    code: 200,
  });

  return res.account;
};

interface Props {
  onNextStep: () => void;
  isActive: boolean;
}

export default function CreateAccountSection({ onNextStep, isActive }: Props) {
  const accountIdRef = useRef<HTMLInputElement>();
  const [isAvailable, setIsAvailable] = useState(true);
  const { setLoading } = useLoading();
  const { openToast } = useToast();

  const { auth, setAccount } = useAuth();

  const onCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
    if (accountIdRef.current?.value === '') {
      setIsAvailable(false);
      return;
    }

    setLoading(true);
    try {
      const newAccountId = accountIdRef.current.value + '.testnet';
      const res = await createAccount(newAccountId);

      console.log(res);
      setAccount(res);

      onNextStep();
    } catch (e) {
      console.error(e);
      // alert('계정 이름이 중복되었습니다! 다른 이름을 입력해주세요.');
      openToast('계정 이름이 중복되었습니다! 다른 이름을 입력해주세요.', 'error');
    }
    setLoading(false);
  };

  return (
    <section
      className={cls('flex-none flex flex-col items-center px-24 w-screen h-screen', isActive ? 'block' : 'hidden')}>
      <div className="animate-fadeIn opacity-0" style={{ animationDelay: '0.5s' }}>
        <p className="text-20 font-bold mt-96 text-center">1. 당신을 증명할</p>
        <p className="text-20 font-bold text-center">계정을 생성해보세요!</p>
      </div>
      <form className="flex flex-col gap-y-12 animate-fadeIn opacity-0 mt-96">
        <div
          className={cls(
            'relative text-base flex items-center animate-fadeIn opacity-0',
            isAvailable ? 'border-slate-400' : 'border-red-500',
          )}
          style={{ animationDelay: '1.5s' }}>
          <input
            ref={accountIdRef}
            defaultValue={auth.account?.accountId}
            placeholder="Account ID"
            className="w-fit focus:outline-none bg-transparent text-lg"
            type="text"
          />
          <label className="absolute right-0 rounded-12 border border-secondary px-4 text-sm">testnet</label>
        </div>
        <div className="flex flex-col w-full gap-y-4">
          <button
            onClick={onCreateAccount}
            className="flex items-center justify-center w-full py-2 bg-secondary text-sm text-white rounded-12 opacity-0 animate-fadeIn"
            style={{ animationDelay: '2.0s' }}>
            계정 생성하기
          </button>
          {/*<Link pathname="/import-wallet" className="underline text-gray-600">*/}
          {/*  <div className="underline text-gray-600 animate-fadeIn opacity-0" style={{ animationDelay: '2.5s' }}>*/}
          {/*    기존 계정으로 로그인하기*/}
          {/*  </div>*/}
          {/*</Link>*/}
        </div>
      </form>
    </section>
  );
}

import NearProtocolImage from '@assets/img/near-protocol-logo.png';
import Link from '../../components/Link';
import { FormEvent, useRef, useState } from 'react';
import { cls } from '@root/utils/util';
import { sendMessageToBackgroundAsync } from '@src/chrome/message';
import { useLoading } from '@src/stores/useLoading';
import { useAuth } from '@src/stores/useAuth';

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
}

export default function CreateAccountSection({ onNextStep }: Props) {
  const accountIdRef = useRef<HTMLInputElement>();
  const [isAvailable, setIsAvailable] = useState(true);
  const { setLoading } = useLoading();
  const { auth, setAccount } = useAuth();

  const onCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
    if (accountIdRef.current?.value !== '') {
      const newAccountId = accountIdRef.current.value + '.testnet';
      setLoading(true);
      const res = await createAccount(newAccountId);
      console.log(res);
      setAccount(res);
      setLoading(false);
      onNextStep();
    } else {
      alert('account id is empty');
    }
  };

  return (
    <section className="flex-none flex flex-col items-center gap-y-12 px-24 w-screen h-screen">
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-2xl text-black font-bold">Welcome to Wallet!</h1>
        <img src={NearProtocolImage} alt="near protocol" width={200} />
      </div>
      <form className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 w-full">
          <div
            className={cls(
              'relative overflow-hidden text-base flex rounded-full border text-lg',
              isAvailable ? 'border-slate-400' : 'border-red-500',
            )}>
            <input
              ref={accountIdRef}
              defaultValue={auth.account?.accountId}
              placeholder="Account ID"
              className="ml-8 w-fit focus:outline-none"
              type="text"
            />
            <p className="absolute right-8">.testnet</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <button
            onClick={onCreateAccount}
            className="flex items-center justify-center w-full py-8 h-32 bg-black text-base text-white rounded-full">
            Create Account
          </button>
          <Link pathname="/import-wallet" className="underline text-gray-600">
            Import an existing wallet
          </Link>
        </div>
      </form>
    </section>
  );
}

import { create } from 'zustand';
import { UserAccount } from '../types/wallet';

interface UserAccountState {
    userAccount: UserAccount | null;
    setUserAccount: (userAccount: UserAccount) => void;
}

export const useUserAccount = create<UserAccountState>((set) => ({
    userAccount: import.meta.env.VITE_DEV_MODE
        ? ({
              seedPhrase: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_SEED_PHRASE,
              publicKey: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_PUBLIC_KEY,
              secretKey: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_SECRET_KEY,
              accountId: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_ID,
          } as UserAccount)
        : null,
    setUserAccount: (userAccount) => set({ userAccount }),
}));

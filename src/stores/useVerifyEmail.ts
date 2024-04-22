import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IVerifyEmailState {
    isVerified: boolean;
    verifingCode: string;
    setVerifingCode: (code: string) => void;
    setVerified: (isVerified: boolean) => void;
}

export const useVerifyEmail = create(
    persist<IVerifyEmailState>(
        (set, get) => ({
            isVerified: false,
            verifingCode: '',
            setVerifingCode: (code: string) => {
                set({ verifingCode: code });
            },
            setVerified: (isVerified: boolean) => {
                set({ isVerified });
            },
        }),
        {
            name: 'food-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

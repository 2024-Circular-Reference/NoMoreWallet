import { create } from 'zustand';
import { UserAccount } from '@src/types/wallet';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IDid {
    vc: any;
    vp: any;
    issuerPublicKey: string;
}

interface IAuth {
    account: UserAccount | null;
    email: string;
    did: IDid;
    proof: object;
    publicSignals: object;
}

interface IAuthState {
    auth: IAuth;
    setAccount: (account: UserAccount) => void;
    setEmail: (email: string) => void;
    setDid: (did: IDid) => void;
    setProof: (proof: object) => void;
    setPublicSignals: (publicSignals: object) => void;
    clearAuth: () => void;
}

export const useAuth = create(
    persist<IAuthState>(
        (set) => ({
            auth: {
                account: {
                    seedPhrase: import.meta.env
                        .VITE_TESTNET_TEST_ACCOUNT_SEED_PHRASE,
                    publicKey: import.meta.env
                        .VITE_TESTNET_TEST_ACCOUNT_PUBLIC_KEY,
                    secretKey: import.meta.env
                        .VITE_TESTNET_TEST_ACCOUNT_SECRET_KEY,
                    accountId: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_ID,
                } as UserAccount,
                email: '',
                did: {
                    vc: {},
                    vp: '',
                    issuerPublicKey: '',
                },
                proof: {},
                publicSignals: {},
            },
            setAccount: (account) =>
                set((state) => ({ auth: { ...state.auth, account } })),
            setEmail: (email) =>
                set((state) => ({ auth: { ...state.auth, email } })),
            setDid: (did) => set((state) => ({ auth: { ...state.auth, did } })),
            setProof: (proof) =>
                set((state) => ({ auth: { ...state.auth, proof } })),
            setPublicSignals: (publicSignals) =>
                set((state) => ({ auth: { ...state.auth, publicSignals } })),
            clearAuth: () =>
                set({
                    auth: {
                        account: null,
                        email: '',
                        did: {
                            vc: {},
                            vp: '',
                            issuerPublicKey: '',
                        },
                        proof: {},
                        publicSignals: {},
                    },
                }),
        }),
        {
            name: 'no-more-wallet-proof', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

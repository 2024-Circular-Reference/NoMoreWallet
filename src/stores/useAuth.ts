import { create } from 'zustand';
import { UserAccount } from '@src/types/wallet';

interface IUserInfo {
    email: string;
    studentId: string;
}

interface IDid {
    vc: object;
    vp: any;
    issuerPublicKey: string;
}

interface IAuth {
    account: UserAccount | null;
    userInfo: IUserInfo;
    did: IDid;
    proof: object;
}

interface IAuthState {
    auth: IAuth;
    setAccount: (account: UserAccount) => void;
    setUserInfo: (userInfo: IUserInfo) => void;
    setDid: (did: IDid) => void;
    setProof: (proof: object) => void;
    clearAuth: () => void;
}

export const useAuth = create<IAuthState>((set) => ({
    auth: {
        account: {
            seedPhrase: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_SEED_PHRASE,
            publicKey: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_PUBLIC_KEY,
            secretKey: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_SECRET_KEY,
            accountId: import.meta.env.VITE_TESTNET_TEST_ACCOUNT_ID,
        } as UserAccount,
        userInfo: {
            email: '',
            studentId: '',
        },
        did: {
            vc: {},
            vp: '',
            issuerPublicKey: '',
        },
        proof: {},
    },
    setAccount: (account) =>
        set((state) => ({ auth: { ...state.auth, account } })),
    setUserInfo: (userInfo) =>
        set((state) => ({ auth: { ...state.auth, userInfo } })),
    setDid: (did) => set((state) => ({ auth: { ...state.auth, did } })),
    setProof: (proof) => set((state) => ({ auth: { ...state.auth, proof } })),
    clearAuth: () =>
        set({
            auth: {
                account: null,
                userInfo: {
                    email: '',
                    studentId: '',
                },
                did: {
                    vc: {},
                    vp: '',
                    issuerPublicKey: '',
                },
                proof: {},
            },
        }),
}));

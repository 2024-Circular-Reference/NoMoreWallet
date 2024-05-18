import { useAuth } from '@src/stores/useAuth';
import { useLoading } from '@src/stores/useLoading';
import { useRef, useState } from 'react';
import { useToast } from '@src/stores/useToast';
import { useVerifyEmail } from '@src/stores/useVerifyEmail';
import axios from '@pages/lib/utils/axios';
import { useJwt } from 'react-jwt';
import useZkProof from '@pages/popup/hooks/useZkProof';
import * as nearAPI from 'near-api-js';
import { connect, keyStores } from 'near-api-js';
import bs58 from 'bs58';

export default function useCreateProof() {
    const emailRef = useRef<HTMLInputElement>();
    const verifyCodeRef = useRef<HTMLInputElement>();
    const { auth, setDid, setProof, setPublicSignals, setEmail } = useAuth();
    const { setLoading } = useLoading();
    const { openToast } = useToast();
    const { generateZkProof } = useZkProof();
    const { verifingCode, setVerifingCode, setVerified, isVerified } =
        useVerifyEmail();

    const [isWaitingForVerify, setIsWaitingForVerify] = useState(false);

    const convertAccountIdToPubKey = async (accountId: string) => {
        // accountId : (ex) bob.testnet
        const { keyStores, connect } = nearAPI;
        const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

        const connectionConfig = {
            networkId: 'testnet',
            keyStore: myKeyStore,
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            explorerUrl: 'https://explorer.testnet.near.org',
        };
        const near = await connect(connectionConfig);
        const account = await near.account(accountId);
        const accessKeys = await account.getAccessKeys();
        console.log(accessKeys);
        return accessKeys[0].public_key;
    };

    const onCreateVcAndProof = async (): Promise<boolean> => {
        setLoading(true);
        const email = emailRef.current.value;
        console.log(email, auth.account?.publicKey);
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:8081/api/holder/create-vc',
                data: {
                    email,
                    holderPubKey: auth.account?.publicKey,
                },
            });
            console.log(res);
            if (res.data.statusCode === 200) {
                // TODO: 생성된 VC 검증하는 로직 구현
                const issuerPubKey = await convertAccountIdToPubKey(
                    res.data.data.issuerPubKey
                );
                const bs58IssuerPubKey = issuerPubKey.replace('ed25519:', '');
                console.log(bs58IssuerPubKey);
                setEmail(email);
                const vc = JSON.parse(res.data.data.vc);
                setDid({
                    vc,
                    vp: {
                        '@context': ['https://www.w3.org/2018/credentials/v1'],
                        'type': ['VerifiablePresentation'],
                        'verifiableCredential': [res.data.data.vc],
                    },
                    issuerPublicKey: issuerPubKey,
                });
                console.log(res.data.data);
                console.log('DID 생성이 완료되었습니다. Proof를 생성합니다.');
                console.log(vc);
                const vcNumber = res.data.data.message;
                const { proofValue } = vc.proof;
                await onCreateProof(vcNumber, proofValue, bs58IssuerPubKey);
            } else {
                throw new Error('failed create vc' + res);
            }
        } catch (e) {
            console.error(e);
            openToast('DID 생성에 실패했습니다. 다시 시도해주세요.', 'error');
            setLoading(false);
            return false;
        }
        setLoading(false);
        return true;
    };

    const onCreateProof = async (
        vcNumber: string,
        proofValue: string,
        bs58IssuerPubKey: string
    ) => {
        const res = await generateZkProof(
            vcNumber,
            proofValue,
            bs58IssuerPubKey
        );
        console.log(res);
        setProof(res.proof);
        setPublicSignals(res.publicSignals);
    };

    const onSendVerifyCode = async () => {
        const email = emailRef.current.value;
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:8081/api/holder/v1/send-email',
                data: {
                    email,
                },
            });
            console.log(res);
            if (res.data.statusCode === 200) {
                openToast(`이메일 인증이 완료되었습니다.`, 'success');
                console.log(res.data.data.token);
                setVerifingCode(res.data.data.token);
                setIsWaitingForVerify(true);
            } else {
                throw new Error('failed verify email' + res);
            }
        } catch (e) {
            console.error(e);
            openToast(
                '이메일 인증에 실패했습니다. 다시 시도해주세요.',
                'error'
            );
        }
    };

    const { decodedToken }: { decodedToken: any } = useJwt(verifingCode);

    const onVerifyEmail = async () => {
        if (verifyCodeRef.current.value === '') {
            openToast('인증코드를 입력해주세요.', 'error');
            return;
        }

        const verifyCode = verifyCodeRef.current.value;
        console.log(decodedToken);

        if (verifyCode !== decodedToken.code) {
            openToast('인증코드가 일치하지 않습니다.', 'error');
            setVerified(false);
            return;
        } else {
            openToast('인증이 완료되었습니다.', 'success');
            setVerified(true);
        }
    };

    return {
        auth,
        isVerified,
        emailRef,
        verifyCodeRef,
        isWaitingForVerify,
        onCreateVcAndProof,
        onSendVerifyCode,
        onVerifyEmail,
    };
}

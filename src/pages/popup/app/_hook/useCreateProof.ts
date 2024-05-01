import { useAuth } from '@src/stores/useAuth';
import { useLoading } from '@src/stores/useLoading';
import { FormEvent, useRef, useState } from 'react';
import { useToast } from '@src/stores/useToast';
import { useVerifyEmail } from '@src/stores/useVerifyEmail';
import axios from '@pages/lib/utils/axios';
import useZkProof from '@src/hooks/useZkProof';
import { useJwt } from 'react-jwt';

export default function useCreateProof() {
    const { auth, setDid, setProof } = useAuth();
    const { setLoading } = useLoading();
    const emailRef = useRef<HTMLInputElement>();
    const verifyCodeRef = useRef<HTMLInputElement>();
    const { openToast } = useToast();
    const { verifingCode, setVerifingCode, setVerified, isVerified } =
        useVerifyEmail();
    const [isWaitingForVerify, setIsWaitingForVerify] = useState(false);

    const onCreateVcAndProof = async (e: FormEvent) => {
        e.preventDefault();
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
                setDid({
                    vc: JSON.parse(res.data.data.vc),
                    vp: {
                        '@context': ['https://www.w3.org/2018/credentials/v1'],
                        'type': ['VerifiablePresentation'],
                        'verifiableCredential': [res.data.data.vc],
                    },
                    issuerPublicKey: res.data.data.issuerPubKey,
                });
                console.log(JSON.parse(res.data.data.vc));
                console.log('DID 생성이 완료되었습니다. Proof를 생성합니다.');
                await onCreateProof('1234567890');
            } else {
                throw new Error('failed create vc' + res);
            }
        } catch (e) {
            console.error(e);
            alert('DID 생성에 실패했습니다. 다시 시도해주세요.');
        }
        setLoading(false);
    };

    const { generateZkProof } = useZkProof();

    const onCreateProof = async (vcNumber: string) => {
        console.log('onCreateProof');
        console.log('Vc No: ', vcNumber);
        const res = await generateZkProof(vcNumber, auth.account.secretKey);
        console.log(res.proof);
        setProof(res.proof);
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

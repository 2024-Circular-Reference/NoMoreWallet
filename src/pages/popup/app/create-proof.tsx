import { cls } from '@root/utils/util';
import { MutableRefObject } from 'react';
import useCreateProof from '@pages/popup/hooks/useCreateProof';

export default function CreateProofSection({
    onNextStep,
    isActive,
}: {
    onNextStep: () => void;
    isActive: boolean;
}) {
    const {
        auth,
        isVerified,
        emailRef,
        verifyCodeRef,
        isWaitingForVerify,
        onCreateVcAndProof,
        onSendVerifyCode,
        onVerifyEmail,
    } = useCreateProof();

    const onClick = async (e) => {
        e.preventDefault();
        if (isVerified) {
            const res = await onCreateVcAndProof();
            if (res) {
                onNextStep();
            }
        }
    };

    return (
        <section
            className={cls(
                'flex-none flex flex-col w-screen min-h-screen items-center justify-center gap-y-24',
                isActive ? 'block' : 'hidden'
            )}
        >
            <div
                className="animate-fadeIn opacity-0"
                style={{ animationDelay: '0.5s' }}
            >
                <p className="text-20 font-bold mt-24 text-center">
                    2. 학교에서 인증서를 발급받고
                </p>
                <p className="text-20 font-bold text-center">
                    당신만의 증명을 생성해보세요!
                </p>
            </div>
            <div className="flex flex-col items-center jusfity-center gap-y-8 w-full px-24 mt-24">
                <div
                    className="flex w-full animate-fadeIn opacity-0"
                    style={{ animationDelay: '1.5s' }}
                >
                    <p>인증기관</p>
                    <select className="p-2 border border-gray-300 rounded-8 ml-auto w-192">
                        <option value="pnu">부산대학교</option>
                        <option value="donga">동아대학교</option>
                        <option value="pknu">부경대학교</option>
                    </select>
                </div>
                <VerifyEmailSection
                    email={auth.email}
                    emailRef={emailRef}
                    verifyCodeRef={verifyCodeRef}
                    isVerified={isVerified}
                    isWaitingForVerify={isWaitingForVerify}
                    onVerifyEmail={onVerifyEmail}
                    onSendVerifyCode={onSendVerifyCode}
                />
                <div
                    className="flex w-full animate-fadeIn opacity-0"
                    style={{ animationDelay: '2.5s' }}
                >
                    <label>계정 ID</label>
                    <p className="ml-auto">{auth.account?.accountId}</p>
                </div>
                <button
                    className="w-full h-32 bg-secondary text-white rounded-12 mt-12 animate-fadeIn opacity-0 disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    style={{ animationDelay: '3.0s' }}
                    onClick={onClick}
                    disabled={!isVerified}
                >
                    Proof 생성
                </button>
            </div>
        </section>
    );
}

function VerifyEmailSection({
    email,
    emailRef,
    verifyCodeRef,
    isVerified,
    isWaitingForVerify,
    onVerifyEmail,
    onSendVerifyCode,
}: {
    email: string;
    emailRef: MutableRefObject<HTMLInputElement>;
    verifyCodeRef: MutableRefObject<HTMLInputElement>;
    isVerified: boolean;
    isWaitingForVerify: boolean;
    onVerifyEmail: () => void;
    onSendVerifyCode: () => void;
}) {
    return (
        <>
            <div
                className="flex w-full items-center justify-center animate-fadeIn opacity-0"
                style={{ animationDelay: '2.0s' }}
            >
                <p>이메일</p>
                <input
                    type="email"
                    placeholder="학과 이메일"
                    className="px-4 border border-gray-300 rounded-l-8 ml-auto focus:outline-none w-136"
                    defaultValue={email || ''}
                    ref={emailRef}
                />
                <button
                    className="bg-blue-400 text-white px-4 w-56 rounded-r-8 border border-blue-400"
                    onClick={onSendVerifyCode}
                >
                    {isWaitingForVerify ? '재전송' : '인증코드'}
                </button>
            </div>
            {isWaitingForVerify && (
                <div
                    className="flex w-full items-center justify-center animate-fadeIn opacity-0"
                    style={{ animationDelay: '2.0s' }}
                >
                    <p>인증코드</p>
                    <input
                        type="text"
                        placeholder="인증코드 입력"
                        className="px-4 border border-gray-300 rounded-l-8 ml-auto focus:outline-none w-136"
                        ref={verifyCodeRef}
                    />
                    <button
                        className={cls(
                            'bg-blue-400 text-white px-4 w-56 rounded-r-8 border border-blue-400',
                            'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-400'
                        )}
                        onClick={onVerifyEmail}
                        disabled={isVerified}
                    >
                        인증
                    </button>
                </div>
            )}
            {isVerified && (
                <div
                    className="flex w-full items-center justify-center animate-fadeIn opacity-0"
                    style={{ animationDelay: '2.0s' }}
                >
                    인증 완료
                </div>
            )}
        </>
    );
}

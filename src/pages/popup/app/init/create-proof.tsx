import { cls } from '@root/utils/util';
import { MutableRefObject } from 'react';
import useCreateProof from '@pages/popup/app/_hook/useCreateProof';

export default function CreateProofSection({
    isActive,
}: {
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
                    2. 학교에서 발급받은 인증서로
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
                    <p>증명 발급 기관</p>
                    <select className="p-2 border border-gray-300 rounded-8 mb-4 ml-auto w-168">
                        <option value="pnu">부산대학교</option>
                        <option value="donga">동아대학교</option>
                        <option value="pknu">부경대학교</option>
                    </select>
                </div>
                <VerifyEmailSection
                    emailRef={emailRef}
                    verifyCodeRef={verifyCodeRef}
                    isWaitingForVerify={isWaitingForVerify}
                    onVerifyEmail={onVerifyEmail}
                    onSendVerifyCode={onSendVerifyCode}
                />
                <div
                    className="flex w-full animate-fadeIn opacity-0"
                    style={{ animationDelay: '2.5s' }}
                >
                    <label>계정 ID</label>
                    <p className="ml-auto">{auth.account?.accountId}.testnet</p>
                </div>
                <button
                    className="w-full h-32 bg-secondary text-white rounded-12 mt-12 animate-fadeIn opacity-0 disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    style={{ animationDelay: '3.0s' }}
                    onClick={onCreateVcAndProof}
                    disabled={!isVerified}
                >
                    Proof 생성
                </button>
            </div>
            <hr
                className="w-[calc(100%-16px)] animate-fadeIn opacity-0 bg-secondary h-2 mt-24"
                style={{ animationDelay: '4.0s' }}
            />
            <ProofViewContainer
                stringifyVc={auth?.did.vc}
                stringifyProof={auth.proof}
            />
        </section>
    );
}

function VerifyEmailSection({
    emailRef,
    verifyCodeRef,
    isWaitingForVerify,
    onVerifyEmail,
    onSendVerifyCode,
}: {
    emailRef: MutableRefObject<HTMLInputElement>;
    verifyCodeRef: MutableRefObject<HTMLInputElement>;
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
                    ref={emailRef}
                />
                <button
                    className="bg-blue-400 text-white px-4 rounded-r-8 border border-blue-400"
                    onClick={onSendVerifyCode}
                >
                    {isWaitingForVerify ? '재전송' : '인증코드 전송'}
                </button>
            </div>
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
                    className="bg-blue-400 text-white px-4 rounded-r-8 border border-blue-400"
                    onClick={onVerifyEmail}
                >
                    인증
                </button>
            </div>
        </>
    );
}

function ProofViewContainer({
    stringifyVc,
    stringifyProof,
}: {
    stringifyVc: string;
    stringifyProof: string;
}) {
    return (
        <div
            id="proof-view"
            className="flex flex-col gap-y-4 w-full px-24 animate-fadeIn opacity-0"
            style={{ animationDelay: '4.5s' }}
        >
            <div className="flex w-full">
                <label>VC</label>
                <textarea
                    disabled={true}
                    className="ml-auto w-168 h-20 focus:outline-none bg-white border border-gray-300"
                    value={stringifyVc}
                />
            </div>
            <div className="flex w-full">
                <label>ZK-Proof</label>
                <textarea
                    disabled={true}
                    className="ml-auto w-168 h-20 focus:outline-none bg-white border border-gray-300"
                    value={stringifyProof}
                />
            </div>
        </div>
    );
}

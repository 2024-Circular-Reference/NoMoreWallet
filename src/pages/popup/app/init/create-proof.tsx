import { FormEvent, useRef } from 'react';
import { useAuth } from '@src/stores/useAuth';
import axios from '@pages/lib/utils/axios';
import { useLoading } from '@src/stores/useLoading';
import init, { wasm_test } from 'zkp_circuit';
import { cls } from '@root/utils/util';

export default function CreateProofSection({
    isActive,
}: {
    isActive: boolean;
}) {
    const { auth, setDid, setProof } = useAuth();
    const { setLoading } = useLoading();
    const emailRef = useRef<HTMLInputElement>();
    const studentIdRef = useRef<HTMLInputElement>();

    const onCreateVC = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const email = emailRef.current.value;
        const studentId = studentIdRef.current.value;
        try {
            const res = await axios({
                method: 'get',
                url: 'http://localhost:8081/api/holder/create-vc',
                params: {
                    email,
                    stNum: studentId,
                    holderPubKey: auth.account?.publicKey,
                },
            });
            console.log(res);
            if (res.data.statusCode === 200) {
                // TODO: 생성된 VC 검증하는 로직 구현
                setDid({
                    vc: res.data.data.vc,
                    vp: {
                        '@context': ['https://www.w3.org/2018/credentials/v1'],
                        'type': ['VerifiablePresentation'],
                        'verifiableCredential': [res.data.data.vc],
                    },
                    issuerPublicKey: res.data.data.issuerPubKey,
                });
                alert(
                    'DID 생성이 완료되었습니다. Proof를 생성하겠습니다. 15분 정도의 시간이 소요되오니 앱을 닫고 기다려주세요.'
                );
                // onWasmTest();
            } else {
                throw new Error('failed create vc' + res);
            }
        } catch (e) {
            console.error(e);
            alert('DID 생성에 실패했습니다. 다시 시도해주세요.');
        }
        setLoading(false);
    };

    const onWasmTest = async () => {
        let res = 0;
        init().then(() => {
            console.log('init wasm');
            res = wasm_test();
            console.log(res);
            setProof(res.toString());
            alert('Proof 생성이 완료되었습니다. 다음 단계로 이동하겠습니다!');
        });
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
                    2. 학교에서 발급받은 인증서로
                </p>
                <p className="text-20 font-bold text-center">
                    당신만의 증명을 생성해보세요!
                </p>
            </div>
            <form
                onSubmit={onCreateVC}
                className="flex flex-col items-center jusfity-center gap-y-8 w-full px-24 mt-24"
            >
                <div
                    className="flex w-full animate-fadeIn opacity-0"
                    style={{ animationDelay: '1.5s' }}
                >
                    <p>인증기관</p>
                    <select className="p-2 border border-gray-300 rounded-8 mb-4 ml-auto w-168">
                        <option value="near">부산대학교</option>
                        <option value="klaytn">동아대학교</option>
                    </select>
                </div>
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
                    <button className="bg-blue-400 text-white px-4 rounded-r-8 border border-blue-400">
                        인증
                    </button>
                </div>
                <div
                    className="flex w-full animate-fadeIn opacity-0"
                    style={{ animationDelay: '2.5s' }}
                >
                    <label>계정 ID</label>
                    <p className="ml-auto">{auth.account?.accountId}.testnet</p>
                </div>
                <button
                    className="w-full h-32 bg-secondary text-white rounded-12 mt-12 animate-fadeIn opacity-0"
                    style={{ animationDelay: '3.0s' }}
                >
                    Proof 생성
                </button>
            </form>
            <hr
                className="w-[calc(100%-16px)] animate-fadeIn opacity-0 bg-secondary h-2 mt-24"
                style={{ animationDelay: '4.0s' }}
            />
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
                    >
                        {auth.did?.vc}
                    </textarea>
                </div>
                <div className="flex w-full">
                    <label>ZK-Proof</label>
                    <textarea
                        disabled={true}
                        className="ml-auto w-168 h-20 focus:outline-none bg-white border border-gray-300"
                    >
                        {auth.proof}
                    </textarea>
                </div>
            </div>
        </section>
    );
}

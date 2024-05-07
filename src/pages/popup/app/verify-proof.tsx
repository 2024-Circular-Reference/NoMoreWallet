import { sendMessageToContentScript } from '@src/chrome/message';
import { Message } from '@src/types/message';
import { cls } from '@root/utils/util';
import { useAuth } from '@src/stores/useAuth';
import { useViewModalStore } from '@src/stores/useViewModal';
import { useState } from 'react';

export default function VerifyProofSection({
    isActive,
}: {
    isActive: boolean;
}) {
    const { auth } = useAuth((state) => state);
    const onClick = () => {
        sendMessageToContentScript(
            Message.FROM_EXTENSION_TO_PAGE,
            JSON.stringify({
                proof: auth.proof,
                holderPubKey: auth.account.publicKey,
                issuerPubKey: auth.did.issuerPublicKey,
                publicSignals: auth.publicSignals,
            })
        );
    };

    const [selectedService, setSelectedService] = useState('짝사랑종이배');

    const onServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    return (
        <section
            className={cls(
                'flex-none relative flex flex-col w-screen h-screen items-center justify-center gap-y-48 px-24',
                isActive ? 'block' : 'hidden'
            )}
        >
            <p
                className="text-20 text-secondary font-bold text-center animate-fadeIn opacity-0"
                style={{ animationDelay: '0.5s' }}
            >
                3. 이제 당신을 증명할 서비스에 <br />
                증명을 제출해보세요!
            </p>
            <div className="flex flex-col gap-y-8 w-full">
                <div
                    className="flex w-full animate-fadeIn opacity-0"
                    style={{ animationDelay: '1.5s' }}
                >
                    <label>검증기관</label>
                    <select
                        className="border ml-auto w-192 rounded-8 p-2"
                        onChange={onServiceChange}
                    >
                        <option>짝사랑종이배</option>
                        <option>열품타</option>
                        <option>에브리타임</option>
                        <option>블라인드</option>
                    </select>
                </div>
                <ProofViewContainer vc={auth.did.vc} proof={auth.proof} />
            </div>
            <div
                className="w-full animate-springAlways"
                style={{ animationDelay: '2.5s' }}
            >
                <button
                    className="w-full h-32 bg-secondary text-white rounded-12 animate-fadeIn opacity-0"
                    style={{ animationDelay: '2.5s' }}
                    onClick={onClick}
                >
                    {selectedService}에 증명 제출하기
                </button>
            </div>
        </section>
    );
}

function ProofViewContainer({ vc, proof }: { vc: object; proof: object }) {
    const { openModal } = useViewModalStore((state) => state);

    const onShowVc = () => {
        console.log(vc);
        openModal({ label: 'VC', value: vc });
    };

    const onShowProof = () => {
        console.log(proof);
        openModal({ label: 'ZK-Proof', value: proof });
    };

    return (
        <div
            id="proof-view"
            className="flex flex-col gap-y-4 w-full animate-fadeIn opacity-0"
            style={{ animationDelay: '2.0s' }}
        >
            <div className="flex w-full">
                <label>VC</label>
                <button className="ml-auto" onClick={onShowVc}>
                    보기
                </button>
            </div>
            <div className="flex w-full">
                <label>ZK-Proof</label>
                <button className="ml-auto" onClick={onShowProof}>
                    보기
                </button>
            </div>
        </div>
    );
}

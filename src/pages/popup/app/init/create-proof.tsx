import { FormEvent, useRef } from 'react';
import { useAuth } from '@src/stores/useAuth';
import axios from '@pages/lib/utils/axios';
import { useLoading } from '@src/stores/useLoading';
import init, { wasm_test } from 'zkp_circuit';

export default function CreateProofSection() {
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
            type: ['VerifiablePresentation'],
            verifiableCredential: [res.data.data.vc],
          },
          issuerPublicKey: res.data.data.issuerPubKey,
        });
        alert(
          'DID 생성이 완료되었습니다. Proof를 생성하겠습니다. 15분 정도의 시간이 소요되오니 앱을 닫고 기다려주세요.',
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
    <section className="flex-none flex flex-col w-screen h-screen items-center justify-center noscroll gap-y-8 px-16">
      <form onSubmit={onCreateVC} className="flex flex-col items-center jusfity-center gap-y-8">
        <div className="flex gap-x-8">
          <p>Email</p>
          <input
            type="email"
            placeholder="학과 이메일"
            className="p-2 border border-gray-300 rounded-md mb-4"
            ref={emailRef}
          />
          <button className="bg-blue-500 text-white p-2 rounded-md">인증</button>
        </div>
        <div className="flex gap-x-8">
          <p>학번</p>
          <input
            type="text"
            placeholder="학번"
            className="p-2 border border-gray-300 rounded-md mb-4"
            ref={studentIdRef}
          />
        </div>
        <div className="flex gap-x-8 max-w-1/2">
          <label>공개키</label>
          <p>{auth.account?.accountId}.testnet</p>
        </div>
        <button className="w-full h-32 bg-gray-900 text-white rounded-xl">Proof 생성</button>
      </form>
      <p>vc: </p>
      <p>proof: </p>
    </section>
  );
}

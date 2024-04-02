import { sendMessageToContentScript } from '@src/chrome/message';
import { Message } from '@src/types/message';

export default function VerifyProofSection() {
  const onClick = () => {
    sendMessageToContentScript(Message.FROM_EXTENSION_TO_PAGE, '얘 부산대 정컴 학생 맞음 ㅇㅇ');
  };

  return (
    <section className="flex-none relative flex flex-col w-screen h-screen items-center justify-center noscroll gap-y-8 px-16">
      <h1 className="text-2xl text-black font-bold">Verify Proof</h1>
      <p>hello, this is verify proof!!</p>
      <div className="flex gap-x-8">
        <label>검증기관</label>
        <select className="border">
          <option>열품타</option>
          <option>에브리타임</option>
          <option>블라인드</option>
        </select>
      </div>
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex relative rounded-full border text-lg overflow-hidden">
          <input placeholder="Your Proof" className="pl-8 focus:outline-none" type="text" />
        </div>
      </div>
      <button className="w-full h-32 bg-gray-900 text-white rounded-xl">verify 검증하기</button>
      <p className="w-full h-60">result: </p>
      <button className="w-full h-32 bg-yellow-200 text-black rounded-xl" onClick={onClick}>
        검증을 마치고 서비스로 돌아가기
      </button>
    </section>
  );
}

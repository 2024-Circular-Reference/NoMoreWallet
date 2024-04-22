import { sendMessageToContentScript } from '@src/chrome/message';
import { Message } from '@src/types/message';
import { cls } from '@root/utils/util';

export default function VerifyProofSection({ isActive }: { isActive: boolean }) {
  const onClick = () => {
    sendMessageToContentScript(Message.FROM_EXTENSION_TO_PAGE, '얘 부산대 정컴 학생 맞음 ㅇㅇ');
  };

  return (
    <section
      className={cls(
        'flex-none relative flex flex-col w-screen h-screen items-center justify-center gap-y-48 px-24',
        isActive ? 'block' : 'hidden',
      )}>
      <p
        className="text-20 text-secondary font-bold text-center animate-fadeIn opacity-0"
        style={{ animationDelay: '0.5s' }}>
        3. 이제 당신을 증명할 서비스에 <br />
        증명을 제출해보세요!
      </p>
      <div className="flex flex-col gap-y-8 w-full">
        <div className="flex w-full animate-fadeIn opacity-0" style={{ animationDelay: '1.5s' }}>
          <label>검증기관</label>
          <select className="border ml-auto w-168 rounded-8 p-2">
            <option>짝사랑종이배</option>
            <option>열품타</option>
            <option>에브리타임</option>
            <option>블라인드</option>
          </select>
        </div>
        <p className="w-full h-32 animate-fadeIn opacity-0" style={{ animationDelay: '2.0s' }}>
          증명서
        </p>
      </div>
      <div className="w-full animate-springAlways" style={{ animationDelay: '2.5s' }}>
        <button
          className="w-full h-32 bg-secondary text-white rounded-12 animate-fadeIn opacity-0"
          style={{ animationDelay: '2.5s' }}
          onClick={onClick}>
          짝사랑종이배에 증명 제출하기
        </button>
      </div>
    </section>
  );
}

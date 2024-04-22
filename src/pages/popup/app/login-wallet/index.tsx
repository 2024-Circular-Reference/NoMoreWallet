import { useRef } from 'react';

export default function LoginSection() {
    const idRef = useRef<HTMLInputElement>();
    const pwRef = useRef<HTMLInputElement>();

    const handleSubmit = async () => {
        if (idRef.current && pwRef.current) {
            console.log('login');
            // const res = await loginNear(idRef.current.value, pwRef.current.value);
            // alert(res);
        } else {
            alert('id or pw is empty');
        }
    };

    return (
        <section className="flex flex-col w-full items-center justify-center noscroll gap-y-8 px-16">
            <p>hello, popup!!</p>
            <input
                ref={idRef}
                placeholder="id"
                className="w-full h-32 border rounded-xl focus:outline-none"
            />
            <input
                ref={pwRef}
                placeholder="pw"
                className="w-full h-32 border rounded-xl focus:outline-none"
            />
            <button
                onClick={handleSubmit}
                className="w-full h-32 bg-gray-900 text-white rounded-xl"
            >
                Submit
            </button>
        </section>
    );
}

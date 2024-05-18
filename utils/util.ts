export function cls(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export function stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder(); // TextEncoder를 생성합니다.
    return encoder.encode(str); // 문자열을 UTF-8로 인코딩하여 Uint8Array로 반환합니다.
}

export function buffer2bits(buff) {
    const res = [];
    for (let i = 0; i < buff.length; i++) {
        for (let j = 0; j < 8; j++) {
            if ((buff[i] >> j) & 1) {
                res.push(1n);
            } else {
                res.push(0n);
            }
        }
    }
    return res;
}

export function uint8ArrayToBinaryArray(uint8Array) {
    const binaryArray = [];

    for (const byte of uint8Array) {
        // 각 바이트를 2진수 문자열로 변환 (8비트로 패딩)
        const binaryString = byte.toString(2).padStart(8, '0');

        // 2진수 문자열을 각각의 숫자(0, 1)로 변환하여 배열에 추가
        for (const bit of binaryString) {
            binaryArray.push(parseInt(bit, 10));
        }
    }

    return binaryArray;
}

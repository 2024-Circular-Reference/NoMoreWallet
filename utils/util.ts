export function cls(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export function stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder(); // TextEncoder를 생성합니다.
    return encoder.encode(str); // 문자열을 UTF-8로 인코딩하여 Uint8Array로 반환합니다.
}

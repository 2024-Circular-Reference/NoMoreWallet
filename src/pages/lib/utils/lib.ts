export function padLeftTo32(input: string, padChar: string = '0'): string {
    // 입력 문자열의 길이가 32 이상인 경우, 문자열을 그대로 반환
    if (input.length >= 32) {
        return input;
    }

    // 32에서 입력 문자열의 길이를 빼서 필요한 패딩의 수를 계산
    const padLength = 32 - input.length;

    // padChar를 padLength만큼 반복하여 생성하고, 입력 문자열의 앞에 추가
    const padding = padChar.repeat(padLength);

    // 패딩된 문자열 반환
    return padding + input;
}

export function padLeftTo64(input: string, padChar: string = '0'): string {
    // 입력 문자열의 길이가 64 이상인 경우, 문자열을 그대로 반환
    if (input.length >= 64) {
        return input;
    }

    // 64에서 입력 문자열의 길이를 빼서 필요한 패딩의 수를 계산
    const padLength = 64 - input.length;

    // padChar를 padLength만큼 반복하여 생성하고, 입력 문자열의 앞에 추가
    const padding = padChar.repeat(padLength);

    // 패딩된 문자열 반환
    return padding + input;
}

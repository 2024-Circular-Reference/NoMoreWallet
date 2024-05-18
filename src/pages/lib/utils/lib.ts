export function padLeftTo32(input: string, padChar: string = '0'): string {
    if (input.length >= 32) {
        return input.slice(0, 32);
    }

    const padLength = 32 - input.length;
    const padding = padChar.repeat(padLength);

    return padding + input;
}

export function stringToHexString(msg: string): string {
    let res: string = '';
    for (let i = 0; i < msg.length; i++) {
        let tmp: string = msg.charCodeAt(i).toString(16);
        while (tmp.length < 2) {
            tmp = '0' + tmp;
        }
        res += tmp;
    }
    return res;
}

export function padLeftTo64(input: string, padChar: string = '0'): string {
    if (input.length >= 64) {
        return input.slice(0, 64);
    }

    const padLength = 64 - input.length;
    const padding = padChar.repeat(padLength);

    return padding + input;
}

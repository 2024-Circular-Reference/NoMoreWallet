import * as snarkjs from 'snarkjs';
import { padLeftTo32, stringToHexString } from '@pages/lib/utils/lib';
import bs58 from 'bs58';
import { buffer2bits } from '@root/utils/util';
import * as ed25519 from '@stablelib/ed25519';

export default function useZkProof() {
    const ISSUER_PRI_KEY =
        '3onivihW6fQRkB4NKiYUfXvzxQc1BkJ6B7hzUGLawPQYeDH4Q92QRWjoGXLfE3mdxXNVy3yoHe95yj9RQCEdghBh';

    // function form 'BE/issuer/issuer-api.service.ts'
    function genMockProofValue(): { proofValue: string; mockMessage: string } {
        const mockMessage: string = 'VC_no_1337';
        return {
            proofValue: bs58.encode(
                ed25519.sign(
                    bs58.decode(ISSUER_PRI_KEY),
                    Buffer.from(mockMessage)
                )
            ),
            mockMessage,
        };
    }

    const convertInput = async (
        vcNumberString: string,
        proofValue: string,
        bs58IssuerPubKey: string
    ) => {
        console.log('Vc No: ', vcNumberString);
        console.log('proofValue: ', proofValue);
        console.log('hexIssuerPubKey: ', bs58IssuerPubKey);

        // 1. msg
        const msg: Buffer = Buffer.from(
            padLeftTo32(stringToHexString(vcNumberString), '0')
        );

        // 2. (issuer) public key
        const pubKeyHexBuffer: Buffer = Buffer.from(
            bs58.decode(bs58IssuerPubKey)
        );

        console.log(bs58.decode(bs58IssuerPubKey));

        // 3. Signature (sign with Issuer private key)
        const sigBuffer = Buffer.from(bs58.decode(proofValue));

        // 3-1. split signature into `r_sig` and `s_sig`
        const r_sig = sigBuffer.subarray(0, 32);
        const s_sig = sigBuffer.subarray(32, 64);

        console.log('msg: ', msg);
        console.log('pubKeyHexBuffer: ', pubKeyHexBuffer);
        console.log('r_sig: ', r_sig);
        console.log('s_sig: ', s_sig);

        const msgBits = buffer2bits(msg);
        const r8Bits = buffer2bits(r_sig);
        const sBits = buffer2bits(s_sig);
        const aBits = buffer2bits(pubKeyHexBuffer);

        console.log(
            'lenghts:',
            msgBits.length,
            r8Bits.length,
            sBits.length,
            aBits.length
        );

        const inputs = {
            isu_pub_key: aBits,
            sig_r: r8Bits,
            sig_s: sBits,
            msg: msgBits,
        };

        console.log(inputs);
        return inputs;
    };

    const generateZkProof = async (
        vcNumberString: string,
        proofValue: string,
        hexIssuerPubKey: string
    ) => {
        const { proofValue: mockProofValue, mockMessage } = genMockProofValue();
        // const inputs = await convertInput(mockMessage, mockProofValue, hexIssuerPubKey);
        const inputs = await convertInput(
            vcNumberString,
            proofValue,
            hexIssuerPubKey
        );
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            // elements of field should be in binary form and the size should be `256`.
            inputs,
            '/zk/circuit.wasm',
            '/zk/circuit_final.zkey'
        );

        console.log('proof: ', proof);
        console.log('publicSignals: ', publicSignals);
        return { proof, publicSignals };
    };

    return {
        generateZkProof,
    };
}

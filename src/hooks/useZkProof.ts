import * as snarkjs from 'snarkjs';
import { padLeftTo32 } from '@pages/lib/utils/lib';
import { buildBabyjub, buildEddsa } from 'circomlibjs';

export default function useZkProof({
    vcNumberString,
    nearPrivateKeyString,
}: {
    vcNumberString: string;
    nearPrivateKeyString: string;
}) {
    const buffer2bits = (buff) => {
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
    };

    const convertInput = async () => {
        const eddsa = await buildEddsa();
        const babyJub = await buildBabyjub();

        // VC_no_1337
        const msg = Buffer.from(padLeftTo32(vcNumberString), 'hex');

        // NEAR Private Key
        const prvKey = Buffer.from(padLeftTo32(nearPrivateKeyString), 'hex');

        // deriv from prvKey
        const pubKey = eddsa.prv2pub(prvKey);

        // drive from pubKey
        const pPubKey = babyJub.packPoint(pubKey);

        // deriv from prvKey, msg
        const signature = eddsa.signPedersen(prvKey, msg);

        // deriv from Signature
        const pSignature = eddsa.packSignature(signature);
        const uSignature = eddsa.unpackSignature(pSignature);

        // check validity
        console.assert(eddsa.verifyPedersen(msg, uSignature, pubKey));

        // output: {msg, pSignature, pPubKey}
        const msgBits = buffer2bits(msg);
        const r8Bits = buffer2bits(pSignature.slice(0, 32));
        const sBits = buffer2bits(pSignature.slice(32, 64));
        const aBits = buffer2bits(pPubKey);

        console.log(
            'lenght: ',
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

    const generateZkProof = async () => {
        const inputs = await convertInput();

        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            // elements of field should be in binary form and the size should be `256`.
            inputs,
            './circuit/circuit_js/circuit.wasm',
            './keys/circuit_final.zkey'
        );

        console.log('proof: ', proof);
        console.log('publicSignals: ', publicSignals);
        return { proof, publicSignals };
    };

    return {
        generateZkProof,
    };
}

export interface IVerifiableCredential {
    context: string[];
    id: string;
    credential_type: string[];
    issuer: string;
    validFrom: string;
    credentialSubject: ICredentialSubject;
    proof: IProof;
}

interface ICredentialSubject {
    id: string;
    subject: ISubject;
}

interface ISubject {
    school_did: string;
    major: string;
}

export interface IProof {
    type: string;
    cryptosuite: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string;
}

export interface IProofData {
    vc: IVerifiableCredential | null;
    vp: any;
    issuerPubKey: string;
    zkpProof: string;
    did: string;
    didDocument: any;
    message: string;
}

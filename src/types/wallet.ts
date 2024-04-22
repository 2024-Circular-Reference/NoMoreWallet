import { Account, Contract } from 'near-api-js';

export interface DidContract extends Contract {
    get_did_list: () => Promise<string[]>;
    reg_did_using_account: () => Promise<void>;
}

export interface UserAccount extends Account {
    seedPhrase: string;
    publicKey: string;
    secretKey: string;
}

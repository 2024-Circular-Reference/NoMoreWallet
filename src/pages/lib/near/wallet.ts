import { DidContract, UserAccount } from '@root/src/types/wallet';
import {
    Contract,
    connect,
    keyStores,
    Near,
    providers,
    KeyPair,
    ConnectConfig,
} from 'near-api-js';
import { generateSeedPhrase } from 'near-seed-phrase';

const DID_CONTRACT_ACCOUNT_ID = 'muddled-verse.testnet';

export class Wallet {
    private keyStore: keyStores.InMemoryKeyStore;
    private provider: providers.JsonRpcProvider;
    private config: ConnectConfig;
    private near: Near;
    private userAccount: UserAccount;
    private didContract: DidContract;

    constructor() {
        this.initialize();
    }

    private async initialize() {
        this.keyStore = new keyStores.InMemoryKeyStore();
        this.config = {
            networkId: 'testnet',
            keyStore: this.keyStore,
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://testnet.mynearwallet.com/',
            helperUrl: 'https://helper.testnet.near.org',
        };
        this.provider = new providers.JsonRpcProvider({
            url: this.config.nodeUrl,
        });
        this.near = await connect(this.config);
    }

    private async isAvailable(newAccountId: string) {
        let isExist = true;
        try {
            await this.provider.query({
                request_type: 'view_account',
                account_id: newAccountId,
                finality: 'final',
            });
        } catch (e) {
            // console.log(e);
            if (e.type === 'AccountDoesNotExist') {
                isExist = false;
            }
        }
        console.log(
            isExist
                ? `The account ${newAccountId} exists.`
                : `There is no account ${newAccountId}.`
        );
        return !isExist;
    }

    async createAccountOnTestnet(newAccountId: string): Promise<boolean> {
        if (!(await this.isAvailable(newAccountId))) {
            return undefined;
        }

        const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();
        const keyPair = KeyPair.fromString(secretKey);

        try {
            await this.keyStore.setKey(
                this.config.networkId,
                newAccountId,
                keyPair
            );
            const account = await this.near.createAccount(
                newAccountId,
                keyPair.getPublicKey()
            );
            this.userAccount = {
                ...account,
                seedPhrase,
                publicKey,
                secretKey,
            } as UserAccount;
            console.log('Account creation successful');
            return true;
        } catch (error) {
            console.error('Account creation failed:', error);
            return false;
        }
    }

    async getAccountBalance() {
        return await this.userAccount.getAccountBalance();
    }

    async getAccountDetails() {
        return await this.userAccount.getAccountDetails();
    }

    getAccount() {
        return {
            accountId: this.userAccount.accountId,
            seedPhrase: this.userAccount.seedPhrase,
            publicKey: this.userAccount.publicKey,
            secretKey: this.userAccount.secretKey,
        };
    }

    setDidContract() {
        this.didContract = new Contract(
            this.userAccount,
            DID_CONTRACT_ACCOUNT_ID,
            {
                viewMethods: ['get_did_list'],
                changeMethods: ['reg_did_using_account'],
                useLocalViewExecution: false,
            }
        ) as DidContract;
    }

    async getDidList() {
        if (!this.didContract) {
            this.setDidContract();
        }
        return await this.didContract.get_did_list();
    }

    async registerDid() {
        if (!this.didContract) {
            this.setDidContract();
        }
        return await this.didContract.reg_did_using_account();
    }
}

export const wallet = new Wallet();

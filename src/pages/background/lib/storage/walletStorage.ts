import { ILocalStorage, LocalStorage } from '@src/chrome/localStorage';
import { User } from '@root/src/types/user';

export class WalletStorage {
    private static WALLET = 'WALLET';
    static storage: ILocalStorage = new LocalStorage();

    static async setAccount(
        accountId: string,
        seedPhrase: string,
        publicKey: string,
        secretKey: string
    ) {
        await this.storage.save(this.WALLET, {
            accountId,
            seedPhrase,
            publicKey,
            secretKey,
        });
        console.log('setAccount', accountId, seedPhrase, publicKey, secretKey);
        return seedPhrase;
    }

    static async getAccountId() {
        const { accountId } = (await this.storage.load(this.WALLET)) as User;
        return accountId;
    }

    static async getSeedPhrase() {
        const { seedPhrase } = (await this.storage.load(this.WALLET)) as User;
        return seedPhrase;
    }

    static async getPublicKey() {
        const { publicKey } = (await this.storage.load(this.WALLET)) as User;
        return publicKey;
    }

    static async getSecretKey() {
        const { secretKey } = (await this.storage.load(this.WALLET)) as User;
        return secretKey;
    }
}

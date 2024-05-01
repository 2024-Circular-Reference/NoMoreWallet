import * as nearAPI from 'near-api-js';
import { useRef, useEffect } from 'react';

export default function useNearApi() {
    const { keyStores, connect } = nearAPI;
    const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

    const nearConnectionRef = useRef(null);
    console.log('here?');
    useEffect(() => {
        const fetch = async () => {
            const connectionConfig = {
                networkId: 'testnet',
                keyStore: myKeyStore, // first create a key store
                nodeUrl: 'https://rpc.testnet.near.org',
                walletUrl: 'https://testnet.mynearwallet.com/',
                helperUrl: 'https://helper.testnet.near.org',
                explorerUrl: 'https://testnet.nearblocks.io',
            };
            const _nearConnection = await connect(connectionConfig);
            nearConnectionRef.current = _nearConnection;
            // console.log(_nearConnection);
        };

        fetch();
    }, []);

    return nearConnectionRef.current;
}

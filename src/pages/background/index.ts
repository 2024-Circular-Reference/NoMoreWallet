import { sendErrorMessageToClient, sendMessageToClient } from '@src/chrome/message';
import { WalletStorage } from '@pages/background/lib/storage/walletStorage';

import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import Logger from '@src/pages/lib/utils/logger';
import { generateSeedPhrase } from '@src/pages/lib/near/phrase';

reloadOnUpdate('pages/background');

type RequiredDataNullableInput<T extends Message> = {
  type: T['type'];
  input?: unknown;
  data: Exclude<T['data'], undefined>;
};

chrome.runtime.onConnect.addListener(port => {
  console.log('onConnect', port);
  port.onDisconnect.addListener(() => {
    console.log('Port disconnected in background');
  });
  port.onMessage.addListener(async (message: Message) => {
    Logger.receive(message);
    console.log('amessage(back)', message);
    const sendResponse = <M extends Message>(message: RequiredDataNullableInput<M>) => {
      Logger.send(message);
      sendMessageToClient(port, message);
    };
    try {
      switch (message.type) {
        case 'LoginNear': {
          console.log(message.input);
          //await createNearAccount(nearClient);
          sendResponse({
            type: 'LoginNear',
            data: 'login',
          });
          break;
        }
        case 'CreateAccount': {
          console.log('create account!');
          const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();
          await WalletStorage.setAccount(message.input.id, seedPhrase, publicKey, secretKey);
          sendResponse({
            type: 'CreateAccount',
            data: {
              seedPhrase,
              publicKey,
              secretKey,
            },
            input: message.input,
          });
          break;
        }
        case 'GetPhrase': {
          const seedPhrase = await WalletStorage.getSeedPhrase(message.input);
          sendResponse({
            type: 'GetPhrase',
            data: {
              seedPhrase,
            },
            input: message.input,
          });
          break;
        }
        default: {
          throw new Error('Invalid message type', { cause: message });
        }
      }
    } catch (error) {
      Logger.warn(error);
      sendErrorMessageToClient(port, error);
    }
  });
});

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
// reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

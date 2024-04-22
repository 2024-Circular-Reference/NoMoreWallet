import type EnMessage from '../../public/_locales/en/messages.json';

type MessageKey = typeof EnMessage;

export function t(messageNameKey: keyof MessageKey) {
    return chrome.i18n.getMessage(messageNameKey);
}

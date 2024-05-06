import('@pages/content/injected/toggleTheme');

console.log('Hello from content script');
// window.addEventListener(
//     'message',
//     event => {
//         console.log('Message received in content script:', event);
//         // 도메인 검사로 보안 강화
//         if (event.origin !== 'http://localhost:3000') return;
//
//         // 특정 메시지에 대해 반응
//         if (event.data.type && event.data.type == 'FROM_PAGE') {
//             console.log('Message from the page:', event.data.text);
//
//             // 페이지로 응답 보내기
//             event.source.postMessage({ type: 'FROM_EXTENSION', text: 'Hello from the extension!' }, event.origin);
//         }
//     },
//     false,
// );

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'FROM_EXTENSION_TO_PAGE') {
        // 웹 페이지로 메시지 전달
        window.postMessage(
            { type: 'FROM_EXTENSION_TO_PAGE', message: request.message },
            '*'
        );
    }
});

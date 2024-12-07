// // 注册 onClicked 处理程序，以便在用户点击操作图标时使用。如果在 manifest.json 文件中注册了弹出式窗口，则不会触发此事件
// chrome.action.onClicked.addListener(function (tab) {
//     console.log("image hider start");
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: hideImages
//     });
// });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        if (tab?.url.includes('chrome://')) {
            ;
        } else {
            // 从存储中获取域名列表
            chrome.storage.sync.get(['domains'], function (result) {
                let domains = result.domains || [];
                let url = new URL(tab.url);
                if (domains.includes(url.hostname)) {
                    chrome.tabs.sendMessage(tab.id, {show: 0});
                }
            });
        }
    }
});


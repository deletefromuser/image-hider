console.log("Hi from background script file");


function hideImagesInShadowRoots(element, show) {
    // 選択された要素の子要素を取得
    const childElements = element.querySelectorAll('*');

    childElements.forEach(child => {
        // 子要素が Shadow Root を持つ場合
        if (child.shadowRoot) {
            // Shadow Root 内のすべての img 要素を取得し、非表示にする
            const images = child.shadowRoot.querySelectorAll('img, iframe');
            images.forEach(image => {
                image.style.display = show ? '' : 'none';
                image.style.opacity = show ? 'unset' : '0.25';
            });

            // 再帰的に子要素の Shadow Root も検索
            hideImagesInShadowRoots(child.shadowRoot, show);
        } else {
            // 子要素が Shadow Root を持たない場合
            const images = child.querySelectorAll('img, iframe');
            images.forEach(image => {
                image.style.display = show ? '' : 'none';
                image.style.opacity = show ? 'unset' : '0.25';
            });
        }
    });
}
// 関数を呼び出して画像を非表示にする
function hideImages() {
    hideImagesInShadowRoots(document.documentElement);
}

function showImages() {
    hideImagesInShadowRoots(document.documentElement, 1);
}
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
        if (tab && tab.url.includes('chrome://')) {
        } else {
            // 从存储中获取域名列表
            chrome.storage.sync.get(['domains'], function (result) {
                var domains = result.domains || [];
                var url = new URL(tab.url);
                if (domains.includes(url.hostname)) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: hideImages
                    });
                }
            });
        }
    }
});


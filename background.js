console.log("Hi from background script file");

function hideImages() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
    }
}

chrome.action.onClicked.addListener(function (tab) {
    console.log("image hider start");
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: hideImages
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        if (tab && tab.url.includes('chrome://')) {
        } else {
            // 从存储中获取域名列表
            chrome.storage.sync.get(['domains'], function (result) {
                var domains = result.domains || [];
                console.log(domains);
                var url = new URL(tab.url);
                if (domains.includes(url.hostname)) {
                  chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    function: hideImages
                  });
                }
            });
        }
    }
});


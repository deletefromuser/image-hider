chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // 从存储中获取域名列表
    chrome.storage.sync.get(['domains'], function(result) {
      var domains = result.domains || [];
      var url = new URL(tab.url);
      if (domains.includes(url.hostname)) {
        chrome.tabs.sendMessage(tabId, {hideImages: true});
      }
    });
  });
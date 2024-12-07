document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('hideImagesButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentHost = (new URL(tabs[0].url)).hostname;
      console.log(currentHost);
      chrome.storage.sync.get(['domains'], function (result) {
        if (!result.domains || !result.domains.includes(currentHost)) {
          var domains = result.domains ? [...result.domains] : [];
          domains.push(currentHost);
          chrome.storage.sync.set({ domains: domains }, function () {
          });
  
          console.log(currentHost);
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: hideImages
          });
        }
      });
    });
  });
  
  document.getElementById('showImagesButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentHost = (new URL(tabs[0].url)).hostname;
      chrome.storage.sync.get(['domains'], function (result) {
        if (result.domains.includes(currentHost)) {
          let domains = [...result.domains]
          domains = domains.filter(e => e !== currentHost);
          chrome.storage.sync.set({ domains: domains });
  
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: showImages
          });
        }
      });
    });
  });
});

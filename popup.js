document.getElementById('hideImagesButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: hideImages
      });
    });
  });
  
  document.getElementById('showImagesButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: showImages
      });
    });
  });
  
  function hideImages() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      images[i].style.display = 'none';
    }

      chrome.storage.sync.get(['domains'], function(result) {
                var domains = result.domains || [];
                console.log(domains);
              });
  }
  
  function showImages() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      images[i].style.display = '';
    }
  }
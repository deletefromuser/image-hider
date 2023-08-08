chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.hideImages) {
      var images = document.getElementsByTagName('img');
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
      }
    }
  });
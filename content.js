chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("image hider start");
    if (request.hideImages) {
      var images = document.getElementsByTagName('img');
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
      }
    }
  });

//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log('Current tab URL:', tabs[0].url);
//   });
console.log('Current tab URL:', window.location.href);
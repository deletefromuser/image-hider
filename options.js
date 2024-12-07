document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let domains = document.getElementById('domains').value.split('\n');
    chrome.storage.sync.set({domains: domains}, function() {
      alert('Settings saved.');
    });
  });
  
  // 当页面加载时，从存储中获取当前的设置，并显示在表单中
  window.onload = function() {
    chrome.storage.sync.get(['domains'], function(result) {
      document.getElementById('domains').value = (result.domains || []).join('\n');
    });
  };
function hideImagesInShadowRoots(element, show) {
  // 選択された要素の子要素を取得
  const childElements = element.querySelectorAll('*');

  childElements.forEach(child => {
    // 子要素が Shadow Root を持つ場合
    if (child.shadowRoot) {
      // Shadow Root 内のすべての img 要素を取得し、非表示にする
      setOpacity(child.shadowRoot, show);
      setBackgroundImageOpacity(child.shadowRoot, show);

      // 再帰的に子要素の Shadow Root も検索
      hideImagesInShadowRoots(child.shadowRoot, show);
    } else {
      // 子要素が Shadow Root を持たない場合
      setOpacity(child, show);
      setBackgroundImageOpacity(child, show);
    }
  });
}

// img, iframe 要素の style.display, style.opacity を設定
function setOpacity(rootElement, show) {
  const elements = rootElement.querySelectorAll('img, iframe');
  elements.forEach(element => {
    element.style.opacity = show ? 'unset' : '0';
  });
}
function setBackgroundImageOpacity(rootElement, show) {
  const elementsWithBackgroundImage = rootElement.querySelectorAll('*');

  elementsWithBackgroundImage.forEach((element) => {
    const style = window.getComputedStyle(element);
    if (style.backgroundImage !== 'none') {
      element.style.opacity = show ? 'unset' : '0';
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

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (!request.show) {
      hideImages();
    } else {
      showImages();
    }
  }
);

async function getDomains() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['domains'], function (result) {
      resolve(result.domains || []);
    });
  });
}

const observer = new MutationObserver((mutations) => {
  refresh();
  console.log('DOM changed!');
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function refresh() {
  getDomains().then((domains) => {
    if (domains.includes(new URL(window.location.href).hostname)) {
      hideImagesInShadowRoots(document.documentElement, 0);
      console.log('hide!');
    }
  })
}

setInterval(refresh, 2000);
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

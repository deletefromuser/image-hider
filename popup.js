document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('hideImagesButton').addEventListener('click', handleHideImagesClick);
  document.getElementById('showImagesButton').addEventListener('click', handleShowImagesClick);
});

async function handleHideImagesClick() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentHost = (new URL(tabs[0].url)).hostname;
    const domains = await getDomains();

    if (!domains.includes(currentHost)) {
      await addDomain(currentHost);
      sendMessageToTab(tabs[0].id, { show: 0 });
    }
  } catch (error) {
    console.error(error);
  }
}

async function handleShowImagesClick() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentHost = (new URL(tabs[0].url)).hostname;

    await removeDomain(currentHost);
    sendMessageToTab(tabs[0].id, { show: 1 });
  } catch (error) {
    console.error(error);
  }
}

async function getDomains() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['domains'], function (result) {
      resolve(result.domains || []);
    });
  });
}

async function addDomain(host) {
  const domains = await getDomains();
  domains.push(host);
  chrome.storage.sync.set({ domains: domains });
}

async function removeDomain(host) {
  const domains = await getDomains();
  const updatedDomains = domains.filter(e => e !== host);
  chrome.storage.sync.set({ domains: updatedDomains });
}

function sendMessageToTab(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}
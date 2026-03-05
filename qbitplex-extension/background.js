// background.js – qBitPlex
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "openPopup" && msg.url) {
        const url = encodeURIComponent(msg.url);
        const name = encodeURIComponent(msg.name || "");

        chrome.windows.create({
            url: chrome.runtime.getURL(`popup.html?url=${url}&name=${name}`),
            type: "popup",
            width: 400,
            height: 400
        });

        sendResponse({ status: "ok" });
    }
});
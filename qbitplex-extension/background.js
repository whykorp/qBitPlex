chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "openPopup" && msg.url) {
        // Ouvre la popup avec l'URL/magnet reçue
        chrome.windows.create({
            url: chrome.runtime.getURL(`popup.html?url=${encodeURIComponent(msg.url)}`),
            type: "popup",
            width: 400,
            height: 400
        });
        sendResponse({ status: "ok" });
    }
});
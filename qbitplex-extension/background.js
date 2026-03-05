chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.action === "openPopup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("popup.html") + "?url=" + encodeURIComponent(msg.url),
            type: "popup",
            width: 400,
            height: 400
        });
    }
});
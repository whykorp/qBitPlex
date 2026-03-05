function addQBitPlexButton() {
    const btn = document.createElement("button");
    btn.innerText = "Send to qBitPlex";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.zIndex = "9999";
    btn.style.padding = "10px";

    btn.onclick = () => {
        const torrentUrl = window.location.href;

        chrome.runtime.sendMessage({
            action: "openPopup",
            url: torrentUrl
        });
    };

    document.body.appendChild(btn);
}

addQBitPlexButton();
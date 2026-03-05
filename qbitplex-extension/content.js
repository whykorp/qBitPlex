function addQBitPlexButton() {
    const btn = document.createElement("button");
    btn.innerText = "Send to qBitPlex";

    // style simple fixé en bas à droite
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.zIndex = "9999";
    btn.style.padding = "10px 15px";
    btn.style.borderRadius = "6px";
    btn.style.border = "none";
    btn.style.backgroundColor = "#00d1b2";
    btn.style.color = "#1e1e2f";
    btn.style.fontWeight = "bold";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

    btn.onclick = () => {
        const match = window.location.href.match(/\/torrents\/([a-f0-9]{40})/i);
        const hash = match ? match[1] : null;
        const torrentName = document.querySelector("h1.text-xl")?.innerText.trim() || "Nom inconnu";

        // Magnet complet avec nom du torrent
        const magnetLink = hash 
            ? `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(torrentName)}`
            : window.location.href;

        chrome.runtime.sendMessage({
            action: "openPopup",
            url: magnetLink,
            name: torrentName
        });
    };

    document.body.appendChild(btn);
}

// Récupère hash + nom pour debug
const match = window.location.href.match(/\/torrents\/([a-f0-9]{40})/i);
console.log("Hash du torrent :", match ? match[1] : "non trouvé");
console.log("Nom du torrent :", document.querySelector("h1.text-xl")?.innerText.trim() || "non trouvé");

addQBitPlexButton();
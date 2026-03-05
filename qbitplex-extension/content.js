function addQBitPlexButton() {
    const btn = document.createElement("button");
    btn.innerText = "Send to qBitPlex";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.zIndex = "9999";
    btn.style.padding = "10px";
    btn.style.backgroundColor = "#2c3e50";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";

    btn.onclick = () => {
        let magnetLink = "";

        // 1️⃣ Essaye de récupérer le hash depuis l'URL
        const match = window.location.href.match(/\/torrents\/([a-f0-9]{40})/i);
        if (match) {
            const hash = match[1];
            magnetLink = `magnet:?xt=urn:btih:${hash}&dn=torrent`;
        } else {
            // 2️⃣ Sinon cherche le lien magnet directement sur la page
            const magnetElement = document.querySelector("a[href^='magnet:?xt=urn:btih:']");
            if (magnetElement) {
                magnetLink = magnetElement.href;
            } else {
                // 3️⃣ fallback : envoie juste l'URL de la page
                magnetLink = window.location.href;
            }
        }

        console.log("Magnet à envoyer :", magnetLink);

        // Ouvre la popup via background.js
        chrome.runtime.sendMessage({
            action: "openPopup",
            url: magnetLink
        });
    };

    document.body.appendChild(btn);
}

// On ajoute le bouton sur la page
addQBitPlexButton();
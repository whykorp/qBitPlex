function addQBitPlexButton() {
    // Cherche la div qui contient déjà les boutons (Télécharger, Favoris, etc.)
    const buttonContainer = document.querySelector(
        "div.flex.items-center.gap-2.overflow-x-auto.pb-2.lg\\:pb-0.-mx-4.px-4.lg\\:mx-0.lg\\:px-0.lg\\:flex-wrap.lg\\:justify-end"
    );

    if (!buttonContainer) {
        console.warn("qBitPlex : container des boutons non trouvé !");
        return;
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = "Send to qBitPlex";
    btn.className =
        "rounded-md font-medium inline-flex items-center px-2.5 py-1.5 text-sm gap-1.5 text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shrink-0";

    // Ajoute un petit icon à gauche (optionnel)
    const icon = document.createElement("span");
    icon.className = "iconify i-heroicons:arrow-down-tray shrink-0 size-5";
    icon.setAttribute("aria-hidden", "true");
    btn.prepend(icon);

    btn.onclick = () => {
        // Récupère hash depuis l'URL
        let magnetLink = "";
        const match = window.location.href.match(/\/torrents\/([a-f0-9]{40})/i);
        if (match) {
            const hash = match[1];
            magnetLink = `magnet:?xt=urn:btih:${hash}&dn=torrent`;
        } else {
            const magnetElement = document.querySelector("a[href^='magnet:?xt=urn:btih:']");
            magnetLink = magnetElement ? magnetElement.href : window.location.href;
        }

        // Récupère le nom du torrent
        let torrentName = "Nom inconnu";
        const h1 = document.querySelector("h1.text-xl, h1.font-bold");
        if (h1) torrentName = h1.innerText.trim();

        // Envoie au background pour ouvrir la popup
        chrome.runtime.sendMessage({
            action: "openPopup",
            url: magnetLink,
            name: torrentName
        });
    };

    // On ajoute le bouton à la fin de la div
    buttonContainer.appendChild(btn);
}

// Lancement
addQBitPlexButton();
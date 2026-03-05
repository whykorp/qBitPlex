// popup.js – qBitPlex

// URL de ton serveur Flask
const SERVER_URL = "http://128.78.3.237:3000/add";

// Récupération de l'URL du torrent depuis la query string
const params = new URLSearchParams(window.location.search);
const torrentUrl = params.get("url") || ""; // fallback si vide

// Éléments du DOM
const category = document.getElementById("category");
const customPath = document.getElementById("customPath");
const sendBtn = document.getElementById("send");

// Affiche le champ custom si catégorie = "Autre"
category.addEventListener("change", () => {
    if (category.value === "other") {
        customPath.style.display = "block";
    } else {
        customPath.style.display = "none";
    }
});

// Fonction principale à l'envoi
sendBtn.onclick = async () => {
    if (!torrentUrl) {
        alert("URL du torrent introuvable !");
        return;
    }

    // Déterminer le chemin à envoyer
    const path = category.value === "other"
        ? document.getElementById("path").value.trim()
        : category.value;

    if (!path) {
        alert("Tu dois renseigner un chemin pour la catégorie 'Autre'.");
        return;
    }

    try {
        const response = await fetch(SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: torrentUrl, path: path })
        });

        if (!response.ok) {
            console.error("Erreur HTTP:", response.status);
            alert("Erreur serveur : " + response.status);
            return;
        }

        const data = await response.json();
        console.log("Réponse serveur :", data);

        // Affiche le message du serveur
        alert(data.message);

        // Fermer la popup
        window.close();

    } catch (err) {
        console.error("Erreur fetch :", err);
        alert("Impossible de contacter le serveur. Vérifie qu'il est lancé et que CORS est activé.");
    }
};
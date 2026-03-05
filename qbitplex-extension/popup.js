// popup.js – qBitPlex

const params = new URLSearchParams(window.location.search);
const magnetLink = params.get("url");
const torrentName = params.get("name") || "Nom inconnu";

console.log("Torrent reçu :", torrentName, magnetLink);

// Affiche le nom du torrent dans la popup
const title = document.createElement("h3");
title.innerText = torrentName;
title.style.fontWeight = "bold";
title.style.marginBottom = "10px";
document.body.prepend(title);

const category = document.getElementById("category");
const customPath = document.getElementById("customPath");

category.addEventListener("change", () => {
    if (category.value === "other") {
        customPath.style.display = "block";
    } else {
        customPath.style.display = "none";
    }
});

document.getElementById("send").onclick = async () => {
    const path = category.value === "other"
        ? document.getElementById("path").value
        : category.value;

    try {
        const response = await fetch("http://128.78.3.237:3000/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: magnetLink, name: torrentName, path: path })
        });

        console.log("Status :", response.status);
        const data = await response.json();
        console.log("Réponse serveur :", data);

        alert(`Torrent envoyé !\n${torrentName}`);
        window.close();
    } catch (err) {
        console.error("Erreur fetch :", err);
        alert("Erreur lors de l'envoi du torrent !");
    }
};
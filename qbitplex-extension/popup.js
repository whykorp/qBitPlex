// Récupération des infos depuis l'URL de la popup
const params = new URLSearchParams(window.location.search);
const torrentUrl = params.get("url");
const torrentName = params.get("name") || "Nom inconnu";

document.getElementById("torrentName").innerText = torrentName;

const category = document.getElementById("category");
const customPath = document.getElementById("customPath");

// Affiche ou cache le champ texte si "Autre"
category.addEventListener("change", () => {
    customPath.style.display = category.value === "other" ? "block" : "none";
});

// Mapping catégorie → chemin serveur
function getServerPath(fileType) {
    if (fileType === "Films" || fileType === "Film") return "Z:/";
    if (fileType === "Séries" || fileType === "Série") return "S:/";
    if (fileType === "Anime" || fileType === "Animes") return "A:/";
    if (["Concert", "Concerts", "Live", "Lives"].includes(fileType)) return "L:/Concerts/";
    if (["Emission", "Documentaire", "Docs", "Emissions", "Documentaires"].includes(fileType)) return "L:/Emission & Docs/";
    if (fileType === "Spectacle" || fileType === "Spectacles") return "L:/Spectacles/";
    return fileType; // si "Autre", on renvoie directement le texte saisi
}

// Quand l'utilisateur clique sur "Envoyer"
document.getElementById("send").onclick = async () => {
    let selected = category.value === "other" ? document.getElementById("path").value : category.value;
    const filePath = getServerPath(selected);

    try {
        const response = await fetch("http://128.78.3.237:3000/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: torrentUrl, path: filePath, name: torrentName })
        });

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Réponse du serveur :", data);
        alert("Torrent envoyé au serveur !");
        window.close();
    } catch (err) {
        console.error("Erreur fetch :", err);
        alert("Erreur lors de l'envoi du torrent !");
    }
};
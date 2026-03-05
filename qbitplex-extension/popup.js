const params = new URLSearchParams(window.location.search);
const torrentUrl = params.get("url");

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
            body: JSON.stringify({ url: torrentUrl, path: path })
        });

        // Affiche le status
        console.log("Status:", response.status);

        // Essaye de parser le JSON si le serveur renvoie du JSON
        const data = await response.json();
        console.log("Réponse du serveur :", data);

    } catch (err) {
        console.error("Erreur fetch :", err);
    }
};
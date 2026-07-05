// Lumos Follow
const magicButton = document.getElementById("magicButton");
const magicPanel = document.getElementById("magicPanel");

magicButton.addEventListener("click", () => {

    if (magicPanel.style.display === "none") {
        magicPanel.style.display = "flex";
    } else {
        magicPanel.style.display = "none";
    }

});

document.getElementById("exportButton").addEventListener("click", () => {

    window.location.href = "export.html";

});

document.getElementById("loginButton").addEventListener("click", () => {
    alert("Modo Login com Instagram será desenvolvido na próxima etapa.");
});

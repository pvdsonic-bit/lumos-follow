const fileInput = document.querySelector('input[type="file"]');
const analyzeButton = document.querySelector("button");

analyzeButton.addEventListener("click", async () => {

    if (!fileInput.files.length) {
        alert("Escolha um arquivo ZIP primeiro.");
        return;
    }

    const file = fileInput.files[0];

    const zip = await JSZip.loadAsync(file);
const followersFile = zip.file("connections/followers_and_following/followers_1.html");
    const followingFile = zip.file("connections/followers_and_following/following.html");
    console.log(followersFile);
console.log(followingFile);
    let arquivos = [];

    zip.forEach((relativePath) => {
        arquivos.push(relativePath);
    });

    console.log(arquivos);

    alert(
        "Arquivos encontrados:\n\n" +
        arquivos.join("\n")
    );

});

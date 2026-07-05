const fileInput = document.querySelector('input[type="file"]');
const analyzeButton = document.querySelector("button");

analyzeButton.addEventListener("click", async () => {

    if (!fileInput.files.length) {
        alert("Escolha um arquivo ZIP primeiro.");
        return;
    }

    const file = fileInput.files[0];

    const zip = await JSZip.loadAsync(file);

    let arquivos = [];

    zip.forEach((relativePath) => {
        arquivos.push(relativePath);
    });

    console.log(arquivos);

    alert(
        "Arquivo aberto!\n\nForam encontrados " +
        arquivos.length +
        " arquivos."
    );

});

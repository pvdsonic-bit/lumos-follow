const fileInput = document.querySelector("#instagramFile");
const analyzeButton = document.querySelector("#analyzeButton");

analyzeButton.addEventListener("click", async () => {

    const arquivos = [];
zip.forEach((p)=>arquivos.push(p));
alert(arquivos.join("\n"));
        alert("Escolha um arquivo ZIP primeiro.");
        return;
    }

    const zip = await JSZip.loadAsync(fileInput.files[0]);
const arquivos = [];

zip.forEach((relativePath) => {
    arquivos.push(relativePath);
});

alert(arquivos.join("\n"));
return;
    let followersFile = null;
    let followingFile = null;

    zip.forEach((relativePath, file) => {

        const path = relativePath.toLowerCase();

        if (
            path.includes("followers") &&
            path.endsWith(".html") &&
            followersFile === null
        ) {
            followersFile = file;
        }

        if (
            path.includes("following") &&
            path.endsWith(".html") &&
            followingFile === null
        ) {
            followingFile = file;
        }

    });

    if (!followersFile || !followingFile) {

        alert(
            "Não encontrei os arquivos de seguidores dentro do ZIP.\n\n" +
            "Faça uma exportação HTML do Instagram."
        );

        return;

    }

    const followersHtml = await followersFile.async("string");
    const followingHtml = await followingFile.async("string");

    function extrairUsuarios(html) {

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const usuarios = [];

        doc.querySelectorAll("a").forEach(link => {

            const href = link.href;

            if (href.includes("instagram.com")) {

                const usuario = href
                    .replace("https://www.instagram.com/", "")
                    .replaceAll("/", "")
                    .trim()
                    .toLowerCase();

                if (usuario) {
                    usuarios.push(usuario);
                }

            }

        });

        return usuarios;

    }

    const seguidores = extrairUsuarios(followersHtml);
    const seguindo = extrairUsuarios(followingHtml);

    const naoSeguem = seguindo.filter(
        usuario => !seguidores.includes(usuario)
    );

    if (naoSeguem.length === 0) {

        alert("Todo mundo que você segue também segue você.");

        return;

    }

    alert(
        "Você segue " + seguindo.length + " pessoas.\n\n" +
        "Seguem você: " + seguidores.length + "\n\n" +
        "Não seguem de volta (" + naoSeguem.length + "):\n\n" +
        naoSeguem.join("\n")
    );

});

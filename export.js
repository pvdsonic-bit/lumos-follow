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

    if (!followersFile || !followingFile) {
        alert("Não foi possível encontrar os arquivos do Instagram dentro do ZIP.");
        return;
    }

    const followersHtml = await followersFile.async("string");
    const followingHtml = await followingFile.async("string");
        function extrairUsuarios(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const usuarios = [];

        doc.querySelectorAll("a").forEach(link => {
            const href = link.getAttribute("href");

            if (href && href.includes("instagram.com")) {
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
    const naoSeguem = seguindo.filter(usuario => !seguidores.includes(usuario));

alert(
    "Você segue " + seguindo.length + " pessoas.\n\n" +
    "Seguem você: " + seguidores.length + "\n\n" +
    "Não seguem você de volta (" + naoSeguem.length + "):\n\n" +
    naoSeguem.join("\n")
);


// instagram/followers.js

async function analisarSeguidores(zip) {

    let followersFile = null;
    let followingFile = null;

    zip.forEach((relativePath, file) => {

        const path = relativePath.toLowerCase();

        if (
            path.includes("followers") &&
            path.endsWith(".html") &&
            !followersFile
        ) {
            followersFile = file;
        }

        if (
            path.includes("following") &&
            path.endsWith(".html") &&
            !followingFile
        ) {
            followingFile = file;
        }

    });

    if (!followersFile || !followingFile) {

        throw new Error(
            "Não encontrei os arquivos followers.html ou following.html."
        );

    }

    const followersHtml = await lerArquivoHTML(followersFile);
    const followingHtml = await lerArquivoHTML(followingFile);

    const seguidores = extrairUsuariosDoHTML(followersHtml);
    const seguindo = extrairUsuariosDoHTML(followingHtml);

    const naoSeguem = compararListas(seguindo, seguidores);

    return {
        seguidores,
        seguindo,
        naoSeguem
    };

}

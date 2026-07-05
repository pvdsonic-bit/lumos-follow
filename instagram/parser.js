// instagram/parser.js

function extrairUsuariosDoHTML(html) {

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const usuarios = [];

    doc.querySelectorAll("a").forEach(link => {

        const href = link.href;

        if (href.includes("instagram.com")) {

            usuarios.push(
                limparUsuario(href)
            );

        }

    });

    return removerDuplicados(usuarios);

}

async function lerArquivoHTML(file) {

    return await file.async("string");

}

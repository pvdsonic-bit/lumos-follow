// instagram/utils.js

function limparUsuario(link) {
    return link
        .replace("https://www.instagram.com/", "")
        .replace("http://www.instagram.com/", "")
        .replace("www.instagram.com/", "")
        .replace("instagram.com/", "")
        .replaceAll("/", "")
        .trim()
        .toLowerCase();
}

function removerDuplicados(lista) {
    return [...new Set(lista)];
}

function compararListas(seguindo, seguidores) {
    return seguindo.filter(usuario => !seguidores.includes(usuario));
}

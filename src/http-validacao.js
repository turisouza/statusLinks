import chalk from "chalk";

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaUrls) {
  const listaStatus = await Promise.all(
    listaUrls.map(async (url) => {
      try {
        const res = await fetch(url);
        return `${res.status} - ${res.statusText}`;
      } catch (erro) {
        return manejaErros(erro);
      }
    })
  );

  return listaStatus;
}

function manejaErros(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "Link não Encontrado";
  } else {
    return "Ocorreu algum Erro!";
  }
}

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);

  return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice],
  }));
}

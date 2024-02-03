import fs from "fs";
import chalk from "chalk";
import { match } from "assert";
import listaValidada from "./http-validacao.js";

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  return resultados.length !== 0 ? resultados : "Não há links no arquivo";
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "Não há arquivo no diretório!"));
}

//verssão assíncrona da função com async / awayt

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro);
  }
}

//---|||---

//Versão assíncrona da função com .then
// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = "utf-8";
//   fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     //Dentro do then colocamos um nome para o que será recebido pelo promise
//     .catch(trataErro);
//   //É o mesmo que o código abaixo, mas está resumido
//   //.catch((erro) => trataErro(erro));
// }

//---|||---

//Versão Síncrona da função
// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = "utf-8";
//   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//     if (erro) {
//       trataErro(erro);
//     }
//     console.log(chalk.green(texto));
//   });
// }

export default pegaArquivo;

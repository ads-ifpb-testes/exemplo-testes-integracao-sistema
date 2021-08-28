import { repositorioRest as repositorio } from "./repositorio.rest.js";

const addFilme = async (...novosFilmes) => {
  return new Promise((resolve, reject) => {
    const anoCorrente = new Date().getFullYear();
    for (let filme of novosFilmes) {
      if (filme.nome == null || filme.nome === "" || filme.ano > anoCorrente) {
        reject("Não é possível adicionar o filme");
      } else {
        repositorio
          .listar()
          .then((response) => {
            let filmesAtuais = response.data;
            const index = filmesAtuais.findIndex((filmeArmazenado) =>
              compararFilmes(filme, filmeArmazenado)
            );
            if (index !== -1) {
              reject("Esse filme já existe");
              return;
            }
            repositorio
              .inserir(novosFilmes)
              .then((response) => {
                resolve("Filme inserido");
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            throw error;
          });
      }
    }
  });
};

const compararFilmes = (filme, filmeArmazenado) =>
  filmeArmazenado.ano === filme.ano && filmeArmazenado.nome === filme.nome;

const removerFilme = async (filmeRemovido) => {
  return repositorio.remover(filmeRemovido);
};

const getQtdeFilmes = async () =>
  await repositorio.listar().then((response) => response.data.length);

const getFilmes = async () =>
  await repositorio.listar().then((response) => response.data);

const limparFilmes = async () => repositorio.limpar();

export { addFilme, removerFilme, getFilmes, getQtdeFilmes, limparFilmes };

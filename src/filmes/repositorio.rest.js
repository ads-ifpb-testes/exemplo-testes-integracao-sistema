import axios from "axios";
import { repositorio } from "./repositorio";

const repositorioRest = Object.create(repositorio);
const api = "http://0.0.0.0:3000";

repositorioRest.inserir = async (novosFilmes) =>
  axios.post(`${api}/filmes`, ...novosFilmes);
repositorioRest.remover = (filmeARemover) =>
  axios.delete(`${api}/filmes`, filmeARemover);
repositorioRest.listar = async () => axios.get(`${api}/filmes`);

repositorioRest.limpar = () => {};

export { repositorioRest };

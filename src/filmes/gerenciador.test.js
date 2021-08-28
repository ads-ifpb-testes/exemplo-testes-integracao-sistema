import { addFilme, getQtdeFilmes, limparFilmes } from "./gerenciador";
import { repositorioRest as repositorio } from "./repositorio.rest.js";

/**
 * Agora que gerenciador usa repositorio.rest.js,
 * temos que atualizar os mocks para o novo módulo
 */
jest.mock("./repositorio.rest.js");

describe("Gerenciador de filmes", () => {
  beforeEach(() => {
    limparFilmes();
  });

  test("Deve inserir vários filmes", async () => {
    const filme1 = {
      nome: "Capitão América: Guerra Civil",
      ano: 2016,
    };

    const filme2 = {
      nome: "Vingadores: Era de Ultron",
      ano: 2015,
    };

    repositorio.inserir.mockResolvedValue({});

    const qtdeFilmesEsperado = 2;
    repositorio.listar.mockResolvedValue({ data: [] });
    addFilme(filme1, filme2);
    repositorio.listar.mockResolvedValue({ data: [filme1, filme2] });
    const qtdeFilmes = await getQtdeFilmes();
    expect(qtdeFilmes).toBe(qtdeFilmesEsperado);
  });

  test("Não deve inserir filmes com data futura", async () => {
    const filme = {
      nome: "Doutor Estranho no Multiverso da Loucura",
      ano: 2022,
    };

    await expect(addFilme(filme)).rejects.toMatch(
      "Não é possível adicionar o filme"
    );
  });

  test("Não deve permitir dois filmes com o mesmo nome e ano", async () => {
    const filme = {
      nome: "Madagascar",
      ano: 2005,
    };

    repositorio.listar.mockResolvedValue({ data: [filme] });
    repositorio.inserir.mockResolvedValue(Promise.resolve({}));
    await expect(addFilme(filme)).rejects.toMatch("Esse filme já existe");
  });

  test("Filmes não podem ter nome vazio", async () => {
    const filme = {
      nome: "",
    };
    await expect(addFilme(filme)).rejects.toMatch(
      "Não é possível adicionar o filme"
    );
  });

  afterEach(() => {
    jest.unmock("./repositorio.rest.js");
  });
});

// });

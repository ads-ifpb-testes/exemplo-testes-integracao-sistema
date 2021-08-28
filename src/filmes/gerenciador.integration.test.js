import { testJsonServer } from "../../server/server.js";
import { addFilme } from "./gerenciador.js";

describe("Integração com serviço", () => {
  beforeAll(() => testJsonServer.runServer());

  test("Deve inserir um filme usando o serviço", async () => {
    const filme = {
      nome: "500 dias com ela",
      ano: 2009,
    };
    await expect(addFilme(filme)).resolves.toMatch("Filme inserido");
  });

  afterAll(() => testJsonServer.stopServer());
});

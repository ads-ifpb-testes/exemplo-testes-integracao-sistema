describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("Não deve ser possivel adicionar filmes inválidos", () => {
    cy.get("#bt-addfilme").should("be.disabled");
  });

  it("Deve ser possivel adicionar filmes válidos", () => {
    cy.intercept({
      method: "GET",
      url: "http://0.0.0.0:3000/filmes",
    }).as("buscarFilmes");

    const novoFilme = `Novo filme - ${new Date().toISOString()}`;

    cy.get("#nome-filme").type(novoFilme);
    cy.get("#ano-filme").clear().type(`2000`);
    cy.get("#bt-addfilme").should("not.be.disabled");
    cy.get("#bt-addfilme").click();

    cy.wait("@buscarFilmes");
    cy.contains(novoFilme);
    // filmes.contains(novoFilme);
  });

  it("Deve exibir mensagem de erro", () => {
    cy.intercept({
      method: "GET",
      url: "http://0.0.0.0:3000/filmes",
    }).as("buscarFilmes");
    const novoFilme = `Novo filme - ${Math.random()}`;

    cy.get("#nome-filme").type(novoFilme);
    cy.get("#ano-filme").clear().type(`2000`);
    cy.get("#bt-addfilme").should("not.be.disabled");
    cy.get("#bt-addfilme").click();

    cy.wait("@buscarFilmes");

    cy.get("#nome-filme").type(novoFilme);
    cy.get("#ano-filme").clear().type(`2000`);
    cy.get("#bt-addfilme").should("not.be.disabled");
    cy.get("#bt-addfilme").click();

    cy.get("#error").should("have.text", "Esse filme já existe");
  });
});

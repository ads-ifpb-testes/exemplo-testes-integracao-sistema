import React, { useState } from "react";
import styled from "styled-components";
import { addFilme } from "../filmes/gerenciador";

const AddFilmeForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;

  > input {
    font-size: 1.5rem;
    padding: 20px;

    ::placeholder {
      color: gray;
    }
  }
`;

const ErrorFilmeForm = styled.div.attrs({ id: "error" })`
  border: 1px solid red;
  background-color: crimson;
  color: white;
`;

const ButtonAddFilme = styled.button.attrs({
  id: "bt-addfilme",
  type: "submit",
})`
  font-size: 1.5rem;
  padding: 0 2rem;
  font-weight: bold;
  border: 0;
`;

const AddFilme = ({ onAddFilme }) => {
  const filmePrototipo = { nome: "", ano: new Date().getFullYear() };
  const [novoFilme, setNovoFilme] = useState(Object.create(filmePrototipo));
  const [error, setError] = useState("");

  const handleAddFilme = () => {
    addFilme(novoFilme)
      .then((response) => {
        console.log("Inserindo novo filme...");
        setNovoFilme(Object.create(filmePrototipo));
        onAddFilme();
        setError("");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleChangeNome = (event) => {
    setNovoFilme({ nome: event.target.value, ano: novoFilme.ano });
  };

  const handleChangeAno = (event) => {
    setNovoFilme({ nome: novoFilme.nome, ano: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddFilme();
  };

  const isValidated = () =>
    novoFilme.nome !== null &&
    novoFilme.nome !== "" &&
    novoFilme.ano <= filmePrototipo.ano;

  return (
    <>
      <AddFilmeForm onSubmit={handleSubmit}>
        <input
          id="nome-filme"
          value={novoFilme.nome}
          required
          type="text"
          onChange={handleChangeNome}
          placeholder="Digite o nome do filme"
        />
        <input
          id="ano-filme"
          value={novoFilme.ano}
          required
          max={filmePrototipo.ano}
          type="number"
          onChange={handleChangeAno}
          placeholder="Digite o ano do filme"
        />
        <ButtonAddFilme disabled={!isValidated()} onClick={handleSubmit}>
          Cadastrar filme
        </ButtonAddFilme>
      </AddFilmeForm>
      {error.length > 0 && <ErrorFilmeForm>{error}</ErrorFilmeForm>}
    </>
  );
};

export default AddFilme;

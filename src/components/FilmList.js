import React from "react";

import styled from "styled-components";

const FilmUl = styled.ul.attrs({ id: "lista-filmes" })`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilmItem = styled.li`
  display: flex;
  justify-content: space-between;
  max-width: 50%;
  width: 50%;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid lightgray;
  margin-bottom: 0.5rem;
`;

const FilmList = ({ filmes }) => {
  return (
    <div>
      <h3>Filmes já cadastrados</h3>
      <FilmUl>
        {filmes?.map((filme, i) => (
          <FilmItem key={i}>
            <span className="nome-filme">{filme.nome}</span>
            <span className="ano-filme">{filme.ano}</span>
          </FilmItem>
        ))}
      </FilmUl>
    </div>
  );
};

export default FilmList;

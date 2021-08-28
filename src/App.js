import { useEffect, useState } from "react";
import "./App.css";
import AddFilme from "./components/AddFilme";
import FilmList from "./components/FilmList";
import { getFilmes } from "./filmes/gerenciador";

function App() {
  const [filmes, setFilmes] = useState();

  useEffect(() => {
    if (filmes == null) {
      getFilmes().then((filmes) => setFilmes(filmes));
    }
  }, [filmes]);

  const loadFilmes = () => {
    getFilmes().then((filmes) => setFilmes(filmes));
  };

  const handleAddFilme = () => {
    loadFilmes();
  };

  return (
    <div className="App">
      <AddFilme onAddFilme={handleAddFilme} />
      <FilmList filmes={filmes} />
    </div>
  );
}

export default App;

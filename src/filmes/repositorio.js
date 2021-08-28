// Para instalar essa dependência, execute 'npm install localStorage' no seu terminal/prompt
import localStorage from "localStorage";

/**
 * O método inserir verifica se existe um item no localStorage (getItem) com o nome
 * 'filmes'. Caso não exista, vai criar um novo e salvar (setItem), usando JSON.stringify
 * para transformar o array no formato string, que é usado pelo localStorage.
 * Caso exista, vai usar a função JSON.parse para transformar uma string
 * (que é o formato que o localStorage usa pra salvar) em array. Logo em seguida,
 * vai adicionar (push) os novos filmes.
 *
 * Esse comportamento se repete nos demais métodos desse módulo.
 */
const inserir = (novosFilmes) => {
	let filmes = localStorage.getItem("filmes");
	if (filmes == null) {
		filmes = [...novosFilmes];
	} else {
		filmes = JSON.parse(filmes);
		filmes.push(...novosFilmes);
	}
	localStorage.setItem("filmes", JSON.stringify(filmes));
};

const remover = (filmeARemover) => {
	let filmes = localStorage.getItem("filmes");
	if (filmes == null) {
		throw new Error("Não há itens armazenados");
	} else {
		filmes = JSON.parse(filmes);
		/**
		 * Verificando se existe um filme dentro da variável filmes que atenda
		 * a expressão que compara 'ano' e 'nome' entre o filmeARemover e cada um
		 * dos itens do array (representado por 'filme')
		 */
		const index = filmes.findIndex(
			(filme) =>
				filme.ano === filmeARemover.ano &&
				filme.nome === filmeARemover.nome
		);
		/**
		 * Se a função acima não encontra nenhum filme correspondente e retorna -1,
		 * não há nada a ser removido
		 */
		if (index < 0) {
			throw new Error("Não existe o item informado");
		}
		filmes.splice(index, 1);
		localStorage.setItem("filmes", JSON.stringify(filmes));
	}
};

const listar = () => {
	let filmes = localStorage.getItem("filmes");
	return filmes != null ? JSON.parse(filmes) : [];
};

const limpar = () => {
	localStorage.removeItem("filmes");
};

export const repositorio = {
	inserir,
	remover,
	listar,
	limpar,
};

// --- Sessão do usuário (localStorage) ---
function salvarUsuarioLogado(usuario) {
	localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

function obterUsuarioLogado() {
	const dados = localStorage.getItem("usuarioLogado");
	return dados ? JSON.parse(dados) : null;
}

function sairDaConta() {
	localStorage.removeItem("usuarioLogado");
	window.location.reload();
}

function atualizarCabecalho() {
	const usuario = obterUsuarioLogado();
	const acoes = document.querySelector(".acoes-cabecalho");
	if (!acoes) return;

	if (usuario) {
		acoes.innerHTML = `
			<span class="usuario-logado">Olá, ${usuario.nome.split(" ")[0]}</span>
			<button class="botao botao--fantasma" id="botaoSair">Sair</button>
			<button class="botao-menu" aria-label="Abrir menu">☰</button>
		`;
		document.querySelector("#botaoSair").addEventListener("click", sairDaConta);
	}
}

document.addEventListener("DOMContentLoaded", atualizarCabecalho);
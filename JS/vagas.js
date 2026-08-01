// ===== Dados das vagas =====
// As vagas agora vivem em data/vagas.json — pra cadastrar uma vaga nova,
// basta adicionar um objeto novo nesse arquivo. "categoria" precisa ser uma
// destas: 'frontend', 'backend', 'fullstack', 'tecnico' (mesmos valores do
// atributo data-filtro dos botões no HTML).
let vagas = [];

// Rótulos amigáveis pra mostrar a categoria dentro do card
const rotulosCategoria = {
	frontend: 'Front-end',
	backend: 'Back-end',
	fullstack: 'Full Stack',
	tecnico: 'Técnico em Informática'
};

// ===== Monta o HTML de uma lista de vagas dentro do container =====
function renderizarVagas(lista) {
	const container = document.getElementById('grade-vagas');
	if (!container) return;

	container.innerHTML = '';

	if (lista.length === 0) {
		container.innerHTML = '<p class="vagas-vazio">Nenhuma vaga encontrada nessa categoria.</p>';
		return;
	}

	lista.forEach((vaga) => {
		const card = document.createElement('article');
		card.className = 'cartao cartao-vaga';
		card.innerHTML = `
			<div class="cartao-vaga__topo">
				<span class="cartao-vaga__categoria">${rotulosCategoria[vaga.categoria] || vaga.categoria}</span>
				<span class="selo">${vaga.local}</span>
			</div>
			<h3>${vaga.titulo}</h3>
			<p class="cartao-vaga__empresa">${vaga.empresa}</p>
			<p class="cartao-vaga__salario">${vaga.salario}</p>
			<p class="cartao-vaga__requisitos"><strong>Requisitos:</strong> ${vaga.requisitos}</p>
			<a href="candidatura.html?vaga=${vaga.id}" class="botao botao--primario">Candidatar-se</a>
		`;
		container.appendChild(card);
	});
}

// ===== Busca as vagas em data/vagas.json e liga os filtros =====
async function iniciarPaginaDeVagas() {
	const container = document.getElementById('grade-vagas');
	if (!container) return; // só roda nessa página

	try {
		const resposta = await fetch('data/vagas.json');
		vagas = await resposta.json();
	} catch (erro) {
		console.error('Não foi possível carregar as vagas:', erro);
		container.innerHTML = '<p class="vagas-vazio">Não foi possível carregar as vagas no momento.</p>';
		return;
	}

	renderizarVagas(vagas); // mostra todas as vagas ao carregar

	const botoesFiltro = document.querySelectorAll('.filtro-vaga');
	botoesFiltro.forEach((botao) => {
		botao.addEventListener('click', () => {
			const categoria = botao.getAttribute('data-filtro');

			// marca visualmente qual botão está ativo
			botoesFiltro.forEach((b) => b.classList.remove('filtro-vaga--ativo'));
			botao.classList.add('filtro-vaga--ativo');

			const vagasFiltradas = categoria === 'todos'
				? vagas
				: vagas.filter((vaga) => vaga.categoria === categoria);

			renderizarVagas(vagasFiltradas);
		});
	});
}

document.addEventListener('DOMContentLoaded', iniciarPaginaDeVagas);

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

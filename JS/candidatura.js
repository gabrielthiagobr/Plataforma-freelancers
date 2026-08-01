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

// ===== Seleção da vaga na página de Candidatar-se =====
// Resolve o problema de quem chega direto nessa página (pelo menu, por
// exemplo) sem ter clicado em "Candidatar-se" numa vaga específica: o campo
// "Vaga de Interesse" é sempre exibido e obrigatório. Quando a pessoa vem da
// página de Vagas (candidatura.html?vaga=ID), a vaga certa já chega
// pré-selecionada e um resumo (empresa, local e salário) aparece embaixo.
let vagasDisponiveis = [];

async function carregarVagasParaCandidatura() {
	const select = document.getElementById('vaga-interesse');
	if (!select) return; // só roda na página de candidatura

	try {
		const resposta = await fetch('data/vagas.json');
		vagasDisponiveis = await resposta.json();
	} catch (erro) {
		console.error('Não foi possível carregar as vagas:', erro);
		return;
	}

	vagasDisponiveis.forEach((vaga) => {
		const opcao = document.createElement('option');
		opcao.value = vaga.id;
		opcao.textContent = `${vaga.titulo} — ${vaga.empresa}`;
		select.appendChild(opcao);
	});

	// Se a pessoa veio de "vagas.html" clicando em Candidatar-se, a URL tem
	// "?vaga=ID" e a gente já deixa essa vaga pré-selecionada aqui.
	const parametros = new URLSearchParams(window.location.search);
	const idVagaNaUrl = parametros.get('vaga');
	if (idVagaNaUrl && vagasDisponiveis.some((v) => String(v.id) === idVagaNaUrl)) {
		select.value = idVagaNaUrl;
	}

	atualizarResumoVaga();
	select.addEventListener('change', atualizarResumoVaga);
}

function atualizarResumoVaga() {
	const select = document.getElementById('vaga-interesse');
	const resumo = document.getElementById('vagaResumo');
	if (!select || !resumo) return;

	const vaga = vagasDisponiveis.find((v) => String(v.id) === select.value);

	if (!vaga) {
		resumo.style.display = 'none';
		resumo.innerHTML = '';
		return;
	}

	resumo.style.display = 'flex';
	resumo.innerHTML = `
		<div class="vaga-resumo-info">
			<b>${vaga.titulo}</b>
			<span>${vaga.empresa} · ${vaga.local}</span>
		</div>
		<span class="selo">${vaga.salario}</span>
	`;
}

document.addEventListener('DOMContentLoaded', carregarVagasParaCandidatura);

// ===== Envio do formulário de candidatura =====
document.addEventListener('DOMContentLoaded', () => {
	const formCandidatura = document.getElementById('formCandidatura');
	if (!formCandidatura) return;

	formCandidatura.addEventListener('submit', (e) => {
		e.preventDefault();

		const select = document.getElementById('vaga-interesse');
		const vaga = vagasDisponiveis.find((v) => String(v.id) === select.value);

		const dados = {
			vagaId: vaga ? vaga.id : null,
			vaga: vaga ? `${vaga.titulo} - ${vaga.empresa}` : null,
			nome: document.getElementById('nome-completo').value,
			email: document.getElementById('email').value,
			telefone: document.getElementById('telefone').value,
			portfolio: document.getElementById('portfolio').value,
			mensagem: document.getElementById('mensagem').value
		};

		// Aqui você conectaria com seu back-end
		console.log('Dados da candidatura:', dados);

		const mensagemSucesso = document.getElementById('mensagemSucesso');
		if (mensagemSucesso) {
			mensagemSucesso.textContent = vaga
				? `Candidatura enviada com sucesso para "${vaga.titulo}" na ${vaga.empresa}! A empresa entrará em contato por e-mail.`
				: 'Candidatura enviada com sucesso! A empresa entrará em contato por e-mail.';
			mensagemSucesso.style.display = 'block';
		}

		formCandidatura.reset();
		atualizarResumoVaga();
	});
});
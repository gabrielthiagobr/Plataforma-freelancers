// ===== Header inteligente: esconde ao rolar pra baixo, mostra ao rolar pra cima =====
(() => {
  const header = document.querySelector('.cabecalho');
  if (!header) return;

  let ultimoScroll = window.scrollY;
  const TOLERANCIA = 8; // ignora tremores pequenos de scroll (trackpad, etc.)

  window.addEventListener('scroll', () => {
    const scrollAtual = window.scrollY;
    const diferenca = scrollAtual - ultimoScroll;

    // Perto do topo, header sempre visível
    if (scrollAtual < 80) {
      header.classList.remove('cabecalho--escondido');
    }
    // Rolando pra baixo além da tolerância -> esconde
    else if (diferenca > TOLERANCIA) {
      header.classList.add('cabecalho--escondido');
    }
    // Rolando pra cima além da tolerância -> mostra
    else if (diferenca < -TOLERANCIA) {
      header.classList.remove('cabecalho--escondido');
    }

    ultimoScroll = scrollAtual;
  }, { passive: true });
})();

document.addEventListener('DOMContentLoaded', () => {

    // ===== Sistema genérico de modais =====
    // Em vez de um bloco de código por modal, uma função só sabe abrir/fechar
    // QUALQUER modal, desde que ele siga o padrão: classe ".modal" + atributo
    // "data-modal" no <div> do modal, e "data-abrir-modal" no(s) botão(ões)
    // que devem abri-lo — os dois valores precisam ser iguais.

    const todosOsModais = document.querySelectorAll('.modal');
    const botoesDeAbrir = document.querySelectorAll('[data-abrir-modal]');

    const abrirModal = (nomeModal) => {
        const modal = document.querySelector(`.modal[data-modal="${nomeModal}"]`);
        if (modal) modal.style.display = 'flex';
    };

    const fecharModal = (modal) => {
        if (modal) modal.style.display = 'none';
    };

    // Cada botão de abrir modal lê o próprio atributo pra saber QUAL modal abrir
    botoesDeAbrir.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            const nomeModal = botao.getAttribute('data-abrir-modal');
            abrirModal(nomeModal);
        });
    });

    // Cada modal cuida do próprio botão de fechar (X) e do clique fora dele
    todosOsModais.forEach(modal => {
        const botaoFechar = modal.querySelector('.modal__fechar');
        if (botaoFechar) {
            botaoFechar.addEventListener('click', () => fecharModal(modal));
        }

        modal.addEventListener('click', (e) => {
            // Só fecha se o clique foi no fundo escuro (overlay), não no conteúdo
            if (e.target === modal) fecharModal(modal);
        });
    });

    // Tecla ESC fecha qualquer modal que esteja aberto no momento
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            todosOsModais.forEach(modal => {
                if (modal.style.display === 'flex') fecharModal(modal);
            });
        }
    });

    // ===== Formulário de criação de perfil =====
    const formPerfil = document.getElementById('formPerfil');
    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();

            const dados = {
                nome: document.getElementById('nome-completo').value,
                email: document.getElementById('email').value,
                // CORREÇÃO: id estava "area-atuação" (com acento), mas o HTML
                // já foi corrigido pra "area-atuacao" (sem acento) — esse
                // getElementById precisa bater exatamente com o id do HTML.
                area: document.getElementById('area-atuacao').value,
                nivel: document.getElementById('nivel').value,
                bio: document.getElementById('bio').value,
                portfolio: document.getElementById('portfolio').value,
                newsletter: document.getElementById('newsletter').checked
            };

            // Aqui você conectaria com seu back-end
            console.log('Dados do perfil:', dados);

            alert('Perfil criado com sucesso!');
            fecharModal(document.querySelector('.modal[data-modal="cadastro"]'));
            formPerfil.reset();
        });
    }

    // ===== Formulário de login =====
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const dados = {
                email: document.getElementById('login-email').value,
                senha: document.getElementById('login-senha').value
            };

            // Aqui você conectaria com seu back-end (autenticação de verdade)
            console.log('Dados de login:', dados);

            alert('Login realizado com sucesso!');
            fecharModal(document.querySelector('.modal[data-modal="login"]'));
            formLogin.reset();
        });
    }
});


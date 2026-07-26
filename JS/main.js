document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos
    const modal = document.querySelector('.modal-perfil');
    const btnsAbrir = document.querySelectorAll('[data-abrir-modal="cadastro"]');
    const btnFechar = document.querySelector('.modal-perfil__fechar');

    // Função para abrir o modal
    const abrirModal = (e) => {
        e.preventDefault();
        if (modal) modal.style.display = 'flex';
    };

    // Função para fechar o modal
    const fecharModal = () => {
        if (modal) modal.style.display = 'none';
    };

    // Adiciona evento aos botões de "Criar conta"
    btnsAbrir.forEach(btn => {
        btn.addEventListener('click', abrirModal);
    });

    // Adiciona evento ao botão de fechar (X)
    if (btnFechar) {
        btnFechar.addEventListener('click', fecharModal);
    }

    // Fecha ao clicar fora do conteúdo do modal
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }

    // Lógica do formulário
    const formPerfil = document.getElementById('formPerfil');
    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();

            // Coleta os dados
            const dados = {
                nome: document.getElementById('nome-completo').value,
                email: document.getElementById('email').value,
                area: document.getElementById('area-atuação').value,
                nivel: document.getElementById('nivel').value,
                bio: document.getElementById('bio').value,
                portfolio: document.getElementById('portfolio').value,
                newsletter: document.getElementById('newsletter').checked
            };

            // Aqui você conectaria com seu back-end
            console.log('Dados do perfil:', dados);
            
            alert('Perfil criado com sucesso!');
            fecharModal();
            formPerfil.reset();
        });
    }
});

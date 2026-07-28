// ===== Dados das vagas =====
// Pra cadastrar uma vaga nova, é só adicionar um objeto neste array.
// "categoria" precisa ser uma destas: 'frontend', 'backend', 'fullstack', 'tecnico'
// (são os mesmos valores usados no atributo data-filtro dos botões no HTML).
const vagas = [
    {
        titulo: 'Desenvolvedor Front-end Júnior',
        empresa: 'NovaTech',
        local: 'Remoto',
        salario: 'R$ 3.500 / mês',
        requisitos: 'HTML, CSS e JavaScript',
        categoria: 'frontend'
    },
    {
        titulo: 'Desenvolvedor Back-end Júnior',
        empresa: 'Connect Systems',
        local: 'São Paulo - SP',
        salario: 'R$ 4.500 / mês',
        requisitos: 'Java, Banco de Dados e APIs',
        categoria: 'backend'
    },
    {
        titulo: 'Auxiliar de Suporte em TI',
        empresa: 'Alpha Tecnologia',
        local: 'Botucatu - SP',
        salario: 'R$ 2.300 / mês',
        requisitos: 'Windows, Office e atendimento',
        categoria: 'tecnico'
    },
    {
        titulo: 'Auxiliar Técnico de Informática',
        empresa: 'Vision Informática',
        local: 'Bauru - SP',
        salario: 'R$ 2.500 / mês',
        requisitos: 'Manutenção de computadores e redes',
        categoria: 'tecnico'
    },
    {
        titulo: 'Desenvolvedor Full Stack Pleno',
        empresa: 'Orbita Software',
        local: 'Remoto',
        salario: 'R$ 6.000 / mês',
        requisitos: 'React, Node.js e PostgreSQL',
        categoria: 'fullstack'
    },
    {
        titulo: 'Desenvolvedor Full Stack Pleno',
        empresa: 'Software orbital',
        local: 'Remoto',
        salario: 'R$ 5.000 / mês',
        requisitos: 'React, Node.js e PostgreSQL',
        categoria: 'fullstack'
    },
    {
        titulo: 'Desenvolvedor Full Stack Pleno',
        empresa: 'Orbit Softwares',
        local: 'Remoto',
        salario: 'R$ 3.700 / mês',
        requisitos: 'React, Node.js e PostgreSQL',
        categoria: 'fullstack'
    },
    {
        titulo: 'Desenvolvedor Full Stack Pleno',
        empresa: ' Software orbital',
        local: 'Remoto',
        salario: 'R$ 4.000 / mês',
        requisitos: 'React, Node.js e PostgreSQL',
        categoria: 'fullstack'
    },
    {
        titulo: 'Desenvolvedor Front-end Pleno',
        empresa: 'Tech Nova',
        local: 'São Paulo - SP',
        salario: 'R$ 5.000 / mês',
        requisitos: 'React, TypeScript, Tailwind CSS e Git',
        categoria: 'frontend'
    },
    {
        titulo: 'Desenvolvedor Back-end Sênior',
        empresa: 'Connect Systems',
        local: 'Remoto',
        salario: 'R$ 9.500 / mês',
        requisitos: 'Node.js, Docker, AWS e PostgreSQL',
        categoria: 'backend'
    },
    {
        titulo: 'Analista de Suporte Técnico',
        empresa: 'Alpha Tecnologia',
        local: 'Bauru - SP',
        salario: 'R$ 2.800 / mês',
        requisitos: 'Redes, Windows Server, Hardware e Suporte',
        categoria: 'tecnico'
    },
    {
        titulo: 'Engenheiro de Dados Pleno',
        empresa: 'DataWave',
        local: 'Bauru - SP',
        salario: 'R$ 9.000 / mês',
        requisitos: 'Python, SQL, Apache Spark e ETL',
        categoria: 'backend'
    },
     {
        titulo: 'Engenheiro de Dados Pleno',
        empresa: 'DataWave',
        local: 'remoto',
        salario: 'R$ 8.000 / mês',
        requisitos: 'Python, , Apache Spark',
        categoria: 'backend'
    },
        {
        titulo: 'Desenvolvedor Front-end Pleno',
        empresa: 'NovaTech',
        local: 'Jaú - SP',
        salario: 'R$ 5.000 / mês',
        requisitos: 'React, TypeScript, Tailwind CSS',
        categoria: 'frontend'
    },
        {
        titulo: 'Desenvolvedor Front-end senior',
        empresa: 'NovaTech',
        local: 'Marilia - SP',
        salario: 'R$ 6.000 / mês',
        requisitos: ' TypeScript, Tailwind CSS e Git',
        categoria: 'frontend'
    },
     {
        titulo: 'Tecnico Em Digitaçao',
        empresa: 'NovaTech',
        local: 'Jaú - SP',
        salario: 'R$ 4.500 / mês',
        requisitos: 'React, TypeScript, Tailwind CSS e Git',
        categoria: 'tecnico'
    }
    
    // Nova vaga? Copie o bloco acima, cole aqui embaixo e troque os valores.
];

// ===== Monta o HTML de uma lista de vagas dentro do container =====
function renderizarVagas(lista) {
    const container = document.getElementById('grade-vagas');
    if (!container) return;

    container.innerHTML = '';

    if (lista.length === 0) {
        container.innerHTML = '<p>Nenhuma vaga encontrada nessa categoria.</p>';
        return;
    }

    lista.forEach((vaga) => {
        const card = document.createElement('article');
        card.className = 'cartao';
        card.innerHTML = `
            <h3>${vaga.titulo}</h3>
            <p><strong>${vaga.empresa}</strong> · ${vaga.local}</p>
            <p>${vaga.salario}</p>
            <p>Requisitos: ${vaga.requisitos}</p>
            <a href="candidatura.html" class="botao botao--primario">Candidatar-se</a>
        `;
        container.appendChild(card);
    });
}

// ===== Liga os botões de filtro e o estado inicial =====
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('grade-vagas');
    if (!container) return; // só roda nessa página

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
});

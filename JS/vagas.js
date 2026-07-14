/* ==========================================================================
   VAGA+ — vagas.js
   Dados de exemplo das vagas + lógica de filtro/renderização
   ========================================================================== */

var VAGAS = [
  {
    cargo: "Desenvolvedor(a) Front-end Júnior",
    empresa: "NovaTech Soluções",
    inicial: "N",
    area: "desenvolvimento",
    modelo: "remoto",
    estagio: false,
    salario: "R$ 3.800 / mês",
    carga: "40h semanais",
    descricao: "Empresa de tecnologia focada em sistemas web para o varejo. Você vai trabalhar com HTML, CSS, JavaScript e React, ao lado de um time enxuto e colaborativo."
  },
  {
    cargo: "Analista de Suporte Técnico",
    empresa: "ConectaTI",
    inicial: "C",
    area: "suporte",
    modelo: "hibrido",
    estagio: false,
    salario: "R$ 2.400 / mês",
    carga: "36h semanais",
    descricao: "Provedora de internet e serviços de TI para pequenas empresas. Atendimento a clientes, suporte remoto e manutenção básica de redes."
  },
  {
    cargo: "Estagiário(a) de Tecnologia da Informação",
    empresa: "DataFlow Sistemas",
    inicial: "D",
    area: "dados",
    modelo: "presencial",
    estagio: true,
    salario: "R$ 1.600 / mês (bolsa-auxílio)",
    carga: "30h semanais",
    descricao: "Empresa de análise de dados para o setor financeiro. Ideal para quem está começando: apoio em planilhas, relatórios e organização de bases de dados."
  },
  {
    cargo: "Designer de Produto (UI/UX)",
    empresa: "Estúdio Beira-Mar",
    inicial: "E",
    area: "design",
    modelo: "remoto",
    estagio: false,
    salario: "R$ 4.200 / mês",
    carga: "40h semanais",
    descricao: "Estúdio de design digital que atende startups. Você vai criar telas, protótipos e testar a experiência de uso com usuários reais."
  },
  {
    cargo: "Desenvolvedor(a) Back-end Pleno",
    empresa: "Orbitá Tecnologia",
    inicial: "O",
    area: "desenvolvimento",
    modelo: "hibrido",
    estagio: false,
    salario: "R$ 6.500 / mês",
    carga: "40h semanais",
    descricao: "Fábrica de software para o setor de logística. Atuação com Node.js, bancos de dados relacionais e integração de APIs."
  },
  {
    cargo: "Estagiário(a) de Suporte",
    empresa: "ConectaTI",
    inicial: "C",
    area: "suporte",
    modelo: "presencial",
    estagio: true,
    salario: "R$ 1.100 / mês (bolsa-auxílio)",
    carga: "24h semanais",
    descricao: "Vaga de estágio para quem quer aprender suporte técnico na prática, com acompanhamento de analistas seniores da equipe."
  },
  {
    cargo: "Analista de Dados Júnior",
    empresa: "DataFlow Sistemas",
    inicial: "D",
    area: "dados",
    modelo: "remoto",
    estagio: false,
    salario: "R$ 3.500 / mês",
    carga: "40h semanais",
    descricao: "Organização e análise de dados de clientes para gerar relatórios simples de desempenho financeiro."
  }
];

var ROTULO_MODELO = { remoto: "Remoto", hibrido: "Híbrido", presencial: "Presencial" };

function criarCartaoVaga(vaga, indice) {
  var artigo = document.createElement('article');
  artigo.className = 'vaga-card';
  artigo.innerHTML =
    '<div class="vaga-card__logo" aria-hidden="true">' + vaga.inicial + '</div>' +
    '<div>' +
      '<div class="vaga-card__topo">' +
        '<h3>' + vaga.cargo + '</h3>' +
        '<span class="selo">' + ROTULO_MODELO[vaga.modelo] + '</span>' +
        (vaga.estagio ? '<span class="selo" style="background:#FFF3DD; color:#C9821F;">Estágio</span>' : '') +
      '</div>' +
      '<div class="vaga-card__empresa">' + vaga.empresa + '</div>' +
      '<div class="vaga-card__meta">' +
        '<span>💰 ' + vaga.salario + '</span>' +
        '<span>🕒 ' + vaga.carga + '</span>' +
      '</div>' +
      '<p class="vaga-card__desc">' + vaga.descricao + '</p>' +
    '</div>' +
    '<div class="vaga-card__acao">' +
      '<a class="botao botao--primario" href="candidatura.html?vaga=' + encodeURIComponent(vaga.cargo) + '">Candidatar-se</a>' +
      '<a class="botao botao--fantasma" href="#" data-abrir-modal="login">Entrar para salvar</a>' +
    '</div>';
  return artigo;
}

function renderizarVagas(lista) {
  var container = document.getElementById('listaVagas');
  var semResultado = document.getElementById('semResultado');
  container.innerHTML = '';

  if (lista.length === 0) {
    semResultado.classList.add('visivel');
    return;
  }
  semResultado.classList.remove('visivel');

  lista.forEach(function (vaga, indice) {
    container.appendChild(criarCartaoVaga(vaga, indice));
  });
}

function aplicarFiltros() {
  var busca = document.getElementById('filtroBusca').value.trim().toLowerCase();
  var area = document.getElementById('filtroArea').value;
  var modelo = document.getElementById('filtroModelo').value;
  var somenteEstagio = document.getElementById('filtroEstagio').checked;

  var filtradas = VAGAS.filter(function (vaga) {
    var bateBusca = !busca ||
      vaga.cargo.toLowerCase().indexOf(busca) !== -1 ||
      vaga.empresa.toLowerCase().indexOf(busca) !== -1;
    var bateArea = !area || vaga.area === area;
    var bateModelo = !modelo || vaga.modelo === modelo;
    var bateEstagio = !somenteEstagio || vaga.estagio === true;
    return bateBusca && bateArea && bateModelo && bateEstagio;
  });

  renderizarVagas(filtradas);
}

document.addEventListener('DOMContentLoaded', function () {
  renderizarVagas(VAGAS);

  var formFiltros = document.getElementById('formFiltros');
  formFiltros.addEventListener('submit', function (e) { e.preventDefault(); });

  ['filtroBusca', 'filtroArea', 'filtroModelo', 'filtroEstagio'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', aplicarFiltros);
    document.getElementById(id).addEventListener('change', aplicarFiltros);
  });
});

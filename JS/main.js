/* ==========================================================================
   VAGA+ — main.js
   Funções compartilhadas por todas as páginas:
   - Barra de acessibilidade (tamanho de fonte + alto contraste)
   - Modal de Login / Cadastro
   - Menu mobile
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     Acessibilidade: tamanho de fonte
     ------------------------------------------------------------------ */
  var ESCALA_MIN = 0.85;
  var ESCALA_MAX = 1.3;
  var PASSO = 0.1;

  function aplicarEscalaSalva() {
    var salvo = parseFloat(localStorage.getItem('vagaplus_escala'));
    if (!isNaN(salvo)) {
      document.documentElement.style.setProperty('--scale', salvo);
    }
    var contraste = localStorage.getItem('vagaplus_contraste');
    if (contraste === 'sim') {
      document.body.classList.add('contraste-alto');
      var botaoContraste = document.querySelector('.btn-contraste');
      if (botaoContraste) botaoContraste.setAttribute('aria-pressed', 'true');
    }
  }

  function ajustarFonte(delta) {
    var atual = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1;
    var nova = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, +(atual + delta).toFixed(2)));
    document.documentElement.style.setProperty('--scale', nova);
    localStorage.setItem('vagaplus_escala', nova);
  }

  var btnAumentar = document.querySelector('[data-fonte="aumentar"]');
  var btnDiminuir = document.querySelector('[data-fonte="diminuir"]');
  var btnResetar = document.querySelector('[data-fonte="resetar"]');
  var btnContraste = document.querySelector('.btn-contraste');

  if (btnAumentar) btnAumentar.addEventListener('click', function () { ajustarFonte(PASSO); });
  if (btnDiminuir) btnDiminuir.addEventListener('click', function () { ajustarFonte(-PASSO); });
  if (btnResetar) btnResetar.addEventListener('click', function () {
    document.documentElement.style.setProperty('--scale', 1);
    localStorage.setItem('vagaplus_escala', 1);
  });
  if (btnContraste) btnContraste.addEventListener('click', function () {
    var ligado = document.body.classList.toggle('contraste-alto');
    btnContraste.setAttribute('aria-pressed', ligado ? 'true' : 'false');
    localStorage.setItem('vagaplus_contraste', ligado ? 'sim' : 'nao');
  });

  aplicarEscalaSalva();

  /* ------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------ */
  var botaoMenu = document.querySelector('.botao-menu');
  var navPrincipal = document.querySelector('.nav-principal');
  if (botaoMenu && navPrincipal) {
    botaoMenu.addEventListener('click', function () {
      var aberto = navPrincipal.classList.toggle('aberto');
      botaoMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  /* ------------------------------------------------------------------
     Modal de Login / Cadastro
     ------------------------------------------------------------------ */
  var sobreposicao = document.getElementById('modalConta');
  if (!sobreposicao) return;

  var botoesAbrir = document.querySelectorAll('[data-abrir-modal]');
  var botaoFechar = sobreposicao.querySelector('.modal__fechar');
  var abas = sobreposicao.querySelectorAll('.modal__aba');
  var formularios = sobreposicao.querySelectorAll('.modal__form');

  function abrirModal(aba) {
    sobreposicao.classList.add('aberta');
    document.body.style.overflow = 'hidden';
    if (aba) trocarAba(aba);
    var primeiroCampo = sobreposicao.querySelector('.modal__form.visivel input');
    if (primeiroCampo) setTimeout(function () { primeiroCampo.focus(); }, 50);
  }

  function fecharModal() {
    sobreposicao.classList.remove('aberta');
    document.body.style.overflow = '';
  }

  function trocarAba(nome) {
    abas.forEach(function (aba) {
      var ativa = aba.getAttribute('data-aba') === nome;
      aba.classList.toggle('ativa', ativa);
    });
    formularios.forEach(function (form) {
      form.classList.toggle('visivel', form.getAttribute('data-form') === nome);
    });
  }

  botoesAbrir.forEach(function (botao) {
    botao.addEventListener('click', function (e) {
      e.preventDefault();
      abrirModal(botao.getAttribute('data-abrir-modal'));
    });
  });

  if (botaoFechar) botaoFechar.addEventListener('click', fecharModal);
  sobreposicao.addEventListener('click', function (e) {
    if (e.target === sobreposicao) fecharModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sobreposicao.classList.contains('aberta')) fecharModal();
  });

  abas.forEach(function (aba) {
    aba.addEventListener('click', function () {
      trocarAba(aba.getAttribute('data-aba'));
    });
  });

  /* Envio simulado dos formulários (projeto de estudo — sem backend) */
  formularios.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var mensagem = form.querySelector('.mensagem-sucesso');
      if (mensagem) {
        mensagem.classList.add('visivel');
        setTimeout(function () {
          fecharModal();
          mensagem.classList.remove('visivel');
          form.reset();
        }, 1400);
      }
    });
  });
});

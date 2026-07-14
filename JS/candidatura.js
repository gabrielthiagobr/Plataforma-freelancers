/* ==========================================================================
   VAGA+ — candidatura.js
   Alterna entre "anexar currículo" e "preencher formulário",
   simula upload de arquivo e envio (projeto de estudo, sem backend real)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* Mostra o nome da vaga na URL (?vaga=...), se vier da página de Vagas */
  var parametros = new URLSearchParams(window.location.search);
  var nomeVaga = parametros.get('vaga');
  if (nomeVaga) {
    document.getElementById('tituloVaga').innerHTML =
      'Você está se candidatando para <strong>' + nomeVaga + '</strong>. Escolha como prefere enviar seus dados abaixo.';
  }

  var etapaEscolha = document.getElementById('etapaEscolha');
  var etapaUpload = document.getElementById('etapaUpload');
  var etapaFormulario = document.getElementById('etapaFormulario');
  var passo1 = document.getElementById('passo1');
  var passo2 = document.getElementById('passo2');

  function irParaEtapa(nome) {
    etapaEscolha.style.display = nome === 'escolha' ? 'block' : 'none';
    etapaUpload.style.display = nome === 'upload' ? 'block' : 'none';
    etapaFormulario.style.display = nome === 'formulario' ? 'block' : 'none';
    passo1.classList.toggle('ativo', nome === 'escolha');
    passo2.classList.toggle('ativo', nome !== 'escolha');
    window.scrollTo({ top: etapaEscolha.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  }

  document.getElementById('opcaoUpload').addEventListener('click', function () { irParaEtapa('upload'); });
  document.getElementById('opcaoFormulario').addEventListener('click', function () { irParaEtapa('formulario'); });
  document.querySelectorAll('[data-voltar]').forEach(function (botao) {
    botao.addEventListener('click', function () { irParaEtapa('escolha'); });
  });

  /* ------------------------------------------------------------------
     Upload de currículo (arrastar e soltar + seleção manual)
     ------------------------------------------------------------------ */
  var zonaUpload = document.getElementById('zonaUpload');
  var inputArquivo = document.getElementById('arquivoCurriculo');
  var btnEscolherArquivo = document.getElementById('btnEscolherArquivo');
  var arquivoSelecionado = document.getElementById('arquivoSelecionado');
  var nomeArquivo = document.getElementById('nomeArquivo');
  var btnEnviarUpload = document.getElementById('btnEnviarUpload');
  var btnRemoverArquivo = document.getElementById('removerArquivo');

  btnEscolherArquivo.addEventListener('click', function () { inputArquivo.click(); });

  function mostrarArquivo(arquivo) {
    if (!arquivo) return;
    nomeArquivo.textContent = '📄 ' + arquivo.name + ' (' + Math.round(arquivo.size / 1024) + ' KB)';
    arquivoSelecionado.classList.add('visivel');
    btnEnviarUpload.disabled = false;
  }

  inputArquivo.addEventListener('change', function () {
    mostrarArquivo(inputArquivo.files[0]);
  });

  btnRemoverArquivo.addEventListener('click', function () {
    inputArquivo.value = '';
    arquivoSelecionado.classList.remove('visivel');
    btnEnviarUpload.disabled = true;
  });

  ['dragenter', 'dragover'].forEach(function (evento) {
    zonaUpload.addEventListener(evento, function (e) {
      e.preventDefault();
      zonaUpload.classList.add('arrastando');
    });
  });
  ['dragleave', 'drop'].forEach(function (evento) {
    zonaUpload.addEventListener(evento, function (e) {
      e.preventDefault();
      zonaUpload.classList.remove('arrastando');
    });
  });
  zonaUpload.addEventListener('drop', function (e) {
    var arquivo = e.dataTransfer.files[0];
    if (arquivo) {
      inputArquivo.files = e.dataTransfer.files;
      mostrarArquivo(arquivo);
    }
  });

  /* ------------------------------------------------------------------
     Envio simulado dos dois formulários
     ------------------------------------------------------------------ */
  document.getElementById('formUpload').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('sucessoUpload').classList.add('visivel');
    btnEnviarUpload.disabled = true;
  });

  document.getElementById('formManual').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('sucessoManual').classList.add('visivel');
  });

  /* Máscara simples de CPF */
  var campoCpf = document.getElementById('formCpf');
  if (campoCpf) {
    campoCpf.addEventListener('input', function () {
      var v = campoCpf.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      campoCpf.value = v;
    });
  }
});

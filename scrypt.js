// Função para salvar os dados no cache (localStorage)
function salvarNoCache(id, valor) {
    localStorage.setItem(id, valor);
}

// Função para carregar os dados salvos no cache
function carregarDoCache() {
    const ids = ['pretensao', 'custosFixos', 'custosVariaveis', 'horasTrabalhadas', 'horasDiarias', 'duracaoProjeto'];
    ids.forEach(id => {
        const valor = localStorage.getItem(id);
        if (valor) {
            document.getElementById(id).value = valor; // Carrega o valor numérico sem formatação
        }
    });
    calcularValores(); // Recalcula os valores ao carregar o cache
}

// Função que realiza os cálculos automáticos
function calcularValores() {
    const pretensao = parseFloat(document.getElementById('pretensao').value) || 0;
    const custosFixos = parseFloat(document.getElementById('custosFixos').value) || 0;
    const custosVariaveis = parseFloat(document.getElementById('custosVariaveis').value) || 0;
    const horasTrabalhadas = parseInt(document.getElementById('horasTrabalhadas').value) || 1; // Prevenção de divisão por 0
    const horasDiarias = parseInt(document.getElementById('horasDiarias').value) || 0;
    const duracaoProjeto = parseInt(document.getElementById('duracaoProjeto').value) || 0;

    // Cálculo do valor total da hora, com prevenção de NaN
    const valorHoraTotal = (pretensao + custosFixos + custosVariaveis) / horasTrabalhadas;
    document.getElementById('valorHora').value = isNaN(valorHoraTotal) ? '0.00' : valorHoraTotal.toFixed(2);

    // Cálculo da margem de lucro, com prevenção de NaN
    const margemLucro = ((pretensao - (custosFixos + custosVariaveis)) / pretensao) * 100;
    document.getElementById('margemLucro').value = isNaN(margemLucro) ? '0.00%' : margemLucro.toFixed(2) + '%';

    // Cálculo do valor total do projeto, usando valorHora atualizado
    const valorHora = parseFloat(document.getElementById('valorHora').value) || 0;
    const valorTotalProjeto = valorHora * horasDiarias * duracaoProjeto;
    document.getElementById('valorTotalProjeto').value = isNaN(valorTotalProjeto) ? '0.00' : valorTotalProjeto.toFixed(2);
    document.getElementById('valorHoraProjeto').value = isNaN(valorHora) ? '0.00' : valorHora.toFixed(2);
}

// Função para formatar os campos de moeda em tempo real
function formatarCampoMoeda(event) {
    const campo = event.target;
    const valorNumerico = parseFloat(campo.value.replace(/[^\d]/g, '')) / 100 || 0;
    salvarNoCache(campo.id, valorNumerico); // Salvar valor numérico sem formatação
    campo.value = valorNumerico.toFixed(2); // Exibe o valor numérico formatado
    calcularValores(); // Atualiza os cálculos
}

// Função para campos de número normais
function formatarCampoNumero(event) {
    const campo = event.target;
    const valorNumerico = parseFloat(campo.value) || 0;
    salvarNoCache(campo.id, valorNumerico);
    calcularValores(); // Atualiza os cálculos
}

// Função para campos que aceitam apenas inteiros (horas e dias)
function formatarCampoInteiro(event) {
    const campo = event.target;
    const valorInteiro = parseInt(campo.value.replace(/[^\d]/g, '')) || 0; // Remove qualquer caractere não numérico
    salvarNoCache(campo.id, valorInteiro); // Salva o valor inteiro no cache
    campo.value = valorInteiro; // Exibe o valor como inteiro
    calcularValores(); // Atualiza os cálculos
}

// Função para mover para o próximo campo
function moverParaProximoCampo(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o envio de um formulário se houver
        const nextField = event.target.nextElementSibling;
        if (nextField) {
            nextField.focus(); // Foca no próximo campo
        }
    }
}

// Carregar os valores do cache ao abrir a página
window.onload = function () {
    carregarDoCache();

    // Aplicar formatação e salvar valores ao alterar os campos de moeda
    const camposMoeda = ['pretensao', 'custosFixos', 'custosVariaveis'];
    camposMoeda.forEach(campoId => {
        const campo = document.getElementById(campoId);
        campo.addEventListener('input', formatarCampoMoeda);
        campo.addEventListener('blur', formatarCampoMoeda); // Formata ao sair do campo
        campo.addEventListener('keydown', moverParaProximoCampo); // Muda de campo ao pressionar Enter
    });

    // Aplicar formatação e salvar valores ao alterar os campos de inteiros (horas e dias)
    const camposInteiros = ['horasTrabalhadas', 'horasDiarias', 'duracaoProjeto'];
    camposInteiros.forEach(campoId => {
        const campo = document.getElementById(campoId);
        campo.addEventListener('input', formatarCampoInteiro);
        campo.addEventListener('blur', formatarCampoInteiro); // Formata ao sair do campo
        campo.addEventListener('keydown', moverParaProximoCampo); // Muda de campo ao pressionar Enter
    });
};

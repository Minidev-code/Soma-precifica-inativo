// Função para formatar um número para o estilo de moeda brasileiro (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para remover a formatação de moeda e retornar apenas o número
function removerFormatacao(valor) {
    // Remove tudo que não for número, vírgula ou ponto
    return parseFloat(valor.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
}

// Evento que fica de olho em quando o usuário digita algo
document.addEventListener('input', function() {
    // Pegamos os valores dos campos e removemos a formatação antes dos cálculos
    let pretensao = removerFormatacao(document.getElementById('pretensao').value);
    let custosFixos = removerFormatacao(document.getElementById('custosFixos').value);
    let custosVariaveis = removerFormatacao(document.getElementById('custosVariaveis').value);
    let horasTrabalhadas = parseFloat(document.getElementById('horasTrabalhadas').value) || 1;
    let margemLucro = parseFloat(document.getElementById('margemLucro').value) || 0;

    // Calculamos o valor da hora
    let valorHora = ((pretensao + custosFixos + custosVariaveis) / horasTrabalhadas) * (1 + (margemLucro / 100));
    
    // Mostramos o valor da hora nos campos formatados
    document.getElementById('valorHora').value = valorHora.toFixed(2);
    document.getElementById('valorHoraProjeto').value = valorHora.toFixed(2);
    
    // Agora calculamos o valor do projeto
    let horasDiarias = parseFloat(document.getElementById('horasDiarias').value) || 0;
    let duracaoProjeto = parseFloat(document.getElementById('duracaoProjeto').value) || 0;
    let valorTotalProjeto = valorHora * horasDiarias * duracaoProjeto;
    
    // Mostramos o valor total do projeto formatado
    document.getElementById('valorTotalProjeto').value = valorTotalProjeto.toFixed(2);
});

// Evento para formatar os campos quando o usuário sair do campo (blur)
document.querySelectorAll('.campo').forEach(function(input) {
    input.addEventListener('blur', function() {
        // Checa se o campo é de valores que precisam ser formatados
        if (input.id === 'pretensao' || input.id === 'custosFixos' || input.id === 'custosVariaveis') {
            let valor = removerFormatacao(input.value);
            input.value = formatarMoeda(valor); // Formata para "R$ xx.xxx,xx"
        }
    });

    // Evento para permitir que o Enter também aplique a formatação
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            input.blur(); // Força o campo a perder o foco, o que dispara o evento de blur
        }
    });
});

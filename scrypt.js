console.log("O script JavaScript está funcionando!");

document.addEventListener("DOMContentLoaded", function () {
    const pretensao = document.getElementById("pretensao");
    const custosFixos = document.getElementById("custosFixos");
    const custosVariaveis = document.getElementById("custosVariaveis");
    const horasTrabalhadas = document.getElementById("horasTrabalhadas");
    const valorHora = document.getElementById("valorHora");
    const margemLucro = document.getElementById("margemLucro");
    const horasDiarias = document.getElementById("horasDiarias");
    const duracaoProjeto = document.getElementById("duracaoProjeto");
    const valorTotalProjeto = document.getElementById("valorTotalProjeto");

    // Função para salvar os dados no LocalStorage
    function salvarNoLocalStorage() {
        localStorage.setItem("pretensao", pretensao.value);
        localStorage.setItem("custosFixos", custosFixos.value);
        localStorage.setItem("custosVariaveis", custosVariaveis.value);
        localStorage.setItem("horasTrabalhadas", horasTrabalhadas.value);
        localStorage.setItem("horasDiarias", horasDiarias.value);
        localStorage.setItem("duracaoProjeto", duracaoProjeto.value);
        localStorage.setItem("margemLucro", margemLucro.value); // Salvando a margem de lucro
    }

    // Função para carregar os dados do LocalStorage
    function carregarDoLocalStorage() {
        if (localStorage.getItem("pretensao")) {
            pretensao.value = localStorage.getItem("pretensao");
        }
        if (localStorage.getItem("custosFixos")) {
            custosFixos.value = localStorage.getItem("custosFixos");
        }
        if (localStorage.getItem("custosVariaveis")) {
            custosVariaveis.value = localStorage.getItem("custosVariaveis");
        }
        if (localStorage.getItem("horasTrabalhadas")) {
            horasTrabalhadas.value = localStorage.getItem("horasTrabalhadas");
        }
        if (localStorage.getItem("horasDiarias")) {
            horasDiarias.value = localStorage.getItem("horasDiarias");
        }
        if (localStorage.getItem("duracaoProjeto")) {
            duracaoProjeto.value = localStorage.getItem("duracaoProjeto");
        }
        if (localStorage.getItem("margemLucro")) {
            margemLucro.value = localStorage.getItem("margemLucro"); // Carregar margem de lucro
        }

        calcularValorHora();
        calcularValorProjeto();
    }

    // Função para calcular o valor da hora e a margem de lucro
    function calcularValorHora() {
        const rendaMensal = parseFloat(pretensao.value.replace("R$", "").replace(".", "").replace(",", ".")) || 0;
        const custosF = parseFloat(custosFixos.value.replace("R$", "").replace(".", "").replace(",", ".")) || 0;
        const custosV = parseFloat(custosVariaveis.value.replace("R$", "").replace(".", "").replace(",", ".")) || 0;
        const horasMes = parseFloat(horasTrabalhadas.value) || 0;

        const totalCustos = custosF + custosV;
        
        // Calcula o valor da hora sem margem de lucro
        const valorSemMargem = horasMes > 0 ? (rendaMensal + totalCustos) / horasMes : 0;

        // Calcula a margem de lucro com base no valor da hora desejado e nos custos totais
        const margemCalculada = (rendaMensal / (totalCustos + rendaMensal)) * 100;

        valorHora.value = `R$ ${valorSemMargem.toFixed(2).replace(".", ",")}`; // Formatar como moeda
        margemLucro.value = `${margemCalculada.toFixed(2)}%`; // Mostrar a margem calculada

        salvarNoLocalStorage();
    }

    // Função para calcular o valor do projeto
    function calcularValorProjeto() {
        const valorHoraNum = parseFloat(valorHora.value.replace("R$", "").replace(".", "").replace(",", ".")) || 0;
        const horasDia = parseFloat(horasDiarias.value) || 0;
        const duracao = parseFloat(duracaoProjeto.value) || 0;

        const totalProjeto = valorHoraNum * horasDia * duracao;
        valorTotalProjeto.value = `R$ ${totalProjeto.toFixed(2).replace(".", ",")}`; // Formatar como moeda

        salvarNoLocalStorage();
    }

    // Função para formatar os valores como moeda
    function formatarMoeda(e) {
        let value = e.target.value;

        // Remove todos os caracteres que não sejam números ou vírgulas
        value = value.replace(/\D/g, "");

        // Converte o valor em formato de moeda (R$)
        value = (value / 100).toFixed(2) + ""; // divide por 100 para ajustar os centavos
        value = value.replace(".", ","); // substitui ponto por vírgula
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // adiciona ponto como separador de milhar

        e.target.value = `R$ ${value}`;
    }

    // Adicionar eventos para formatar o valor de moeda
    pretensao.addEventListener("input", formatarMoeda);
    custosFixos.addEventListener("input", formatarMoeda);
    custosVariaveis.addEventListener("input", formatarMoeda);

    // Adicionar eventos para recalcular os valores ao alterar as entradas
    pretensao.addEventListener("input", calcularValorHora);
    custosFixos.addEventListener("input", calcularValorHora);
    custosVariaveis.addEventListener("input", calcularValorHora);
    horasTrabalhadas.addEventListener("input", calcularValorHora);
    horasDiarias.addEventListener("input", calcularValorProjeto);
    duracaoProjeto.addEventListener("input", calcularValorProjeto);

    // Carregar dados ao iniciar a página
    carregarDoLocalStorage();
});

const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCBRL';
let lastPrice = null; // Variável para armazenar o último preço
let corAtual = ''; // Variável para armazenar a cor atual

// Função para atualizar o preço do Bitcoin
function atualizarPrecoBTC() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error(`Erro ao acessar a API: ${response.statusText}`);
                throw new Error(`Erro na API: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Preço atualizado:', data); // Depuração para verificar os dados recebidos
            const precoBTC = parseFloat(data.price); // Converte o preço para número
            const precoElement = document.getElementById('preco-btc'); // Elemento do preço
            const setaElement = document.getElementById('seta'); // Elemento da seta

            let cor = corAtual; // Mantém a cor atual
            let setaClasse = ''; // Classe da seta (Font Awesome)

            if (lastPrice !== null) {
                if (precoBTC > lastPrice) {
                    cor = 'green'; // Verde se o preço subiu
                    setaClasse = 'fa-arrow-up'; // Seta para cima
                } else if (precoBTC < lastPrice) {
                    cor = 'red'; // Vermelho se o preço caiu
                    setaClasse = 'fa-arrow-down'; // Seta para baixo
                }
            } else {
                // Primeira atualização
                cor = 'green'; // Inicializa com verde
                setaClasse = 'fa-arrow-up';
            }

            // Atualiza os elementos no HTML
            precoElement.innerHTML = `R$ ${precoBTC.toFixed(2)}`;
            precoElement.style.color = cor; // Aplica a cor ao preço
            setaElement.className = `fas ${setaClasse}`; // Atualiza a classe da seta
            setaElement.style.color = cor; // Aplica a cor à seta

            // Armazena o último preço e a cor atual
            lastPrice = precoBTC;
            corAtual = cor;
        })
        .catch(error => {
            console.error('Erro ao carregar o preço do Bitcoin:', error);
            const precoElement = document.getElementById('preco-btc');
            precoElement.innerHTML = 'Erro ao carregar preço';
            precoElement.style.color = 'gray';
            const setaElement = document.getElementById('seta');
            setaElement.className = ''; // Remove a seta em caso de erro
        });
}

// Atualiza o preço do Bitcoin a cada 10 segundos
atualizarPrecoBTC();
setInterval(atualizarPrecoBTC, 10000);

// Troca de títulos com animação
window.onload = function () {
    let titulos = [
        'Negocie com<br>UNYTY-P2P',
        'Negocie com<br>Segurança',
        'Negocie com<br>Confiança',
    ];

    let index = 0; // Índice do título atual
    const tituloElement = document.getElementById('titulo');

    // Define o primeiro título e aplica a cor laranja a "UNYTY-P2P"
    tituloElement.innerHTML = titulos[index].replace('UNYTY-P2P', '<span class="laranja">UNYTY-P2P</span>');
    document.title = titulos[index].replace('<br>', ' ').replace('UNYTY-P2P', 'UNYTY-P2P'); // Remove o <br> do título da aba e mantém o termo correto
    index++;

    // Altera o título a cada 5 segundos
    setInterval(function () {
        const newTitle = titulos[index];

        // Aplica cor laranja ao UNYTY-P2P no título
        if (newTitle.includes('UNYTY-P2P')) {
            const partes = newTitle.split('UNYTY-P2P');
            tituloElement.innerHTML = `${partes[0]}<span class="laranja">UNYTY-P2P</span>${partes[1]}`;
        } else {
            tituloElement.innerHTML = newTitle;
        }

        document.title = newTitle.replace('<br>', ' '); // Remove o <br> do título da aba

        // Aplica animação de fade
        tituloElement.style.animation = 'none'; // Remove animação anterior
        tituloElement.offsetHeight; // Força reflow
        tituloElement.style.animation = 'fadeIn 1s forwards'; // Aplica animação

        index = (index + 1) % titulos.length; // Vai para o próximo título
    }, 5000);
};

document.getElementById('menu-toggle').addEventListener('click', function() {
    var navMobile = document.getElementById('nav-mobile');
    navMobile.classList.toggle('show'); // Alterna a classe 'show' para exibir/ocultar o menu
});

// JavaScript para controlar a troca entre as formas de negociação
let currentForm = 1;
const forms = ['form1', 'form2', 'form3'];

function showNextForm() {
    // Ocultar o formulário atual
    document.getElementById(forms[currentForm - 1]).classList.remove('show');
    
    // Passar para o próximo
    currentForm = (currentForm % 3) + 1;
    
    // Mostrar o próximo formulário
    document.getElementById(forms[currentForm - 1]).classList.add('show');
}

// Inicialização
setInterval(showNextForm, 2000); // Troca a forma a cada 2 segundos
showNextForm(); // Exibe o primeiro imediatamente


// Seleciona a seta
const scrollToTopButton = document.getElementById('scrollToTop');

// Quando a página rolar
window.onscroll = function() {
    // Verifica a posição de rolagem
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopButton.style.display = "block"; // Aparece a seta
    } else {
        scrollToTopButton.style.display = "none"; // Esconde a seta
    }
};

// Ao clicar na seta, sobe para o topo
scrollToTopButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Rolagem suave
    });
});

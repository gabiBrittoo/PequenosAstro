const grid = document.querySelector('.grid'); /*Selecionando a grid criada no css e html*/

/*Criando uma constante para as cartas do jogo da memória - frente das cartas*/ 
const cartas = [
    'cardum',
    'carddois',
    'cardtres',
    'cardquatro',
    'cardcinco',
    'cardseis',
    'cardsete',
    'cardoito',
    'cardnove',
    'carddez'
];

/*Criando um elemento*/
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

/*Primeira e segunda carta a serem clicadas pelo jogador*/
let firstCard = '';
let secondCard = '';

/*Constante para saber se o jogo acabou*/
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card'); /*Descobre quantas cartas já foram desativadas - já tiveram seus pares encontradas*/
  
    if (disabledCards.length === 20) { /*Se as 20 cartas estiverem desativadas o jogo acabou*/
    /*Retornando ao jogador que o jogo acabou*/
      clearInterval(this.loop);
      alert(`Parabéns! Você completou o jogo da memória :)`)
    }
} 

/*Checando as cartas*/
const checkCards = () => {
    const firstCarta = firstCard.getAttribute('data-carta');
    const secondCarta = secondCard.getAttribute('data-carta');

    /*Se a primeira carta selecionada for igual a segunda ambas são desativadas*/
    if (firstCarta === secondCarta) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
        /*Caso as duas cartas selecionadas sejam diferentes, são automaticamente viradas para baixo novamente*/
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = '';
        secondCard = '';
        }, 500);
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    /*Dando o valor da target a primeira carta selecionada */
    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    /*Dando o valor da target a segunda carta selecionada */
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

/*Criando as cards*/
const createCard = (carta) => {
    /*Definindo a card, a frente e a traseira*/
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    /*A imagem da frente deve equivaler a const cartas*/
    front.style.backgroundImage = `url('../img/${carta}.png')`;

    /*Criando a frente e traseira das cartas*/
    card.appendChild(front);
    card.appendChild(back);

    /*Ao ser clicada a frente da carta é revelada*/
    card.addEventListener('click', revealCard);
    card.setAttribute('data-carta', carta)

    return card;
}

const loadGame = () => {
    /*Duplicando cada carta*/
    const duplicateCartas = [...cartas, ...cartas];

    /*Definindo posições aleatórias a cada rodada diferente*/
    const shuffledArray = duplicateCartas.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((carta) => {
        const card = createCard(carta);
        grid.appendChild(card);
    });
}

loadGame();

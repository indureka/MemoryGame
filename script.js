const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

const fishes = [
    {
        name: 'crab',
        img: './images/crab.jpg',
    },
    {
        name: 'jellyfish',
        img: './images/jellyfish.jpg',
    },
    {
        name: 'nemo',
        img: './images/nemo.jpg',
    },
    {
        name: 'octopus',
        img: './images/octopus.jpg',
    },
    {
        name: 'seahorse',
        img: './images/seahorse.jpg',
    },
    {
        name: 'startfish',
        img: './images/starfish.jpg',
    },
    {
        name: 'turtle',
        img: './images/turtle.jpg',
    },
    {
        name: 'whale',
        img: './images/whale.jpg',
    }
];

console.log(fishes);
// Double the array to create pairs

const cards = [...fishes, ...fishes];

let flippedCards = [];
let matchedCards = [];

console.log(cards);

function shuffleCards(array){
    return array.sort(() => Math.random() - 0.5);
}

// Initialize the game

function initGame() {
    // clear the game board and reset states

    gameBoard.innerHTML = "";
    flippedCards = [];
    matchedCards = [];

    //shuffle the cards
    const shuffledCards = shuffleCards(cards);

    //Generate HTML
    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name=card.name;

        const frontDiv = document.createElement('div');
        frontDiv.classList.add('front');

        const backDiv =document.createElement('div');
        backDiv.classList.add('back');

        // create image element
        const imgElement = document.createElement('img');
        imgElement.src = card.img;
        imgElement.alt = card.name;

        // Append img to back div
        backDiv.appendChild(imgElement);

        // Append to frontDiv and backDiv

        cardElement.textContent="";
        cardElement.appendChild(frontDiv);
        cardElement.appendChild(backDiv);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    });


    // flipCard function

    function flipCard() {
        // check if only two cards are flipped
    if(flippedCards.length >=2) {
        return;
    }    

    const clickedCard=this;

    if(clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched'))
    {
        return;
    }

    // Flip the card
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if(flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }

}

function checkMatch() {
    const [card1, card2] = flippedCards;
// check if the cards are matched
    if(card1.dataset.name === card2.dataset.name) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
   
// check if cards are matched
    if(matchedCards.length === cards.length) {
        setTimeout(() => {
            alert('Congratulations! You won!');
          }, 500);
    }

}
// if they don't match. flipback
    else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];

}

}

// Restarts the game

    restartButton.addEventListener('click', initGame);
// Start the game
    initGame();

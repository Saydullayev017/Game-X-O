let item = document.getElementsByClassName('game-item');
let reset = document.getElementById('reset-game');
let message = document.getElementById('message');

let player = 'X';
let stepCount = 0;
let winCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
];

let dataX = [];
let dataO = [];

for(let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', currentStep);
}

function currentStep() {
    let num = +this.getAttribute('data-ceil');
    if(!this.textContent) {
        this.innerText = player;
        changePlayer();
        stepCount++;
        (stepCount === 9) ? (message.innerText = 'Ничья'):
        (message.innerText = 'Ходит игрок ' + player)
    }
}

function changePlayer() {
    player === 'X' ? (player = 'O') : (player = 'X'); 
}

reset.addEventListener('click', function() {
    for(let i = 0; i < item.length; i++) {
        item[i].innerText = '';
    }
    dataO = [];
    dataX = [];
    player = 'X';
    stepCount = 0;
    message.innerText = 'Ходит игрок ' + player
})
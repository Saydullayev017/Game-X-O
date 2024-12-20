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

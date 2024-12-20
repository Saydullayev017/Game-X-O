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
        player === 'X' ? dataX.push(num) && this.classList.add('x') : dataO.push(num) && this.classList.add('o');
        if(
            (dataX.length > 2 || dataO.length > 2) && (checkWin(dataO, num) || checkWin(dataX, num))
        ){
            for(let i = 0; i < item.length; i++) {
                item[i].removeEventListener('click', currentStep);
            }
            return(message.innerText = 'Победил игрок ' + player);
        }
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

    for(let i = 0; i < item.length; i++) {
        item[i].addEventListener('click', currentStep);
        item[i].classList.remove('x', 'o');
    }
})

function checkWin(arr, number) {
    for(let w = 0, wlen = winCombinations.length; w < wlen; w++) {
        let someWinArr = winCombinations[w];
        let count = 0;
        if(someWinArr.indexOf(number) !== -1){
            for(let k = 0, klen = someWinArr.length; k < klen; k++){
                if(arr.indexOf(someWinArr[k]) !== -1){
                    count++;
                    if(count === 3){
                        return true;
                    }
                }
            }
            count = 0;
        } 
    }
}
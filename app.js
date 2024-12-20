// Получаем элементы игры из DOM
let item = document.getElementsByClassName('game-item');
let reset = document.getElementById('reset-game');
let message = document.getElementById('message');

// Инициализация переменных игры
let player = 'X';
let stepCount = 0;

// Возможные выигрышные комбинации для "Крестиков-ноликов"
let winCombinations = [
    [1, 2, 3], // Горизонтальная верхняя линия
    [1, 4, 7], // Вертикальная левая линия
    [1, 5, 9], // Диагональ от верхнего левого до нижнего правого угла
    [2, 5, 8], // Вертикальная средняя линия
    [3, 6, 9], // Вертикальная правая линия
    [3, 5, 7], // Диагональ от верхнего правого до нижнего левого угла
    [4, 5, 6], // Горизонтальная средняя линия
    [7, 8, 9]  // Горизонтальная нижняя линия
];

// Массивы для хранения ходов игроков 'X' и 'O'
let dataX = [];
let dataO = [];

// Добавляем обработчик событий для каждого элемента игры
for(let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', currentStep);// При клике на элемент вызываем функцию currentStep
}

// Функция для обработки текущего хода игрока
function currentStep() {
    let num = +this.getAttribute('data-ceil');// Получаем номер ячейки из атрибута data-ceil элемента

    // Проверяем, пустая ли ячейка
    if(!this.textContent) {
        this.innerText = player;// Устанавливаем символ текущего игрока в ячейку

        // Добавляем номер ячейки в массив соответствующего игрока и добавляем класс для стилизации
        player === 'X' ? dataX.push(num) && this.classList.add('x') : dataO.push(num) && this.classList.add('o');
        
        // Проверяем условия выигрыша или ничьей
        if(
            (dataX.length > 2 || dataO.length > 2) && (checkWin(dataO, num) || checkWin(dataX, num))
        ){
            for(let i = 0; i < item.length; i++) {
                item[i].removeEventListener('click', currentStep);// Убираем обработчик событий после выигрыша
            }
            return(message.innerText = 'Победил игрок: ' + player);// Объявляем победителя
        }
        changePlayer(); // Меняем текущего игрока
        stepCount++; // Увеличиваем счетчик ходов

        // Проверяем на ничью и обновляем сообщение о текущем ходе
        (stepCount === 9) ? (message.innerText = 'Ничья'):
        (message.innerText = 'Ходит игрок: ' + player)
    }
}

// Функция для смены текущего игрока
function changePlayer() {
    // Меняем игрока с 'X' на 'O' и наоборот
    player === 'X' ? (player = 'O') : (player = 'X');

}

// Обработчик события для кнопки сброса игры
reset.addEventListener('click', function() {
    for(let i = 0; i < item.length; i++) {
        item[i].innerText = ''; // Очищаем текст в каждом элементе игры
    }

    // Сбрасываем массивы ходов игроков
    dataO = [];
    dataX = [];
    player = 'X';
    stepCount = 0;

    message.innerText = 'Ходит игрок: ' + player; // Обновляем сообщение о текущем ходе


    for(let i = 0; i < item.length; i++) {
        // Восстанавливаем обработчики событий для элементов игры
        item[i].addEventListener('click', currentStep);

        // Убираем классы для стилизации из элементов игры
        item[i].classList.remove('x', 'o');
    }
})

// Функция для проверки условий выигрыша
function checkWin(arr, number) {
    for(let w = 0, wlen = winCombinations.length; w < wlen; w++) {
        let someWinArr = winCombinations[w]; // Получаем текущую выигрышную комбинацию
        let count = 0;

        // Проверяем, есть ли номер в текущей комбинации
        if(someWinArr.indexOf(number) !== -1){
            for(let k = 0, klen = someWinArr.length; k < klen; k++){
                if(arr.indexOf(someWinArr[k]) !== -1){
                    count++;

                    // Если найдено три совпадения — возвращаем true (выигрыш)
                    if(count === 3){
                        return true;
                    }
                }
            }
            count = 0;
        } 
    }
}
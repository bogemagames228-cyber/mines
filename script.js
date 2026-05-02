JavaScript
const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
let gameActive = false;

function generateRound() {
    const minesCountInput = document.getElementById('mines-count');
    let minesCount = parseInt(minesCountInput.value);

    // Валидация количества мин
    if (isNaN(minesCount) || minesCount < 1 || minesCount > 24) {
        alert("Количество мин должно быть от 1 до 24.");
        minesCountInput.value = 3;
        return;
    }

    const gameBoard = document.getElementById('game-board');
    const signalBoard = document.getElementById('signal-board');

    // Очищаем оба поля
    gameBoard.innerHTML = '';
    signalBoard.innerHTML = '';
    gameActive = true;

    // Генерируем массив мин (0 - пусто, 1 - мина)
    let minesLayout = new Array(TOTAL_CELLS).fill(0);
    let placedMines = 0;
    while (placedMines < minesCount) {
        let randomIndex = Math.floor(Math.random() * TOTAL_CELLS);
        if (minesLayout[randomIndex] === 0) {
            minesLayout[randomIndex] = 1;
            placedMines++;
        }
    }

    // Заполняем оба поля
    for (let i = 0; i < TOTAL_CELLS; i++) {
        const isMine = minesLayout[i] === 1;

        // Создаем ячейку для Игрового поля
        const gameCell = document.createElement('div');
        gameCell.classList.add('cell');
        gameCell.dataset.mine = isMine ? 'true' : 'false';
        
        // Логика нажатия на игровом поле
        gameCell.addEventListener('click', onGameCellClick);
        gameBoard.appendChild(gameCell);

        // Создаем ячейку для поля Сгнала
        const signalCell = document.createElement('div');
        signalCell.classList.add('cell');
        
        // Если это не мина, подсвечиваем её на поле сигнала
        if (!isMine) {
            signalCell.classList.add('signal-safe');
        }
        
        signalBoard.appendChild(signalCell);
    }
}

function onGameCellClick() {
    if (!gameActive) return;
    if (this.classList.contains('revealed')) return;

    this.classList.add('revealed');

    if (this.dataset.mine === 'true') {
        // Проигрыш
        this.innerHTML = '💣';
        this.classList.add('mine');
        gameActive = false;
        setTimeout(() => alert('БА-БАХ! Игра окончена.'), 100);
        revealAllMines();
    } else {
        // Успех
        this.innerHTML = '⭐';
        this.classList.add('safe');
    }
}

// Показывает все мины при проигрыше
function revealAllMines() {
    const gameCells = document.querySelectorAll('#game-board .cell');
    gameCells.forEach(cell => {
        if (cell.dataset.mine === 'true') {
            cell.classList.add('revealed', 'mine');
            cell.innerHTML = '💣';
        }
    });
}

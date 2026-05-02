JavaScript
const boardSize = 5;
const totalMines = 3;
let board = [];
let gameActive = false;

function startGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    board = [];
    gameActive = true;
    document.getElementById('result-text').textContent = '';

    let cellsCount = boardSize * boardSize;
    let mines = Array(cellsCount).fill(0);
    
    // Расставляем бомбы (мины)
    for (let i = 0; i < totalMines; i++) {
        let randomIndex = Math.floor(Math.random() * cellsCount);
        if (mines[randomIndex] === 1) {
            i--;
        } else {
            mines[randomIndex] = 1;
        }
    }

    for (let i = 0; i < cellsCount; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.dataset.mine = mines[i];
        
        cell.addEventListener('click', function() {
            if (!gameActive) return;
            
            if (this.dataset.mine === '1') {
                this.innerHTML = '💣';
                this.style.backgroundColor = '#ef4444';
                gameActive = false;
                document.getElementById('result-text').textContent = 'Вы проиграли!';
            } else {
                this.innerHTML = '⭐';
                this.style.backgroundColor = '#22c55e';
            }
        });
        
        gameBoard.appendChild(cell);
    }

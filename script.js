let mines = [];
let mineCount = 3;
let opened = 0;
let gameActive = false;
let balance = 5000;
let bet = 100;

const grid = document.getElementById("grid");

function createGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < 25; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";

        cell.onclick = () => clickCell(cell, i);

        grid.appendChild(cell);
    }
}

function startGame() {
    bet = parseFloat(document.getElementById("bet").value);

    if (bet > balance) {
        alert("Недостаточно средств");
        return;
    }

    balance -= bet;
    updateBalance();

    mines = [];
    opened = 0;
    gameActive = true;

    while (mines.length < mineCount) {
        let r = Math.floor(Math.random() * 25);
        if (!mines.includes(r)) mines.push(r);
    }

    createGrid();
}

function clickCell(cell, i) {
    if (!gameActive) return;

    if (mines.includes(i)) {
        cell.classList.add("mine");
        gameActive = false;
        alert("💣 Проигрыш");
        return;
    }

    cell.classList.add("star");
    opened++;

    let coef = (1 + opened * 0.4).toFixed(2);
    document.getElementById("coef").innerText = coef;
}

function cashout() {
    if (!gameActive) return;

    let coef = parseFloat(document.getElementById("coef").innerText);
    let win = bet * coef;

    balance += win;
    updateBalance();

    showWin(win);
    gameActive = false;
}

function updateBalance() {
    document.getElementById("balance").innerText = balance.toFixed(2);
}

function showWin(amount) {
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("win").innerText = amount.toFixed(2) + " ₽";
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

function changeMines(val) {
    mineCount += val;
    if (mineCount < 1) mineCount = 1;
    if (mineCount > 20) mineCount = 20;
    document.getElementById("mineCount").innerText = mineCount;
}

createGrid();
updateBalance();

let mines = [];
let mineCount = 3;
let opened = 0;
let game = false;

let balance = 5000;
let bet = 100;

const grid = document.getElementById("grid");

function createGrid() {
    grid.innerHTML = "";

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";

        cell.onclick = () => clickCell(cell, i);

        grid.appendChild(cell);
    }
}

function startGame() {
    bet = Number(document.getElementById("bet").value);

    if (bet > balance) {
        alert("Нет денег");
        return;
    }

    balance -= bet;
    updateBalance();

    mines = [];
    opened = 0;
    game = true;

    while (mines.length < mineCount) {
        let r = Math.floor(Math.random() * 25);
        if (!mines.includes(r)) mines.push(r);
    }

    createGrid();
}

function clickCell(cell, i) {
    if (!game) return;

    cell.classList.add("open");

    if (mines.includes(i)) {
        cell.classList.add("mine");
        revealMines();
        game = false;
        return;
    }

    cell.classList.add("star");
    opened++;

    let coef = (1 + opened * 0.5).toFixed(2);
    document.getElementById("coef").innerText = coef;
}

function cashout() {
    if (!game) return;

    let coef = Number(document.getElementById("coef").innerText);
    let win = bet * coef;

    balance += win;
    updateBalance();

    showWin(win);

    revealMines();

    game = false;
}

function revealMines() {
    document.querySelectorAll(".cell").forEach((cell, i) => {
        if (mines.includes(i)) {
            setTimeout(() => {
                cell.classList.add("mine");
            }, i * 40);
        }
    });
}

function showWin(sum) {
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("winText").innerText = sum.toFixed(2) + " ₽";

    confetti({
        particleCount: 120,
        spread: 90
    });
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

function updateBalance() {
    document.getElementById("balance").innerText = balance.toFixed(2);
}

function changeMines(v) {
    mineCount += v;
    if (mineCount < 1) mineCount = 1;
    if (mineCount > 20) mineCount = 20;

    document.getElementById("mineCount").innerText = mineCount;
}

createGrid();
updateBalance();

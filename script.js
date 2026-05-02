function clickCell(cell, i) {
    if (!gameActive) return;

    cell.classList.add("open");

    if (mines.includes(i)) {
        cell.classList.add("mine");
        playSound("explode");

        revealAllMines();
        gameActive = false;
        return;
    }

    cell.classList.add("star");
    playSound("click");

    opened++;

    let coef = (1 + opened * 0.5).toFixed(2);
    document.getElementById("coef").innerText = coef;
}
function revealAllMines() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        if (mines.includes(index)) {
            setTimeout(() => {
                cell.classList.add("mine");
            }, index * 50);
        }
    });
}
function showWin(amount) {
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("win").innerText = amount.toFixed(2) + " ₽";

    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });
}
const sounds = {
    click: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.wav"),
    explode: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1684.wav"),
    win: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.wav")
};

function playSound(type) {
    sounds[type].currentTime = 0;
    sounds[type].play();
}
function updateBalance() {
    let el = document.getElementById("balance");
    el.innerText = balance.toFixed(2);

    el.style.transform = "scale(1.2)";
    setTimeout(() => el.style.transform = "scale(1)", 200);
}

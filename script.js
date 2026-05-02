let mines = [];
let mineCount = 3;
let opened = 0;
let gameActive = false;
let balance = 5000;
let bet = 100;

const grid = document.getElementById("grid");

const sounds = {
    click: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.wav"),
    explode: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1684.wav"),
    win: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.wav")
};

function playSound(type) {
    sounds[type].currentTime = 0;
    sounds[type].play();
}

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
        alert("Нет денег");
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

function cashout() {
    if (!gameActive) return;

    let coef = parseFloat(document.getElementById("coef").innerText);
    let win = bet * coef;

    balance += win;
    updateBalance();

    showWin(win);
    gameActive = false;
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
        particleCount: 150,
        spread: 100
    });

    playSound("win");
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

function updateBalance() {
    document.getElementById("balance").innerText = balance.toFixed(2);
}

function changeMines(val) {
    mineCount += val;
    if (mineCount < 1) mineCount = 1;
    if (mineCount > 20) mineCount = 20;
    document.getElementById("mineCount").innerText = mineCount;
}

createGrid();
updateBalance();


// ⭐ 3D ФОН
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg"),
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

for (let i = 0; i < 80; i++) {
    const geo = new THREE.SphereGeometry(0.1, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const star = new THREE.Mesh(geo, mat);

    star.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        -5
    );

    scene.add(star);
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

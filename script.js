const board = document.getElementById('board');
const winModal = document.getElementById('winModal');
const crossesContainer = document.getElementById('crossesContainer');
const totalCells = 25;
let clicks = 0;
const requiredClicks = 6; 

// Инициализация звуков через Web Audio API
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContextClass();
    }
}

function playClickSound() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(550, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.12);
    
    gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
}

function playWinSound() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(700, audioCtx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
}

// Генерируем фоновые крестики
function generateBackgroundCrosses() {
    const count = 18;
    for (let i = 0; i < count; i++) {
        const cross = document.createElement('div');
        cross.classList.add('bg-cross');
        cross.innerHTML = 'X';
        cross.style.left = `${Math.random() * 92}%`;
        cross.style.top = `${Math.random() * 92}%`;
        cross.style.transform = `rotate(${Math.random() * 360}deg)`;
        crossesContainer.appendChild(cross);
    }
}

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        cell.addEventListener('click', function() {
            initAudio();
            if (cell.classList.contains('revealed')) return;
            
            playClickSound();
            cell.classList.add('revealed');
            
            // Создаем 3D-Звезду
            const starContainer = document.createElement('div');
            starContainer.classList.add('star-container');
            
            // SVG 3D-Звездочка
            starContainer.innerHTML = `
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <defs>
                        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#ffea79" />
                            <stop offset="50%" stop-color="#ffaa00" />
                            <stop offset="100%" stop-color="#e67e22" />
                        </linearGradient>
                        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <polygon points="50,5 63,35 95,38 70,61 78,93 50,75 22,93 30,61 5,38 37,35" 
                             fill="url(#starGrad)" filter="url(#glow)" stroke="#ff8800" stroke-width="2"/>
                </svg>
            `;
            
            cell.appendChild(starContainer);
            clicks++;
            
            if (clicks === requiredClicks) {
                setTimeout(() => {
                    playWinSound();
                    winModal.classList.add('active');
                }, 650);
            }
        });
        
        board.appendChild(cell);
    }
}

function closeModal() {
    winModal.classList.remove('active');
    clicks = 0;
    createBoard();
}

generateBackgroundCrosses();
createBoard();

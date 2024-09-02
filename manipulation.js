let title = document.getElementById('title');
let restartBtn = document.getElementById('restartBtn');
let cases = Array.from(document.getElementsByClassName('case'));
let turnText = document.getElementById('turnText');

const O = "O";
const X = "X";
let currentPlayer = X;
let spaces = Array(400).fill(null);

const startGame = () => {
    cases.forEach(box => box.addEventListener('click', caseClicked));
};

function changeTurn() {
    turnText.innerText = `${currentPlayer} it's your Turn`;
}

function caseClicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            turnText.innerText = `${currentPlayer} Wins!`;
            cases.forEach(box => box.removeEventListener('click', caseClicked));
            return;
        }

        if (isDraw()) {
            turnText.innerText = `It's a Draw!`;
            cases.forEach(box => box.removeEventListener('click', caseClicked));
            return;
        }

        currentPlayer = currentPlayer === X ? O : X;
        changeTurn();
    }
}

function playerHasWon() {
    const winCondition = 5;

    const checkLine = (i, j, dx, dy) => {
        let count = 0;
        let player = spaces[i * 20 + j];

        if (!player) return false;

        for (let k = 0; k < winCondition; k++) {
            const x = i + k * dx;
            const y = j + k * dy;
            if (x >= 0 && x < 20 && y >= 0 && y < 20 && spaces[x * 20 + y] === player) {
                count++;
            } else {
                break;
            }
        }
        return count === winCondition;
    };

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (
                checkLine(i, j, 1, 0) ||  
                checkLine(i, j, 0, 1) ||  
                checkLine(i, j, 1, 1) ||  
                checkLine(i, j, 1, -1)    
            ) {
                return true;
            }
        }
    }

    return false;
}


function isDraw() {
    return spaces.every(space => space !== null);
}


restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    cases.forEach(box => {
        box.innerText = '';
    });
    
    currentPlayer = X;
    changeTurn();

    cases.forEach(box => box.addEventListener('click', caseClicked));
}

function createGameTable(rows, cols) {
    const gameTable = document.getElementById('gameTable');
    gameTable.innerHTML = '';
    spaces = Array(rows * cols).fill(null);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cellule = document.createElement('div');
            cellule.className = 'case';
            cellule.id = `${i * cols + j}`;
            gameTable.appendChild(cellule);
        }
    }

    cases = Array.from(document.getElementsByClassName('case'));
    startGame();
}

createGameTable(20, 20);

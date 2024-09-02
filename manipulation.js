let title = document.getElementById('title');
let restartBtn = document.getElementById('restartBtn');
let cases = Array.from(document.getElementsByClassName('case'));
let turnText = document.getElementById('turnText');

const O = "O";
const X = "X";

let currentPlayer = X;
let spaces = Array(400).fill(null);

// Fonction pour démarrer le jeu 
const startGame = () => {
    cases.forEach(box => box.addEventListener('click', caseClicked));
};

// Met à jour le texte indiquant quel joueur doit jouer
function changeTurn() {
    turnText.innerText = `${currentPlayer}, it's your turn`;
}

// Fonction appelée lorsqu'une case est cliquée
function caseClicked(e) {
    const id = e.target.id;


    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        // Vérifie si le joueur courant a gagné
        if (playerHasWon()) {
            turnText.innerText = `${currentPlayer} Wins!`;
            // Désactive les clics sur toutes les cases après la victoire
            cases.forEach(box => box.removeEventListener('click', caseClicked));
            return;
        }

        // Vérifie si le jeu est terminé par un match nul
        if (isDraw()) {
            turnText.innerText = `It's a Draw!`;
            // Désactive les clics sur toutes les cases après le match nul
            cases.forEach(box => box.removeEventListener('click', caseClicked));
            return;
        }

        // Change le joueur courant et met à jour le texte d'indication du tour
        currentPlayer = currentPlayer === X ? O : X;
        changeTurn();
    }
}

// Fonction qui vérifie si le joueur courant a gagné
function playerHasWon() {
    const winCondition = 5; 

    // Fonction pour vérifier une ligne de cases en fonction de la direction
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
                checkLine(i, j, 1, 0) ||  // Vérifie l'alignement horizontal
                checkLine(i, j, 0, 1) ||  // Vérifie l'alignement vertical
                checkLine(i, j, 1, 1) ||  // Vérifie l'alignement diagonal vers le bas-droite
                checkLine(i, j, 1, -1)    // Vérifie l'alignement diagonal vers le haut-droite
            ) {
                return true; 
            }
        }
    }

    return false; 
}

// fonction de vérification d'un match null
function isDraw() {
    return spaces.every(space => space !== null);
}


restartBtn.addEventListener('click', restart);

// Fonction pour redémarrer le jeu
function restart() {
    spaces.fill(null);
    cases.forEach(box => {
        box.innerText = ''; 
    });
    
    currentPlayer = X; 
    changeTurn(); 

    cases.forEach(box => box.addEventListener('click', caseClicked)); 
}

// Fonction dynamique pour créer la table du jeu
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

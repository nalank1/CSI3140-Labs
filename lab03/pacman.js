function createGame(n) {
    let game = new Array(n).fill('.');

    let pacmanPosition = Math.floor(Math.random() * n);
    game[pacmanPosition] = 'C';

    let ghostPosition;
    do {
        ghostPosition = Math.floor(Math.random() * n);
    } while (ghostPosition === pacmanPosition);
    game[ghostPosition] = '^';

    let fruitPosition;
    do {
        fruitPosition = Math.floor(Math.random() * n);
    } while (fruitPosition === pacmanPosition || fruitPosition === ghostPosition);
    game[fruitPosition] = '@';

    return game;
}

let score = 0;
let level = 1;

function updateScore() {
    let scoreDiv = document.getElementById('score');
    scoreDiv.textContent = 'Score: ' + score;
}

function updateLevel(){
    let levelDiv = document.getElementById('level');
    levelDiv.textContent = 'Level: ' + level;
}

function moveLeft(game) {
    let pacmanPosition = game.indexOf('C');
    if (pacmanPosition > 0) {
        if (game[pacmanPosition - 1] === '.') {
            score++;
            updateScore();
            game[pacmanPosition - 1] = ' ';
        }

        if(game[pacmanPosition - 1] === '@'){
            score += 10;
            updateScore();
            game[pacmanPosition - 1] = ' ';
        }
        game[pacmanPosition] = ' ';
        game[pacmanPosition - 1] = 'C';
    }

    if (!game.includes(' ')) {
        level++;
        updateLevel(); 
        game = createGame(game.length);
    }

    return game;
}

function moveRight(game) {
    let pacmanPosition = game.indexOf('C');
    if (pacmanPosition < game.length - 1) {
        if (game[pacmanPosition + 1] === '.') {
            score++;
            updateScore();
            game[pacmanPosition + 1] = ' ';
        }

        if(game[pacmanPosition + 1] === '@'){
            score += 10;
            updateScore();
            game[pacmanPosition + 1] = ' ';
        }
        game[pacmanPosition] = ' ';
        game[pacmanPosition + 1] = 'C';
    }

    if (!game.includes('.')) {
        level++;
        updateLevel();
        game = createGame(game.length);
    }

    return game;
}


let direction = 1;

function moveGhost(game) {
    let ghostPosition = game.indexOf('^');
    if (ghostPosition === 0) {
        direction = 1;
    } else if (ghostPosition === game.length - 1) {
        direction = -1;
    }

    game[ghostPosition] = '.';
    game[ghostPosition + direction] = '^';
    return game;
}

function renderGame(game){
    let gameContainer = document.getElementById('game');
    gameContainer.innerHTML = '';
    game.forEach(cell => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('game-cell');
        if (cell === 'C') {
            cellElement.classList.add('pacman');
        } else if (cell === '^') {
            cellElement.classList.add('ghost');
        } else if (cell === '@') {
            cellElement.classList.add('fruit');
        } else if (cell === '.'){
            cellElement.classList.add('pellet');
        } else{
            cellElement.classList.add('eaten-pellet');
        }
        gameContainer.appendChild(cellElement);
    });
}

let game = createGame(10);
renderGame(game);

setInterval(() => {
    game = moveGhost(game);
    renderGame(game);
}, 2000);


document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowLeft') {
        game = moveLeft(game);
    } else if (event.code === 'ArrowRight') {
        game = moveRight(game);
    }
    renderGame(game);
});



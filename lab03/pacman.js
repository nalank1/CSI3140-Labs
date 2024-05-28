function createGame(n){
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

console.log(createGame(10));

let score = 0;
function moveLeft(game){
    let pacmanPosition = game.indexOf('C');
    if(pacmanPosition > 0){
        if(game[pacmanPosition - 1] === '.'){
            score++;
        }
        game[pacmanPosition] = '.'; //pacman is not eating that's why we assign pellet
        game[pacmanPosition - 1] = 'C';
    }
    return game;
}

function moveRight(game){
    let pacmanPosition = game.indexOf('C');
    if(pacmanPosition < game.length - 1){
        if(game[pacmanPosition + 1] === '.'){
            score++;
        }
        game[pacmanPosition] = '.';
        game[pacmanPosition + 1] = 'C';
    }
    return game;
}


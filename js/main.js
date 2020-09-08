'use strict'

//? Get DOM elements
const score = document.querySelector('.score'),
    game = document.querySelector('.game'),
    gameStart = document.querySelector('.game-start'),
    gameArea = document.querySelector('.game-area');

//? "Enum" object control
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

//? Basic game settings
const setting = {
    start: false,
    score: 0,
    speed: 3
};

const startGame = () => {
    gameStart.classList.add('hide');
    setting.start = true;
    requestAnimationFrame(playGame);
}

const playGame = () => {
    console.log('play game');
    if (setting.start === true) {
        requestAnimationFrame(playGame);
    }
}

const startRun = (event) => {
    event.preventDefault();
    keys[event.key] = true;
}

const stopRun = (event) => {
    event.preventDefault();
    keys[event.key] = false;
}

//? EventListeners
gameStart.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);